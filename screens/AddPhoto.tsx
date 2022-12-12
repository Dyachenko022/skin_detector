import React, { useState, useEffect, useRef } from 'react'

import { Platform, useWindowDimensions } from 'react-native'
import { Box, Text } from 'native-base';

import { StackNavigationProp } from '@react-navigation/stack';

import { useSelector } from 'react-redux';

import Colors from '../Colors';

const AddPhoto = ({navigation}: StackNavigationProp) => {
  const _renderMainContent = () => {
    return (
      <Box flex={1} 
           alignItems='center' 
           justifyContent='center'
           backgroundColor={Colors.white}>
        This is AddPhoto screen
      </Box>
    )
  }

  return _renderMainContent();
}

export default AddPhoto;
