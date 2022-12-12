import React, { useEffect, useRef, useState } from "react";

import { Platform, useWindowDimensions, LayoutAnimation } from "react-native";
import { Box, Input, Text, VStack, Pressable, Button, KeyboardAvoidingView, ScrollView, Image } from 'native-base';
import { MotiView } from "moti";
import Ionicons from '@expo/vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import * as ImagePicker from 'expo-image-picker';

import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../Colors";

import { YellowBox } from "react-native";
import FocusAwareStatusBar from "../components/FocusAwareStatusBar";


YellowBox.ignoreWarnings(["ReactNative.NativeModules.LottieAnimationView.getConstants"]);
// Экран авторизации
const Login = ({navigation}: StackNavigationProp) => {
  const { width, height } = useWindowDimensions();

  const [userImage, setUserImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserImage(result.uri);
    }
  };

  const _renderMainContent = () => {
    const animation = useRef(null);

    return (
      <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{flex: 1}} bounces={false}>
          <Box flex={1} 
               justifyContent='space-between' 
               alignItems="center" 
               backgroundColor={Colors.mistyRose}>
            <FocusAwareStatusBar barStyle='light-content' />
            <MotiView from={{height: 0}} animate={{height: 300}} style={{zIndex: 100}}>
              <Box borderBottomRadius={`${width}px`}
                  pt={`${useSafeAreaInsets().top}px`}
                  w={width * 1.5} 
                  shadow={1}
                  alignItems='center' 
                  justifyContent='center'
                  backgroundColor={Colors.chineseViolet}>
                  <LottieView source={require('../LottieAnimations/LottieLogin.json')} 
                              ref={animation}
                              onLayout={() => animation.current.play()}
                              style={{width: 300, height: 300}} />
                  <Text position='absolute' 
                        bottom={10} 
                        textAlign='center'
                        bold
                        fontSize='3xl'
                        color={Colors.white}
                        shadow={1}>
                    First, create an account
                  </Text>
                </Box>
            </MotiView>
              <MotiView style={{
                width: '100%',
                flex: 1,
                padding: 10,
                alignItems: 'center',
                justifyContent:'center',
              }}
              from={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                type: 'timing',
                duration: 1000
              }}>
                <Pressable mb={10} 
                    w='120px' 
                    h='120px' 
                    borderRadius='75px'
                    alignItems='center'
                    justifyContent='center'
                    overflow='hidden'
                    borderWidth={5}
                    borderColor={Colors.chineseViolet}
                    backgroundColor={Colors.chineseViolet}
                    onPress={pickImage}>
                  {userImage ? (
                    <Image source={{uri: userImage}} 
                           width='100%'
                           height='100%'
                           alt='Error loading image' />
                  ) : (
                    <Ionicons name='ios-camera' 
                              color={Colors.white} 
                              size={60} />
                  )}
                </Pressable>
                <VStack pb={10} w='full'>
                  <Text px={2} 
                        bold 
                        color={Colors.pinkLavender} 
                        fontSize='md' 
                        flexWrap='wrap'>
                    First name
                  </Text>
                  <Input borderBottomWidth={2}
                        borderTopWidth={0}
                        borderLeftWidth={0}
                        borderRightWidth={0}
                        py={2}
                        backgroundColor='transparent'
                        size="lg"
                        borderColor={Colors.chineseViolet} />
                </VStack>
                <VStack pb={10} w='full'>
                  <Text px={2} bold color={Colors.pinkLavender} fontSize='md' flexWrap='wrap'>
                    Second name (optional)
                  </Text>
                  <Input borderBottomWidth={2}
                        borderTopWidth={0}
                        borderLeftWidth={0}
                        borderRightWidth={0}
                        py={2}
                        backgroundColor='transparent'
                        size="lg"
                        borderColor={Colors.chineseViolet} />
                </VStack>

                <Button backgroundColor={Colors.chineseViolet}
                        w={200}
                        borderRadius={50}
                        onPress={() => {
                          navigation.reset({
                            index: 0,
                            routes: [{ name: 'Camera' }],
                          })
                        }}>
                  <Text color={Colors.white}
                        fontSize='md'
                        bold>
                    Continue
                  </Text>
                </Button>
              </MotiView>
            </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return _renderMainContent();
}

export default Login;
