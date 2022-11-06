import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import BrowserScreen from './BrowserScreen';

export default class App extends Component {
  render() {
    // Create the stack navigator object
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Continents' }} />
          <Stack.Screen name='Browser' component={BrowserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
