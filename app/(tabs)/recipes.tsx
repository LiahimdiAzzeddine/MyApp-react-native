import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import useRecipesLast from "@/hooks/recipes/useRecipesLast";
import Item from "@/components/recipes/ItemRecipe";
import LoadingState from "@/components/recipes/LoadingState";
import EmptyState from "@/components/recipes/EmptyState";
import ErrorState from "@/components/recipes/ErrorState";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";

const Recipes = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const backgroundImage = require("@/assets/images/recipes/background.png");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const { recipes, loading, error } = useRecipesLast(null, null, searchTerm);

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
      pathname: "/recipetab/recipe",
      params: { id: recipe.id.toString() }, // Assurez-vous que c'est une string
    });
  };

  const goToAddRecipe = () => {
    router.push("/recipetab/suggestrecipe");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <RenderHeaderTab
        title="Tit'recettes"
        titleColor="#c32721"
        backgroundImage={backgroundImage}
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { borderColor: colors.border }]}
          placeholder="Rechercher une recette..."
          placeholderTextColor={colors.text}
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => handleSearch(searchTerm)}>
          <Ionicons name="search" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

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

      {totalPages > 1 && (
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <Text
              style={[styles.pageBtn, currentPage === 1 && styles.disabled]}
            >
              ◀
            </Text>
          </TouchableOpacity>

          <Text style={[styles.pageText, { color: colors.text }]}>
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
              ▶
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        className="bg-custom-red rounded-md py-2 px-4 mb-6 m-auto"
        onPress={goToAddRecipe}
      >
        <Text className="text-base text-white">Proposer une recette</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  searchContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  recipeList: { flex: 1,padding:10 },
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
