import React, { Component, ReactNode } from "react"
import { Button, Text, View } from "react-native"

import { Contact } from "../../domain/contact"
import contactBook from '../../domain/contact.book'

import ContactList from "../../components/ContactList"
import styles from './styles'

export default class HomePage extends Component<any, any> {

    constructor(props: any) {
        super(props)

        this.props.navigation.setOptions({ headerRight: () => <Button title="add" onPress={this.addNewContact} /> })

        this.state = {
            contacts: contactBook.getContacts()
        }
    }

    private addNewContact = () => {
        this.props.navigation
        this.props.navigation.navigate('edit', {
            add: (contact: Contact) => {
                contactBook.add(contact)
                this.setState({ contacts: contactBook.getContacts() })
            }
        })
    }

    private editContact = (contact: Contact) => {
        this.props.navigation.navigate('edit', { contact })
    }

    public render(): ReactNode {
        const { contacts } = this.state

        return (
            <View style={styles.container}>
                <ContactList contacts={contacts} handleClick={this.editContact} />
            </View>
        )
    }

}