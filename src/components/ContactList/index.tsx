import React, { Component, ReactNode } from 'react'
import { SectionList, Text } from 'react-native'
import { Contact } from '../../domain/contact'
import ContactRow from '../ContactRow'

type Props = { contacts: Contact[], handleClick: Function }

export default class ContactList extends Component<Props, any> {

    private buildSections(contacts: Contact[]): any[] {

        const contactsByLetter = contacts.reduce((obj: any, contact: Contact) => {
            const firstLetter = contact.name[0].toUpperCase()
            return {
                ...obj,
                [firstLetter]: [...(obj[firstLetter] || []), contact]
            }
        }, {})

        return Object.keys(contactsByLetter).sort().map(letter => ({
            title: letter,
            data: contactsByLetter[letter]
        }))
    }

    render(): ReactNode {
        const { contacts, handleClick } = this.props

        return (
            <SectionList
                sections={this.buildSections(contacts)}
                renderSectionHeader={(info: any) => <Text>{info.section.title}</Text>}
                renderItem={(obj: any) => <ContactRow onClick={handleClick} contact={obj.item} />}
            />
        )
    }

}