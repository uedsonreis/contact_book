import React, { Component, ReactNode } from 'react'
import { Content, List, ListItem, Text } from 'native-base'

import { Contact } from '../../domain/contact'
import ContactRow from '../ContactRow'

type Props = { contacts: Contact[], handleClick: Function }

class ContactList extends Component<Props, any> {

    private buildSections(contacts: Contact[]) {

        const contactsByLetter = contacts.reduce((obj: any, contact: Contact) => {
            const firstLetter = contact.name[0].toUpperCase()
            return {
                ...obj,
                [firstLetter]: [...(obj[firstLetter] || []), contact]
            }
        }, {})

        const sections: any[] = Object.keys(contactsByLetter).sort().map(letter => ({
            title: letter,
            data: contactsByLetter[letter]
        }))

        return sections.reduce((data, section) => [
            ...data, {text: section.title, header: true},
            ...section.data.map((contact: any) => ({ contact, header: false }))
        ], [])
    }

    render(): ReactNode {
        const { contacts, handleClick } = this.props

        const sections = this.buildSections(contacts)
        
        return (
            <Content>
                <List
                    leftOpenValue={75} rightOpenValue={-75}
                    dataArray={sections}
                    keyExtractor={data => data.header ? data.text : String(data.contact.id)}
                    renderRow={data => data.header
                        ? <ListItem itemDivider><Text>{data.text}</Text></ListItem>
                        : <ContactRow onClick={handleClick} contact={data.contact} />
                    }
                />
            </Content>
        )
    }
}

export default ContactList