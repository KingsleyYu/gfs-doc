import React, { PropTypes } from 'react';

import '../../../styles/header.less'


class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { name, description, navs,url } = this.props;
        return (
            <div className='headerWrapper'>
                <header className="header">
                    <div className="container">
                        <a className="title" href={url}>
                            <h2>{name}</h2>
                            <h3>{description}</h3>
                        </a>

                        <ul className="nav">
                            {
                                navs.map((nav) => (
                                    <li key={nav.name} className="nav-item">
                                        <a href={nav.url} className="">{nav.name}</a>
                                    </li>
                                ))
                            }
                            <li className="nav-item">
                                <span className="nav-lang active">中文</span>
                                <span> / </span>
                                <span className="nav-lang">En</span>
                            </li>
                        </ul>
                    </div>
                </header>
            </div>
        )
    }
}

// Header.propTypes = {
//     onChange: PropTypes.func.isRequired,
//     value: PropTypes.string.isRequired,
//     options: PropTypes.arrayOf(
//         PropTypes.string.isRequired
//     ).isRequired
// }

export default Header;