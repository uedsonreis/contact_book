import React, { Component, ReactNode } from "react"
import { View, Platform } from "react-native"
import { connect } from 'react-redux'

import { Contact } from "../../domain/contact"

import TopBarButton from "../../components/TopBarButton"
import ContactList from "../../components/ContactList"
import styles from './styles'

class HomePage extends Component<any, any> {

    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: () => <TopBarButton name="exit" color='red' onPress={this.logoff} />
        })
        
        this.props.navigation.setOptions({
            headerRight: () => <TopBarButton name="add-circle" onPress={this.addNewContact} />
        })
    }

    private logoff = () => {
        this.props.navigation.replace('login')
    }

    private addNewContact = () => {
        this.props.navigation.push('edit')
    }

    private editContact = (contact: Contact) => {
        this.props.navigation.navigate('edit', { contact })
    }

    public render(): ReactNode {
        const { contacts } = this.props

        return (
            <View style={styles.container}>
                <ContactList contacts={contacts} handleClick={this.editContact} />
            </View>
        )
    }

}

function mapStateToProps(state: any) {
    return { contacts: state.contacts }
}

export default connect(mapStateToProps)(HomePage)