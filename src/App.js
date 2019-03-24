import React, { Component } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { getWeatherForecast } from './api'

import WeatherForecast from './components/WeatherForecast'
import CurrentLocationMap from './components/CurrentLocationMap'

export default class App extends Component {

  state = {
    switchValue: false,
    cityTitle: '',
    currentTemperature: '',
    selectedScale: 'celsius',
    fahrenreitForecast: [],
    celsiusForecast: [],
    selectedForecast: [],
    coordinates: {}
  }

  async componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords)
        const { latitude, longitude } = position.coords

        getWeatherForecast(latitude, longitude).then(forecast => {
          console.log('res', forecast)
          this.setState({ ...forecast, coordinates: { latitude, longitude } }, () => {
            console.log('coordinatesApp:', this.state.coordinates)
            this.setDisplayedScale(this.state.selectedScale)})
        })

      },
      (error) => {
        console.log(error)
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 5000
      },
    )

  }

  getForecastShowRange = (forecastList, range) => forecastList.slice(0, range)

  getTemperatureMean = (minTemp, maxTemp) => Math.round((minTemp + maxTemp) / 2)

  setDisplayedScale = (scale) => {
    if (scale === 'celsius') {
      this.setState({ selectedForecast: this.getForecastShowRange(this.state.celsiusForecast, 4) }, this.setTodayTemperature)
    } else {
      this.setState({ selectedForecast: this.getForecastShowRange(this.state.fahrenreitForecast, 4) }, this.setTodayTemperature)
    }
  }

  setTodayTemperature = () => {
    this.setState({
      currentTemperature: `${this.getTemperatureMean(this.state.selectedForecast[0].minTemp, this.state.selectedForecast[0].maxTemp)}°`
    })
  }


  toggleSwitch = (value) => {
    const selectedScale = value ? 'fahrenheit' : 'celsius'
    this.setDisplayedScale(selectedScale)
    this.setState({ switchValue: value })
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header} >
          <Text style={{ fontSize: 25 }}>{this.state.cityTitle}</Text>
          <Text style={{ fontSize: 25 }}>{this.state.currentTemperature}</Text>
        </View>

        <CurrentLocationMap coordinates={this.state.coordinates} />

        <WeatherForecast forecastData={this.state.selectedForecast} />

        <SelectTempScale label='Celsius / Fahrenheit' switchValue={this.state.switchValue} toggleSwitch={this.toggleSwitch} />
      </View>
    );
  }
}

const SelectTempScale = props => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000'
  }}>
    <Text>{props.label}</Text>
    <Switch
      onValueChange={props.toggleSwitch}
      value={props.switchValue}
      trackColor={{
        false: 'green',
        true: 'blue'
      }}
      thumbColor='blue'
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10
  },
  header: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000'
  }
})