
import React, { PropTypes } from 'react';


/**
 * 按钮组件提供内置样式
 * @class Button
 * @module 基础组件
 * @submodule form
 * @extends Component
 * @constructor
 * @show true
 * @block Button 主标题|Button subTitle|button.js
 * @block Button 主标题1|Button subTitle2|button.js
 * */
export default class Button extends Component {
    static propTypes = {
        /**
         * 按钮尺寸,分别为xs、sm、lg
         * @property egSize
         * @type String
         * @default sm
         * */
        egSize: PropTypes.string,
        /**
         * 是否禁用按钮
         * @property disabled
         * @type Boolean
         * @default false
         * @since 1.0.1
         * @optional aa,bbbba
         * */
        disabled: PropTypes.bool,
        //success:PropTypes.bool,
        /**
         * 按钮是否处于选中状态
         * @property active
         * @type Boolean
         * @default false
         * */
        active: PropTypes.bool,
        /**
         * 按钮颜色样式
         * @property egStyle
         * @type Boolean
         * @optional success,error,warning,danger,default,link,white
         * @default ''
         * */
        egStyle: PropTypes.string,
        classPrefix: PropTypes.string,
        /**
         * 标签tagName
         * @property componentTag
         * @type String
         * @default 'button'
         * */
        componentTag: PropTypes.string,
        /**
         * 是否为块级显示
         * @property block
         * @type Boolean
         * @default false
         * */
        block: PropTypes.bool,
        egHref: PropTypes.string
        /**
         * 是否只将主题颜色应用于边框，而不是应用于背景色
         * @property hollow
         * @type Boolean
         * @default false
         * */
    };
    static defaultProps = {
        egSize: 'default',
        classPrefix: 'btn',
        egStyle: 'default',
        componentTag: 'button'
    };
    constructor(props, context) {
        super(props, context);
        this.setProperty('hollow', 'hollow');
    }

    render() {
        let { componentTag: Component } = this.props;

        return (
            <Component {...this.otherProps} className={
                classnames(
                    this.getProperty(),
                    this.props.className
                )
            }>{this.props.children}</Component>
        );
    }
}