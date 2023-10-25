import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import App from './App.js';
import store from './store/store.js';
import './style.css';

const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root
);