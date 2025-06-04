import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import styles from './styles'

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const IMAGES = {
  background: require("@/assets/images/intro/BIENVENUE0.png"),
  logo: require("@/assets/images/intro/tico_intro.png"),
  loupe: require("@/assets/images/intro/Loupe.png"),
};

const Intro0 = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 relative">
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            flex: 1,
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={IMAGES.background}
            style={styles.backgroundImage}
            resizeMode='contain'
          />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={IMAGES.logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer0}>
          <View style={styles.textWrapper}>
            <Text className="text-3xl ClashDisplayBold text-custom-blue underline underline-offset-4  decoration-custom-text-orange">
              Bienvenue !
            </Text>
            <Text
              style={styles.description0}
              className="text-xl text-custom-blue ArchivoLight leading-archivo text-center"
            >
              <Text style={styles.bold}>Ti</Text>
              <Text style={[styles.bold, styles.tight]}>CO</Text>
              <Text>
                {" "}
                est l’application{"\n"}de scan alimentaire qui vous{"\n"}donne{" "}
              </Text>
              <Text style={styles.strong}>
                le pouvoir d'agir{"\n"}pour une santé globale
              </Text>
              .
            </Text>

            <Image
              source={IMAGES.loupe}
              style={styles.loupe}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};



export default Intro0;
