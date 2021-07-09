import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity,Image } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';


const HomeScreen = ({ navigation }) => {

  const { user, logout } = useContext(AuthContext);


  return (
    <View style={styles.container}>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('User')} >
        <Image
            source={require('../../assets/icons/reg.png')}
            style={styles.logo}
          />
          <Text style={styles.btnText}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Restaurant')} >
        <Image
            source={require('../../assets/icons/res.png')}
            style={styles.logo}
          />
          <Text style={styles.btnText}>RESTAURANTS</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Store')} >
        <Image
            source={require('../../assets/icons/sho.png')}
            style={styles.logo}
          />
          <Text style={styles.btnText}>STORE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('List')}>
        <Image
            source={require('../../assets/icons/ban.png')}
            style={styles.logo}
          />
          <Text style={styles.btnText}>BANKS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Hospital')}>
          <Image
            source={require('../../assets/icons/hos.png')}
            style={styles.logo}
          />
          <Text style={styles.btnText}>HOSPITAL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Cinema')}>
        <Image
            source={require('../../assets/icons/cin.png')}
            style={styles.logo}
          />
          <Text style={styles.btnText}>CINEMA</Text>
        </TouchableOpacity>
      </View>



    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  buttons: {
    flexDirection: 'row',
    padding: 0,
  },
  btn: {
    flex: 1,
    margin: 5,
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: "center",
    borderColor: '#77ACF1',
    borderWidth: 2,
    borderRadius: 5,


  },
  btnText: {
    marginTop: 7,
    color: '#77ACF1',
    fontSize: 16,
    fontWeight: 'bold'
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
},

});