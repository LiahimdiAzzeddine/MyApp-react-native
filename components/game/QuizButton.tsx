import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const QuizButton = ({ onPress }:any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={require("@/assets/images/game/tico_quiz.png")} // put your saved image path here
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 110,  // adjust size as needed
    height: 110,
  },
});

export default QuizButton;
