import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import moment from 'moment'
import commonStyles from '../commonStyles'

export default props => {

	emptyList = [{}, {}, {}, {}]

	listItem = (item, index, last) => (
		<View style={[styles.listItem, { borderBottomWidth: last ? 0 : 0.5 }]} key={index}>
			<Text style={styles.dateText}>{moment(item.date).format('DD/MM')}</Text>
			<View style={styles.minMaxContainer} >
				<Text style={styles.tempValue}>
					<Text style={styles.tempMinMax}>Min</Text> {Math.round(item.minTemp)}°
				</Text>
				<Text style={styles.tempValue}>
					{Math.round(item.maxTemp)}° <Text style={styles.tempMinMax}>Max</Text>
				</Text>
			</View>
			<Image source={{ uri: item.weatherStateIcon }} style={styles.stateIcon} />
		</View>
	)

	return (
		<View style={styles.container}>
			{
				props.forecastData.length ?
					props.forecastData.map((day, index, arr) => {
						const last = (index === arr.length - 1) ? true : false
						//console.log(day)
						return listItem(day, index, last)
					})
					:
					emptyList.map((item, index, arr) => {
						const last = (index === arr.length - 1) ? true : false
						const emptyObj = { date: '2000-01-01', minTemp: '0', maxTemp: '0', stateIcon: 'http://' }
						return listItem(emptyObj, index, last)
					})
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		borderRadius: 10,
		backgroundColor: commonStyles.colors.backgroundColor2
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 5,
		borderColor: commonStyles.colors.ligtColor,
	},
	minMaxContainer: {
		flexDirection: 'row'
	},
	dateText: {
		fontSize: 18,
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.fontColor,
		margin: 5
	},
	tempValue: {
		fontSize: 18,
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.fontColor,
		margin: 5,
		marginHorizontal: 8
	},
	tempMinMax: {
		fontSize: 14,
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.fontColor
	},
	stateIcon: {
		width: 30,
		height: 30,
		marginRight: 5,
	}
})