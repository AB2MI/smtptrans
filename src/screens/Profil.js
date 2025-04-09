import React, { useState } from 'react';
import { 
  StyleSheet,
  Dimensions, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profil({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({
    matricule: '',
    password: '',
    checkInputChange: false,
    secureTextEntry: true,
  });

  const handleInputChange = (val) => {
    setData({
      ...data,
      matricule: val,
      checkInputChange: val.length >= 4
    });
    setUsername(val);
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
    setPassword(val);
  };

  const toggleSecureEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  };

  const handleLogin = () => {
    setVisible(true);
    
    fetch("https://smtpatrans.com/api/v1/personnels/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        matricule: username,
        password: password,
      })
    })
    .then(response => response.json())
    .then(responseData => {
      setVisible(false);
      
      if (responseData.id) { 
        AsyncStorage.setItem('userInfo', JSON.stringify(responseData))
          .then(() => navigation.navigate('HomeScreen'))
          .catch(err => {
            console.log("Error saving data: " + err);
            Alert.alert('Error', 'Failed to save user data');
          });
      } else {
        Alert.alert('Erreur', 'Matricule ou mot de passe incorrect');
      }
    })
    .catch(error => {
      setVisible(false);
      console.log("API Error: " + error);
      Alert.alert('Erreur', 'Problème de connexion au serveur');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <Animatable.View animation="bounceIn" style={styles.header}>
        <View style={styles.logoContainer}>
          <Animatable.Image 
            animation="zoomInUp" 
            source={require('../asset/img/logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Connexion</Text>
        </View>
      </Animatable.View>

      {/* Form Section */}
      <Animatable.View animation="fadeInLeft" style={styles.footer}>
        <Text style={styles.label}>Matricule</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user-o" size={20} color="#05375a" />
          <TextInput 
            placeholder="Votre matricule"
            style={styles.input}
            onChangeText={handleInputChange}
            value={username}
          />
          {data.checkInputChange ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : (
            <Feather name="check-circle" color="gray" size={20} />
          )}
        </View>

        <Text style={[styles.label, {marginTop: 35}]}>Mot de passe</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#05375a" />
          <TextInput
            secureTextEntry={data.secureTextEntry}
            placeholder="Votre mot de passe"
            style={styles.input}
            onChangeText={handlePasswordChange}
            value={password}
          />
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Feather 
              name={data.secureTextEntry ? "eye-off" : "eye"} 
              color="green" 
              size={20} 
            />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity onPress={handleLogin}> */}
        <TouchableOpacity onPress={()=> navigation.navigate('HomeScreen')}>
          <LinearGradient
            colors={['#222d5b', '#222d5b', '#222d5b']}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>S'identifier</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Spinner
          visible={visible}
          textContent={'Chargement...'}
          textStyle={styles.spinnerText}
        />
      </Animatable.View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get("screen");
const logoHeight = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7b432",
  },
  header: {
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    height: "60%",
    justifyContent: "center",
  },
  logo: {
    width: logoHeight,
    height: logoHeight,
  },
  titleContainer: {
    height: "20%",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    color: '#222d5b',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: "white",
    height: "55%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  label: {
    color: '#05375a',
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#05375a',
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  loginButton: {
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spinnerText: {
    color: '#FFF',
  },
});