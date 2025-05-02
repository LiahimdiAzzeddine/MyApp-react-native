import React from 'react';
import { ImageBackground, Text } from 'react-native';

type HeaderProps = {
  title: string;
};

const RenderHeader = ({ title }: HeaderProps) => (
  <ImageBackground
    source={require('@/assets/images/headers/background.png')}
    resizeMode="contain"
    style={{
      minHeight: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    }}
  >
    <Text className="text-center text-custom-green-text text-2xl ClashDisplayBold">
      {title}
    </Text>
  </ImageBackground>
);

export default RenderHeader;
