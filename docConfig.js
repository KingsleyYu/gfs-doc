module.exports = {
    //扫描的文件路径
    paths: ['src/'],
    //配置demo链接
    demoUrl: 'http://future-team.github.io/eagle-ui/examples/index.html',
    demoDir: "examples/",
    //文档页面输出路径
    outdir: 'doc/',
    //内置主题
    // theme:'ui',
    //自定义主题目录
    //themedir: 'theme-smart-ui/',
    //项目信息配置
    project: {
        //框架主入口
        entry:'src/',
        //项目名称
        name: '商家线UI库',
        //项目描述，可以配置html，会生成到document主页
        description: 'phonix-ui',
        //是否是移动设备平台
        isApp: false,
        //版本信息
        version: '1.1.0',
        //是否隐藏defined in 注解(代码定义于第几行)
        //hideFoundAt:'true',
        //是否禁止每个class里的methods、properties、events表格
        //hideClassItemTable:'true',
        //是否隐藏tab栏
        //hideTabItemList:'true',
        //hideViewDemo:'true',
        //hideEditCode:'true',
        //设置默认active的tab，不设置的话默认激活detail tab
        //activeTab:'method',
        //地址信息
        url: 'https://github.com/future-team',
        //主页面插入的js
        //scripts:['uicode.js'],
        //导航信息
        navs: [{
            name: "首页",
            url: "https://github.com/future-team"
        }, {
            name: "文档",
            url: "index.html"
        }, {
            name: "关于",
            url: "http://uedfamily.com/about/"
        }],
        //自定义头部
        header: "",
        //自定义底部
        footer: ""
    },
    //demo页面需要加载的js库
    demo: {
        paths: ['src/code/ui/uicode.js'],

        link: ['https://cdn.bootcss.com/react/0.14.8/react-dom.min.js',]
    },
    extraStyles: [
        'http://future-team.github.io/phoenix-styles/dist/phoenix-styles.min.css'
    ],
    extraJs: [
        'https://cdn.bootcss.com/react/0.14.8/react.min.js',
        'https://cdn.bootcss.com/react/0.14.8/react-dom.min.js',
        'https://unpkg.com/babel-standalone@6.15.0/babel.min.js',
        'http://future-team.github.io/phoenix-ui/dist/phoenix-ui.min.js']
};

