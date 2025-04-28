// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';

// const DonationInstructionsScreen = () => {
//   const navigation = useNavigation();

//   // Navigation handler (e.g., for redirecting to donation page)
//   const handleDonation = () => {
//     // You can navigate to a donation page, map page, or other relevant screen
   
//     navigation.navigate('DonateTetraPacks'); // Example navigation to donation page
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Image
//           source={require('../../Images/tetralogo.png')}
//           style={styles.logo}
//         />
//         <Text style={styles.heading}>Read Instructions to Donate Tetra Packs</Text>

//         <View style={styles.instructionsContainer}>
//           <Text style={styles.instructionText}>
//             To donate tetra packs, please follow these simple steps:
//           </Text>

//           <View style={styles.instructionStep}>
//             <Text style={styles.stepTitle}>1. Select Location</Text>
//             <Text style={styles.stepDescription}>Choose the location from the available options and follow Google Maps to reach there.</Text>
//           </View>

//           <View style={styles.instructionStep}>
//             <Text style={styles.stepTitle}>2. Select Size of Tetra Packs</Text>
//             <Text style={styles.stepDescription}>Pick the size of the tetra packs that you would like to donate.</Text>
//           </View>

//           <View style={styles.instructionStep}>
//             <Text style={styles.stepTitle}>3. Select Number of Packs</Text>
//             <Text style={styles.stepDescription}>Specify the number of packs you wish to donate.</Text>
//           </View>

//           <View style={styles.instructionStep}>
//             <Text style={styles.stepTitle}>4. Submit</Text>
//             <Text style={styles.stepDescription}>Once all details are selected, click on the "Submit" button to complete the donation.</Text>
//           </View>

//           <TouchableOpacity style={styles.button} onPress={handleDonation}>
//             <Text style={styles.buttonText}>Start Donation</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff5e1', // Consistent with previous screen theme
//   },
//   scrollContainer: {
//     alignItems: 'center',
//     paddingBottom: hp('5%'),
//   },
//   logo: {
//     marginTop: 12,
//     width: 150,
//     height: 150,
//     alignSelf: 'center',
//     borderRadius: 75, // Ensures the logo is circular
//     borderWidth: 6, // Gives the logo a thicker green border
//     borderColor: '#1e8449', // Green border color
//     backgroundColor: '#fff', // Ensures the background is white inside the circle
//     overflow: 'hidden', // Ensures the content inside the circle is clipped
//   },
//   heading: {
//     fontSize: wp('6%'),
//     fontWeight: 'bold',
//     color: '#102e4b',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   instructionsContainer: {
//     width: '90%', // Ensures content fits within the screen
//     paddingHorizontal: wp('5%'), // Adds some padding on the sides for better readability
//     marginTop: hp('3%'),
//   },
//   instructionText: {
//     fontSize: wp('5%'),
//     color: '#34495e',
//     textAlign: 'center',
//     lineHeight: wp('6%'),
//     marginBottom: hp('3%'),
//   },
//   instructionStep: {
//     marginBottom: hp('3%'),
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     padding: wp('4%'),
//     shadowColor: '#1e8449',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   stepTitle: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     color: '#1e8449',
//   },
//   stepDescription: {
//     fontSize: wp('4.2%'),
//     color: '#34495e',
//     marginTop: hp('1%'),
//     textAlign: 'justify',
//     lineHeight: wp('5%'),
//   },
//   button: {
//     marginTop: hp('5%'),
//     width: '100%',
//     paddingVertical: hp('2%'),
//     backgroundColor: '#1e8449',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: wp('4.5%'),
//     color: 'white',
//     textAlign: 'center',
//   },
// });

// export default DonationInstructionsScreen;

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const DonationInstructionsScreen = () => {
  const navigation = useNavigation();

  // Navigation handler (e.g., for redirecting to donation page)
  const handleDonation = () => {
    // Navigate to the donation page or relevant screen
    navigation.navigate('DonateTetraPacks'); // Example navigation to donation page
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../../Images/tetralogo.png')}
          style={styles.logo}
        />
        <Text style={styles.heading}>Read Instructions to Donate Tetra Packs</Text>

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionText}>
            To donate tetra packs, please follow these simple steps:
          </Text>

          <View style={styles.instructionStep}>
            <Text style={styles.stepTitle}>1. Select Location</Text>
            <Text style={styles.stepDescription}>Choose the location from the available options and follow Google Maps to reach there.</Text>
          </View>

          <View style={styles.instructionStep}>
            <Text style={styles.stepTitle}>2. Select Size of Tetra Packs</Text>
            <Text style={styles.stepDescription}>Pick the size of the tetra packs that you would like to donate.</Text>
          </View>

          <View style={styles.instructionStep}>
            <Text style={styles.stepTitle}>3. Select Number of Packs</Text>
            <Text style={styles.stepDescription}>Specify the number of packs you wish to donate.</Text>
          </View>

          <View style={styles.instructionStep}>
            <Text style={styles.stepTitle}>4. Submit</Text>
            <Text style={styles.stepDescription}>Once all details are selected, click on the "Submit" button to complete the donation.</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleDonation}>
            <Text style={styles.buttonText}>Start Donation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eafaf1', // Light greenish background for eco-friendly vibe
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: hp('5%'),
  },
  logo: {
    marginTop: 12,
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 75, // Circular logo
    borderWidth: 6, // Thicker green border for emphasis
    borderColor: '#1e8449', // Green border
    backgroundColor: '#fff', // White inside the circle
    overflow: 'hidden', // Ensure the logo content is clipped to the circle
  },
  heading: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#1e8449', // Green color for heading to match eco-friendly theme
    textAlign: 'center',
    marginTop: 20,
  },
  instructionsContainer: {
    width: '90%',
    paddingHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
  instructionText: {
    fontSize: wp('5%'),
    color: '#34495e',
    textAlign: 'center',
    lineHeight: wp('6%'),
    marginBottom: hp('3%'),
  },
  instructionStep: {
    marginBottom: hp('3%'),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: wp('4%'),
    shadowColor: '#1e8449', // Green shadow for eco-friendly feel
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  stepTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#1e8449', // Green color for the title of each step
  },
  stepDescription: {
    fontSize: wp('4.2%'),
    color: '#34495e',
    marginTop: hp('1%'),
    textAlign: 'justify',
    lineHeight: wp('5%'),
  },
  button: {
    marginTop: hp('5%'),
    width: '100%',
    paddingVertical: hp('2%'),
    backgroundColor: '#1e8449', // Green button for eco-friendly theme
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp('4.5%'),
    color: 'white',
    textAlign: 'center',
  },
});

export default DonationInstructionsScreen;

