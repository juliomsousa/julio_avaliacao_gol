import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment'

export default props => {

	listItem = (item, index, last) => (
		<View style={[styles.listItem, { borderBottomWidth: last ? 0 : 1 }]} key={index}>
			<Text style={styles.dateText}>{moment(item.date).format('DD/MM')}</Text>
			<View style={styles.minMaxContainer} >
				<Text style={styles.tempValue}>
					<Text style={styles.tempMinMax}>Min</Text> {Math.round(item.minTemp)}°
				</Text>
				<Text style={styles.tempValue}>
					{Math.round(item.maxTemp)}º <Text style={styles.tempMinMax}>Max</Text>
				</Text>
			</View>
			<Image source={{ uri: item.weatherStateIcon }} style={styles.stateIcon} />
		</View>
	)

	return (
		<View style={styles.container}>
			{
				props.forecastData.map((day, index, arr) => {
					const last = (index === arr.length - 1) ? true : false
					console.log(day)
					return listItem(day, index, last)
				})
			}
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: '#000'
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 5,
		borderColor: '#AAA'
	},
	minMaxContainer: {
		flexDirection: 'row'
	},
	dateText: {
		fontSize: 18,
		margin: 5
	},
	tempValue: {
		fontSize: 18,
		margin: 5,
		marginHorizontal: 8
	},
	tempMinMax: {
		fontSize: 14,
	},
	stateIcon: {
		width: 30,
		height: 30,
		marginRight: 5
	}
})