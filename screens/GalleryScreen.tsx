import React, { useState, useEffect, useRef } from "react";

import { Box, FlatList, Pressable, Row, Text } from 'native-base';
import { TouchableOpacity, Platform, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import Colors from "../Colors";
import { StackNavigationProp } from "@react-navigation/stack";

// Экран галереи
const GalleryScreen = ({ navigation, route: { params } }: StackNavigationProp) => {

  const [media, setMedia] = useState<any>(null);
  const [MediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    fetchMedia();
  }, [])

  const fetchMedia = async () => {
    await requestMediaPermission();

    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo']
    });

    setMedia(assets);
  }

  const _renderHeader = () => {
    return (
      <Row borderBottomWidth={1} 
           borderColor={Colors.pinkLavender}
           alignItems='center'
           p={4}
           w='full'
           justifyContent='space-between'>
        <Box flex={1}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }}>
            <Text color={Colors.mediumPurple} 
                  fontSize='md'>
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
        <Box flex={5} alignItems='center'>
          <Text fontSize='lg' 
                color={Colors.chineseViolet}
                bold>
            Pick image from gallery
          </Text>
        </Box>

        <Box flex={1} />
      </Row>
    )
  }

  const _renderMedia = () => {
    return (
      <Box flex={1}>
        {media && (
          <FlatList data={media} 
                    flex={1} 
                    w='full'
                    numColumns={3}  
                    renderItem={({item}: any) => (
            <TouchableOpacity style={{width: '33%',
                                      borderWidth: 1,
                                      borderColor: Colors.pinkLavender, 
                                      aspectRatio: 1}}
                              onPress={() => {
                                params?.onImageSelect(item.uri);
                                navigation.goBack();
                              }}>
              <Image source={{uri: item.uri}} style={{
                height: '100%',
                width : '100%',
              }} />
            </TouchableOpacity>
          )} />
        )}
      </Box>
    )
  }

  const _renderMainContent = () => {
    return (
      <Box flex={1} 
           alignItems='center'
           backgroundColor={Colors.mistyRose}>
        {_renderHeader()}
        {_renderMedia()}
      </Box>
    )
  }
  return _renderMainContent();
}

export default GalleryScreen;
