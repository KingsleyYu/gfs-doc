import React from 'react'

import DocConfig from '../../utils/docConfig'

import '../../../styles/content.less'

class ContentLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
        }
    }

    componentDidMount() {

    }

    getClassData = (routeParams) => {
        let className = routeParams.name;
        let classData = DocConfig.getDataByClass(className)

        if (classData) {
            this.setState({
                name: classData.name,
                description: classData.description,
            })
        }
        else {
            this.setState({
                name: '',
                description: ''
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.routeParams.name != this.props.routeParams.name) {
            this.getClassData(nextProps.routeParams);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let classData = DocConfig.getDataByClass(this.props.routeParams.name)
        if (classData) {
            let Demo = require(`component/${classData.submodule}/${this.props.routeParams.name}.md`).default;
            return (
                <div className="stdoc-content">
                    <div className="class-container">
                        <section className="header">
                            <h2>{classData.name}</h2>
                            <p>{classData.description}</p>
                        </section>
                        <Demo />
                    </div>
                </div>
            )
        }
        else {
            let menuInfo = DocConfig.getMeunByKey(this.props.routeParams.name);
            let Page = require(`component/${menuInfo.url}`).default;
            return (
                <div className="stdoc-content">
                    <Page />
                </div>
            )
        }
    }
}

export default ContentLayout