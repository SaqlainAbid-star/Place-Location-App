import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList,Alert, TextInput } from 'react-native';
import { Container, Text, Header, Content, Form, Item, Input, Label, Picker, Button, List } from 'native-base';
import { windowHeight, windowWidth } from './utils/Dimensions';
import database from '@react-native-firebase/database';
import Card from './../components/PostCard'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import storage from '@react-native-firebase/storage';


const ListScreen = ({navigation}) => {

    const [banks, setbanks] = useState(null);
    const [filterBanks, setfilterBanks] = useState(null);
    const [City, setCity] = useState(null);
    const[deleted, setDeleted] = useState(false);

   
    const get_Banks = () => {

        const list = [];

        database().ref('/Bank').on('child_added', (data) => {
            const ref = data.val();
            list.push({
                id: data.key,
                Img: ref.Img,
                Name: ref.Name,
                Address: ref.Address,
                Country: ref.Country,
                City: ref.City,
                Category: ref.Category,
                Latitude: ref.Latitude,
                Longitude: ref.longitude
            })

            setbanks(list)
            setfilterBanks(list)

        })

    }

    useEffect(() => {
        get_Banks();
    }, []);

    useEffect(() => {
        get_Banks();
        setDeleted(false);
      }, [deleted]);


    const handleDelete = (id,Img) => {

        Alert.alert(
          'Delete post',
          'Are you sure?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed!'),
              style: 'cancel'
            },
            {
              text: 'Confirm',
              onPress: () => deletePost(id,Img),
            },
          ],
          { cancelable: false }
        );
      }

      const deletePost = (postId,postImg) => {
    
              const storageRef = storage().refFromURL(postImg);
              const imageRef = storage().ref(storageRef.fullPath);
    
              imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirebaseData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              })
     
      }
    
      const deleteFirebaseData = (id) => {
        let userRef = database().ref('Bank/' + id);
        userRef.remove()
        .then(() => {
            Alert.alert(
              'Post deleted!',
              'Your post has been deleted successfully!',
            );
            setDeleted(true);
          })
          .catch(e => console.log('Error deleting posst.', e))
      }
    




    const searchGroup = (value) =>{
        if(value!==''){
            setfilterBanks(
                filterBanks.filter(i=>i.City.toLowerCase().includes(value.toLowerCase()))
            )
        }else{
            setfilterBanks(banks)
        }
    }


    return (

        <View style={styles.container}>

            <View style={styles.header}>

                <View style={styles.iconStyle}>
                    <Ionicons name='menu' color='#fff' size={25} onPress={() => navigation.openDrawer()}/>
                </View>

                <View style={styles.input}>

                    <View style={styles.icon}>
                        <Ionicons name='search' color='#fff' size={22} />
                    </View>

                    <View style={styles.searchWrapper}>
                        <TextInput placeholder='Search City' 
                        placeholderTextColor='#fff' 
                        style={styles.search}
                        value={City}
                        onChangeText={(value)=>searchGroup(value)}
                        />
                    </View>

                </View>
            </View>


            <FlatList
                data={filterBanks}
                renderItem={({ item}) => <Card item={item} navigation={navigation} onDelete={handleDelete}/>}
                keyExtractor={item => item.id}
            />


        </View>

    );
}

export default ListScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 55,
        backgroundColor: '#77ACF1',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    iconStyle: {
        flex: 1,
    },
    icon: {
        marginRight: 5,
    },
    input: {
        flex: 5,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        borderRadius: 3,
        borderWidth: 1,
    },
    search: {
        fontSize: 15,
        color: '#fff'
    }
})
