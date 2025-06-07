import React from 'react';
import { ImageBackground, Text, ImageSourcePropType } from 'react-native';

type HeaderProps = {
  title: string;
  titleColor?: string;
  backgroundImage?: ImageSourcePropType;
};

const RenderHeaderTab = ({
  title,
  titleColor = '#ff8200', // couleur par défaut
  backgroundImage = require('@/assets/images/tips/bachgroundTip.png'), // image par défaut
}: HeaderProps) => (
  <ImageBackground
    source={backgroundImage}
    resizeMode="contain"
    style={{
      minHeight: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      paddingHorizontal:16
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        color: titleColor,
        fontSize: 26,
        fontFamily: 'ClashDisplayBold',
      }}
    >
      {title}
    </Text>
  </ImageBackground>
);

export default RenderHeaderTab;
