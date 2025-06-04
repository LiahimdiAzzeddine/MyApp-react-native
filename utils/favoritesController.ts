// utils/favoritesController.ts
import { FormattedTip } from "@/types/tip";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "TIP_FAVORITES";

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
