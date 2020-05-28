import React, { Component } from "react"
import { Button, Text, TouchableOpacity } from "react-native"

import styles from './styles'

export default class ContactRow extends Component<any, any> {

    render() {
        const { contact, onClick } = this.props

        return (
            <TouchableOpacity style={styles.row} onPress={() => onClick(contact)}>
                <Text>{contact.name}</Text>
                <Text>{contact.phone}</Text>
            </TouchableOpacity>
        )
    }

}