


// import React, { useState } from 'react';
// import { 
//     View, Text, TextInput, Image, TouchableOpacity, 
//     StyleSheet, ScrollView, Alert, ActivityIndicator 
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { BASE_URL } from '../config/config';

// const Signup = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [fullName, setFullName] = useState('');
//     const [badEmail, setBadEmail] = useState(false);
//     const [badPassword, setBadPassword] = useState(false);
//     const [badConfirmPassword, setBadConfirmPassword] = useState(false);
//     const [badFullName, setBadFullName] = useState(false);
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);  // Add loading state

//     const navigation = useNavigation();

//     const signupUser = async (userData) => {
//         try {
//             setIsLoading(true);  // Start loading
//             const response = await axios.post(`${BASE_URL}/signupUser`, userData);
//             console.log('Signup Success:', response.data);

//             if (response.data.success) {
//                 Alert.alert("Success", response.data.message || "Account created successfully");
//                 navigation.navigate("Login");
//             } else {
//                 Alert.alert("Error", response.data.message || "An error occurred. Please try again.");
//             }
//         } catch (error) {
//             console.error('Signup Error:', error);
//             Alert.alert("Error", "An error occurred while processing your request. Please try again later.");
//         } finally {
//             setIsLoading(false);  // End loading
//         }
//     };

//     const validate = () => {
//         let isValid = true;

//         if (email === '') {
//             setBadEmail(true);
//             isValid = false;
//         } else {
//             setBadEmail(false);
//         }

//         if (password === '') {
//             setBadPassword(true);
//             isValid = false;
//         } else {
//             setBadPassword(false);
//         }

//         if (confirmPassword !== password) {
//             setBadConfirmPassword(true);
//             isValid = false;
//         } else {
//             setBadConfirmPassword(false);
//         }

//         if (fullName === '') {
//             setBadFullName(true);
//             isValid = false;
//         } else {
//             setBadFullName(false);
//         }

//         if (isValid) {
//             const userData = { email, password, fullName };
//             signupUser(userData);
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//             <Image source={require('../Images/tetralogo.png')} style={styles.logo} />

//             <View style={styles.textInputContainer}>
//                 <Image source={require('../Images/user.png')} style={styles.icon} />
//                 <TextInput
//                     style={styles.textInput}
//                     placeholder={'Enter Full Name'}
//                     value={fullName}
//                     onChangeText={setFullName}
//                     placeholderTextColor="#696969"
//                 />
//             </View>
//             {badFullName && <Text style={styles.errorText}>Please enter your full name</Text>}

//             <View style={styles.textInputContainer}>
//                 <Image source={require('../Images/email.png')} style={styles.icon} />
//                 <TextInput
//                     style={styles.textInput}
//                     placeholder={'Enter Email'}
//                     value={email}
//                     onChangeText={setEmail}
//                     placeholderTextColor="#696969"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                 />
//             </View>
//             {badEmail && <Text style={styles.errorText}>Please enter a valid email</Text>}

//             <View style={styles.textInputContainer}>
//                 <Image source={require('../Images/padlock.png')} style={styles.icon} />
//                 <TextInput
//                     style={styles.textInput}
//                     placeholder={'Enter Password'}
//                     value={password}
//                     onChangeText={setPassword}
//                     placeholderTextColor="#696969"
//                     secureTextEntry={!isPasswordVisible}
//                 />
//                 <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
//                     <Image source={isPasswordVisible ? require('../Images/unview.png') : require('../Images/view.png')} style={styles.eyeIconImage} />
//                 </TouchableOpacity>
//             </View>
//             {badPassword && <Text style={styles.errorText}>Please enter a password</Text>}

//             <View style={styles.textInputContainer}>
//                 <Image source={require('../Images/padlock.png')} style={styles.icon} />
//                 <TextInput
//                     style={styles.textInput}
//                     placeholder={'Confirm Password'}
//                     value={confirmPassword}
//                     onChangeText={setConfirmPassword}
//                     placeholderTextColor="#696969"
//                     secureTextEntry={!isConfirmPasswordVisible}
//                 />
//                 <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
//                     <Image source={isConfirmPasswordVisible ? require('../Images/unview.png') : require('../Images/view.png')} style={styles.eyeIconImage} />
//                 </TouchableOpacity>
//             </View>
//             {badConfirmPassword && <Text style={styles.errorText}>Passwords do not match</Text>}

//             <TouchableOpacity style={styles.button} onPress={validate} disabled={isLoading}>
//                 {isLoading ? (
//                     <ActivityIndicator size="small" color="#fff" />
//                 ) : (
//                     <Text style={styles.buttonText}>Sign Up</Text>
//                 )}
//             </TouchableOpacity>

