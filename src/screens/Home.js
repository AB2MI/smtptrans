import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  FlatList,
  SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';

export default function SplashScreen({ navigation }) {
  const SLIDER_WIDTH = Dimensions.get('window').width;
  
  const carouselItems = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      title: 'Earlier this morning, NYC',
      illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      title: 'White Pocket Sunset',
      illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      title: 'Acrocorinth, Greece',
      illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
      title: 'The lone tree, majestic landscape of Zealand',
      illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
  ];

  const sponsors = [
    { illustration: 'https://example.com/sponsor1.jpg' },
    { illustration: 'https://example.com/sponsor2.jpg' },
    { illustration: 'https://example.com/sponsor3.jpg' },
    { illustration: 'https://example.com/sponsor4.jpg' },
    { illustration: 'https://example.com/sponsor5.jpg' },
    { illustration: 'https://example.com/sponsor6.jpg' },
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image 
        style={styles.carouselImage} 
        source={{ uri: item.illustration }} 
      />
      <Text style={styles.carouselText}>{item.title}</Text>
    </View>
  );

  const renderSponsor = ({ item }) => (
    <View style={styles.sponsorItem}>
      <Image 
        style={styles.sponsorImage} 
        source={{ uri: item.illustration }} 
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <Animatable.View animation="bounceIn" style={styles.header}>
        <ImageBackground 
          source={require('../asset/img/accu.png')} 
          resizeMode="contain" 
          style={styles.headerImage}
        />
      </Animatable.View>

      {/* Content Section */}
      <Animatable.View animation="fadeInLeft" style={styles.content}>
        <ScrollView>
          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <Text style={styles.sectionText}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            </Text>
          </View>

          {/* Sponsors Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.spacing]}>Nos références</Text>
            <FlatList
              data={sponsors}
              renderItem={renderSponsor}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={styles.sponsorList}
            />
          </View>

          {/* News Carousel */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, styles.spacing]}>Actualités</Text>
            <View style={styles.carouselContainer}>
              <Carousel
                data={carouselItems}
                renderItem={renderCarouselItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_WIDTH}
                autoplay
                loop
              />
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7b432",
  },
  header: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 30,
    height: height * 0.6,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 28,
    color: '#222d5b',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  spacing: {
    marginTop: 20,
  },
  carouselContainer: {
    height: 250,
  },
  carouselItem: {
    width: '100%',
    alignItems: 'center',
  },
  carouselImage: {
    width: '90%',
    height: 200,
    borderRadius: 10,
  },
  carouselText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  sponsorList: {
    justifyContent: 'space-between',
  },
  sponsorItem: {
    width: '48%',
    height: 80,
    margin: 5,
  },
  sponsorImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});