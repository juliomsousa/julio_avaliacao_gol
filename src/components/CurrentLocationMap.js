import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

export default class CurrentLocationMap extends Component {

	state = {
		region: {
			latitude: -23.5489,
			longitude: -46.6388,
			latitudeDelta: 0.002,
			longitudeDelta: 0.007
		}
	}

	render() {
		const { region } = this.state
		return (
			<View style={[styles.container, { ...this.props.style }]}>
				<MapView
					style={{ height: '100%', width: '100%', opacity: this.props.mapOpacity, }}

					ref={map => { this.map = map }}
					region={{ ...region, ...this.props.coordinates }}

					showsUserLocation
					followsUserLocation
					loadingEnabled

					showsMyLocationButton={false}
					showsPointsOfInterest={false}
					showsBuildings={false}
					showsIndoors={false}
					showsCompass={false}
					scrollEnabled={false}
					pitchEnabled={false}
					toolbarEnabled={false}
					rotateEnabled={false}
					zoomEnabled={false}
					liteMode={true}
				/>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: 200,
		borderRadius: 10,
		overflow: 'hidden',
		borderWidth: 1,
	}
})