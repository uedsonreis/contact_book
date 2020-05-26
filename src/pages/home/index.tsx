import React, { Component, ReactNode } from "react"
import { Button, View } from "react-native"

import contactBook from '../../domain/contact.book'
import styles from './styles'
import { Contact } from "../../domain/contact"
import ContactList from "../../components/ContactList"
import AddContactForm from "../../components/AddContactForm"

export default class HomePage extends Component<any, any> {

    state = {
        showAddForm: false,
        contacts: contactBook.getContacts()
    }

    toggleAddForm = () => {
        this.setState((prevState: any) => ({ showAddForm: !prevState.showAddForm }))
    }

    addContact = (contact: Contact) => {
        console.log('C: ', contact)
        alert(JSON.stringify(contact))
    }

    render(): ReactNode {
        const { showAddForm, contacts } = this.state

        return (
            <View style={styles.container}>
                <Button title="Toggle Add Contact" onPress={this.toggleAddForm} />

                { showAddForm ?
                    <AddContactForm add={this.addContact} />
                    :
                    <ContactList contacts={contacts} />
                }
            </View>
        )
    }

}