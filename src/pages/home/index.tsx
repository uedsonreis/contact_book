import React, { Component, ReactNode } from "react"
import { Button, FlatList, ScrollView, View } from "react-native"

import Row from "../../components/Row"

import contactBook from '../../domain/contact.book'
import styles from './styles'

export default class HomePage extends Component<any, any> {

    state = {
        showContacts: false,
        contacts: contactBook.getContacts()
    }

    toggleContacts = () => {
        this.setState((prevState: any) => ({ showContacts: !prevState.showContacts }))
    }

    render(): ReactNode {
        const { showContacts, contacts } = this.state

        return (
            <View style={styles.container}>
                <Button title="Toggle Contacts" onPress={this.toggleContacts} />
                {showContacts && (
                    <FlatList
                        data={contacts}
                        keyExtractor={item => item.key+""}
                        renderItem={(obj: any) => <Row contact={obj.item} />}
                    />
                )}
            </View>
        )
    }

}