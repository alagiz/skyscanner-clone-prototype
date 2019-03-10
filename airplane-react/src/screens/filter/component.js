import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import {DatePicker, Select, Slider, Table} from 'antd';
import 'antd/dist/antd.css';
import './style.css';

import {isNil} from 'ramda';
import {SpiralSpinner} from 'react-spinners-kit';

const backendUrl = `http://localhost:8080`;

const Option = Select.Option;

class Filter extends Component {
  state = {
    isLoading: false,
    origin: [],
    destination: [],
    selectedOrigin: null,
    selectedDestination: null,
    selectedPriceRange: [0, 100],
    sliderDisabled: true,
    selectedDepartureDate: moment(),
    datePickerDisabled: true,
    flights: []
  };

  componentDidMount() {
    this.fetchOriginAndDestinationLists();
  }

  fetchOriginAndDestinationLists = () => {
    this.setState({isLoading: true});

    axios.get(`${backendUrl}/flights/origins`)
      .then(response => {
        const jsonResponse = response.data;

        this.setState({origin: jsonResponse});

        return axios.get(`${backendUrl}/flights/destinations`);
      })
      .then(response => {
        const jsonResponse = response.data;

        this.setState({isLoading: false, destination: jsonResponse});
      })
      .catch(error => {
        const errorResponse = error.response;

        this.setState({isLoading: false});

        console.log(`error! ${errorResponse}`);
      });
  };

  handleToPurchase = () => this.props.history.replace('/purchase', {onlineMode: this.state.origin});
  handleOriginChange = value => this.setState({selectedOrigin: value});
  handleDestinationChange = value => this.setState({selectedDestination: value});
  handleDepartureDateChange = value => this.setState({selectedDepartureDate: value}, () => this.fetchFilteredFlights());
  handlePriceSliderChange = value => this.setState({selectedPriceRange: value}, () => this.fetchFilteredFlights());
  handleFetchFlights = () => this.fetchFilteredFlights();

  fetchFilteredFlights = () => {
    axios.get(`${backendUrl}/flights/byOriginAndDestinationAndMinPriceMaxPriceAndDepartureDate`, {
      params: {
        origin: this.state.selectedOrigin,
        destination: this.state.selectedDestination,
        minPrice: this.state.selectedPriceRange[0],
        maxPrice: this.state.selectedPriceRange[1],
        departureDate: this.state.selectedDepartureDate.startOf('day').valueOf(),
        departureEndDate: this.state.selectedDepartureDate.endOf('day').valueOf()
      }
    })
      .then(response => {
        const jsonResponse = response.data;

        this.setState({isLoading: false, flights: jsonResponse});
      })
      .catch(error => {
        const errorResponse = error.response;

        this.setState({isLoading: false});

        console.log(`errorss! ${errorResponse}`);
      });
  };

  render() {
    const optionsOrigins = this.state.origin.map((option, index) => <Option key={index}
                                                                            value={option}>{option}</Option>);
    const optionsDestinations = this.state.destination.map((option, index) => <Option key={index}
                                                                                      value={option}>{option}</Option>);
    const placeholderOrigins = `Choose origin`;
    const placeholderDestination = `Choose destination`;
    const flightsTableColumns = [
      {
        title: 'Origin',
        dataIndex: 'origin',
        key: 'origin'
      },
      {
        title: 'Destination',
        dataIndex: 'destination',
        key: 'destination'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Departure',
        dataIndex: 'departure',
        key: 'departure'
      }
    ];
    const flightsTable = <Table columns={flightsTableColumns}
                                dataSource={this.state.flights}/>;
    const marks = {
      0: '0 €',
      100: '100 €'
    };
    const priceRangeSlider = <Slider range
      // disabled={this.state.sliderDisabled}
                                     onAfterChange={this.handlePriceSliderChange.bind(this)}
                                     defaultValue={this.state.selectedPriceRange}
                                     marks={marks}/>;

    return (
      <div className="wrapper">
        <div className={this.state.isLoading ? 'overlay' : 'hidden'}/>
        <div className={this.state.isLoading ? 'loader-container' : 'hidden'}>
          <SpiralSpinner size={200}
                         frontColor="#0AA8FB"
                         backColor="#374F7D"
                         loading={this.state.isLoading}/>
        </div>
        <div className="filter-container">
          <div className="header">
            header
          </div>
          <div className="middle">
            <div className="middle-head">
              <div className="middle-title">
                Search a flight you desire
              </div>
              <div className="middle-origin-destination-filters">
                <div className="middle-origin-destination-filters-label"> Origin:</div>
                <Select style={{width: '100%'}}
                        showSearch
                        placeholder={placeholderOrigins}
                        optionFilterProp="children"
                        onChange={this.handleOriginChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {optionsOrigins}
                </Select>
                <div className="middle-origin-destination-filters-label"> Destination:</div>
                <Select style={{width: '100%'}}
                        showSearch
                        placeholder={placeholderDestination}
                        optionFilterProp="children"
                        onChange={this.handleDestinationChange}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {optionsDestinations}
                </Select>
              </div>
              <div className="middle-fetch-flights-button-container">
                <button type="button"
                        className="fetch-flights form-submit"
                        disabled={isNil(this.state.selectedOrigin) || isNil(this.state.selectedDestination)}
                        onClick={this.handleFetchFlights.bind(this)}>
                  Fetch them flights
                </button>
              </div>
            </div>
            <div className="middle-body">
              <div className="middle-body-top-panel">
                <div className="middle-body-top-left-panel">
                  <div className="middle-body-top-left-panel-label">
                    Price range:
                  </div>
                  <div className="middle-body-top-left-panel-slider">
                    {priceRangeSlider}
                  </div>
                  <div className="middle-body-top-left-panel-label">
                    Departure date:
                  </div>
                  <div className="middle-body-top-left-panel-date-picker">
                    <DatePicker defaultValue={this.state.selectedDepartureDate}
                                allowClear={false}
                      // disabled={this.state.datePickerDisabled}
                                onChange={this.handleDepartureDateChange.bind(this)}/>
                  </div>
                </div>
                <div className="middle-flight-list-container">
                  {flightsTable}
                </div>
              </div>
              <div className="middle-button-container">
                <button type="button"
                        className="form-submit to-purchase-button"
                        onClick={this.handleToPurchase.bind(this)}>
                  Purchase that shit
                </button>
              </div>
            </div>
          </div>
          <div className="footer">
            footer
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
