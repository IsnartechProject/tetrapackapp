// import { View, Text, Image, StyleSheet } from 'react-native';
// import React, { useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';

// const Splash = () => {
//   const navigation = useNavigation();
  
//   useEffect(() => {
//     setTimeout(() => {
//       navigation.navigate('Onboarding');
//     }, 3000);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../Images/tetralogo.png')}
//         style={styles.logo}
//       />
//       <Text style={styles.heading}>TetraPack</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#f4d03f', // Yellow background
//   },
//   logo: {
//     marginTop: 10,
//     width: 150,
//     height: 150,
//     alignSelf: 'center',
//     borderRadius: 100, // Circular border
//     borderWidth: 5, // Border width
//     borderColor: '#1e8449', // Border color
//     shadowColor: '#1e8449', // Shadow color to match the border
//     shadowOffset: { width: 0, height: 5 }, // Offset for the shadow (vertical shadow)
//     shadowOpacity: 0.3, // Shadow opacity
//     shadowRadius: 10, // Shadow spread radius
//     elevation: 10, // For Android shadow
//   },
//   heading: {
//     fontWeight: '800',
//     fontSize: 35,
//     marginTop: 20,
//     color: '#102e4b', // Dark color for contrast
//   },
// });

// export default Splash;

import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/tetralogo.png')}
        style={styles.logo}
      />
      <Text style={styles.heading}>TetraPack</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a8d8a0', 
  },
  logo: {
    marginTop: 10,
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 100, // Circular border
    borderWidth: 5, // Border width
    borderColor: '#4caf50', // Eco-friendly green border
    // Removed the shadow properties for a cleaner look
  },
  heading: {
    fontWeight: '800',
    fontSize: 35,
    marginTop: 20,
    color: '#388e3c', // Darker green for contrast, aligning with eco-friendly color palette
  },
});

export default Splash;
