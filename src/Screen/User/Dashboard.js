// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../../Context/AuthContext';
// import { CommonActions } from '@react-navigation/native';

// import * as Keychain from 'react-native-keychain';


// const UserDashboard = () => {
//     const { logout, isLogged, user } = useAuth()
//     const fullName = user?.fullName ?? "User";
//     const navigation = useNavigation();

//     // Navigate to a different section (like Profile, Digital Art, etc.)
//     const navigateTo = (screen) => {
//         navigation.navigate(screen);
//     };

//     const logoutHandler = async () => {
//         try {
//             // Clear the token from keychain
//             const resetResult = await Keychain.resetGenericPassword();

//             if (resetResult) {
//                 // Token has been successfully removed from Keychain, now call the logout function
//                 logout();

//                 // Reset the navigation stack and redirect to Onboarding screen
//                 navigation.dispatch(
//                     CommonActions.reset({
//                         index: 0,
//                         routes: [{ name: 'Onboarding' }],
//                     })
//                 );
//             } else {
//                 console.error('Failed to clear token from Keychain');
//             }
//         } catch (error) {
//             console.error('Error during logout:', error);
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 {/* User Header */}
//                 <View style={styles.header}>
//                     <Image source={require('../../Images/tetralogo.png')} style={styles.logo} />
//                     <Text style={styles.headerText}>Welcome, {fullName}</Text>
//                 </View>

//                 {/* User Profile Button */}
//                 <TouchableOpacity style={styles.button} onPress={() => navigateTo('Instruction')}>
//                     <Text style={styles.buttonText}>Instruction</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => navigateTo('DonateStatus')}>
//                     <Text style={styles.buttonText}>See Your Donation</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => navigateTo('DonateTetraPacks')}>
//                     <Text style={styles.buttonText}>Donate Tetra Packs</Text>
//                 </TouchableOpacity>


//                 <TouchableOpacity style={styles.Logoutbutton} onPress={logoutHandler} >
//                     <Text style={styles.LogoutbuttonText}>Logout</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff5e1',
//     },
//     scrollContainer: {
//         padding: wp('5%'),
//         paddingBottom: hp('3%'),
//     },
//     header: {
//         backgroundColor: '#f4d03f',
//         paddingVertical: hp('3%'),
//         paddingHorizontal: wp('5%'),
//         borderRadius: 10,
//         alignItems: 'center',
//         marginBottom: hp('4%'),
//     },
//     logo: {
//         width: 60,
//         height: 60,
//         marginBottom: hp('1%'),
//     },
//     headerText: {
//         fontSize: wp('6%'),
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     button: {
//         backgroundColor: '#f4d03f',
//         paddingVertical: hp('2%'),
//         borderRadius: 10,
//         alignItems: 'center',
//         marginBottom: hp('2%'),
//     },
//     buttonText: {
//         fontSize: wp('4.5%'),
//         fontWeight: '600',
//         color: '#102e4b',
//     },
//     Logoutbutton: {
//         backgroundColor: '#e74c3c',
//         paddingVertical: hp('1%'),
//         borderRadius: 10,
//         alignItems: 'center',
//         marginBottom: hp('2%'),
//         alignSelf: 'center',
//         padding: 14
//     },
//     LogoutbuttonText: {
//         fontSize: wp('4.5%'),
//         fontWeight: '600',
//         color: '#fff',
//     },
//     sectionTitle: {
//         fontSize: wp('5%'),
//         fontWeight: 'bold',
//         color: '#102e4b',
//         marginBottom: hp('2%'),
//     },
//     workshopsContainer: {
//         marginBottom: hp('4%'),
//     },
//     workshopItem: {
//         backgroundColor: '#f4f4f4',
//         padding: wp('4%'),
//         marginBottom: hp('2%'),
//         borderRadius: 10,
//     },
//     workshopTitle: {
//         fontSize: wp('4.5%'),
//         fontWeight: 'bold',
//         color: '#102e4b',
//     },
//     workshopDetails: {
//         fontSize: wp('4%'),
//         color: '#555',
//     },
// });

// export default UserDashboard;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Context/AuthContext';
import { CommonActions } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';

const UserDashboard = () => {
    const { logout, isLogged, user } = useAuth();
    const fullName = user?.fullName ?? "User";
    const navigation = useNavigation();

    // Navigate to a different section (like Profile, Digital Art, etc.)
    const navigateTo = (screen) => {
        navigation.navigate(screen);
    };

    const logoutHandler = async () => {
        try {
            // Clear the token from keychain
            const resetResult = await Keychain.resetGenericPassword();

            if (resetResult) {
                // Token has been successfully removed from Keychain, now call the logout function
                logout();

                // Reset the navigation stack and redirect to Onboarding screen
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Onboarding' }],
                    })
                );
            } else {
                console.error('Failed to clear token from Keychain');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* User Header */}
                <View style={styles.header}>
                    <Image source={require('../../Images/tetralogo.png')} style={styles.logo} />
                    <Text style={styles.headerText}>Welcome, {fullName}</Text>
                </View>

                {/* User Profile Button */}
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('Instruction')}>
                    <Text style={styles.buttonText}>Instruction</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('DonateStatus')}>
                    <Text style={styles.buttonText}>See Your Donation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateTo('DonateTetraPacks')}>
                    <Text style={styles.buttonText}>Donate Tetra Packs</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity style={styles.Logoutbutton} onPress={logoutHandler}>
                    <Text style={styles.LogoutbuttonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2f7e1', // Soft green background to give an eco-friendly vibe
    },
    scrollContainer: {
        padding: wp('5%'),
        paddingBottom: hp('3%'),
    },
    header: {
        backgroundColor: '#66bb6a', // Fresh green header to represent nature
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
        color: '#fff', // White text for contrast and readability
    },
    button: {
        backgroundColor: '#66bb6a', // Green button for eco-friendly theme
        paddingVertical: hp('2%'),
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    buttonText: {
        fontSize: wp('4.5%'),
        fontWeight: '600',
        color: '#fff', // White text on green for a clean, fresh look
    },
    Logoutbutton: {
        backgroundColor: '#f44336', // Red button for logout to make it stand out
        paddingVertical: hp('2%'),
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: hp('2%'),
        alignSelf: 'center',
        width: wp('80%'),
    },
    LogoutbuttonText: {
        fontSize: wp('4.5%'),
        fontWeight: '600',
        color: '#fff',
    },
    sectionTitle: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: '#102e4b', // Darker text for section headers
        marginBottom: hp('2%'),
    },
    workshopsContainer: {
        marginBottom: hp('4%'),
    },
    workshopItem: {
        backgroundColor: '#f4f4f4',
        padding: wp('4%'),
        marginBottom: hp('2%'),
        borderRadius: 10,
    },
    workshopTitle: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        color: '#102e4b',
    },
    workshopDetails: {
        fontSize: wp('4%'),
        color: '#555',
    },
});

export default UserDashboard;

