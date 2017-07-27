import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'


import MainLayout from './layouts/main'
import Content from './layouts/content'
import '../../styles/app.less'


const roolEl = document.getElementById('app');


ReactDOM.render(
    <Router history={browserHistory} >
        <route path="/" component={MainLayout}>
            <route path="/components/:name" component={Content} />
        </route>
    </Router>,
    roolEl
)