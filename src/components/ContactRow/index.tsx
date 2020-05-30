import React, { Component } from "react"
import { Button, Text, TouchableOpacity } from "react-native"
import { connect } from 'react-redux'

import { actionFactory } from '../../redux/actions'

import styles from './styles'

class ContactRow extends Component<any, any> {

    render() {
        const { contact, onClick } = this.props

        return (
            <TouchableOpacity style={styles.row} onPress={() => onClick(contact)}>
                <Text>{contact.name}</Text>
                <Text>{contact.phone}</Text>
                <Button title="Delete" color="red" onPress={() => this.props.removeContact(contact)} />
            </TouchableOpacity>
        )
    }

}

const mapActions = {
    removeContact: actionFactory.createRemoveContact
}

export default connect(null, mapActions)(ContactRow)