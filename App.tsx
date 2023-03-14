/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import {PushHelper} from './src/utils/PushHelper';

function App(): JSX.Element {
  useEffect(() => {
    PushHelper.initPushNotifications();
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
