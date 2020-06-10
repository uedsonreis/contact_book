import React, { Component, ReactNode } from "react"
import { ListItem, Text, Button, Body, Right } from "native-base"
import { connect } from 'react-redux'

import { actionFactory } from '../../redux/actions'
import IconButton from "../IconButton"

class ContactRow extends Component<any, any> {

    shouldComponentUpdate(nextProps: any): boolean {
        if (this.props.contact.name !== nextProps.contact.name) return true
        if (this.props.contact.phone !== nextProps.contact.phone) return true
        return false
    }

    render(): ReactNode {
        const { contact, onClick, removeContact } = this.props

        return (
            <ListItem onPress={() => onClick(contact)}>
                <Body>
                    <Text>{contact.name}: {contact.phone}</Text>
                </Body>
                <Right>
                    <Button onPress={() => removeContact(contact)} transparent>
                        <IconButton name="trash" color="red" />
                    </Button>
                </Right>
            </ListItem>
        )
    }
}

const mapActions = {
    removeContact: actionFactory.createRemoveContact
}

export default connect(null, mapActions)(ContactRow)