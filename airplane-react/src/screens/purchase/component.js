import React, {Component} from 'react';
import {Card} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import './style.css';

import {isNil} from 'ramda';
import {SpiralSpinner} from 'react-spinners-kit';

class Purchase extends Component {
  state = {
    isLoading: false
  };

  componentDidMount() {
    const selectedFlight = this.props.history.location.state.selectedFlight;

    if (isNil(selectedFlight)) {
      this.props.history.replace('/');
    } else {
      this.setState({selectedFlight: selectedFlight});
    }
  }

  handlePurchase = () => {
    const selectedFlight = this.state.selectedFlight;
    const {origin, destination, price, departure, arrival} = selectedFlight;

    alert(`you bought that shit: from ${origin} to ${destination} on ${departure} arriving on ${arrival} for ${price} euros, ya stupid fuck`)
  };

  handleBackStep = () => this.props.history.replace('/');

  render() {
    const selectedFlight = this.props.history.location.state.selectedFlight;
    const {origin, destination, price, departure, arrival} = selectedFlight;

    return (
      <div className="wrapper">
        <div className={this.state.isLoading ? 'overlay' : 'hidden'}/>
        <div className={this.state.isLoading ? 'loader-container' : 'hidden'}>
          <SpiralSpinner size={200}
                         frontColor="#0AA8FB"
                         backColor="#374F7D"
                         loading={this.state.isLoading}/>
        </div>
        <div className="container">
          <div className="header">
            Ticket booking system, book your dream trip, innit
          </div>
          <div className="middle">
            <div className="middle-card-container" style={{background: '#E2E6EC', padding: '30px'}}>
              <Card title="Chosen flight"
                    bordered={false}
                    style={{width: 300}}>
                <p>Origin: {origin}</p>
                <p>Destination: {destination}</p>
                <p>Price: €{price}</p>
                <p>Departure date: {moment(departure).format('YYYY-MM-DD HH:MM:SS')}</p>
                <p>Arrival date: {moment(arrival).format('YYYY-MM-DD HH:MM:SS')}</p>
              </Card>
            </div>
            <div className="middle-buttons">
              <button type="button"
                      disabled={isNil(this.state.selectedFlight)}
                      className="form-submit to-purchase-button"
                      onClick={this.handleBackStep.bind(this)}>
                Back to selection
              </button>
              <button type="button"
                      disabled={isNil(this.state.selectedFlight)}
                      className="form-submit to-purchase-button"
                      onClick={this.handlePurchase.bind(this)}>
                Purchase that shit
              </button>
            </div>
          </div>
          <div className="footer">
            Contact info: mista V from building 24
          </div>
        </div>
      </div>
    );
  }
}

export default Purchase;
