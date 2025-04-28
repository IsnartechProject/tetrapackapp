// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image } from 'react-native';
import Login from "./Screen/login"
import Signup from './Screen/signup';
import Splash from './Screen/splash';
import OnboardingScreen from './Screen/Onboarding';
import * as Keychain from 'react-native-keychain';
import UserDashboard from './Screen/User/Dashboard';

import { useAuth } from './Context/AuthContext'; // Import useAuth
import { useNavigation } from '@react-navigation/native';
import ForgotPassword from './Screen/ForgotPassword';
import DonateTetraPacksScreen from './Screen/User/TetraPacks';
import DonationStatusScreen from './Screen/User/DonatedStatus';
import DonationInstructionsScreen from './Screen/User/tetraInstruction';
import { CommonActions } from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { logout, isLogged } = useAuth(); // Access the logout function from context
    const navigation = useNavigation();
    // Logout handler
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


    const defaultHeaderOptions = {
        headerBackVisible: true,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 24,
            fontWeight: '400',
            color: '#fff',
        },
        headerStyle: {
            backgroundColor: '#27ae60',
        },
        headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
                <Image
                    source={require('./Images/logout1.png')}
                    style={{ width: 25, height: 25, marginRight: 10, tintColor: '#fdfefe', fontWeight: 'bold' }}
                />
            </TouchableOpacity>
        ),
    };

    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
            <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={OnboardingScreen} />
            {
                !isLogged && (
                    <>
                        <Stack.Screen options={{ ...defaultHeaderOptions, headerRight: null }} name="Login" component={Login} />
                        <Stack.Screen options={{ ...defaultHeaderOptions, headerRight: null }} name="Signup" component={Signup} />
                    </>
                )
            }


            {/* User Screens */}
            <Stack.Screen
                options={{
                    ...defaultHeaderOptions,
                    headerTitle: 'User Dashboard',
                    headerRight: null, // Remove logout button from User Dashboard
                }}
                name="UserDashboard"
                component={UserDashboard}
            />
            <Stack.Screen
                options={{
                    ...defaultHeaderOptions,
                    headerTitle: 'Donate Tetra Packs',

                }}
                name="DonateTetraPacks"
                component={DonateTetraPacksScreen}
            />
            <Stack.Screen
                options={{
                    ...defaultHeaderOptions,
                    headerTitle: 'Status',

                }}
                name="DonateStatus"
                component={DonationStatusScreen}
            />

            <Stack.Screen
                options={{
                    ...defaultHeaderOptions,
                    headerTitle: 'Instruction',

                }}
                name="Instruction"
                component={DonationInstructionsScreen}
            />
            {/* <Stack.Screen options={{ ...defaultHeaderOptions, headerTitle: 'Profile' }} name="UserProfile" component={UserProfile} />
            <Stack.Screen options={{ ...defaultHeaderOptions, headerTitle: 'Upcoming Sessions' }} name="UpcomingSession" component={UpcomingSession} />
            <Stack.Screen options={{ ...defaultHeaderOptions, headerTitle: 'Digital Art' }} name="BrowseDigitalArt" component={BrowseDigitalArt} />
            <Stack.Screen options={{ ...defaultHeaderOptions, headerTitle: 'Community Updates' }} name="CommunityUpdates" component={CommunityMsg} />
            <Stack.Screen options={{ ...defaultHeaderOptions, headerTitle: 'Offline Mode' }} name="UserOffline" component={ContentPage} /> */}



            <Stack.Screen options={{ ...defaultHeaderOptions, headerTitle: 'Forgot', headerRight: null, }} name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
