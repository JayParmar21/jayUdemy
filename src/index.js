import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import "../node_modules/video-react/dist/video-react.css";
// import '../node_modules/react-modal-video/scss/modal-video.scss';

import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);