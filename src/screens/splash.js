import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, ImageBackground, StyleSheet } from 'react-native';

import { useTheme } from "@react-navigation/native";

var bg = require('../../assets/download.png');
var logo = require('../../assets/logo.png')

function Splash({navigation}) {

    const { colors } = useTheme()

    setTimeout(()=>{
        navigation.navigate('Login')
    },5000)

    return (
        <ImageBackground
            source={bg}
            style={styles.bg}
        >

            <View style={styles.textWrapper}>
                <Text style={styles.text}>Sierraway</Text>
            </View>

            <View style={styles.logo}>
                <Image style={styles.img} source={logo}></Image>
            </View>




        </ImageBackground>
    );
}

export default Splash;

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
    },
    logo: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 200,
        height: 200,
    },
    text: {
        color: '#2e64e5',
        fontSize: 40,
        fontWeight:'bold',
        borderBottomWidth:3,
        borderColor: '#2e64e5',
    },
    textWrapper: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
     
    }
});
