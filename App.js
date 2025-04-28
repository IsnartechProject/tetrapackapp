// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/Context/AuthContext'; // Import AuthProvider
import AppNavigator from './src/AppNavigator';

const App = () => {
  return (
    <AuthProvider> {/* Wrap the entire App with AuthProvider */}
      <NavigationContainer>
        <AppNavigator /> {/* Use the AppNavigator component */}
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
