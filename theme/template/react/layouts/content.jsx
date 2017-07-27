import React from 'react'


class ContentLayout extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="stdoc-content">
                {this.props.routeParams.name}
            </div>
        )
    }
}

export default ContentLayout