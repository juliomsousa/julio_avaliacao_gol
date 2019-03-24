import React from 'react'
import { ActivityIndicator, BackHandler, Modal, StyleSheet, Text, View } from 'react-native'

import commonStyles from '../commonStyles'

export default props => (

	<Modal onRequestClose={() => BackHandler.exitApp()} visible={props.isVisible} animationType='fade' transparent={true} >
		<View style={[
			styles.frame,
			{
				backgroundColor: props.backgroundFrameColor ? props.backgroundFrameColor : 'rgba(0, 0, 0, 0.6)'
			}
		]}
		>

			<View style={[styles.container, { backgroundColor: props.backgroundColor }]}>

				<View>

					<View style={styles.status} >
						<ActivityIndicator size='large' color={props.loadColor} />
					</View>

					<Text style={[styles.message, { color: props.textColor }]}>{props.feedbackText}</Text>

				</View>

			</View>
		</View>
	</Modal>
)

const styles = StyleSheet.create({
	frame: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container: {
		padding: 15,
		borderRadius: 10,
		width: 180,
		height: 180,
		backgroundColor: '#FFF',
		alignItems: 'center',
		justifyContent: 'center'
	},
	message: {
		fontSize: 20,
		fontFamily: commonStyles.fontFamily,
		marginTop: 20
	}
})