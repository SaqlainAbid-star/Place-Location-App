import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from "../navigation/AppStack";
import DrawerContent from "./DrawerContent";



const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    return (      
            <Drawer.Navigator
             initialRouteName="Home" 
             drawerContent={props=><DrawerContent {...props} />}
             >
                <Drawer.Screen name="HomeScreen" component={AppStack} />
                
            </Drawer.Navigator>
    );
}

export default DrawerNavigation;