// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import { BASE_URL } from '../config/config';

// const ForgotPassword = ({ navigation }) => {
//     const [email, setEmail] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [isEmailSent, setIsEmailSent] = useState(false); // To track if email is sent

//     const handleForgotPassword = async () => {
//         if (!email) {
//             Alert.alert("Error", "Please enter your registered email.");
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await axios.post(`${BASE_URL}/forgotPassword`, { email });
//             const { success, message } = response.data;

//             if (success) {
//                 setIsEmailSent(true); // Set email sent state to true
//             } else {
//                 Alert.alert('Error', message);
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Unable to send reset link. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {isEmailSent ? (
//                 // Show this section if the email has been successfully sent
//                 <View style={styles.emailSentContainer}>
//                     <Text style={styles.message}>
//                         A password reset link has been sent to your email. Please check your inbox and follow the instructions.
//                     </Text>

//                     <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
//                         <Text style={styles.buttonText}>Back to Login</Text>
//                     </TouchableOpacity>
//                 </View>
//             ) : (
//                 // Show this section for entering email before sending the reset link
//                 <>
                 

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter your registered email"
//                         placeholderTextColor="#696969"
//                         value={email}
//                         onChangeText={setEmail}
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                     />

//                     <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
//                         <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                         <Text style={styles.backText}>Back to Login</Text>
//                     </TouchableOpacity>
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff5e1',  // Background color similar to dashboard theme
//         padding: 20,
//         justifyContent: 'center',   // Center the content vertically
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 20,
//         textAlign: 'center',
//         fontWeight: 'bold',
//         color: '#102e4b',  // Dark text color for the title
//     },
//     input: {
//         height: 50,
//         borderWidth: 1,
//         borderRadius: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10,
//         paddingLeft: 20,
//         paddingRight: 20,
//         backgroundColor: '#fff',
//         borderColor: '#f6a800', // Yellow border color
//         shadowColor: '#f6a800', // Yellow shadow color
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 10,
//     },
//     button: {
//         backgroundColor: '#f4d03f', // Button color similar to dashboard
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginTop: 30,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     backButton: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     backText: {
//         color: '#102e4b', // Dark text color for "Back to Login"
//         textDecorationLine: 'underline',
//     },
//     emailSentContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     message: {
//         fontSize: 18,
//         textAlign: 'center',
//         marginBottom: 20,
//         color: '#102e4b', // Dark text color for the success message
//     },
// });

// export default ForgotPassword;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/config';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false); // To track if email is sent

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your registered email.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${BASE_URL}/forgotPassword`, { email });
            const { success, message } = response.data;

            if (success) {
                setIsEmailSent(true); // Set email sent state to true
            } else {
                Alert.alert('Error', message);
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to send reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isEmailSent ? (
                // Show this section if the email has been successfully sent
                <View style={styles.emailSentContainer}>
                    <Text style={styles.message}>
                        A password reset link has been sent to your email. Please check your inbox and follow the instructions.
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                        <Text style={styles.buttonText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // Show this section for entering email before sending the reset link
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your registered email"
                        placeholderTextColor="#5a5a5a"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
                        <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backText}>Back to Login</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a8d8a0',  // Light green background
        padding: 20,
        justifyContent: 'center',   // Center the content vertically
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#102e4b',  // Dark text color for the title
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#d4efdf',
        borderColor: '#4caf50', // Eco-friendly green border
        shadowColor: '#4caf50', // Green shadow for a natural look
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    button: {
        backgroundColor: '#4caf50', // Eco-friendly green button
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    backButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    backText: {
        color: '#fff', // Darker green for "Back to Login" link
        textDecorationLine: 'underline',
    },
    emailSentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#388e3c', // Dark green for success message
    },
});

export default ForgotPassword;
