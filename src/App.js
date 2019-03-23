import React, { Component } from 'react';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';
import { getWeatherForecast } from './api'

import WeatherForecast from './components/WeatherForecast'

export default class App extends Component {

  state = {
    switchValue: true,
    cityTitle: '',
    fahrenreitForecast: [],
    celsiusForecast: [],
    selectedForecast: []
  }

  async componentDidMount() {
    // São Paulo geolocation
    const lattitude = '-23.562880'
    const longitude = '-46.654659'

    this.setState({ ...await getWeatherForecast(lattitude, longitude) },
      () => this.setState({ selectedForecast: this.state.celsiusForecast }, () => console.log(this.state.selectedForecast)))

  }

  toggleSwitch = (value) => {
    this.setState({ switchValue: value })
    console.log('Switch is: ' + value)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000' }} >
          <Text style={{ fontSize: 25 }} >Nome da Cidade</Text>
          <Text style={{ fontSize: 25 }}>18°</Text>
        </View>

        <CurrentLocationMap />

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
        false: 'gray',
        true: 'blue'
      }}
      thumbColor='blue'
    />
  </View>
)

const CurrentLocationMap = props => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000'
  }}>
    <View style={{ height: 150, width: '100%', backgroundColor: '#AAA' }}>

    </View>
  </View>
)