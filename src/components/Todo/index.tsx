import React, { Component, ReactNode } from 'react'
import { Button, Text, View } from 'react-native'

export default class Todo extends Component<any, any> {

    render(): ReactNode {
        const { task, onDelete } = this.props
        return (
            <View>
                <Button onPress={() => onDelete()} title="delete" />
                <Text>{task.text}</Text>
            </View>
        )
    }

}