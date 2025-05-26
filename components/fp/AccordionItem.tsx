import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';

type AccordionItemProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  showBubble?: boolean;
  onBubblePress?: () => void;
};

export default function AccordionItem({
  title,
  isOpen,
  onToggle,
  disabled = false,
  children,
  showBubble = false,
  onBubblePress,
}: AccordionItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, disabled && styles.disabledHeader]}
        onPress={disabled ? undefined : onToggle}
        activeOpacity={0.8}
      >
        <Text style={styles.title}>{title}</Text>
        {!disabled && (
          <Image source={require('@/assets/images/fp/flechBottom.png')} style={styles.icon} resizeMode='contain' />
        )}
        {disabled && showBubble && (
          <TouchableOpacity onPress={onBubblePress} style={styles.bubble}>
            <Image source={require('@/assets/images/fp/BubbleImg.png')} style={styles.bubbleImg} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Collapsible collapsed={!isOpen}>{children}</Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth:1.5,
    borderColor:'#c6e8e5'
  },
  disabledHeader: {
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
  bubble: {
    position: 'absolute',
    right: 10,
    zIndex: 5,
  },
  bubbleImg: {
    width: 40,
    height: 40,
  },
});
