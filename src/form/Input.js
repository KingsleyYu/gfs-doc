import React,{PropTypes} from 'react';
import Component from '../utils/Component';
import classnames from 'classnames';
import {setPhoenixPrefix} from '../utils/Tool';

/**
 * input框组件
 * @class Input
 * @module 基础组件
 * @submodule form
 * @extends Component
 * @constructor
 * @since 0.1.0
 * */

export default class Input extends Component{

    static propTypes = {
        /**
         * input类型, 可选[text,checkbox,radio], 默认text
         * @property type
         * @type String
         * @default 'text'
         * */
        type: PropTypes.string,
        /**
         * 类型为checkbox&radio时, 展示的文字信息
         * @property label
         * @type String
         * @default ''
         * */
        label: PropTypes.string,
        /**
         * 样式前缀
         * @property classPrefix
         * @type String
         * @default 'input'
         * */
        classPrefix:PropTypes.string,
        /**
         * 标签tagName
         * @property componentTag
         * @type String
         * */
        componentTag:PropTypes.string,
        /**
         * 更改值时触发的回调
         * @event onChange
         * @type Function
         * */
        onChange: PropTypes.func
    };

    static defaultProps = {
        type: 'text',
        classPrefix:'input',
        componentTag:'div',
        classMapping : {}
    };

    constructor(props, context) {
        super(props, context);
    }

    otherView(type){
        return (
            <label className={setPhoenixPrefix("multi-group")}>
                <div className={setPhoenixPrefix(type)}>
                    <input {...this.props} />
                    <i></i>
                </div>
                <span>{this.props.label ||''}</span>
            </label>
        );
    }

    renderInput(type){
        let html = <div></div>;

        if(type =='checkbox' || type=='radio'){
            html=this.otherView(type);
        }else{
            html = (<input {...this.props} className={
                classnames(
                    this.getProperty(true),
                    this.props.className
                )
                }/>);
        }

        return html;
    }


    render(){
        let {componentTag:Component,type} = this.props;
        return this.renderInput(type ? type:'text');
    }

}