//             <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         alignItems: 'center',
//         backgroundColor: '#fff5e1',
//         paddingBottom: 20,
//     },
//     logo: {
//         marginTop: 30,
//         width: 100,
//         height: 100,
//         alignSelf: 'center',
//         borderRadius: 100,
//         borderWidth: 5,
//         borderColor: '#f7dc6f',
//         shadowColor: '#f7dc6f',
//         shadowOffset: { width: 0, height: 5 },
//         shadowOpacity: 0.3,
//         shadowRadius: 10,
//         elevation: 10,
//     },
//     textInputContainer: {
//         width: '85%',
//         height: 50,
//         borderWidth: 1,
//         borderRadius: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 30,
//         paddingLeft: 20,
//         paddingRight: 20,
//         backgroundColor: '#fff',
//         borderColor: '#f6a800',
//         shadowColor: '#f6a800',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 10,
//     },
//     icon: {
//         width: 24,
//         height: 24,
//     },
//     textInput: {
//         marginLeft: 10,
//         color: '#000',
//         flex: 1,
//     },
//     eyeIcon: {
//         position: 'absolute',
//         right: 10,
//         top: '50%',
//         transform: [{ translateY: -12 }],
//     },
//     eyeIconImage: {
//         width: 24,
//         height: 24,
//     },
//     errorText: {
//         marginTop: 10,
//         marginLeft: 30,
//         color: 'red',
//     },
//     button: {
//         width: '85%',
//         height: 50,
//         backgroundColor: '#f7dc6f',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 30,
//         borderRadius: 10,
//     },
//     buttonText: {
//         color: '#102e4b',
//         fontWeight: '600',
//         fontSize: 18,
//     },
//     loginLink: {
//         fontSize: 18,
//         fontWeight: '800',
//         marginTop: 20,
//         textDecorationLine: 'underline',
//         color: '#102e4b',
//     },
// });

// export default Signup;


import React, { useState } from 'react';
import { 
    View, Text, TextInput, Image, TouchableOpacity, 
    StyleSheet, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../config/config';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [badEmail, setBadEmail] = useState(false);
    const [badPassword, setBadPassword] = useState(false);
    const [badConfirmPassword, setBadConfirmPassword] = useState(false);
    const [badFullName, setBadFullName] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  // Add loading state

    const navigation = useNavigation();

    const signupUser = async (userData) => {
        try {
            setIsLoading(true);  // Start loading
            const response = await axios.post(`${BASE_URL}/signupUser`, userData);
            console.log('Signup Success:', response.data);

            if (response.data.success) {
                Alert.alert("Success", response.data.message || "Account created successfully");
                navigation.navigate("Login");
            } else {
                Alert.alert("Error", response.data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error('Signup Error:', error);
            Alert.alert("Error", "An error occurred while processing your request. Please try again later.");
        } finally {
            setIsLoading(false);  // End loading
        }
    };

    const validate = () => {
        let isValid = true;

        if (email === '') {
            setBadEmail(true);
            isValid = false;
        } else {
            setBadEmail(false);
        }

        if (password === '') {
            setBadPassword(true);
            isValid = false;
        } else {
            setBadPassword(false);
        }

        if (confirmPassword !== password) {
            setBadConfirmPassword(true);
            isValid = false;
        } else {
            setBadConfirmPassword(false);
        }

        if (fullName === '') {
            setBadFullName(true);
            isValid = false;
        } else {
            setBadFullName(false);
        }

        if (isValid) {
            const userData = { email, password, fullName };
            signupUser(userData);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Image source={require('../Images/tetralogo.png')} style={styles.logo} />

            <View style={styles.textInputContainer}>
                <Image source={require('../Images/user.png')} style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Enter Full Name'}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor="#5a5a5a"
                />
            </View>
            {badFullName && <Text style={styles.errorText}>Please enter your full name</Text>}

            <View style={styles.textInputContainer}>
                <Image source={require('../Images/email.png')} style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Enter Email'}
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#5a5a5a"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            {badEmail && <Text style={styles.errorText}>Please enter a valid email</Text>}

            <View style={styles.textInputContainer}>
                <Image source={require('../Images/padlock.png')} style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Enter Password'}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#5a5a5a"
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Image source={isPasswordVisible ? require('../Images/unview.png') : require('../Images/view.png')} style={styles.eyeIconImage} />
                </TouchableOpacity>
            </View>
            {badPassword && <Text style={styles.errorText}>Please enter a password</Text>}

            <View style={styles.textInputContainer}>
                <Image source={require('../Images/padlock.png')} style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Confirm Password'}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="#5a5a5a"
                    secureTextEntry={!isConfirmPasswordVisible}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                    <Image source={isConfirmPasswordVisible ? require('../Images/unview.png') : require('../Images/view.png')} style={styles.eyeIconImage} />
                </TouchableOpacity>
            </View>
            {badConfirmPassword && <Text style={styles.errorText}>Passwords do not match</Text>}

            <TouchableOpacity style={styles.button} onPress={validate} disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#a8d8a0', // Light eco-friendly greenish background
        paddingBottom: 20,
    },
    logo: {
        marginTop: 30,
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#4caf50', // Green border for eco-friendly feel
        shadowColor: '#4caf50',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    textInputContainer: {
        width: '85%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#d4efdf',
        borderColor: '#4caf50', // Green border for input fields
        shadowColor: '#4caf50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    textInput: {
        marginLeft: 10,
        color: '#000',
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    eyeIconImage: {
        width: 24,
        height: 24,
    },
    errorText: {
        marginTop: 10,
        marginLeft: 30,
        color: '#e74c3c', // Red color for error messages
    },
    button: {
        width: '85%',
        height: 50,
        backgroundColor: '#4caf50', // Green background for the button
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff', // White text for the button
        fontWeight: '600',
        fontSize: 18,
    },
    loginLink: {
        fontSize: 18,
        fontWeight: '800',
        marginTop: 20,
        textDecorationLine: 'underline',
        color: '#fff', // Darker green for login link
    },
});

export default Signup;
