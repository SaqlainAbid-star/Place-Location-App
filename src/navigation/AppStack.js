import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import RegisterScreen from '../screens/register' 
import LoginScreen from '../screens/login' 
import SignupScreen from '../screens/Signup' 
import HomeScreen from '../screens/Home';
import UserScreen from '../screens/user';
import ListScreen from '../screens/list';
import LocationScreen from '../screens/location';
import StoreScreen from '../screens/Store';
import CinemaScreen from '../screens/Cinemas';
import RestaurantScreen from '../screens/Restaurants';
import HospitalScreen from '../screens/Hospitals';




const Stack = createStackNavigator();

const AppStack = ({ navigation }) => {
  return (  
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#77ACF1',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
       <Stack.Screen name='Home' component={HomeScreen}
        options={{
          title: 'Categories',
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#77ACF1" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
        }}
      />
      <Stack.Screen name='Register' component={RegisterScreen}
        options={{
          title: 'Register Your Place',
        }}
      />
         <Stack.Screen name='User' component={UserScreen}
        options={{
          title: 'Add Location',
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#77ACF1" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
        }}
      />
         <Stack.Screen name="List" component={ListScreen} options={{ header: () => null }} />
         <Stack.Screen name="Cinema" component={CinemaScreen} options={{ header: () => null }} />
         <Stack.Screen name="Hospital" component={HospitalScreen} options={{ header: () => null }} />
         <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ header: () => null }} />
         <Stack.Screen name="Store" component={StoreScreen} options={{ header: () => null }} />
         <Stack.Screen name='Location' component={LocationScreen}
                options={{
                  title: 'Place Location',
                }}
                />
    </Stack.Navigator>
  );
}

export default AppStack;