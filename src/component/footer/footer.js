import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import ulogo from '../../Logo/udemylogo.png'
import copyright from '../../Logo/copyright.png'
class Footer extends Component {
    render() {
        return (
            <div>
                <div style={{ textAlign: 'initial' }}>
                    <img src={ulogo} alt="ulogo" style={{ height: '75px', width: '130px',marginRight:'33%' }}></img>
                    CopyRight<img src={copyright} alt="ulogo" style={{ height: '15px', width: '15px' }}></img> 2019 Udemy, Inc.
                </div>
            </div>
        )
    }
}

export default withRouter(Footer)