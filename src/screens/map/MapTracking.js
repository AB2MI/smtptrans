import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

const MapTracking = () => {
  const [isSelected, setSelection] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 33.5701,
    longitude: -7.6535292,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [destination, setDestination] = useState({
    latitude: 33.591236,
    longitude: -7.566979,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = useRef();
  const markerRef = useRef();

  // Calculate aspect ratio for map region
  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  // Fetch vehicle data from AsyncStorage
  const fetchVehicleData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userInfo');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setVehicleId(parsedData.vehicle?.id);
        
        // Update destination if available
        if (parsedData.latitude && parsedData.longitude) {
          setDestination({
            latitude: parseFloat(parsedData.longitude),
            longitude: parseFloat(parsedData.latitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    try {
      if (Platform.OS === 'ios') {
        await Geolocation.requestAuthorization('whenInUse');
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });

          // Animate marker if available
          if (markerRef.current) {
            markerRef.current.animateMarkerToCoordinate(
              { latitude, longitude },
              1000
            );
          }
        },
        (error) => {
          console.error('Location error:', error);
          Alert.alert('Location Error', 'Could not get your current location');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.error('Location permission error:', error);
    }
  };

  // Fetch vehicle location from API
  const fetchVehicleLocation = async () => {
    if (!vehicleId) return;

    try {
      const response = await fetch(
        `https://smtpatrans.com/api/v1/vehicles/${vehicleId}`
      );
      const data = await response.json();

      if (data?.id) {
        setCurrentLocation({
          latitude: parseFloat(data.longitude),
          longitude: parseFloat(data.latitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation();
      fetchVehicleLocation();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [vehicleId]);

  const handleMapReady = (result) => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(result.coordinates, {
        edgePadding: {
          right: screen.width / 30,
          bottom: screen.height / 30,
          left: screen.width / 30,
          top: screen.height / 30,
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={currentLocation}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker
          ref={markerRef}
          coordinate={currentLocation}
          image={require('../../asset/img/autobus.png')}
        />

        <MapViewDirections
          origin={currentLocation}
          destination={destination}
          apikey={'AIzaSyATUPz0au_eOq5dZJwNZQxJ9_doGrIcchE'}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={handleMapReady}
        />

        <Marker
          coordinate={destination}
          image={require('../../asset/img/map-marker.png')}
        />
      </MapView>

      <View style={styles.bottomCard}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
            tintColors={{ true: '#fff', false: '#fff' }}
          />
          <Text style={styles.label}>
            {isSelected ? "Validé 👍" : "Non Validé 👎"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#1e2d58',
    width: '100%',
    height: 60,
    paddingTop: 10,
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: 8,
    color: 'white',
    fontSize: 16,
  },
});

export default MapTracking;