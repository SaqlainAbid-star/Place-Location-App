import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';

import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { ScrollView } from 'react-native-gesture-handler';

const RegisterScreen = ({ navigation, route }) => {

  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);

  const [Img, setImg] = useState(null);
  const [Name, setName] = useState(null);
  const [Address, setAddress] = useState(null);
  const [Country, setCountry] = useState(null);
  const [City, setCity] = useState(null);
  const [Category, setCategory] = useState(null);
  const [Latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);






  // console.log("AAA.....",route.params.region)

  // const getUser = async() => {
  //   const currentUser = await firestore()
  //   .collection('users')
  //   .doc(user.uid)
  //   .get()
  //   .then((documentSnapshot) => {
  //     if( documentSnapshot.exists ) {
  //       console.log('User Data', documentSnapshot.data());
  //       setUserData(documentSnapshot.data());
  //     }
  //   })
  // }

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();


    let place = {
      Img: imgUrl,
      Name,
      Address,
      Country,
      City,
      Category,
      Latitude,
      longitude
    }


    database().ref(`${Category}`).push(place).then(() => {
      Alert.alert(
        'The Place has been Added Successfully!',
      );
    })


    setName('')
    setAddress('')
    setCountry('')
    setCity('')
    setImg('')
    setCategory('')
    setLatitude('')
    setLongitude('')



    // if( imgUrl == null && userData.userImg ) {
    //   imgUrl = userData.userImg;
    // }

    // firestore()
    // .collection('users')
    // .doc(user.uid)
    // .update({
    //   fname: userData.fname,
    //   lname: userData.lname,
    //   about: userData.about,
    //   phone: userData.phone,
    //   country: userData.country,
    //   city: userData.city,
    //   userImg: imgUrl,
    // })
    // .then(() => {
    //   console.log('User Updated!');
    //   Alert.alert(
    //     'Profile Updated!',
    //     'Your profile has been updated successfully.'
    //   );
    // })
  }

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  useEffect(() => {
    // getUser();
    setLatitude(route.params.region.latitude)
    setLongitude(route.params.region.longitude)
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      bs.current.snapTo(1);
    });
  };

  // Inner of B.S
  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  // Header of B.S
  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <ScrollView style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, -5]}      // Positions of B.S [0,1]
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View              // To make Background Opac when B.S is Open
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 35,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="camera"
                  size={35}
                  color="#000"
                  style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}
                />
                <Text>Upload Photo</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
            {userData ? userData.fname : ''} {userData ? userData.lname : ''}
          </Text>
          {/* <Text>{user.uid}</Text> */}
        </View>

        <View style={styles.action}>
          <MaterialCommunityIcons name="home-city" color="#333333" size={20} />
          <TextInput
            placeholder="Name of Place"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={Name}
            onChangeText={(txt) => setName(txt)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="map-marker" color="#333333" size={20} />
          <TextInput
            placeholder="Address"
            placeholderTextColor="#666666"
            value={Address}
            onChangeText={(txt) => setAddress(txt)}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="globe" color="#333333" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={Country}
            onChangeText={(txt) => setCountry(txt)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.category}>
          <Picker selectedValue={City} onValueChange={(value) => setCity(value)}>
          <Picker.Item label="City:" value="City:" />
            <Picker.Item label="Fes" value="Fes" />
            <Picker.Item label="Marrakesh" value="Marrakesh" />
            <Picker.Item label="Tetouan" value="Tetouan" />
            <Picker.Item label="Agadir" value="Agadir" />
            <Picker.Item label="Meknes" value="Meknes" />
          </Picker>
        </View>
        <View style={styles.category}>
          <Picker selectedValue={Category} onValueChange={(value) => setCategory(value)}>
          <Picker.Item label="Category:" value="Category:" />
            <Picker.Item label="Restaurant" value="Restaurant" />
            <Picker.Item label="Hospital" value="Hospital" />
            <Picker.Item label="Cinema" value="Cinema" />
            <Picker.Item label="Bank" value="Bank" />
            <Picker.Item label="Store" value="Store" />
          </Picker>
        </View>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('User')}
          style={[styles.buttonContainer, { backgroundColor: '#2e64e5' }]}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="map-marker-alt" color='#fff' size={23} />
          </View>
          <View style={styles.btnTxtWrapper}>
            <Text style={[styles.buttonText, { color: '#fff' }]}>Location On Map</Text>
          </View>
        </TouchableOpacity> */}

        <FormButton buttonTitle="Update" onPress={handleUpdate} />
      </Animated.View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: '#000'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 100,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
  buttonContainer: {
    marginTop: 0,
    width: '60%',
    height: 50,
    padding: 10,
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
});