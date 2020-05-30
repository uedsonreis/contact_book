import React, { Component, ReactNode } from "react"
import { View } from "react-native"
import { connect } from 'react-redux'

import Map from '../../components/Map'
import TopBarButton from "../../components/TopBarButton"
import styles from './styles'
import { Contact } from "../../domain/contact"

class MapPage extends Component<any, any> {

    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: () => <TopBarButton name="exit" color='red' onPress={this.logoff} />
        })
    }

    private logoff = () => {
        this.props.navigation.replace('login')
    }

    public render(): ReactNode {
        const { contacts } = this.props

        if (contacts.length < 1) return (<View />)

        const markers = contacts.map((contact: Contact) => ({
            key: contact.id,
            title: contact.name,
            description: contact.phone,
            coordinate: contact.address
        }))

        return (
            <View style={styles.container}>
                <Map markers={markers} style={styles.mapStyle} />
            </View>
        )
    }

}

function mapStateToProps(state: any) {
    return { contacts: state.contacts }
}

export default connect(mapStateToProps)(MapPage)