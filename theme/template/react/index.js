import React from 'react';
import ReactDOM from 'react-dom';

import Header from './layouts/header'

const roolEl = document.getElementById('app');

class App extends React.Component {
    render() {
        return(
            <div>
                <Header />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    roolEl
)