import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import database from '@react-native-firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProgressiveImage from './ProgressiveImage';

const Card = ({ item, navigation,onDelete}) => {



  return (
    <View style={styles.students}>


      <ProgressiveImage
        defaultImageSource={require('../../assets/default-img.jpg')}
        source={{ uri: item.Img }}
        style={{ width: '100%', height: 250 }}
        resizeMode='cover'
      />

      <View style={styles.user}>


        <View style={styles.userinfo}>

          <View style={styles.nameWrapper}>
          <MaterialCommunityIcons name="home-city" color="#185ADB" size={23} />
            <Text style={styles.name}> Name: {item.Name}</Text>
          </View>

          <View style={styles.nameWrapper}>
          <FontAwesome5 name="city" color='#185ADB' size={23} />
            <Text style={styles.name}> City: {item.City}</Text>
          </View>

          <View style={styles.nameWrapper}>
            <FontAwesome name="globe" color='#185ADB' size={23} />
            <Text style={styles.name}> Country: {item.Country}</Text>
          </View>

          <View style={styles.nameWrapper}>
            <Ionicons name="md-layers-outline" color='#185ADB' size={23} />
            <Text style={styles.name}> Category: {item.Category}</Text>
          </View>

          <TouchableOpacity
          onPress={() => navigation.navigate('Location',{Latitude: item.Latitude,Longitude: item.Longitude,Address:item.Address})}
          style={[styles.buttonContainer, { backgroundColor: '#2e64e5' }]}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="map-marker-alt" color='#fff' size={23} />
          </View>
          <View style={styles.btnTxtWrapper}>
            <Text style={[styles.buttonText, { color: '#fff' }]}>Location</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDelete(item.id,item.Img)}
          style={[styles.buttonContainer, { backgroundColor: '#2e64e5' }]}>
          <View style={styles.iconWrapper}>
          <Ionicons color='#fff'  name="md-trash-bin" size={23} />
          </View>
          <View style={styles.btnTxtWrapper}>
            <Text style={[styles.buttonText, { color: '#fff' }]}>Delete</Text>
          </View>
        </TouchableOpacity>

        </View>
      </View>

    </View>
  )
}

export default Card;

const styles = StyleSheet.create({
  students: {
    flex: 1,
    padding: 10,
    width: '100%',
    height: '100%',
  },
  user: {
    backgroundColor: '#77ACF1',
    width: '100%',
    height: 250,
    padding: 10,
    justifyContent: "center",
    flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  },
  iconWrapper: {
    flex: 1,
  },
  userinfo: {
    flex: 3,
  },
  nameWrapper:{
    flexDirection: 'row',
    marginTop: 5,
  },
  name: {
    fontSize: 18,
    color: '#000',
 
  },
  address: {
    marginTop: 2,
    backgroundColor: '#fff',
    width: '100%',
    height: 200,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  addressText: {
    marginLeft: 5,
    fontSize: 18,
    color: '#393e46',
  },
  qual: {
    flex: 5,
  },
  bin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageWrapper: {
    marginTop: 2,
    backgroundColor: '#fff',
    width: '100%',
    height: 300,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    marginTop: 10,
    width: '40%',
    height: 40,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 10,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
})