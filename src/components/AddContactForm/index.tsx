import React, { Component, ReactNode } from 'react'
import { Button, TextInput, View } from 'react-native'
import { Contact } from '../../domain/contact'

import styles from './styles'

type Props = { add: Function }
type State = { contact: Contact }

export default class AddContactForm extends Component<Props, State> {

    state = {
        contact: { name: '', phone: '' }
    }

    handleContactName = (value: string) => {
        this.setState((prevState: any) => ({ contact: { ...prevState.contact, name: value } }))
    }
    
    handleContactPhone = (value: string) => {
        this.setState((prevState: any) => ({ contact: { ...prevState.contact, phone: value } }))
    }

    render(): ReactNode {
        const { add: addContact } = this.props
        const { contact } = this.state

        return (
            <View>
                <TextInput
                    style={styles.input} value={contact.name} onChangeText={this.handleContactName}
                />
                <TextInput
                    style={styles.input} keyboardType="numeric"
                    value={contact.phone} onChangeText={this.handleContactPhone}
                />
                <Button title="Add Contact" onPress={() => addContact(contact)} />
            </View>
        )
    }

}