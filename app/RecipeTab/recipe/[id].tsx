import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import useRecipeById from '@/hooks/recipes/useRecipeById';
import RecipeDetails from '@/components/recipes/RecipeDetails';
import ErrorMessage from '@/components/recipes/ErrorMessage';

const Recipe: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipeId = parseInt(id, 10);
  const router = useRouter();
  const pathname = usePathname(); // 👈 Add this line
  const { recipe, loading, error } = useRecipeById(recipeId);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={{ padding: 16 }}>
        <ErrorMessage
          message={error || "No recipe found"}
          onClose={() => router.replace('/')}
          icon=""
        />
      </View>
    );
  }

  return <RecipeDetails recipe={recipe} custom={false} />;
};

export default Recipe;
