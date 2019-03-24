import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import commonStyles from '../commonStyles'

export default props => (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row' }} >
            <Text style={[styles.label, { fontWeight: !props.switchValue ? 'bold' : 'normal' }]} >{props.labelLeft}</Text>
            <Text style={styles.label}> | </Text>
            <Text style={[styles.label, { fontWeight: props.switchValue ? 'bold' : 'normal' }]} >{props.labelRight}</Text>
        </View>
        <Switch
            onValueChange={props.toggleSwitch}
            value={props.switchValue}
            trackColor={{
                false: 'gray',
                true: 'gray',
            }}
            thumbColor='white'
        />
    </View >
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: commonStyles.colors.backgroundColor2
    },
    label: {
        fontSize: 16,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.fontColor
    }
})