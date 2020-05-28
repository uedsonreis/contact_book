import React, { Component, ReactNode } from 'react'
import { Button, KeyboardAvoidingView, TextInput } from 'react-native'

import { Contact } from '../../domain/contact'

import styles from './styles'

type State = { contact: Contact }

export default class EditContactPage extends Component<any, State> {

    private add: Function

    constructor(props: any) {
        super(props)

        this.props.navigation.setOptions({ headerBackTitle: 'Back' })

        this.add = this.props.route.params.add

        let contact = this.props.route.params.contact
        if (!contact) {
            contact = { name: '', phone: '' }
            this.props.navigation.setOptions({ title: 'New Contact' })
        } else {
            this.props.navigation.setOptions({ title: 'Edit a Contact' })
        }

        this.state = { contact }
    }

    private getHandler = (key: string) => (value: any) => {
        this.setState((prevState: any) => ({ contact: { ...prevState.contact, [key]: value } }))
    }
    
    private handleContactPhone = (value: string) => {
        if (! (+value)) return
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
        if (this.add) this.add(contact)
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