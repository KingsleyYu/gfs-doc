import React from 'react';
import { Link } from 'react-router'
import '../../../styles/sideBar.less'

class SideBar extends React.Component {
    constructor(props) {
        super(props)
    }


    getModuleList() {
        const { modules, classes } = this.props;

        let list = null, module;

        if (modules) {
            list = modules.map((oModuleKey) => {
                module = modules[oModuleKey];
                return (
                    <li className="nav-item">
                        <span className="module">{module.name}</span>
                        {
                            this.getSubModuleList(module.submodules)
                        }
                    </li>
                )
            })
        }

        return list;
    }

    getSubModuleList(moduleName, submodules) {
        let list = null;
        if (submodules.length) {
            list = submodules.map(oSubModule => {
                return (
                    <div key={oSubModule.name} className="nav-group">
                        <div className="sub-moudle">
                            {oSubModule.name}
                        </div>
                        <ul className="pure-menu-list sub-nav">
                            {
                                oSubModule.classes.length &&
                                oSubModule.classes.map((oClass) => {
                                    return (
                                        <li key={oClass.name} className="nav-item">
                                            <Link to={'/components/' + oClass.name} className="module">{oClass.name}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            })
        }
        else {
            //TODO:增加只有主模块的情况，这样的话，classess 应该直接附属于modules
            <li className="nav-item">
                <span className="module">{moduleName}</span>
                <ul className="pure-menu-list sub-nav" >

                </ul>
            </li>
        }

        return list;
    }

    render() {
        let module;
        let allModules = this.props;
        return (
            <div id="sidebar">
                <div id="sidebar_list">
                    <div className="versions">
                        <h3>版本</h3>
                    </div>
                    <ul>
                        <li className="nav-item">
                            <Link to="/components/updateLog" activeStyle={{ color: 'red' }} className="module">更新日志</Link>
                        </li>
                        {
                            allModules &&
                            Object.keys(allModules).map((oModuleKey) => {
                                module = allModules[oModuleKey];
                                if (!module.is_submodule) {
                                    return (
                                        <li key={module.name} className="nav-item">
                                            <span className="module">{module.name}</span>
                                            {
                                                this.getSubModuleList(module.name, module.submodules)
                                            }
                                        </li>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default SideBar