import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Collapsible from "react-native-collapsible";

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
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={[styles.header, disabled && styles.disabledHeader]}
          onPress={disabled ? undefined : onToggle}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.title,
              disabled ? styles.gray : styles.blue
            ]}
          >
            {title}
          </Text>
          {!disabled && (
            <Image
              source={require("@/assets/images/fp/flechBottom.png")}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
        
        {/* Bubble maintenant en dehors du TouchableOpacity */}
        {disabled && showBubble && (
          <TouchableOpacity onPress={onBubblePress} style={styles.bubble}>
            <Image
              source={require("@/assets/images/fp/BubbleImg.png")}
              style={styles.bubbleImg}
            />
          </TouchableOpacity>
        )}
      </View>
      <Collapsible collapsed={!isOpen}>{children}</Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    position: 'relative', // Important pour le positionnement absolu de la bubble
  },
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    borderBottomWidth: 1.5,
    borderColor: "#c6e8e5",
  },
  disabledHeader: {
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontFamily: 'ArchivoExtraBold',
    marginRight: 6,
    paddingTop: 4,
    fontSize: 18,
  },
  gray: {
    color: '#a4a4a4',
  },
  blue: {
    color: '#0F548D',
  },
  icon: {
    width: 20,
    height: 20,
  },
  bubble: {
    position: "absolute",
    right: 20,
    top: 30,
    zIndex: 10, // Augmenté pour être sûr
  },
  bubbleImg: {
    width: 70,
    height: 70,
  },
});