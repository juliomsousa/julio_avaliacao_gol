import React, { Component } from 'react';
import { StyleSheet, Switch, Text, View, StatusBar } from 'react-native';
import { getWeatherForecast } from './api'

import WeatherForecast from './components/WeatherForecast'
import CurrentLocationMap from './components/CurrentLocationMap'
import commonStyles from './commonStyles'

export default class App extends Component {

  state = {
    switchValue: false,
    cityTitle: '',
    currentTemperature: '',
    selectedScale: 'celsius',
    selectedScaleSign: '',
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
            this.setDisplayedScale(this.state.selectedScale)
          })
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
      this.setState({ selectedForecast: this.getForecastShowRange(this.state.celsiusForecast, 4), selectedScaleSign: 'C' }, this.setTodayTemperature)
    } else {
      this.setState({ selectedForecast: this.getForecastShowRange(this.state.fahrenreitForecast, 4), selectedScaleSign: 'F' }, this.setTodayTemperature)
    }
  }

  setTodayTemperature = () => {
    const temperatureMean = this.getTemperatureMean(this.state.selectedForecast[0].minTemp, this.state.selectedForecast[0].maxTemp)
    //const scaleSign = (this.state.selectedScale === 'celsius') ? 'C' : 'F'
    this.setState({ currentTemperature: temperatureMean })
  }

  toggleSwitch = (value) => {
    const selectedScale = value ? 'fahrenheit' : 'celsius'
    this.setDisplayedScale(selectedScale)
    this.setState({ switchValue: value })
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />

        <View style={styles.header} >
          <Text style={{ fontSize: 25, fontFamily: commonStyles.fontFamily, color: commonStyles.colors.fontColor }}>{this.state.cityTitle}</Text>
          <Temperature currentTemperature={this.state.currentTemperature} scaleSign={this.state.selectedScaleSign} />
        </View>

        <CurrentLocationMap coordinates={this.state.coordinates} />

        <WeatherForecast forecastData={this.state.selectedForecast} />

        <SelectTempScale label='Celsius / Fahrenheit' switchValue={this.state.switchValue} toggleSwitch={this.toggleSwitch} />
      </View>
    );
  }
}

const Temperature = (props) => (
  props.currentTemperature ?
    <View style={{ flexDirection: 'row' }} >
      <Text style={{ fontSize: 30, fontFamily: commonStyles.fontFamily, color: commonStyles.colors.fontColor }}>{props.currentTemperature}°</Text>
      <Text style={{ fontSize: 20, fontFamily: commonStyles.fontFamily, color: commonStyles.colors.fontColor, textAlignVertical: 'center' }} >{props.scaleSign}</Text>
    </View>
    :
    <Text style={{ fontSize: 25, fontFamily: commonStyles.fontFamily, color: commonStyles.colors.fontColor }}>{props.currentTemperature}</Text>
)

const SelectTempScale = props => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  }}>
    <Text style={{ fontSize: 16, fontFamily: commonStyles.fontFamily, color: commonStyles.colors.fontColor }} >{props.label}</Text>
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
    padding: 10,
    paddingTop: 24,
    backgroundColor: commonStyles.colors.backgroundColor
  },
  header: {
    height: 100,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#000'
  }
})