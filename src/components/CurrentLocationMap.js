import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default class CurrentLocationMap extends Component {

	state = {
		region: {
			latitude: -23.5489,
			longitude: -46.6388,
			latitudeDelta: 0.002,
			longitudeDelta: 0.007
		}
	}

	componentDidMount() {
		// navigator.geolocation.getCurrentPosition(
		// 	(position) => {
		// 		console.log(position)
		// 		console.log('coordinates: ', this.props.coordinates)
		// 		this.setState({
		// 			// latitude: position.coords.latitude,
		// 			// longitude: position.coords.longitude,
		// 			region: { ...this.state.region }
		// 		})
		// 	},
		// 	(error) => {
		// 		console.log(error)
		// 		this.setState({ error: error.message })
		// 	},
		// 	{
		// 		enableHighAccuracy: false,
		// 		timeout: 10000,
		// 		maximumAge: 5000
		// 	},
		// )
		// this.setState({
		// 	// latitude: position.coords.latitude,
		// 	// longitude: position.coords.longitude,
		// 	region: { ...this.state.region, ...this.props.coordinates }
		// })
	}

	// setCamera = () => {
	// 	console.log(this.state.region)
	// 	this.map.setCamera(
	// 		{
	// 			center: {
	// 				//...this.state.region,
	// 				latitude: -23.4183611,
	// 				longitude: -46.7502773,
	// 			},
	// 			pitch: 10,
	// 			heading: 10,
	// 			// Only on iOS MapKit, in meters. The property is ignored by Google Maps.
	// 			altitude: 10,
	// 			// Only when using Google Maps.
	// 			zoom: 10,
	// 		}
	// 	)
	// }

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
				// onRegionChangeComplete={r => console.log(r)}
				//onUserLocationChange={r => this.setState({ userCurrentLocation: { ...r.nativeEvent.coordinate } })}
				>
					{/* <Marker coordinate={{ latitude: this.state.userCurrentLocation.latitude, longitude: this.state.userCurrentLocation.longitude }} /> */}
				</MapView>

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