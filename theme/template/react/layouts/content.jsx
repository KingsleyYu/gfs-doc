import React from 'react'
import docConfig from 'docConfig'

// import Demo from 'component/form/Button.md'

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
        this.getClassData(this.props.routeParams);
    }

    getClassData = (routeParams) => {
        let className = routeParams.name;
        let classData = docConfig.classes[className];

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

    toggleCode = () => {

    }

    render() {
        const Demo = require(`component/form/${this.props.routeParams.name}.md`)
        return (
            <div className="stdoc-content">
                <div className="class-container">
                    <section className="header">
                        <h2>{this.state.name}</h2>
                        <p>{this.state.description}</p>
                    </section>
                    <Demo />
                </div>
            </div>
        )
    }
}

export default ContentLayout