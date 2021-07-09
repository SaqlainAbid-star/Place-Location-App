import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';


import { AuthContext } from '../navigation/AuthProvider';

function DrawerContent(props) {

    const { user, logout } = useContext(AuthContext);

    const paperTheme = useTheme();

    const [isDarkTheme, setisDarkTheme] = useState(false);
    const toggleTheme = () => {
        setisDarkTheme(!isDarkTheme);
    }

    const signOut = () => {
        alert("User sign out")
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            {/* <Avatar.Image
                                source={{uri:user.photoURL}}
                                size={50}
                            /> */}      
                            <View style={{ marginLeft: 5, flexDirection: 'row' }}>
                                <View style={{marginTop:10}}>
                                <Fontisto name="email" color="#333333" size={23} /> 
                                </View>
                                
                                <Title style={styles.title}>   {user.email}</Title>
                                {/* <Caption style={styles.caption}>{user.email}</Caption> */}
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Ionicons
                                    name="md-layers-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Categories"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5
                                    name="city"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Register A Place"
                            onPress={() => { props.navigation.navigate('User') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name="bank"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Banks"
                            onPress={() => { props.navigation.navigate('List') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5
                                    name="hospital-alt"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Hospitals"
                            onPress={() => { props.navigation.navigate('Hospital') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5
                                    name="hotel"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Restaurants"
                            onPress={() => { props.navigation.navigate('Restaurant') }}
                        />
                          <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name="youtube-play"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Cinemas"
                            onPress={() => { props.navigation.navigate('Cinema') }}
                        />
                          <DrawerItem
                            icon={({ color, size }) => (
                                <Entypo
                                    name="shop"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Stores"
                            onPress={() => { props.navigation.navigate('Store') }}
                        />

                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection} >
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => logout()}
                />
            </Drawer.Section>

        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default DrawerContent;
