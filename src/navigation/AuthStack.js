import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/login";
import SignupScreen from "../screens/Signup";
import Splash from '../screens/splash';


const Appstack = createStackNavigator();

const AuthStack = () => {

    return (
        <Appstack.Navigator
            headerMode='none'>
            <Appstack.Screen name='Splash' component={Splash} />
            <Appstack.Screen name='Login' component={LoginScreen} />
            <Appstack.Screen name='Signup' component={SignupScreen} />
          
        </Appstack.Navigator>
    );
}

export default AuthStack;