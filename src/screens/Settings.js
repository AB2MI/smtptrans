import React,{useState,useEffect} from 'react'
import { StyleSheet,Dimensions, Text, View,Image,colors,TouchableOpacity,FlatList,Button } from 'react-native'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigator } from 'react-navigation';
import { ListItem, Avatar, List } from 'react-native-elements';
import MapTracking from "../screens/map/MapTracking";
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Ionicons  from 'react-native-vector-icons/Ionicons';

export default function Settings({navigation}) {
    const img ="https://cdn-icons-png.flaticon.com/512/2316/2316600.png";
    const[userinfo,setuserinfo] = React.useState({
      
      name:'',
      email:'',
      adresse:'',
      
    });


    const[counttest,setcounttest] = React.useState(0);

    useEffect(() => {
      
      console.log(counttest);
      if(counttest == 0){
       userinfoLocation();
      }
      setcounttest(counttest + 1);
      
    },[]);


    const userinfoLocation = async()=>{

      const product = JSON.parse(await AsyncStorage.getItem('userInfo'))

      console.log(product.adresse);
      if (product !== null) {
        
            console.log('setting');
            setuserinfo({
              name:product.name,
              email:product.email,
              adresse:product.adresse,
            });
            console.log(userinfo);
        
            }else {
              console.log('errour droploctionCors ');
      
            }
      }

      const removeData = async () => {
      
        await AsyncStorage.removeItem('userInfo')
          navigation.navigate('SplashScreen')
          console.log('deconnecte')

       } 
      
    return (

        <View>
         
           {/* <View style={styles.containerparant}>
                <View style={styles.jusctfy} >
                            <Image style={styles.imagestyle}  source={require('../asset/img/setting.png')}  />  
                            <Text  style={styles.titre}>
                            Settings
                        </Text>

                </View>   

           </View>  */}

           <View style={styles.containersetting}>

           <View style={styles.containerparant}>
                <View style={styles.jusctfy} >
                            <Image style={styles.imagestyle}  source={require('../asset/img/setting.png')}  />  
                            <Text  style={styles.titre}>
                            Settings
                        </Text>
                </View>   
           </View> 

            <ListItem  style={styles.itembordertitle} >
               <View>
                 <Text>Nom : {userinfo.name}</Text>
                 <Text><Text>Email :  </Text> {userinfo.email}</Text>
               </View>
            </ListItem>

              <TouchableOpacity onPress={() => navigation.navigate('MapTracking')}>
                <ListItem  style={styles.itemborder} 
                     >
                    <ListItem.Content >
                    <ListItem.Title  style={styles.itemTitle} >Localisation</ListItem.Title>
                   </ListItem.Content>
                   <Avatar source={{uri:img}} />
                </ListItem>
              </TouchableOpacity>
              <TouchableOpacity onPress={removeData} >
                <ListItem  style={styles.itemborder}>
                    <ListItem.Content >
                    <ListItem.Title style={styles.itemTitle} >Déconnecter</ListItem.Title>
                   </ListItem.Content>
                   <Avatar source={{uri:'https://images.assetsdelivery.com/compings_v2/get4net/get4net1901/get4net190106539.jpg'}} />
                </ListItem>
                </TouchableOpacity>

            </View> 

        </View>
    )
}

const styles = StyleSheet.create({
    // containersetting:{
    //     flex:1,
    //    },
    itembordertitle:{
    
      overflow: 'hidden',
      margin:6,
      marginStart:15,
      marginEnd:15,
    },
    itemTitle:{
     paddingLeft: 10,
    },
    itemborder:{
      borderRadius:100,
      overflow: 'hidden',
      margin:6,
      marginStart:10,
      marginEnd:10,
    },
    ListItemsetting:{
      borderWidth: 1,
      borderBottomColor:'red',
    }, 
    Avatarsetting:{
     width:30,
     height:30,
    },
    containerbutton:{
        color:'red',
    },
    jusctfy:{
        justifyContent:"center",
        alignItems:"center",
    },
    containerparant:{   
      justifyContent:"center",
      alignItems:"center",
      height: '40%',
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


