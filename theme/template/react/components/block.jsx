import React from 'react'

import Demo from 'component/button.md'

class Block extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }


    render() {
        const { title, subTitle, code } = this.props.block;

        return (
           <Demo/>
        )
    }
}

export default Block;