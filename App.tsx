import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React, {type PropsWithChildren} from 'react';
import { NativeBaseProvider } from 'native-base';

import { Provider } from 'react-redux';
import store from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Router from './router';
if(__DEV__) {
  import("./reactotronConfig")
}

let persistor = persistStore(store);

// Входная точка приложения
export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NativeBaseProvider>
        <Router />
      </NativeBaseProvider>
    </PersistGate>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
