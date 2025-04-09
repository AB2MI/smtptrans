import React from 'react'
import { StyleSheet,Dimensions, Text, View,Image,colors } from 'react-native'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

export default function Notivication() {
    return (

        <View style={styles.containerparant}>
          <View style={styles.jusctfy} >
                    <Image style={styles.imagestyle}  source={require('../asset/img/notification.png')}  />  
                    <Text  style={styles.titre}>
                    Rien ici !!! 
                   </Text>

          </View>   
           
         
        </View>

    )
}



const styles = StyleSheet.create({
    jusctfy:{
        justifyContent:"center",
        alignItems:"center",
    },
    containerparant:{   
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      height: '100%',
      width:"100%",
    },
    imagestyle: {
        width: 60,
        height: 60,
        justifyContent:"center",
        alignItems:"center",
    },
    titre:{
        fontSize: 30,
        width:"100%",
        alignItems: 'center',
        color:'#222d5b',
        fontWeight: 'bold',
    }


})


