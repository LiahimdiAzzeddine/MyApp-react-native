import React from 'react';
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Pour la navigation
import useRecipeById from '@/hooks/recipes/useRecipeById';
import RecipeDetails from './RecipeDetails';
import ErrorMessage from '@/components/recipes/ErrorMessage';

const Recipe: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number }; // Récupère l'id depuis les paramètres de la route
  const { recipe, loading, error } = useRecipeById(id);
  const recipeForme = recipe ?recipe: {};
  
  const goToPage = (path: string) => {
    navigation.navigate(path); // Utilisation de la navigation dans React Native
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Gestion des erreurs de chargement
  if (error || !recipe) {
    return (
      <View style={{ padding: 16 }}>
        <ErrorMessage
          message={error || "No recipe found"}
          onClose={() => goToPage("Tab3")} // Remplacez Tab3 par le nom de la page à rediriger
        />
      </View>
    );
  }

  return (
    <RecipeDetails recipe={recipeForme} />
  );
};

export default Recipe;
