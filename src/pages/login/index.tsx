import React, { Component, ReactNode } from 'react'
import { Button, KeyboardAvoidingView, TextInput } from 'react-native'

import authService from '../../api/auth.service'
import styles from './styles'

export default class LoginPage extends Component<any, any> {

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
        authService.authenticate(username, password).then(isLogged => {
            if (isLogged) this.props.navigation.replace('home')
            else alert('Username or password is invalid!')
        })
    }

    public render(): ReactNode {
        const { username, password } = this.state

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
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