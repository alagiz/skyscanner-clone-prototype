import React, {Component} from 'react';
import axios from 'axios';
import {Col, Row, Switch} from 'antd';
import 'antd/dist/antd.css';
import './style.css';

import {groupBy, isNil, keys} from 'ramda';
import {SpiralSpinner} from "react-spinners-kit";

// const apiGatewayUrl = `http://${window.location.hostname}:3002`;
const apiGatewayUrl = `http://192.168.99.100:3002`;

class Purchase extends Component {
  state = {
    isLoading: false
  };

  render() {

    return (
      <div className="wrapper">
        <div className={this.state.isLoading ? 'overlay' : 'hidden'}/>
        <div className={this.state.isLoading ? 'loader-container' : 'hidden'}>
          <SpiralSpinner
            size={200}
            frontColor="#0AA8FB"
            backColor="#374F7D"
            loading={this.state.isLoading}
          />
        </div>
        <div className="compute-container">
          <div className="header">
            header
          </div>
          <div className="middle">
            middle
          </div>
          <div className="footer-compute-screen">
            footer
          </div>
        </div>
      </div>
    );
  }
}

export default Purchase;
