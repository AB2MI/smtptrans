// import * as React from 'react';
// import { LogBox } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// // Screens
// import HomeScreen from './src/screens/bottomnavigation/HomeScreen';
// import SplashScreen from "./src/screens/bottomnavigation/SplashScreen";
// import MapTracking from "./src/screens/map/MapTracking";
// import Profil from "./src/screens/Profil";

// const Stack = createNativeStackNavigator();

// // Ignore specific warnings
// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
//   'VirtualizedLists should never be nested'
// ]);

// function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <NavigationContainer>
//         <Stack.Navigator 
//           initialRouteName="SplashScreen"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="SplashScreen" component={SplashScreen} />
//           <Stack.Screen name="Profil" component={Profil} />
//           <Stack.Screen name="HomeScreen" component={HomeScreen} />
//           <Stack.Screen name="MapTracking" component={MapTracking} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// }

// export default App;


// src/App.tsx
import React from 'react';

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to My React App</h1>
      <p style={styles.text}>This is a default setup using TypeScript.</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
  },
  text: {
    fontSize: '1rem',
    color: '#666',
  },
};

export default App;
