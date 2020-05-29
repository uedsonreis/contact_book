import React, { Component, ReactNode } from "react"
import { View, Platform } from "react-native"

import { Contact } from "../../domain/contact"
import contactBook from '../../domain/contact.book'

import TopBarButton from "../../components/TopBarButton"
import ContactList from "../../components/ContactList"
import styles from './styles'

export default class HomePage extends Component<any, any> {

    state = { contacts: [] as Contact[] }

    componentDidMount() {
        this.updateContacts()

        this.props.navigation.setOptions({
            headerLeft: () => <TopBarButton name="exit" color='red' onPress={this.logoff} />
        })
        
        this.props.navigation.setOptions({
            headerRight: () => <TopBarButton name="add-circle" onPress={this.addNewContact} />
        })
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