import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import commonStyles from '../commonStyles'

export default props => (
  <View style={styles.container} >
    <Text style={styles.cityText}>{props.cityTitle}</Text>
    {
      props.currentTemperature ?
        <View style={{ flexDirection: 'row' }} >
          <Text style={styles.temperatureValue}>{props.currentTemperature}°</Text>
          <Text style={styles.scaleSign} >{props.scaleSign}</Text>
        </View>
        :
        <Text style={styles.temperatureValue}>{props.currentTemperature}</Text>
    }
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 25,
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.fontColor,
    fontWeight: commonStyles.fontWeight
  },
  temperatureValue: {
    fontSize: 35,
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.fontColor,
    fontWeight: commonStyles.fontWeight
  },
  scaleSign: {
    fontSize: 20,
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.fontColor,
    textAlignVertical: 'top',
    fontWeight: commonStyles.fontWeight,
    paddingTop: 5
  }
})