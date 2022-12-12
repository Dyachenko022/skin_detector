import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  const animation = useRef(null);

  return (
    <LottieView source={require('../LottieAnimations/LottieCogs.json')} 
                ref={animation}
                onLayout={() => animation.current.play()}
                style={{
                  width: 300,
                  height: 300
                }} />
  );
}

export default Loader;
