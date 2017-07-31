/**
 * docConfig 数据操作类
 */

import docConfig from 'docConfig'

export default {
    getDataByClass: function (className) {
        let classData = null;
        if (docConfig.classes) {
            Object.keys(docConfig.classes).forEach(oKey => {
                if (oKey === className) {
                    classData = docConfig.classes[oKey]
                }
            })
        }
        return classData;
    },
    getMeunByKey: function (key) {
        let menu = null;

        let menuList = [];

        docConfig.project.menus.forEach(oMenu => {
            if (oMenu.subMenus && oMenu.subMenus.length) {
                oMenu.subMenus.forEach(oSubMenu => {
                    menuList.push(oSubMenu)
                })
            } else {
                menuList.push(oMenu)
            }
        })

        if (menuList.length) {
            menuList.forEach(oMenu => {
                if (oMenu.key === key) {
                    menu = oMenu;
                }
            })
        }

        return menu;
    }
}