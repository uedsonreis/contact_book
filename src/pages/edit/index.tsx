import React, { Component, ReactNode } from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { Button, Content, Text, Form, Input, Item, Label } from 'native-base'
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
    
    private save = (): void => {
        const { contact } = this.state

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
                <Content>
                    <Form>
                        <Item>
                            <Label>Name</Label>
                            <Input
                                placeholder="Winston Churchill" value={contact.name} onChangeText={this.getHandler('name')}
                            />
                        </Item>
                        <Item last>
                            <Label>Phone</Label>
                            <Input
                                keyboardType="numeric" placeholder="11999888777" value={contact.phone} onChangeText={this.handleContactPhone}
                            />
                        </Item>
                        <Button style={styles.button} disabled={!this.validateForm()} onPress={this.save} block>
                            <Text>Save</Text>
                        </Button>
                    </Form>
                </Content>
            </KeyboardAvoidingView>
        )
    }

}

const mapActions = {
    addContact: actionFactory.createAddContact,
    updateContact: actionFactory.createUpdateContact
}

export default connect(null, mapActions)(EditContactPage)