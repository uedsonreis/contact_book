import React, { Component, ReactNode } from 'react'
import { Button, KeyboardAvoidingView, TextInput } from 'react-native'
import { connect } from 'react-redux'

import { actionFactory } from '../../redux/actions'
import { Contact } from '../../domain/contact'

import styles from './styles'

type State = { contact: Contact }

class EditContactPage extends Component<any, State> {

    constructor(props: any) {
        super(props)

        this.props.navigation.setOptions({ headerBackTitle: 'Back' })

        let contact = { id: undefined, name: '', phone: '' }

        if (this.props.route.params) {
            contact = this.props.route.params.contact
            this.props.navigation.setOptions({ title: 'Edit a Contact' })
        } else {
            this.props.navigation.setOptions({ title: 'New Contact' })
        }

        this.state = { contact }
    }

    private getHandler = (key: string) => (value: any) => {
        this.setState((prevState: any) => ({ contact: { ...prevState.contact, [key]: value } }))
    }
    
    private handleContactPhone = (value: string) => {
        if (value.length > 11) return
        this.setState((prevState: any) => ({ contact: { ...prevState.contact, phone: value } }))
    }
    
    private validateForm(): boolean {
        const { contact } = this.state
        
        if (!contact) return false
        if (!contact.name || contact.name.length < 3) return false
        if (!contact.phone || contact.phone.length !== 11) return false
        
        const names = contact.name.split(' ')
        if (names.length < 2) return false
        if (names[1].length < 3) return false
        
        return true
    }
    
    private save(contact: Contact): void {
        if (contact.id) {
            this.props.updateContact(contact)
        } else {
            this.props.addContact(contact)
        }
        this.props.navigation.goBack()
    }

    public render(): ReactNode {
        const { contact } = this.state

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                    style={styles.input} placeholder="Full Name"
                    value={contact.name} onChangeText={this.getHandler('name')}
                />
                <TextInput
                    style={styles.input} keyboardType="numeric" placeholder="Phone"
                    value={contact.phone} onChangeText={this.handleContactPhone}
                />
                <Button title="Save" onPress={() => this.save(contact)} disabled={!this.validateForm()} />
            </KeyboardAvoidingView>
        )
    }

}

const mapActions = {
    addContact: actionFactory.createAddContact,
    updateContact: actionFactory.createUpdateContact
}

export default connect(null, mapActions)(EditContactPage)