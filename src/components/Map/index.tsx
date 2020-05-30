import React, { Component, ReactNode } from "react"
import MapView, { Marker } from "react-native-maps"
import * as Location from 'expo-location'
import { Contact } from "../../domain/contact"

export default class Map extends Component<any, any> {

    state = {
        location: {
            coords: {
                latitude: 37.78825,
                longitude: -122.4324
            }
        } as Location.LocationData
    }

    componentDidMount(): void {
        Location.requestPermissionsAsync().then(({ status }) => {
            if (status !== 'granted') {
                alert('Permission to access location was denied');
            }
            Location.getCurrentPositionAsync({}).then(location => {
                this.setState({ location })
            });
        })
    }

    render(): ReactNode {
        const { markers, style } = this.props
        const { location } = this.state

        return (
            <MapView
                style={style}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 70, longitudeDelta: 70,
                }}
            >
                {markers.map((marker: any) => (
                    <Marker {...marker} />
                ))}
            </MapView>
        )
    }

}