import React from "react";

import { useWindowDimensions } from "react-native";
import { Box, Text, VStack, Pressable, ScrollView, Row } from 'native-base'

import { interpolateColor } from "react-native-reanimated";
import { MotiView } from "moti";

import Colors from "../../Colors";

const ConfidencesModal = ({navigation, route: { params }}: any) => {
  const { width, height } = useWindowDimensions();

  const Prediction = ({prediction}: any) => {
    const barColor = interpolateColor(
      prediction.confidence,
      [0, 1],
      [Colors.pinkLavender, Colors.chineseViolet]
    )

    return (
      <VStack space={1} pt={2}>
        <Row space={4} alignItems='center'>
          <Text pl={2} color={Colors.chineseViolet}>
            {prediction.label}
          </Text>

          <Text color={Colors.chineseViolet} bold>
            {(parseFloat(prediction.confidence)*100).toFixed(1)} %
          </Text>
        </Row>

        <MotiView style={{
                          height: 7,
                          borderRadius: 5, 
                          backgroundColor: barColor 
                        }}
                  from={{
                    width: 0
                  }}
                  animate={{
                    width: (width*0.7)*parseFloat(prediction.confidence)
                  }} />
      </VStack>
    )
  }
  return (
    <Pressable flex={1}
                 backgroundColor={Colors.dimmer}
                 alignItems='center'
                 justifyContent='center'
                 onPress={() => navigation.pop()}>
      <Pressable onPress={() => {}}>
        <VStack width={width*0.8} 
                p={4}
                backgroundColor={Colors.mistyRose}
                borderRadius={15}>
          <Text bold 
                fontSize='xl'
                textAlign="center"
                color={Colors.chineseViolet}>
            Results
          </Text>
          <ScrollView pt='20px' px={2}>
            {params.predictions.map((prediction: any) => (
              <Prediction prediction={prediction} />
            ))}
          </ScrollView>
        </VStack>
      </Pressable>  
    </Pressable>
  )
}

export default ConfidencesModal;
