import React, { Component } from "react"
import { Text, View } from "react-native"

import styles from './styles'

export default class Row extends Component<any, any> {

    render() {
        const { contact } = this.props

        return (
            <View style={styles.row}>
                <Text>{contact.name}</Text>
                <Text>{contact.phone}</Text>
            </View>
        )
    }

}