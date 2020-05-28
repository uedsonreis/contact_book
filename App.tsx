import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginPage from './src/pages/login'
import HomePage from './src/pages/home'
import EditContactPage from './src/pages/edit'

export default function App() {

    const Stack = createStackNavigator()
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={LoginPage} options={{ title: 'Login' }} />
                <Stack.Screen name="home" component={HomePage} options={{ title: 'Contact Book' }} />
                <Stack.Screen name="edit" component={EditContactPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}