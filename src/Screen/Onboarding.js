
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { useAuth } from '../Context/AuthContext';
// import * as Keychain from 'react-native-keychain';
// import { CommonActions } from '@react-navigation/native';
// import axios from 'axios'; // Make sure axios is imported
// import { BASE_URL } from '../config/config';

// const OnboardingScreen = () => {
//     const navigation = useNavigation();
//     const { isLogged, user, logout, login } = useAuth();
//     const [loading, setLoading] = useState(true); // State to track the loading status
//     const [sessionVerified, setSessionVerified] = useState(false); // Track if session is verified

//     // Logout function
//     const handleLogout = async () => {
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

//     // Verify session function to check if the token is valid
//     const verifySession = async () => {
//         console.log("Running session check");
//         const token = await Keychain.getGenericPassword(); // Get the token from your secure storage
//         console.log(token);

//         if (!token) {
//             setLoading(false);
//             setSessionVerified(false);
//             console.log("No token found");
//             return;
//         }

//         try {
//             const response = await axios.post(`${BASE_URL}/verifySession`, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token.password}` // The token is stored as 'password' in Keychain
//                 }
//             });

//             if (response.data.success) {
//                 const { user } = response.data;
//                 // Login the user
//                 login(user);
//                 setSessionVerified(true);
//             } else {
//                 setSessionVerified(false);
//             }
//         } catch (error) {
//             console.error('Error verifying session:', error);
//             setSessionVerified(false);
//         } finally {
//             setLoading(false); // Hide loading after verification attempt
//         }
//     };

//     useEffect(() => {
//         // Run verify session when the screen loads
//         verifySession();
//     }, []);

//     const handleSignIn = () => {
//         navigation.navigate('Login');
//     };

//     const handleCreateAccount = () => {
//         navigation.navigate('Signup');
//     };

//     const handleTetrapacks = () => {
//         navigation.navigate('UserDashboard');
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <Image
//                     source={require('../Images/tetralogo.png')}
//                     style={styles.logo}
//                 />
//                 <Text style={styles.heading}>Welcome to Tetra Packs!</Text>

//                 <View style={styles.introContainer}>
//                     <Text style={styles.introText}>
//                         Join us in donating Tetra Packs and making a difference in the community. Together, we can promote heritage sharing and economic growth.
//                     </Text>
//                 </View>

//                 <View style={styles.donationIntroContainer}>
//                     <Text style={styles.donationIntroText}>
//                         Ready to donate your Tetra Packs? Let's get started:
//                     </Text>
//                 </View>

//                 {!isLogged && (
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//                             <Text style={styles.buttonText}>Already a customer? Login</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
//                             <Text style={styles.buttonText}>New to App? Create an Account</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}

