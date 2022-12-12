import React, { useState, useRef, useCallback } from "react";

import { useWindowDimensions, StyleSheet, Animated, View, TouchableOpacity } from "react-native";
import { VStack, Text, Box, FlatList, Row, Button, Pressable } from "native-base";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StackNavigationProp } from "@react-navigation/stack";

import LottieView from 'lottie-react-native';

import Colors from "../Colors";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["ReactNative.NativeModules.LottieAnimationView.getConstants"]);
// Экран приветствия
const Onboarding = ({ navigation }: StackNavigationProp) => {
  const { width, height } = useWindowDimensions();

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 90 });

  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef(null);

  const [visibilityId, setVisibilityId] = useState(0);

  const onboardingData = [
    {
      title: 'Welcome to iDerma',
      desctiption: 'Your personal AI skin care consultant',
      animaionSource: require('../LottieAnimations/LottieWelcome.json'),
      loop: true, 
    },
    {
      title: 'Take your photo',
      desctiption: 'Take your photo and upload it to the app',
      animaionSource: require('../LottieAnimations/LottieCamera.json'),
      loop: false, 
    },
    {
      title: 'Wait for it to process',
      desctiption: 'Our neural network will process your photo and give you a result',
      animaionSource: require('../LottieAnimations/LottieCogs.json'),
      loop: true 
    },
    {
      title: 'The results are saved',
      desctiption: 'You can always come back to the results later',
      animaionSource: require('../LottieAnimations/LottieSave.json'),
      loop: true 
    }
  ]

  const OnboardingItem = useCallback(({item, index}: any) => {
    const animation = useRef(null);

    return (
      <VStack space={2} px={2} flex={1} w={width} h={height} alignItems='center' justifyContent='center'>
        <LottieView source={item.animaionSource} 
                    ref={animation}
                    onLayout={() => animation.current.play()}
                    style={{width: 300, height: 300}} />
        <VStack space={1} alignItems='center'>
          <Text fontSize='xl' 
                bold 
                color={Colors.chineseViolet}>
            {item.title}
          </Text>

          <Text color={Colors.middlePurple} 
                fontSize='lg'
                maxW={200}
                textAlign='center'>
            {item.desctiption}
          </Text>
        </VStack>
      </VStack>
    )
  }, [])

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    setVisibilityId(viewableItems[0]?.index);
  }, [])

  const _renderMainContent = () => {
    return (
      <Box alignItems='center' 
           flex={1} 
           pb={`${useSafeAreaInsets().bottom}px`}
           pt={`${useSafeAreaInsets().top}px`}
           backgroundColor={Colors.mistyRose}>
        <Box flex={2} alignItems='center' justifyContent='center'>
          <FlatList flex={1}
                    viewabilityConfig={viewabilityConfig.current}
                    onViewableItemsChanged={onViewableItemsChanged}
                    pagingEnabled
                    scrollEventThrottle={16}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ref={sliderRef}
                    data={onboardingData}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                    renderItem={(item: any) => <OnboardingItem {...item} />} />
        </Box>

        <VStack space={4}>
          <Row justifyContent='space-evenly' alignItems='center' w='full'>
            <TouchableOpacity onPress={() => {
              if (visibilityId > 0) {
                sliderRef?.current.scrollToIndex({index: visibilityId - 1});
              }
            }}>
              <Text bold color={Colors.mediumPurple} fontSize='md'>
                Previous
              </Text>
            </TouchableOpacity>
            <Row justifyContent='center'>
              {onboardingData.map((_, index) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

                const dotWidth = scrollX.interpolate({
                  inputRange,
                  outputRange: [10, 20, 10],
                  extrapolate: 'clamp'
                })

                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp'
                })

                return (
                  <Animated.View key={`${index}`} 
                      style={{
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: Colors.middlePurple,
                        width: dotWidth,
                        opacity,
                        height: 10,
                      }} />
                )
              })}
            </Row>
            <TouchableOpacity onPress={() => {
              if (visibilityId < onboardingData.length - 1) {
                sliderRef?.current.scrollToIndex({index: visibilityId + 1});
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              }
            }}>
              <Text bold color={Colors.mediumPurple} fontSize='md'>
                Next
              </Text>
            </TouchableOpacity>
          </Row>
        </VStack>
      </Box>
    )
  }
  return _renderMainContent();
}

export default Onboarding;
