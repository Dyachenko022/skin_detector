import React, { useState, useRef, useEffect , useContext } from "react";

import { Box, Pressable, Row, Text, VStack, Image } from 'native-base';
import { TouchableOpacity, ImageBackground, Platform } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { PinchGestureHandler } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { FlipType, manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from "../Colors";

import { YellowBox } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { sendUserPhoto } from "../Functions/Main";
import { AnimatePresence, MotiView } from "moti";
import Loader from "../components/Loader";
import RequestError from "../components/RequestError";

YellowBox.ignoreWarnings(["ReactNative.NativeModules.LottieAnimationView.getConstants"]);

// Экран камеры
const CameraScreen = ({ navigation }: StackNavigationProp) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [MediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  const [media, setMedia] = useState<any>(null);

  const [imageTaken, setImageTaken] = useState<string | null>(null);

  const [cameraType, setCameraType] = useState<CameraType>(CameraType.front);
  const [zoom, setZoom] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const cameraRef = useRef<Camera>(null);
  
  const animation = useRef(null);

  const toggleCameraType = () => {
    setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  useEffect(() => {
    requestPermission();
    fetchMedia()
  }, [])

  // Получение последней фотографии из галереи пользователя
  const fetchMedia = async () => {
    await requestMediaPermission();

    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo']
    });

    setMedia(assets[0]);
  }

  // Выбор фотографии пользователя
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageTaken(result.uri);
    }
  };

  const onPinchGestureEvent = (nativeEvent: any) => {
    var scale = nativeEvent.nativeEvent.scale
    var velocity = nativeEvent.nativeEvent.velocity / 20
   
     let newZoom =
     velocity > 0
     ? zoom + scale * velocity * (Platform.OS === "ios" ? 0.01 : 25)
     : zoom -
       scale * Math.abs(velocity) * (Platform.OS === "ios" ? 0.02 : 50);
   
    if (newZoom < 0) newZoom = 0;
    else if (newZoom > 0.5) newZoom = 0.5;
   
    setZoom(newZoom)
   };

  const _renderCameraUsageScreen = () => {
    return (
      <VStack alignItems='center' 
                  justifyContent='center' 
                  space={2}
                  px={10} 
                  flex={1}>
            <LottieView source={require('../LottieAnimations/LottieUseCamera.json')} 
                              ref={animation}
                              onLayout={() => animation.current.play()}
                              style={{width: 300, height: 300}} />
            <Text color={Colors.chineseViolet} 
                  fontSize='xl'
                  textAlign='center'
                  bold>
              Please allow the app to use your camera
            </Text>
            <Text color={Colors.pinkLavender} 
                  fontSize='md'
                  textAlign='center'>
              This is required to take your photo,
              we do not store any photos on our servers
            </Text>
            <TouchableOpacity style={{
              backgroundColor: Colors.chineseViolet,
              padding: 10,
              marginTop: 20,
              width: 200,
              alignItems:'center',
              justifyContent: 'center',
              borderRadius: 20
            }}
            onPress={() => {
              requestPermission();
              requestMediaPermission();
            }}>
              <Text color={Colors.white} bold>
                Allow camera usage
              </Text>
            </TouchableOpacity>
          </VStack>
    )
  }

  const _renderTopRowButtons = () => {
    return (
      <Row alignItems='center' 
           justifyContent='space-between'
           px='20px'
           position='absolute'
           w='full'
           top={`${useSafeAreaInsets().top}px`}>
        <Box flex={1} />
        <Box flex={1} alignItems='flex-end'>
          <TouchableOpacity onPress={() => {
            console.log('pressed person')
          }}>
            <Ionicons name='person-outline' size={30} color={Colors.white} />
          </TouchableOpacity>
        </Box>
      </Row>
    )
  }

  const _renderBottomRowButtons = () => {
    return (
      <Row position='absolute' 
              w='full'
              alignItems='center'
              px='20px'
              justifyContent='space-between'
              bottom={`${useSafeAreaInsets().bottom}px`}>
            <Box flex={1} alignItems='flex-start'>
              <Pressable size={55}
                        borderRadius={2} 
                        backgroundColor={Colors.mistyRose}
                        onPress={pickImage}>
              <Image source={{uri: media?.uri}} 
                    width='100%'
                    alt='Error loading media' 
                    height='100%' />
              </Pressable>
            </Box>
            <Box flex={1} alignItems='center'>
              <TouchableOpacity onPress={() => {
                cameraRef.current?.takePictureAsync({
                  quality: 1
                }).then(data => {
                  manipulateAsync(data.uri, cameraType === CameraType.front ? [{ flip: FlipType.Horizontal }] : [], {compress: 0, format: SaveFormat.JPEG}).then(result => {
                    setImageTaken(result.uri);
                  })
                })
              }}>
                <Box size={65}
                    borderRadius={30} 
                    alignItems='center'
                    justifyContent='center'
                    backgroundColor={Colors.white}>
                  <Box size={55}
                      borderColor={Colors.chineseViolet}
                      borderWidth={1}
                      shadow={1}
                      borderRadius={30} 
                      alignItems='center'
                      justifyContent='center'
                      backgroundColor={Colors.white} />
                </Box>
              </TouchableOpacity>
            </Box>
            <Box flex={1} alignItems='flex-end'>
              <TouchableOpacity onPress={toggleCameraType}>
                <Ionicons name="camera-reverse-outline" 
                          size={40} 
                          color={Colors.white}
                          style={{
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.18,
                            shadowRadius: 1.00,

                            elevation: 1,
                          }} />
              </TouchableOpacity>
            </Box>
          </Row>
    )
  }
  
  const Error = () => {
    return (
      <MotiView style={{position: 'absolute', 
                        width: '100%',
                        backgroundColor: Colors.dimmer,
                        height: '100%' }}
                from={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}>
        <Pressable flex={1}
                 backgroundColor={Colors.dimmer}
                 alignItems='center'
                 justifyContent='center'
                 onPress={() => setError(false)}>
          <VStack width={300} 
                  height={400}
                  p={4}
                  alignItems='center'
                  space={2}
                  justifyContent='center'
                  backgroundColor={Colors.mistyRose}
                  borderRadius={15}>
            <Text bold 
                  fontSize='xl'
                  color={Colors.chineseViolet}>
              Something went wrong
            </Text>
            <Text fontSize='lg' color={Colors.pinkLavender}>
              Please try again
            </Text>
          </VStack>
        </Pressable>
      </MotiView>
    )
  }

  const _renderImageTaken = () => {
    return (
      <ImageBackground  source={{uri: imageTaken? imageTaken : ''}} 
                        style={{
                          height: '100%',
                          width: '100%'
                        }}>
        <Row alignItems='center' 
             position='absolute'
             w='full'
             bottom={`${useSafeAreaInsets().bottom}px`}
             justifyContent='space-between'
             px='20px'>
          <TouchableOpacity style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 55,
                              height: 55,
                              borderRadius: 30,
                              backgroundColor: Colors.white
                            }}
                            onPress={() => {
                              setImageTaken(null);
                            }}>
            <Ionicons name='close' 
                      size={35}
                      color={Colors.chineseViolet} />
          </TouchableOpacity>

          <TouchableOpacity style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 55,
                              height: 55,
                              borderRadius: 30,
                              backgroundColor: Colors.white
                            }}
                            onPress={() => {
                              // Обработка полученных реультатов
                              setLoading(true);
                              sendUserPhoto(imageTaken).then(response => {
                                navigation.navigate('Confidences', { predictions: response.data.data[0].confidences})
                                setLoading(false);
                              }).catch(error => {
                                console.log(error)
                                setLoading(false);
                              });
                            }}>
            <Ionicons name='checkmark' 
                      size={30} 
                      color={Colors.chineseViolet} />
          </TouchableOpacity>
        </Row>
      </ImageBackground>
    )
  }

  const _renderCamera = () => {
    return (
      <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
        <Camera style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                }}
                type={cameraType}
                ref={cameraRef}
                zoom={zoom}
                autoFocus>
          {_renderTopRowButtons()}
          {_renderBottomRowButtons()}
        </Camera>
      </PinchGestureHandler>
    )
  }

  const _renderMainContent = () => {
    return (
      <Box flex={1} 
           w='full' 
           backgroundColor={Colors.mistyRose}>
        {permission?.granted ? (
          imageTaken ? (
            _renderImageTaken()
          ) : (
            _renderCamera()
          )
        ) : (
          _renderCameraUsageScreen()
        )}
        <AnimatePresence>
          {loading && (
            <MotiView style={{position: 'absolute',
                              alignItems: 'center',
                              justifyContent: 'center', 
                              width: '100%',
                              backgroundColor: Colors.dimmer,
                              height: '100%' }}
                      from={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}>
              <Loader />
            </MotiView>
          )}
          {error && <RequestError onPress={() => setError(false)} />}
        </AnimatePresence>
      </Box>
    )
  }

  return _renderMainContent();
}

export default CameraScreen;
