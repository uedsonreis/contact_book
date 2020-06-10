import React, { Component, ReactNode } from "react"
import { View } from "react-native"
import { connect } from 'react-redux'
import { Container, Title } from 'native-base'
import api from '../../api/randomuser.me'
import { actionFactory } from '../../redux/actions'
import { Contact } from "../../domain/contact"

import TopBarButton from "../../components/TopBarButton"
import ContactList from "../../components/ContactList"
import styles from './styles'

type Props = {
    navigation: any,
    contacts: Contact[], token: string,
    setContacts: Function, logout: Function
}

class HomePage extends Component<Props, any> {

    constructor(props: Props) {
        super(props)

        if (!props.contacts || props.contacts.length < 1) {
            api.getContacts().then(contacts => {
                this.props.setContacts(contacts.map((c, i) => ({ ...c, id: i })))
            })
        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: () => <TopBarButton name="exit" color='red' onPress={() => this.props.logout()} />,
            headerRight: () => <TopBarButton name="add-circle" onPress={this.addNewContact} />
        })
    }

    componentDidUpdate(): void {
        if (!this.props.token) this.props.navigation.replace('login')
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
            <Container>
                <ContactList contacts={contacts} handleClick={this.editContact} />
            </Container>
        )
    }

}

function mapStateToProps(state: any) {
    return {
        token: state.user.token,
        contacts: state.contacts
    }
}

const mapActions = {
    logout: actionFactory.createLogout,
    setContacts: actionFactory.createSetContacts
}

export default connect(mapStateToProps, mapActions)(HomePage)