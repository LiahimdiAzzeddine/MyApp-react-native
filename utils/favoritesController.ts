// utils/favoritesController.ts
import { Recipe } from "@/types/recipe";
import { FormattedTip } from "@/types/tip";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "TIP_FAVORITES";
const FAVORITESRECIPE_KEY = "RECIPES_FAVORITES";


export const getFavorites = async (): Promise<any[]> => {
  const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

export const isFavorite = async (tipId: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some((item) => item.id === tipId);
};

export const getFavorite = async (tipId: string): Promise<FormattedTip | undefined> => {
  const favorites = await getFavorites();
  return favorites.find((item) => String(item.id) === tipId);
};

export const addFavorite = async (tip: any): Promise<void> => {
  const favorites = await getFavorites();
  const alreadyExists = favorites.find((item) => item.id === tip.id);
  if (!alreadyExists) {
    favorites.push(tip);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = async (tipId: string): Promise<void> => {
  const favorites = await getFavorites();
  const updatedFavorites = favorites.filter((item) => item.id !== tipId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};


export const getRFavorites = async (): Promise<any[]> => {
  const jsonValue = await AsyncStorage.getItem(FAVORITESRECIPE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

export const isRFavorite = async (Id: string): Promise<boolean> => {
  const favorites = await getRFavorites();
  return favorites.some((item) => item.id === Id);
};

export const getRFavorite = async (Id: string): Promise<Recipe | undefined> => {
  const favorites = await getRFavorites();
  return favorites.find((item) => String(item.id) === Id);
};

export const addRFavorite = async (recipe: any): Promise<void> => {
  const favorites = await getRFavorites();
  const alreadyExists = favorites.find((item) => item.id === recipe.id);
  if (!alreadyExists) {
    favorites.push(recipe);
    await AsyncStorage.setItem(FAVORITESRECIPE_KEY, JSON.stringify(favorites));
  }
};

export const removeRFavorite = async (Id: string): Promise<void> => {
  const favorites = await getRFavorites();
  const updatedFavorites = favorites.filter((item) => item.id !== Id);
  await AsyncStorage.setItem(FAVORITESRECIPE_KEY, JSON.stringify(updatedFavorites));
};
