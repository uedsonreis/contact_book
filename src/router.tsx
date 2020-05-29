import React, { ReactNode } from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import LoginPage from './pages/login'
import HomePage from './pages/home'
import MapPage from './pages/map'
import EditContactPage from './pages/edit'

function LoginStack() {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator headerMode="screen">
            <Stack.Screen name="login" component={LoginPage} options={{ title: 'Login' }} />
        </Stack.Navigator>
    )
}

function ListStack() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomePage} options={{ title: 'Contact Book' }} />
            <Stack.Screen name="edit" component={EditContactPage} />
        </Stack.Navigator>
    )
}

function MapStack() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="map" component={MapPage} options={{ title: 'Contacts on the Map' }} />
        </Stack.Navigator>
    )
}

function Main() {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator>
            <Tab.Screen name="Lista" component={ListStack} options={{
                tabBarIcon: (params: any) => {
                    const name: string = Platform.OS === 'ios' ? 'ios-list' : 'md-list'
                    return <Ionicons name={name} {...params} />
                }
            }} />
            <Tab.Screen name="Mapa" component={MapStack} options={{
                tabBarIcon: (params: any) => {
                    const name: string = Platform.OS === 'ios' ? 'ios-map' : 'md-map'
                    return <Ionicons name={name} {...params} />
                }
            }} />
        </Tab.Navigator>
    )
}

export default function Router() {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="login" component={LoginStack} />
                <Stack.Screen name="main" component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}