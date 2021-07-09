
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Dimensions } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';


const LocationScreen = ({ route , navigation}) => {


    const [Longitude, setLongitude] = useState(0);
    const [Latitude, setLatitude] = useState(0);
    const [Error, setError] = useState(null);

    useEffect(() => {
        setLatitude(Number(route.params.Latitude))
        setLongitude(Number(route.params.Longitude))
        console.log(navigation)
    }, []);

    return (

            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: Latitude,
                            longitude: Longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: Latitude,
                                longitude: Longitude,
                            }}

                            icon={<FontAwesome5 name="map-marker-alt" color='#fff' size={23} />}
                            title="Karachi"
                            description="City of lights"
                        />
                    </MapView>

                </View>
                <View style={styles.deatilSection}>
               <Text style={{ fontSize: 14,fontWeight: 'bold' , color: "#999" }}>Address: </Text>
            <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
            {route.params.Address}</Text>
               
           
                {/* <View style={styles.btnContainer}>
                    <Button
                        title="Go Back"
                        // onPress={navigation.navigate('Card')}
                    >
                    </Button>
                </View> */}
            </View>
            </View>

    );

};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width
      },
      map: {
        flex: 1,
        marginTop:0
      },
    deatilSection: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        display: "flex",
        justifyContent: "flex-start"
    },
    btnContainer: {
        width: Dimensions.get("window").width - 20,
        position: "absolute",
        bottom: 100,
        left: 10
    }
});

export default LocationScreen;
