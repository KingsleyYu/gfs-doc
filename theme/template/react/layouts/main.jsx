import React from 'react'

import SideBar from '../components/sideBar'
import Header from '../components/header'
import Footer from '../components/footer'

import docConfig from 'docConfig'

class MainLayout extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
      return (
             <div>
                <Header {...docConfig.project} />
                <SideBar {...docConfig.modules} />
                 {this.props.children}
            </div>
        )
    }
}

export default MainLayout;