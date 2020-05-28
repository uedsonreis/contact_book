import React, { Component, ReactNode } from "react"
import { Button, Text, View } from "react-native"

import { Contact } from "../../domain/contact"
import contactBook from '../../domain/contact.book'

import ContactList from "../../components/ContactList"
import styles from './styles'

export default class HomePage extends Component<any, any> {

    constructor(props: any) {
        super(props)

        this.props.navigation.setOptions({ headerLeft: () => <Button title="exit" color="red" onPress={this.logoff} /> })
        this.props.navigation.setOptions({ headerRight: () => <Button title="add" onPress={this.addNewContact} /> })

        this.state = { contacts: [] }
    }

    componentDidMount() {
        this.updateContacts()
    }

    private async updateContacts(): Promise<void> {
        const contacts = await contactBook.getContacts()
        this.setState({ contacts })
    }

    private logoff = () => {
        this.props.navigation.replace('login')
    }

    private addNewContact = () => {
        this.props.navigation
        this.props.navigation.push('edit', {
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