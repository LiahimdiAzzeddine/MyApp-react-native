// CustomButton.js
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const CustomButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  accessibilityLabel,
  accessibilityHint
}:any) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
        style // styles personnalisés passés en prop
      ]}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0033A0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomButton;