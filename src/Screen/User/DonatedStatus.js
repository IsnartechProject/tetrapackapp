

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert, Image } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { BASE_URL } from '../../config/config';
// import { useAuth } from '../../Context/AuthContext';

// const DonationStatusScreen = () => {
//   const { user } = useAuth();
//   const UserId = user?.id; // Assuming the user has a UserId field
//   const [locationSummaries, setLocationSummaries] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchDonationSummary = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/getUserDonationSummary/${UserId}`);
//         setLocationSummaries(response.data.locationSummaries);
//       } catch (error) {
//         console.error('Error fetching donation summary by location:', error);
//         Alert.alert('Error', 'Failed to fetch donation summary by location');
//       }
//     };

//     if (UserId) {
//       fetchDonationSummary();
//     }
//   }, [UserId]);

//   // If donation data is still loading
//   if (locationSummaries.length === 0) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.loadingText}>Loading donation summary by location...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Image source={require('../../Images/tetralogo.png')} style={styles.logo} />
//           <Text style={styles.headerText}>Donation Status</Text>
//         </View>

//         {/* Donation Summary by Location */}
//         {locationSummaries.map((summary, index) => (
//           <View key={index} style={styles.donationSummaryContainer}>
//             <Text style={styles.locationTitle}>{summary.location}</Text>
//             <View style={styles.summaryItem}>
//               <Text style={styles.summaryLabel}>Total Donation:</Text>
//               <Text style={styles.summaryValue}>{summary.numDonations} </Text>
//             </View>
//             <View style={styles.summaryItem}>
//               <Text style={styles.summaryLabel}>Total CO₂ Saved:</Text>
//               <Text style={styles.summaryValue}>{summary.totalCO2Saved} kg</Text>
//             </View>
//             <View style={styles.summaryItem}>
//               <Text style={styles.summaryLabel}>Total Water Saved:</Text>
//               <Text style={styles.summaryValue}>{summary.totalWaterSaved} liters</Text>
//             </View>
//             <View style={styles.summaryItem}>
//               <Text style={styles.summaryLabel}>Total Packs Donated:</Text>
//               <Text style={styles.summaryValue}>{summary.totalPacks}</Text>
//             </View>
//             <View style={styles.summaryItem}>
//               <Text style={styles.summaryLabel}>Total Weight Donated:</Text>
//               <Text style={styles.summaryValue}>{summary.totalWeightKg} kg</Text>
//             </View>
//             <View style={styles.summaryItem}>
//               <Text style={styles.summaryLabel}>Total Pack Size:</Text>
//               <Text style={styles.summaryValue}>{summary.totalPackSize}</Text>
//             </View>
//           </View>
//         ))}

       
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff5e1',
//     paddingTop: hp('2%'),
//   },
//   scrollContainer: {
//     padding: wp('5%'),
//     paddingBottom: hp('3%'),
//   },
//   header: {
//     backgroundColor: '#f4d03f',
//     paddingVertical: hp('3%'),
//     paddingHorizontal: wp('5%'),
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: hp('4%'),
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     marginBottom: hp('1%'),
//   },
//   headerText: {
//     fontSize: wp('6%'),
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   donationSummaryContainer: {
//     marginBottom: hp('4%'),
//     padding: wp('5%'),
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   locationTitle: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     color: '#102e4b',
//     marginBottom: hp('2%'),
//   },
//   summaryItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('2%'),
//   },
//   summaryLabel: {
//     fontSize: wp('4.5%'),
//     color: '#102e4b',
//     fontWeight: 'bold',
//   },
//   summaryValue: {
//     fontSize: wp('4%'),
//     color: '#555',
//     textAlign: 'right',
//   },
//   backButton: {
//     fontSize: wp('4.5%'),
//     fontWeight: 'bold',
//     color: '#f4d03f',
//     marginTop: hp('3%'),
//     textAlign: 'center',
//     textDecorationLine: 'underline',
//   },
//   loadingText: {
//     fontSize: wp('4.5%'),
//     color: '#777',
//     textAlign: 'center',
//     marginTop: hp('2%'),
//   },
// });

// export default DonationStatusScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { useAuth } from '../../Context/AuthContext';

const DonationStatusScreen = () => {
  const { user } = useAuth();
  const UserId = user?.id; // Assuming the user has a UserId field
  const [locationSummaries, setLocationSummaries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDonationSummary = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getUserDonationSummary/${UserId}`);
        setLocationSummaries(response.data.locationSummaries);
      } catch (error) {
        console.error('Error fetching donation summary by location:', error);
        Alert.alert('Error', 'Failed to fetch donation summary by location');
      }
    };

    if (UserId) {
      fetchDonationSummary();
    }
  }, [UserId]);

  // If donation data is still loading
  if (locationSummaries.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading donation summary by location...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../Images/tetralogo.png')} style={styles.logo} />
          <Text style={styles.headerText}>Donation Status</Text>
        </View>

        {/* Donation Summary by Location */}
        {locationSummaries.map((summary, index) => (
          <View key={index} style={styles.donationSummaryContainer}>
            <Text style={styles.locationTitle}>{summary.location}</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Donation:</Text>
              <Text style={styles.summaryValue}>{summary.numDonations} </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total CO₂ Saved:</Text>
              <Text style={styles.summaryValue}>{summary.totalCO2Saved} kg</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Water Saved:</Text>
              <Text style={styles.summaryValue}>{summary.totalWaterSaved} liters</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Packs Donated:</Text>
              <Text style={styles.summaryValue}>{summary.totalPacks}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Weight Donated:</Text>
              <Text style={styles.summaryValue}>{summary.totalWeightKg} kg</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Pack Size:</Text>
              <Text style={styles.summaryValue}>{summary.totalPackSize}ml</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4e8', // Light greenish background for eco-friendly feel
    paddingTop: hp('2%'),
  },
  scrollContainer: {
    padding: wp('5%'),
    paddingBottom: hp('3%'),
  },
  header: {
    backgroundColor: '#4caf50', // Eco-friendly green background
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: hp('4%'),
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: hp('1%'),
  },
  headerText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#fff', // White text for contrast on green background
  },
  donationSummaryContainer: {
    marginBottom: hp('4%'),
    padding: wp('5%'),
    backgroundColor: '#f9f9f9', // Light background for each donation summary
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  locationTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#2d6a4f', // Darker green for location title
    marginBottom: hp('2%'),
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  summaryLabel: {
    fontSize: wp('4.5%'),
    color: '#2d6a4f', // Darker green for labels
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: wp('4%'),
    color: '#555',
    textAlign: 'right',
  },
  loadingText: {
    fontSize: wp('4.5%'),
    color: '#4caf50', // Green color for loading message
    textAlign: 'center',
    marginTop: hp('2%'),
  },
});

export default DonationStatusScreen;
