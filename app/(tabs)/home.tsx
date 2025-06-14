import React, { useContext, useEffect, useState } from "react";
import { styles } from "./style";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import { AuthContext } from "@/context/AuthContext";
import CustomButton from "@/components/ui/CustomButton";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";

const Home = () => {
  const { userInfo } = useContext(AuthContext);
  const { colors } = useTheme();
  const router = useRouter();
   const goToProduct = () => {
    router.push({
      pathname: '/fp/[gtin]',
      params: { gtin: '1234567890126', search: 'true' },
    });

  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* En-tête avec ImageBackground */}
          <View style={styles.header}>
            <ImageBackground
              source={require("@/assets/images/tico_intro.png")}
              resizeMode="contain"
              style={styles.imageBackground}
            >
              {userInfo?.username && (
                <Text
                  style={styles.greeting}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-2xl text-center"
                >
                  Bonjour {userInfo?.username} !
                </Text>
              )}
              <Image
                source={require("@/assets/images/hands.png")}
                style={styles.handsImage}
                resizeMode="contain"
              />
            </ImageBackground>
          </View>
          {/* Boutons */}
          <View style={styles.buttonsContainer} className="w-[80%]">
            {[
               { title: "Profil et récompenses", route: "hometab/profile" },
              { title: "La mission de TiCO", route: "hometab/mission" },
              { title: "Historique de scan", route: "/hometab/history" },
              { title: "Produits à consulter", route: "hometab/laterProducts" },
              { title: "Suivi de mes demandes", route: "/hometab/demands" },
            ].map((btn, idx) => (
              <CustomButton
                key={idx}
                title={btn.title}
                onPress={() => router.push(btn.route as any)}
                accessibilityLabel="Bouton pour partager TiCO"
                accessibilityHint="Ouvre les options de partage pour l'application TiCO"
                style={{
                  width: "100%",
                  maxWidth: 280,
                  minWidth: 150,
                  backgroundColor: (colors as any)["custom-green-text"],
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
