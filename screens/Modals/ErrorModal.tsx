import React from "react";
import { VStack, Text, Pressable} from 'native-base'
import { Colors } from "react-native/Libraries/NewAppScreen";

const ErrorModal = ({ navigation }: any) => {
  const _renderMainContent = () => {
    return (
      <Pressable flex={1}
                 backgroundColor={Colors.dimmer}
                 alignItems='center'
                 justifyContent='center'
                 onPress={() => navigation.pop()}>
        <VStack width={300} 
                height={400}
                p={4}
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
    )
  }
  return _renderMainContent();
}

export default ErrorModal;
