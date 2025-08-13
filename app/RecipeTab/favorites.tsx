import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";
import { SafeAreaView } from "react-native-safe-area-context";

import Item from "@/components/recipes/ItemRecipe";
import LoadingState from "@/components/tips/LoadingState";
import ErrorState from "@/components/tips/ErrorState";

import { getRFavorites } from "@/utils/favoritesController";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";

const Favorites = () => {
  const router = useRouter();

  const [tips, setTips] = useState<any[]>([]);
  const [loadingRecipes, setloadingRecipes] = useState(true);
  const [errorTips, setErrorTips] = useState<string | null>(null);
  const { lastUpdatedFR } = useAppContext();
  const backgroundImage = require("@/assets/images/recipes/background.png");

  useEffect(() => {

    const fetchFavorites = async () => {
      try {
        setloadingRecipes(true);
        const favorites = await getRFavorites();
        setTips(favorites);
        setErrorTips(null);
      } catch (error) {
        setErrorTips("Erreur lors du chargement des favoris.");
      } finally {
        setloadingRecipes(false);
      }
    };

    fetchFavorites();
  }, [lastUpdatedFR]);

  const OpenRecipe = (recipe: any) => {
   router.push({
      pathname: "/recipetab/recipe/[id]",
      params: { id: recipe.id.toString() }, 
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <Item
      key={item.id}
      recipe={item}
      index={index}
      length={tips.length} 
      onPress={() => OpenRecipe(item)}
      />
  );

  return (
    <SafeAreaView
      className="flex-1 bg-[#ffeda3]"
      edges={["bottom", "left", "right"]}
    >
      <View style={styles.Radius}>
        <RenderHeaderTab
          title="Ma sélection de Tit’Recettes"
          titleColor="#c32721"
          backgroundImage={backgroundImage}
        />

        <View className="h-full bg-white">
          {loadingRecipes ? (
            <LoadingState />
          ) : errorTips ? (
            <ErrorState message={errorTips} />
          ) : tips.length > 0 ? (
            <FlatList
              data={tips}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.container}>
              <Ionicons name={"alert-circle"} size={64} color={"#c32721"} style={{paddingBottom:10}} />

              <Text style={[styles.title, { color: "#c32721" }]} className="leading-archivo">
                Vous n’avez pas encore de Tit’recettes dans votre sélection.
              {'\n'} 
               Pour retrouver facilement vos Tit’recettes préférées, pensez à les ajouter en favori.
             {'\n'} 
                Vous y aurez accès à tout moment, même lorsque vous serez hors ligne !
              </Text>
            </View>
          )}
        </View>
      </View>

      <View id="footer" style={{ minHeight: 70 }} />
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  listContent: {
    padding: 10,
  },
  container: {
    alignItems: "center",
    padding: 16,
    textAlign: "center",
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontFamily: "ArchivoLight",
    marginVertical: 2,
    textAlign: "center",
  },
  subtitle: {
    color: "#6B7280",
    maxWidth: 300,
    textAlign: "center",
  },
  Radius: {
    flex: 1,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  offlineMessage: {
    backgroundColor: "#FFD2D2",
    padding: 12,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  offlineText: {
    color: "#900",
    fontSize: 14,
    fontFamily: "ArchivoBold",
    textAlign: "center",
  },
});