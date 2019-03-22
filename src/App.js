import React, { Component } from 'react';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';

export default class App extends Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000' }} >
          <Text style={{ fontSize: 25 }} >Nome da Cidade</Text>
          <Text style={{ fontSize: 25 }}>18°</Text>
        </View>

        <CurrentLocationMap />

        <WeatherForecast />

        <SelectTempScale label='Celsius / Fahrenheit' />
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
      value={props.switchValue} />
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

const WeatherForecast = props => {

  const marginText = 5

  return (
    <View style={{
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#000'
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderColor: '#AAA' }}>
        <Text style={{ fontSize: 18, margin: marginText }}>22/05</Text>
        <Text style={{ fontSize: 18, margin: marginText }}>18°</Text>
        <Image source={{ uri: 'https://www.metaweather.com/static/img/weather/png/lc.png' }} style={{ width: 30, height: 30, marginRight: 5 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderColor: '#AAA' }}>
        <Text style={{ fontSize: 18, margin: marginText }}>22/05</Text>
        <Text style={{ fontSize: 18, margin: marginText }}>18°</Text>
        <Image source={{ uri: 'https://www.metaweather.com/static/img/weather/png/lc.png' }} style={{ width: 30, height: 30, marginRight: 5 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderColor: '#AAA' }}>
        <Text style={{ fontSize: 18, margin: marginText }}>22/05</Text>
        <Text style={{ fontSize: 18, margin: marginText }}>18°</Text>
        <Image source={{ uri: 'https://www.metaweather.com/static/img/weather/png/lc.png' }} style={{ width: 30, height: 30, marginRight: 5 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
        <Text style={{ fontSize: 18, margin: marginText }}>22/05</Text>
        <Text style={{ fontSize: 18, margin: marginText }}>18°</Text>
        <Image source={{ uri: 'https://www.metaweather.com/static/img/weather/png/lc.png' }} style={{ width: 30, height: 30, marginRight: 5 }} />
      </View>

    </View>
  )
}