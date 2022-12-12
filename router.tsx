import React from "react";

import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IonIcons from '@expo/vector-icons/Ionicons';
import { Box, Text } from 'native-base';
import { useSelector } from "react-redux";
import Onboarding from "./screens/Onboarding";
import Login from "./screens/Login";
import HomeScreen from "./screens/Tabs/HomeScreen";

import Colors from "./Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import AddPhoto from "./screens/AddPhoto";
import CameraScreen from "./screens/CameraScreen";
import GalleryScreen from "./screens/GalleryScreen";
import ErrorModal from "./screens/Modals/ErrorModal";
import ConfidencesModal from "./screens/Modals/ConfidencesModal";

const Stack = createStackNavigator();

export const navigationRef = createNavigationContainerRef();

const Router = () => {
  const user = useSelector(store => store.user);

  return (
    <NavigationContainer ref={navigationRef}
                         onReady={() => {
                          console.log(navigationRef.current?.getCurrentRoute().name && `Running ${navigationRef.getCurrentRoute().name} screen`)
                         }}
                         onStateChange={() => {
                          console.log(navigationRef.current?.getCurrentRoute().name && `Running ${navigationRef.getCurrentRoute().name} screen`)
                         }}>
      <Stack.Navigator initialRouteName={user?.name === null ? 'Onboarding' : 'Tabs'} screenOptions={{headerShown: false}}>
        <Stack.Screen name='Camera' component={CameraScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='AddPhoto' component={AddPhoto} />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name='Gallery' component={GalleryScreen} />
          <Stack.Screen name='Error'
                        component={ErrorModal}
                        options={{presentation: 'transparentModal'}} />
          <Stack.Screen name='Confidences' 
                        component={ConfidencesModal}
                        options={{presentation: 'transparentModal'}} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router;
