import React, { Component, ReactNode } from "react"
import { View } from "react-native"

import { Contact } from "../../domain/contact"
import contactBook from '../../domain/contact.book'

import Map from '../../components/Map'
import TopBarButton from "../../components/TopBarButton"
import styles from './styles'

export default class MapPage extends Component<any, any> {

    state = { contacts: [] as Contact[] }

    componentDidMount() {
        this.updateContacts()
        
        this.props.navigation.setOptions({
            headerLeft: () => <TopBarButton name="exit" color='red' onPress={this.logoff} />
        })
    }

    private async updateContacts(): Promise<void> {
        const contacts = await contactBook.getContacts()
        this.setState({ contacts })
    }

    private logoff = () => {
        this.props.navigation.replace('login')
    }

    public render(): ReactNode {
        const { contacts } = this.state

        if (contacts.length < 1) return (<View />)

        return (
            <View style={styles.container}>
                <Map contacts={contacts} style={styles.mapStyle} />
            </View>
        )
    }

}