// import React, { useState } from 'react';
// import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { BASE_URL } from '../config/config'; // Import BASE_URL from config
// import { useAuth } from '../Context/AuthContext';
// // import * as Keychain from 'react-native-keychain';
// import * as Keychain from 'react-native-keychain';

// const Login = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [badEmail, setBadEmail] = useState(false);
//   const [badPassword, setBadPassword] = useState(false);
//   const [loading, setLoading] = useState(false); // For loading indicator
//   const [loginError, setLoginError] = useState(""); // For displaying login errors

//   const navigation = useNavigation();

//   // Validation function
//   const validate = () => {
//     setBadEmail(email === '');
//     setBadPassword(password === '');

//     if (email !== '' && password !== '') {
//       loginUser(); // Only proceed if validation passes
//     }
//   };

//   // API call to log the user in using Axios
//   const loginUser = async () => {
//     setLoading(true); // Show loading spinner
//     setLoginError(""); // Reset login error before making request

//     try {
//       const response = await axios.post(`${BASE_URL}/appLoginByPassword`, { email, password });

//       const { success, message, user, token } = response.data;
//         console.log(token);
//       if (success) {
//         Alert.alert("Success", message || "User logged in successfully");
//         const tokenSaved = await Keychain.setGenericPassword('jwt', token); // Store token under 'jwt'
//         console.log('Token saved in Keychain', tokenSaved);

//         login(user);
//         navigation.navigate("UserDashboard");
        
//       } else {
//         setLoginError(message || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       setLoginError(error.response?.data?.message || "An error occurred. Please try again.");
//     } finally {
//       setLoading(false); // Hide loading spinner after request is done
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../Images/tetralogo.png')} style={styles.logo} />

//       {/* Email Input */}
//       <View style={styles.textInputContainer}>
//         <Image source={require('../Images/email.png')} style={styles.icon} />
//         <TextInput
//           style={styles.textInput}
//           placeholder={'Enter Email Id'}
//           value={email}
//           onChangeText={setEmail}
//           placeholderTextColor="#696969"
//         />
//       </View>
//       {badEmail && <Text style={styles.errorText}>Please Enter Email Id</Text>}

//       {/* Password Input */}
//       <View style={styles.textInputContainer}>
//         <Image source={require('../Images/padlock.png')} style={styles.icon} />
//         <TextInput
//           style={styles.textInput}
//           placeholder={'Enter Password'}
//           value={password}
//           onChangeText={setPassword}
//           placeholderTextColor="#696969"
//           secureTextEntry
//         />
//       </View>
//       {badPassword && <Text style={styles.errorText}>Please Enter Password</Text>}

//       {/* Forgot Password Link */}
//       <Text style={styles.forgotPasswordLink} onPress={() => navigation.navigate('ForgotPassword')}>
//         Forgot Password?
//       </Text>

//       {/* Login Button */}
//       <TouchableOpacity style={styles.button} onPress={validate} disabled={loading}>
//         {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
//       </TouchableOpacity>

//       {/* Login Error Message */}
//       {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

//       {/* Signup Link */}
//       <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
//         Create New Account?
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#fff5e1', // Yellow background
//   },
//   logo: {
//     marginTop: 30,
//     width: 100,
//     height: 100,
//     alignSelf: 'center',
//     borderRadius: 100,
//     borderWidth: 5,
//     borderColor: '#f7dc6f',
//     shadowColor: '#f7dc6f',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   textInputContainer: {
//     width: '85%',
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 30,
//     paddingLeft: 20,
//     paddingRight: 20,
//     backgroundColor: '#fff',
//     borderColor: '#f6a800',
//     shadowColor: '#f6a800',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   textInput: {
//     marginLeft: 10,
//     color: '#000',
//     flex: 1,
//   },
//   errorText: {
//     marginTop: 10,
//     marginLeft: 30,
//     color: 'red',
//   },
//   button: {
//     width: '85%',
//     height: 50,
//     backgroundColor: '#f7dc6f',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: '#102e4b',
//     fontWeight: '600',
//     fontSize: 18,
//   },
//   forgotPasswordLink: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#1e8449',
//     textDecorationLine: 'underline',
//     marginTop: 10,
//     textAlign: 'right',
//     width: '85%',
//   },
//   signupLink: {
//     fontSize: 18,
//     fontWeight: '800',
//     marginTop: 20,
//     textDecorationLine: 'underline',
//     color: '#102e4b',
//   },
// });

// export default Login;


import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../config/config'; // Import BASE_URL from config
import { useAuth } from '../Context/AuthContext';
import * as Keychain from 'react-native-keychain';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [loading, setLoading] = useState(false); // For loading indicator
  const [loginError, setLoginError] = useState(""); // For displaying login errors

  const navigation = useNavigation();

  // Validation function
  const validate = () => {
    setBadEmail(email === '');
    setBadPassword(password === '');

    if (email !== '' && password !== '') {
      loginUser(); // Only proceed if validation passes
    }
  };

  // API call to log the user in using Axios
  const loginUser = async () => {
    setLoading(true); // Show loading spinner
    setLoginError(""); // Reset login error before making request

    try {
      const response = await axios.post(`${BASE_URL}/appLoginByPassword`, { email, password });

      const { success, message, user, token } = response.data;
      console.log(token);
      if (success) {
        Alert.alert("Success", message || "User logged in successfully");
        const tokenSaved = await Keychain.setGenericPassword('jwt', token); // Store token under 'jwt'
        console.log('Token saved in Keychain', tokenSaved);

        login(user);
        navigation.navigate("UserDashboard");
        
      } else {
        setLoginError(message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading spinner after request is done
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../Images/tetralogo.png')} style={styles.logo} />

      {/* Email Input */}
      <View style={styles.textInputContainer}>
        <Image source={require('../Images/email.png')} style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder={'Enter Email Id'}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#5a5a5a"
        />
      </View>
      {badEmail && <Text style={styles.errorText}>Please Enter Email Id</Text>}

      {/* Password Input */}
      <View style={styles.textInputContainer}>
        <Image source={require('../Images/padlock.png')} style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder={'Enter Password'}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#5a5a5a"
          secureTextEntry
        />
      </View>
      {badPassword && <Text style={styles.errorText}>Please Enter Password</Text>}

      {/* Forgot Password Link */}
      <Text style={styles.forgotPasswordLink} onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot Password?
      </Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={validate} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      {/* Login Error Message */}
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

      {/* Signup Link */}
      <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
        Create New Account?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#a8d8a0', // Light eco-friendly greenish background
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
  forgotPasswordLink: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff', // Darker green for forgot password link
    textDecorationLine: 'underline',
    marginTop: 10,
    textAlign: 'right',
    width: '85%',
  },
  signupLink: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 20,
    textDecorationLine: 'underline',
    color: '#fff', // Green for signup link
  },
});

export default Login;
