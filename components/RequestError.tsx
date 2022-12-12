import React, { useRef } from 'react';

import { MotiView } from 'moti';
import { Pressable, VStack, Text } from 'native-base';

import Colors from '../Colors';
import AnimatedLottieView from 'lottie-react-native';
interface Props {
  onPress: Function
};

const RequestError = ({ onPress }: Props) => {
  const animation = useRef(null);

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
               onPress={() => onPress() || {}}>
        <VStack width={300} 
                height={400}
                p={4}
                alignItems='center'
                space={2}
                justifyContent='center'
                backgroundColor={Colors.mistyRose}
                borderRadius={15}>
          <AnimatedLottieView source={require('../LottieAnimations/LottieError.json')}
                              style={{
                                width: 200,
                                height: 200
                              }}
                              ref={animation}
                              onLayout={() => animation.current.play()} />
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

export default RequestError;
