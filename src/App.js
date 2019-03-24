import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { getWeatherForecast } from './api'

import Loading from './components/Loading'
import CurrentTemperature from './components/CurrentTemperature'
import CurrentLocationMap from './components/CurrentLocationMap'
import WeatherForecast from './components/WeatherForecast'
import SelectTempScale from './components/SelectTempScale'
import commonStyles from './commonStyles'

export default class App extends Component {

  state = {
    switchValue: false,
    waitingAPIResponse: true,
    feedbackModalMessage: 'Obtendo Dados',
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
        //console.log(position.coords)
        const { latitude, longitude } = position.coords

        getWeatherForecast(latitude, longitude).then(forecast => {
          //console.log('res', forecast)

          forecast.error === null
            ?
            this.setState({ ...forecast, coordinates: { latitude, longitude }, waitingAPIResponse: false }, () => {
              //console.log('coordinatesApp:', this.state.coordinates)
              this.setDisplayedScale(this.state.selectedScale)
            })
            :
            this.setState({ feedbackModalMessage: 'Não foi possível obter os dados. Tente novamente.' })
        })

      },
      (error) => {
        //console.log(error)
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

        <Loading
          isVisible={this.state.waitingAPIResponse}
          feedbackText={this.state.feedbackModalMessage}
          backgroundColor={'#d7d7d7'}
          loadColor={'#eb7302'}
          textColor={'#eb7302'}
        />

        <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />

        <CurrentTemperature
          cityTitle={this.state.cityTitle}
          currentTemperature={this.state.currentTemperature}
          scaleSign={this.state.selectedScaleSign}
        />

        <CurrentLocationMap coordinates={this.state.coordinates} style={styles.map} mapOpacity={0.9} />

        <WeatherForecast forecastData={this.state.selectedForecast} />

        <SelectTempScale
          labelLeft='Celsius'
          labelRight='Fahrenheit'
          switchValue={this.state.switchValue}
          toggleSwitch={this.toggleSwitch}
        />

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 24,
    backgroundColor: commonStyles.colors.backgroundColor
  },
  map: {
    backgroundColor: commonStyles.colors.backgroundColor2,
    borderColor: commonStyles.colors.backgroundColor
  }
})