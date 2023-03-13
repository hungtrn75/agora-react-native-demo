import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppParamList} from './types';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import {CallScreen, UserInformationScreen} from '../screens';

const Stack = createNativeStackNavigator<AppParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
          headerBackTitle: 'Back',
          statusBarStyle: Platform.OS === 'ios' ? 'dark' : 'light',
          statusBarColor: '#191015',
        }}
        initialRouteName={'userInfomation'}>
        <Stack.Screen
          name={'userInfomation'}
          component={UserInformationScreen}
          options={{
            headerTitle: 'Basic Video Call',
          }}
        />
        <Stack.Screen
          name={'call'}
          component={CallScreen}
          options={{
            headerTitle: 'Agora Video Calling Quickstart',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
