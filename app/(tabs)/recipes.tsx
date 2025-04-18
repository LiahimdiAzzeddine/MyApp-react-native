import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, ScrollView, ActivityIndicator, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Utiliser Ionicons pour les icônes
import { useTheme } from '@react-navigation/native';
import useRecipesLast from '@/hooks/recipes/useRecipesLast';
import Item from "@/components/ui/ItemRecipe";
import LoadingState from "@/components/recipes/LoadingState";
import EmptyState from "@/components/recipes/EmptyState";
import ErrorState from "@/components/recipes/ErrorState";
import RecipeDetails from "@/components/recipes/RecipeDetails";
const Recipes = () => {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalRecipe, setShowModalRecipe] = useState(false);
  const [selectedRecette, setSelectedRecette] = useState(null);
  const [showModalAddRecipe, setShowModalAddRecipe] = useState(false);

  const itemsPerPage = 10;

  // Utilisation correcte du hook : on passe regimePreferences et allergenPreferences à null, et title à searchTerm
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

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecette(recipe);
    setShowModalRecipe(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Tit'recettes</Text>
      </View>

      {/* Barre de recherche */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une recette..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => handleSearch(searchTerm)}>
          <Ionicons name="search-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Liste des recettes */}
      <ScrollView style={styles.recipeList}>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : paginatedRecipes.length > 0 ? (
          paginatedRecipes.map((recipe: any) => (
            <Item key={recipe.id} recipe={recipe} onPress={() => handleRecipeClick(recipe)} />
          ))
        ) : (
          <EmptyState />
        )}
      </ScrollView>

      {/* Pagination */}
      {totalPages > 1 && (
        <View style={styles.pagination}>
          <Button
            title="Précédent"
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          <Text style={[styles.pageText, { color: colors.text }]}>
            Page {currentPage} sur {totalPages}
          </Text>
          <Button
            title="Suivant"
            onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </View>
      )}

      {/* Modal pour ajouter une recette */}
      <Button
        title="Proposer une recette"
        onPress={() => setShowModalAddRecipe(true)}
        color={colors.primary}
      />

      {/* Modale pour afficher les détails de la recette */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalRecipe}
        onRequestClose={() => setShowModalRecipe(false)}
      >
        <View style={styles.modalView}>
          <RecipeDetails recipe={selectedRecette} />
          <Button title="Fermer" onPress={() => setShowModalRecipe(false)} />
        </View>
      </Modal>

      {/* Modale pour ajouter une recette */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalAddRecipe}
        onRequestClose={() => setShowModalAddRecipe(false)}
      >
        <View style={styles.modalView}>
          <Text>Ajouter une nouvelle recette</Text>
          {/* Formulaire ici */}
          <Button title="Fermer" onPress={() => setShowModalAddRecipe(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf2f0',
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
  },
  recipeList: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Recipes;
