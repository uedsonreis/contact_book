import React, { Component, ReactNode } from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { Button, Content, Form, Input, Item, Text, Label } from 'native-base'
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
    
    private logon = (): void => {
        const { username, password } = this.state
        this.props.login(username, password)
    }

    public render(): ReactNode {
        const { username, password } = this.state

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Content>
                    <Text style={styles.text}>{this.props.error}</Text>
                    <Form>
                        <Item>
                            <Label>Username</Label>
                            <Input
                                placeholder="winston" autoCapitalize="none"
                                value={username} onChangeText={this.getHandler('username')}
                            />
                        </Item>
                        <Item last>
                            <Label>Password</Label>
                            <Input
                                placeholder="password" autoCapitalize="none" secureTextEntry
                                value={password} onChangeText={this.getHandler('password')}
                            />
                        </Item>
                        <Button style={styles.button} disabled={!this.validateForm()} onPress={this.logon} block>
                            <Text>Enter</Text>
                        </Button>
                    </Form>
                </Content>
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