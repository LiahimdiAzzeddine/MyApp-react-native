import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import useRecipesLast from "@/hooks/recipes/useRecipesLast";
import Item from "@/components/recipes/ItemRecipe";
import LoadingState from "@/components/tips/LoadingState";
import EmptyState from "@/components/recipes/EmptyState";
import ErrorState from "@/components/recipes/ErrorState";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";
import { AppContext } from "@/context/AppContext";
const Search = require("@/assets/images/recipes/search.png");
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPreferences } from "@/utils/storage";
import { AuthContext } from "@/context/AuthContext";


const Recipes = () => {
  const [regimePreferences, setRegimePreferences] = useState<any>(null);
  const [allergenPreferences, setAllergenPreferences] = useState<any>(null);
  const { colors } = useTheme();
  const router = useRouter();
  const backgroundImage = require("@/assets/images/recipes/background.png");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const context = useContext(AppContext);
  const { userToken, userInfo } = useContext(AuthContext);


  if (!context) {
    throw new Error("AppContext must be used within a AppProvider");
  }
   const { lastUpdatedR } = context;
    useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const storedPreferences = await getPreferences(String(userInfo?.id));
        setRegimePreferences([...storedPreferences?.regime??[]]);
        setAllergenPreferences([...storedPreferences?.allergen??[]]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des préférences :",
          error
        );
      }
    };

    fetchPreferences();
  }, [userInfo,lastUpdatedR]);
  const { searchRecipes,isOnline } = context;

  const itemsPerPage = 10;
  const { recipes, loading, error } = useRecipesLast(
    regimePreferences,
    allergenPreferences,
      searchTerm);

  const paginatedRecipes = (() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return recipes.slice(startIndex, startIndex + itemsPerPage);
  })();

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const goToRecipeDetails = (recipe: any) => {
    router.push({
      pathname: "/recipetab/recipe/[id]",
      params: { id: recipe.id.toString() }, 
    });
  };

  const goToAddRecipe = () => {
    router.push("/recipetab/suggestrecipe");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fdf2f0]" edges={['bottom', 'left', 'right']}>
      <View style={styles.Radius}>
        {/* Header */}
        <RenderHeaderTab
          title="Tit'recettes"
          titleColor="#c32721"
          backgroundImage={backgroundImage}
        />
        {searchRecipes && (
          <View style={styles.searchContainer}>
            <Image
              source={Search}
              style={{ width: 45, height: 43 }}
              resizeMode="contain"
            />
            <TextInput
              style={[styles.searchInput]}
              placeholder="Rechercher une recette..."
              placeholderTextColor={colors.text}
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>
        )}

        <ScrollView style={styles.recipeList}>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} />
          ) : paginatedRecipes.length > 0 ? (
            paginatedRecipes.map((recipe: any, index: number) => (
              <Item
                key={recipe.id}
                recipe={recipe}
                index={index}
                length={paginatedRecipes.length}
                onPress={() => goToRecipeDetails(recipe)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </ScrollView>
      </View>
      <View className="bg-[#fdf2f0]" id="footer">
        {totalPages > 1 ? (
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <Text
                style={[styles.pageBtn, currentPage === 1 && styles.disabled]}
              >
             <AntDesign name="left" size={22} color="black" />
              </Text>
            </TouchableOpacity>

            <Text style={[styles.pageText, { color: "#c32721" }]}>
              Page {currentPage} sur {totalPages}
            </Text>

            <TouchableOpacity
              onPress={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <Text
                style={[
                  styles.pageBtn,
                  currentPage === totalPages && styles.disabled,
                ]}
              >
               <AntDesign name="right" size={22} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        ):(
          <Text className="h-3"></Text>
        )}

        <TouchableOpacity
          className="bg-custom-red rounded-xl py-3 px-4 m-auto"
          style={{marginBottom:5}}
          onPress={goToAddRecipe}
        >
          <Text className="text-base text-white">Proposer une recette</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  Radius: {
    flex: 1,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom:10,
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    height: 43,
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    fontFamily: "ArchivoLightItalic",

    borderColor:"#c32721",
    color:"#c32721"
  },
  recipeList: { flex: 1, padding: 10 },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  pageText: { fontSize: 16 },
  pageBtn: { fontSize: 20, color: "#007AFF" },
  disabled: { color: "#ccc" },
  addButton: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Recipes;
