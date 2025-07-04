import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link, Route, useRouter } from "expo-router";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import FeaturePopup from "./ui/FeaturePopup";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Images
const Tico = require("@/assets/images/headers/tico.png");
const ReturnImage = require("@/assets/images/headers/flech.png");
const VX = require("@/assets/images/headers/X.png");
const BX = require("@/assets/images/headers/bx.png");
const flecheRecette = require("@/assets/images/headers/fleche.png");
const OF = require("@/assets/images/headers/OFleche.png");
const VF = require("@/assets/images/headers/vf.png");
const FilterConseils = require("@/assets/images/tips/FILTRE_CONSEILS.png");
const FilterRecettes = require("@/assets/images/recipes/FILTRE_RECETTES.png");
const ProfilInfo = require("@/assets/images/profil/info.png");
const Story = require("@/assets/images/storys/story.png");
const Search = require("@/assets/images/recipes/search.png");

type Props = {
  color?: string;
  image?: "x" | "rf" | "bf" | "bx" | "of" | "vf" | "vx";
  back?: boolean;
  isRecipes?: boolean;
  isTips?: boolean;
  isProfil?: boolean;
  isHome?: boolean;
  goTo?: string|null;
};

const CustomHeader = ({
  color = "#fff",
  image,
  back = true,
  isRecipes = false,
  isTips = false,
  isProfil = false,
  isHome = false,
  goTo=null,
}: Props) => {
  const context = useContext(AppContext);
  const { userInfo } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);

  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  const hasLevelcurieux = userInfo?.levels?.some((level) => level.id === 2);

  const { setSearchRecipes, searchRecipes } = context;
  const router = useRouter();

  const imageMap: Record<string, any> = {
    x: BX,
    rf: flecheRecette,
    bf: ReturnImage,
    bx: BX,
    of: OF,
    vf: VF,
    vx: VX,
  };

  const SRC = imageMap[image || ""] || ReturnImage;
  useEffect(() => {
    const checkTooltipSeen = async () => {
      const seen = await AsyncStorage.getItem("tooltipSeen");
      if (seen && isHome && hasLevelcurieux) {
        setShowPopup(seen != "true");
      }
    };
    checkTooltipSeen();
  }, [isHome, hasLevelcurieux]);
const handleBackPress = () => {
    
      try {
        if (goTo) {
          router.replace(goTo as Route);
        } else if (back) {
          if (router.canGoBack()) {
            
            router.back();
          } else {
            router.replace("/(tabs)");
          }
        } else {
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback sécurisé
        router.replace("/(tabs)");
      }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: color }]}>
      <View style={[styles.container, { backgroundColor: color }]}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.iconButton}
        >
          <Image source={SRC} style={styles.iconImage} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.ticoContainer}>
          {isRecipes && (
            <>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSearchRecipes(!searchRecipes)}
              >
                <Image
                  source={Search}
                  style={styles.filter}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.push("/recipetab/recipeSettings")}
              >
                <Image
                  source={FilterRecettes}
                  style={styles.filter}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </>
          )}

          {isTips && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/tiptab/tipSettings")}
            >
              <Image
                source={FilterConseils}
                style={styles.filter}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          {isProfil && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/hometab/infoProfil")}
            >
              <Image
                source={ProfilInfo}
                style={styles.filter}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          {isHome && hasLevelcurieux && (
            <View
              className="flex flex-row gap-y-2 items-end align-bottom text-start"
              style={{ alignItems: "flex-end" }}
            >
              <Link
                href={"/hometab/story"}
                className="ArchivoLight leading-none  text-custom-green-text text-lg underline underline-offset-0"
              >
                Stories​
              </Link>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.push("/hometab/story")}
              >
                <Image
                  source={Story}
                  style={styles.filter}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <FeaturePopup open={showPopup} />
            </View>
          )}

          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={Tico}
              style={styles.ticoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    width: "100%",
  },
  container: {
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 0,
    margin: 0,
  },
  iconImage: {
    height: 40,
    width: 40,
  },
  ticoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticoImage: {
    height: 24,
    width: 70,
  },
  filter: {
    height: 33,
    width: 50,
  },
});

export default CustomHeader;
