'use strict';

exports.build = function (config, callback) {
    var Y = require('yuidocjs');
    var fs = require("fs");
    var path = require("path");
    var showdown = require('showdown');
    var converter = new showdown.Converter();
    var cheerio = require('cheerio')

    var pkg = require(fs.realpathSync('.') + '/package.json');
    var docConfig = require(fs.realpathSync('.') + '/docConfig.js');
    var stat = fs.stat;



    // 检查项目的package.json 的信息
    if (!pkg) {
        console.error('the project package.json files not exits.')
        pkg = {
            version: '1.0.0'
        }
    }

    docConfig.rootOutdir = docConfig.outdir || 'doc/'
    docConfig.outdir = path.join(docConfig.outdir || 'doc', pkg.version, '/');
    docConfig.project.docVersion = pkg.version;

    if (!fs.existsSync(docConfig.rootOutdir)) {
        fs.mkdirSync(docConfig.rootOutdir)
    }

    if (!fs.existsSync(docConfig.outdir)) {
        fs.mkdirSync(docConfig.outdir)
    }

    buildDoc(docConfig);

    function buildDoc(options) {
        var json;

        if (!options) {
            console.log('The Options of smartDoc is not be defined!');
            return;
        }

        //混入默认设置
        config = options = Y.mix(options, {
            //代码扫描路径
            paths: ['src/'],
            //文档输出文件夹
            outdir: 'doc/',
            theme: 'default',
            //主题目录
            //themedir: themeDir,
            //辅助js文件地址
            //helpers: [themeDir + "helpers/helpers.js"],
            //demo扫描目录
            demoDir: "",
            //demo生成器地址
            demoBuilder: './demoBuilder.js',
            //demo代码生成器地址
            codeLoader: './jasmineLoader.js'
        });

        // 设置版本号数据
        // config.project.versions = getVersionsConf();

        try {
            json = (new Y.YUIDoc(options)).run();
        } catch (e) {
            console.log(e);
            return;
        }

        options = Y.Project.mix(json, options);

        var metaData = buildDocConfig(Object.assign({}, json));

        fs.writeFileSync(path.join(options.outdir, 'doc.js'), "export default " + JSON.stringify(metaData));
    }

    function buildDocConfig(data) {
        var items = [], submodules = [], module, subModule, moduleName, subModuleName;

        var mdFiles = walk(path.join(__dirname, docConfig.paths[0]), ".md");

        Y.each(data.modules, function (item) {
            item.name && items.push({
                type: 'module',
                name: item.name
            });
        });

        Y.each(data.classes, function (item) {
            item.name && items.push({
                type: 'class',
                name: item.name
            });
        })

        data.classitems.forEach(function (item) {
            item.name && items.push({
                type: item.itemtype,
                className: item['class'],
                name: item.name
            });
        })

        data.filterItems = items;

        //Read the markdown files and covnter it to json       
        Y.each(data.classes, function (oClass) {
            oClass.blocks = readMarkDownFile(mdFiles, oClass.name);
        })

        //group the classes by module and submodule 
        Y.each(data.modules, function (i, oModuleKey) {
            module = data.modules[oModuleKey];
            if (!module.is_submodule) {
                submodules = [];
                Y.each(module.submodules, function (j, oSubModuleKey) {
                    submodules.push({
                        name: oSubModuleKey,
                        classes: getClassesBySubmodule(data.classes, module.name, oSubModuleKey)
                    })
                })
                module.submodules = submodules;
            } 
        })

        return data;
    }


    // 同时写一份 versions.js 文件记录版本信息
    function getVersionsConf() {
        var data = []
        // 扫描文档路径，获取各个版本的文档地址
        fs.readdirSync(config.rootOutdir).forEach(function (file) {
            if ([pkg.version, 'index.html', 'versions.js'].indexOf(file) == -1) {
                var d = require(fs.realpathSync('.') + path.join('/', config.rootOutdir, file, 'data.json'))
                if (d && d.project) {
                    data.push({
                        name: d.project.name,
                        url: file + '/index.html', // TODO
                        version: 'v ' + d.project.docVersion
                    })
                }
            }
        })
        data.push({
            name: pkg.name,
            url: pkg.version + '/index.html',
            version: 'v ' + pkg.version
        })
        fs.writeFileSync(config.rootOutdir + 'versions.js', "window['__versionConfig'] = " + JSON.stringify(data) + ";");
        fs.writeFileSync(config.rootOutdir + 'index.html', '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<head>' +
            '<meta charset="UTF-8">' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
            '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
            '<title>Redirect</title>' +
            '</head>' +
            '<body></body>' +
            '<script src="./versions.js"></script>' +
            '<script>' +
            'var firstItem = window.__versionConfig[0];' +
            'window.location.href = firstItem.url;' +
            '</script>' +
            '</html>');
        return data;
    }

    /**
     * 根据module和submodule 分组classes
     * @param {*} data 
     * @param {*} module 
     * @param {*} submodule 
     */
    function getClassesBySubmodule(data, module, submodule) {
        var c_array = [];

        Y.each(data, function (i, o) {
            if (data[o].module === module && data[o].submodule === submodule) {
                c_array.push(data[o])
            }
        })

        return c_array
    }

    /**
     * 读取指定目录下的的markdown 文件的内容，并将其转化会json 数据
     * @param {*} 文件集合
     * @param {*} 文件名 
     */
    function readMarkDownFile(mdFiles, name) {
        var dataList = {};
        var data = {}, titleEl, subTitleEl, descEl, preEl, linkEl;
        Y.each(mdFiles, function (md) {
            if (path.basename(md, ".md").toLowerCase() === name.toLowerCase()) {
                dataList = {
                    name: name,
                    blocks: []
                }
                var content = fs.readFileSync(md).toString();
                var r1 = converter.makeHtml(content);
                var $ = cheerio.load(r1);

                $('blockquote').each(function (index, oEl) {
                    data = {};

                    titleEl = $(oEl).find('h1');
                    subTitleEl = $(oEl).find('h2');
                    descEl = $(oEl).find('p');
                    preEl = $(oEl).next('pre');
                    linkEl = preEl.next('p');

                    data.name = name;
                    data.title = titleEl.length ? titleEl.text() : "";
                    data.subTitle = subTitleEl.length ? subTitleEl.text() : "";
                    data.desc = descEl.length ? descEl.text() : "";
                    data.code = preEl.length ? preEl.find('code').text() : "";
                    data.link = linkEl.length ? linkEl.find('a').attr('href') : "";

                    dataList.blocks.push(data);
                })
            }
        })

        return dataList;
    }

    /**
     * 递归获取指定目录下指定类型的文件
     * @param {*} dir 
     * @param {*} dir 
     */
    function walk(dir, ext) {
        var results = []
        var type;
        var list = fs.readdirSync(dir)
        list.forEach(function (file) {
            file = path.join(dir, file);

            var stat = fs.statSync(file)
            if (stat && stat.isDirectory()) {
                results = results.concat(walk(file, ext))
            }
            else {
                type = path.extname(file)
                if (type === ext) {
                    results.push(file)
                }
            }
        })
        return results
    }
};