//                 {isLogged && (
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity style={styles.button} onPress={handleTetrapacks}>
//                             <Text style={styles.buttonText}>Go to Dashboard</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
//                             <Text style={styles.buttonText}>Logout</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f7dc6f',
//         paddingHorizontal: wp('5%'),
//         justifyContent: 'center', // Vertically center the content
//         alignItems: 'center',
//     },
//     scrollContainer: {
//         alignItems: 'center',
//         paddingBottom: hp('5%'),
//     },
//     logo: {
//         marginTop: 25,
//         width: 150,
//         height: 150,
//         alignSelf: 'center',
//         borderRadius: 75, // Ensures the logo is circular
//         borderWidth: 6, // Gives the logo a thicker green border
//         borderColor: '#1e8449', // Green border color
//         backgroundColor: '#fff', // Ensures the background is white inside the circle
//         overflow: 'hidden', // Ensures the content inside the circle is clipped
//     },
//     heading: {
//         fontSize: wp('7%'),
//         fontWeight: 'bold',
//         color: '#102e4b',
//         textAlign: 'center',
//         marginTop: hp('2%'),
//     },
//     introContainer: {
//         width: '90%',
//         paddingHorizontal: wp('1%'),
//         marginTop: hp('3%'),
//     },
//     introText: {
//         fontSize: wp('4.5%'),
//         color: '#34495e',
//         textAlign: 'justify',
//         lineHeight: wp('6%'),
//     },
//     donationIntroContainer: {
//         marginTop: hp('4%'),
//         width: '90%',
//         paddingHorizontal: wp('5%'),
//     },
//     donationIntroText: {
//         fontSize: wp('4%'),
//         fontWeight: 'bold',
//         color: '#1e8449',
//         textAlign: 'center',
//     },
//     buttonContainer: {
//         width: wp('80%'),
//         alignItems: 'center',
//         marginTop: hp('3%'),
//     },
//     button: {
//         width: '100%',
//         paddingVertical: hp('2%'),
//         marginBottom: hp('2%'),
//         backgroundColor: '#1e8449',
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     buttonLogout: {
//         width: '100%',
//         paddingVertical: hp('2%'),
//         marginBottom: hp('2%'),
//         backgroundColor: '#e74c3c',
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     buttonText: {
//         fontSize: wp('4.5%'),
//         color: 'white',
//         textAlign: 'center',
//     },
// });

// export default OnboardingScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAuth } from '../Context/AuthContext';
import * as Keychain from 'react-native-keychain';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios'; // Make sure axios is imported
import { BASE_URL } from '../config/config';

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const { isLogged, user, logout, login } = useAuth();
    const [loading, setLoading] = useState(true); // State to track the loading status
    const [sessionVerified, setSessionVerified] = useState(false); // Track if session is verified

    // Logout function
    const handleLogout = async () => {
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
                        routes: [{ name: 'Onboarding' }], // Reset to Onboarding screen after logout
                    })
                );
            } else {
                console.error('Failed to clear token from Keychain');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Verify session function to check if the token is valid
    const verifySession = async () => {
        console.log("Running session check");
        const token = await Keychain.getGenericPassword(); // Get the token from your secure storage
        console.log(token);

        if (!token) {
            setLoading(false);
            setSessionVerified(false);
            console.log("No token found");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/verifySession`, {}, {
                headers: {
                    Authorization: `Bearer ${token.password}` // The token is stored as 'password' in Keychain
                }
            });

            if (response.data.success) {
                const { user } = response.data;
                // Login the user
                login(user);
                setSessionVerified(true);
            } else {
                setSessionVerified(false);
            }
        } catch (error) {
            console.error('Error verifying session:', error);
            setSessionVerified(false);
        } finally {
            setLoading(false); // Hide loading after verification attempt
        }
    };

    useEffect(() => {
        // Run verify session when the screen loads
        verifySession();
    }, []);

    const handleSignIn = () => {
        navigation.navigate('Login');
    };

    const handleCreateAccount = () => {
        navigation.navigate('Signup');
    };

    const handleTetrapacks = () => {
        navigation.navigate('UserDashboard');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image
                    source={require('../Images/tetralogo.png')}
                    style={styles.logo}
                />
                <Text style={styles.heading}>Welcome to Tetra Packs!</Text>

                <View style={styles.introContainer}>
                    <Text style={styles.introText}>
                        Join us in donating Tetra Packs and making a difference in the community. Together, we can promote heritage sharing and economic growth.
                    </Text>
                </View>

                <View style={styles.donationIntroContainer}>
                    <Text style={styles.donationIntroText}>
                        Ready to donate your Tetra Packs? Let's get started:
                    </Text>
                </View>

                {!isLogged && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                            <Text style={styles.buttonText}>Already a customer? Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                            <Text style={styles.buttonText}>New to App? Create an Account</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {isLogged && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleTetrapacks}>
                            <Text style={styles.buttonText}>Go to Dashboard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a8d8a0', // Light green for eco-friendly feel
        paddingHorizontal: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: hp('5%'),
    },
    logo: {
        marginTop: 25,
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 75, // Circular logo
        borderWidth: 6,
        borderColor: '#2ecc71', // Green border color for eco-friendliness
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    heading: {
        fontSize: wp('7%'),
        fontWeight: 'bold',
        color: '#000', // Dark green text for eco-friendly theme
        textAlign: 'center',
        marginTop: hp('2%'),
    },
    introContainer: {
        width: '90%',
        paddingHorizontal: wp('1%'),
        marginTop: hp('3%'),
    },
    introText: {
        fontSize: wp('4.5%'),
        color: '#1e8449',
        textAlign: 'justify',
        lineHeight: wp('6%'),
    },
    donationIntroContainer: {
        marginTop: hp('4%'),
        width: '90%',
        paddingHorizontal: wp('5%'),
    },
    donationIntroText: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: '#000', // Green text for eco-friendly feel
        textAlign: 'center',
    },
    buttonContainer: {
        width: wp('80%'),
        alignItems: 'center',
        marginTop: hp('3%'),
    },
    button: {
        width: '100%',
        paddingVertical: hp('2%'),
        marginBottom: hp('2%'),
        backgroundColor: '#1e8449', // Green button for eco-friendly theme
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogout: {
        width: '100%',
        paddingVertical: hp('2%'),
        marginBottom: hp('2%'),
        backgroundColor: '#e74c3c', // Red button for logout
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

export default OnboardingScreen;
