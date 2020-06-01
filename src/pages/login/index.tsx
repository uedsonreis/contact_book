import React, { Component, ReactNode } from 'react'
import { Button, KeyboardAvoidingView, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'

import { actionFactory } from '../../redux/actions'

import styles from './styles'

type Props = { navigation: any, token: string, error: string, login: Function }

class LoginPage extends Component<Props, any> {

    componentDidUpdate(): void {
        if (this.props.token) this.props.navigation.replace('main')
    }

    state = { username: 'uedson@reis.com', password: '123' }

    private getHandler = (key: string) => (value: any) => {
        this.setState({ [key]: value })
    }

    private validateForm(): boolean {
        if (!this.state.username) return false
        if (!this.state.password) return false
        return true
    }
    
    private logon(username: string, password: string): void {
        this.props.login(username, password)
    }

    public render(): ReactNode {
        const { username, password } = this.state

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.text}>{this.props.error}</Text>
                <TextInput
                    style={styles.input} placeholder="Username" autoCapitalize="none"
                    value={username} onChangeText={this.getHandler('username')}
                />
                <TextInput
                    style={styles.input} placeholder="Password" autoCapitalize="none" secureTextEntry
                    value={password} onChangeText={this.getHandler('password')}
                />
                <Button
                    title="Enter" disabled={!this.validateForm()}
                    onPress={() => this.logon(username, password)}
                />
            </KeyboardAvoidingView>
        )
    }

}

function mapStateToProps(state: any) {
    return {
        error: state.user.error,
        token: state.user.token
    }
}

const mapActions = {
    login: actionFactory.createLogin
}

export default connect(mapStateToProps, mapActions)(LoginPage)