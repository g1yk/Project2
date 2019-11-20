import React, { Component } from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import axios from 'axios';
import Card from './components/Card';

const API_KEY = "fe7dc6f5538ed939abf8ada8328338ef"

// axios.post('http://ironrest.herokuapp.com/vitalii', {age: 24}).then(res => {
//   console.log(res.data)
// })


export default class App extends Component {




  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  };





  getWeather = async (e) => {
    e.preventDefault();

    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;

    function fToC(fahrenheit) {
      var fTemp = fahrenheit;
      var fToCel = (fTemp - 32) * 5 / 9;
      var message = fTemp + '\xB0F is ' + fToCel + '\xB0C.';
      console.log(message);


    }


    // axios.post('http://ironrest.herokuapp.com/winningTransit/vitalii').then(res => {
    //   console.log(res.data)
    // })


    if (city && country) {
      let response = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
        .then((response) => {
          console.log(response)

          this.setState({
            temperature: (response.data.main.temp * 1.8 + 32).toFixed(0) + "F",
            city: response.data.name,
            country: response.data.sys.country,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
            error: '',

          }, () => {
            console.log(this.state)
          }
          )
        })

        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      console.log(response)
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the value',

      }, () => {
        console.log(this.state)
      }
      )
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-5 title-container">
                  <Titles />
                </div>
                <div className="col-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

