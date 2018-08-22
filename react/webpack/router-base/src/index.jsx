import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import LazyLoad from './lazyload/LazyLoad';
import LazyLoadApp from 'bundle-loader?lazy&name=App!./App';
import LazyLoadAbout from 'bundle-loader?lazy&name=About!./About';
import LazyLoadTopics from 'bundle-loader?lazy&name=Topics!./Topics';

import 'index.scss';
/**
 * lazyload 之后的组件不可以直接使用 props.history 
 */

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={LazyLoad(LazyLoadApp)}/>
            <Route path="/about" component={LazyLoad(LazyLoadAbout)}/>
            <Route path="/topics" component={LazyLoad(LazyLoadTopics)}/>
        </div>
    </Router>
, document.querySelector('#root'));