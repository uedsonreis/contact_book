import React, { ReactNode, Component } from "react"
import { Platform } from "react-native"
import { Ionicons } from '@expo/vector-icons'

export default class TopBarButton extends Component<any, any> {

    render(): ReactNode {
        const { name } = this.props

        const iconName = Platform.OS === 'ios' ? 'ios-'+name : 'md-'+name

        return (
            <Ionicons
                style={{ paddingLeft: 8, paddingRight: 8 }}
                size={26} {...this.props} name={iconName}
            />
        )
    }

}