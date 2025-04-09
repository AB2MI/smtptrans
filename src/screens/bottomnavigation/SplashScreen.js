import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  Dimensions, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {
  const [checkAuth, setCheckAuth] = useState(false);
    
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      setCheckAuth(value !== null);
    } catch (error) {
      console.error('AsyncStorage error:', error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const { height } = Dimensions.get("screen");
  const height_logo = height * 0.28;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logo */}
      <Animatable.View 
        animation="bounceIn" 
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Animatable.Image
            animation="zoomInUp"
            source={require('../../asset/img/logo.png')}
            style={[styles.logo, { height: height_logo, width: height_logo }]}
            resizeMode="contain"
          />
        </View>
      </Animatable.View>

      {/* Footer with Content */}
      <Animatable.View 
        animation="fadeInLeft" 
        style={styles.footer}
      >
        <Text style={styles.title}>Bienvenue</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet. Eum recusandae autem et nulla quaerat a deserunt corrupti.
        </Text>

        <TouchableOpacity 
          onPress={() => navigation.navigate(checkAuth ? 'HomeScreen' : 'Profil')}
          style={styles.buttonContainer}
        >
          <LinearGradient 
            colors={['#222d5b', '#222d5b', '#222d5b']} 
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Commencer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7b432",
  },
  header: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7b432',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  footer: {
    flex: 0.4,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 40,
    color: '#222d5b',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#222d5b',
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});