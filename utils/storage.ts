import { Product } from '@/types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constantes pour les clés de stockage
const PRODUCTS_KEY = '@MyTiCoApp:products';
const LATER_PRODUCTS_KEY = '@MyTiCoApp:laterProducts';
const MAX_PRODUCTS = 100;

/**
 * Initialise le stockage si nécessaire
 * @returns {Promise<void>}
 */
export const initStorage = async (): Promise<void> => {
  try {
    // Vérifie si les clés existent déjà, sinon initialise avec des tableaux vides
    const productsData = await AsyncStorage.getItem(PRODUCTS_KEY);
    const laterProductsData = await AsyncStorage.getItem(LATER_PRODUCTS_KEY);
    
    if (productsData === null) {
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify([]));
    }
    
    if (laterProductsData === null) {
      await AsyncStorage.setItem(LATER_PRODUCTS_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du stockage:', error);
    throw error;
  }
};

/**
 * Ajoute un produit à la liste des produits scannés
 * @param {Product} product - Le produit à ajouter
 * @returns {Promise<void>}
 */
export const addProduct = async (product: Product): Promise<void> => {
  try {
    await initStorage();
    
    // Récupère la liste actuelle des produits
    const productsJSON = await AsyncStorage.getItem(PRODUCTS_KEY);
    let products: Product[] = productsJSON ? JSON.parse(productsJSON) : [];
    
    // Vérifie si le produit existe déjà (par GTIN) et le supprime si c'est le cas
    products = products.filter(p => p.gtin !== product.gtin);
    
    // Ajoute le nouveau produit au début de la liste (comme un LIFO)
    products.unshift(product);
    
    // Si la liste dépasse 100 produits, supprime le plus ancien
    if (products.length > MAX_PRODUCTS) {
      products = products.slice(0, MAX_PRODUCTS);
    }
    
    // Sauvegarde la liste mise à jour
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit:', error);
    throw error;
  }
};

/**
 * Supprime un produit par son GTIN
 * @param {string} gtin - GTIN du produit à supprimer
 * @returns {Promise<string>} - Message de confirmation
 */
export const deleteByGtin = async (gtin: string): Promise<string> => {
  try {
    await initStorage();
    
    // Récupère la liste actuelle des produits
    const productsJSON = await AsyncStorage.getItem(PRODUCTS_KEY);
    let products: Product[] = productsJSON ? JSON.parse(productsJSON) : [];
    
    // Filtre pour supprimer le produit avec le GTIN spécifié
    const newProducts = products.filter(product => product.gtin !== gtin);
    
    // Vérifie si un produit a été supprimé
    if (newProducts.length === products.length) {
      return `Aucun produit trouvé avec le GTIN ${gtin}.`;
    }
    
    // Sauvegarde la liste mise à jour
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
    return `Produit avec le GTIN ${gtin} supprimé avec succès.`;
  } catch (error) {
    console.error(`Erreur lors de la suppression du produit avec GTIN ${gtin}:`, error);
    throw new Error(`Erreur lors de la suppression: ${error}`);
  }
};

/**
 * Récupère un produit par son code-barres (GTIN)
 * @param {string} gtin - GTIN du produit à récupérer
 * @returns {Promise<Product|null>} - Le produit trouvé ou null
 */
export const getProductByBarcode = async (gtin: string): Promise<Product | null> => {
  try {
    await initStorage();
    
    // Récupère la liste des produits
    const productsJSON = await AsyncStorage.getItem(PRODUCTS_KEY);
    const products: Product[] = productsJSON ? JSON.parse(productsJSON) : [];
    
    // Trouve le produit correspondant au GTIN
    const product = products.find(p => p.gtin === gtin);
    return product || null;
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit avec GTIN ${gtin}:`, error);
    throw error;
  }
};

/**
 * Récupère tous les produits scannés
 * @returns {Promise<Product[]>} - Liste des produits
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    await initStorage();
    
    // Récupère et retourne la liste des produits (déjà dans l'ordre inverse)
    const productsJSON = await AsyncStorage.getItem(PRODUCTS_KEY);
    return productsJSON ? JSON.parse(productsJSON) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les produits:', error);
    throw error;
  }
};

/**
 * Ajoute un produit à la liste "à voir plus tard"
 * @param {Product} product - Le produit à ajouter
 * @returns {Promise<string>} - Message de confirmation
 */
export const addLaterProduct = async (product: Product): Promise<string> => {
  try {
    await initStorage();
    
    // Récupère la liste actuelle des produits "à voir plus tard"
    const laterProductsJSON = await AsyncStorage.getItem(LATER_PRODUCTS_KEY);
    let laterProducts: Product[] = laterProductsJSON ? JSON.parse(laterProductsJSON) : [];
    
    // Vérifie si le produit existe déjà et le remplace s'il existe
    const existingIndex = laterProducts.findIndex(p => p.gtin === product.gtin);
    if (existingIndex !== -1) {
      laterProducts[existingIndex] = product;
    } else {
      // Ajoute le nouveau produit
      laterProducts.push(product);
    }
    // Sauvegarde la liste mise à jour
    await AsyncStorage.setItem(LATER_PRODUCTS_KEY, JSON.stringify(laterProducts));
    return `Produit ajouté avec succès à la liste "à voir plus tard"`;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit à la liste "à voir plus tard":', error);
    throw error;
  }
};

/**
 * Récupère tous les produits de la liste "à voir plus tard"
 * @returns {Promise<Product[]>} - Liste des produits
 */
export const getAllLaterProducts = async (): Promise<Product[]> => {
  try {
    await initStorage();
    
    // Récupère et retourne la liste des produits "à voir plus tard"
    const laterProductsJSON = await AsyncStorage.getItem(LATER_PRODUCTS_KEY);
    return laterProductsJSON ? JSON.parse(laterProductsJSON) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des produits "à voir plus tard":', error);
    throw error;
  }
};

/**
 * Récupère un produit par son GTIN dans la liste "à voir plus tard"
 * @param {string} gtin - GTIN du produit à récupérer
 * @returns {Promise<Product>} - Le produit trouvé
 */
export const getLaterProduct = async (gtin: string): Promise<Product> => {
  try {
    await initStorage();
    
    // Récupère la liste des produits "à voir plus tard"
    const laterProductsJSON = await AsyncStorage.getItem(LATER_PRODUCTS_KEY);
    const laterProducts: Product[] = laterProductsJSON ? JSON.parse(laterProductsJSON) : [];
    
    // Trouve le produit correspondant au GTIN
    const product = laterProducts.find(p => p.gtin === gtin);
    
    if (!product) {
      throw new Error(`Aucun produit trouvé avec le GTIN ${gtin} dans la liste "à voir plus tard"`);
    }
    
    return product;
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit avec GTIN ${gtin}:`, error);
    throw error;
  }
};

/**
 * Supprime un produit de la liste "à voir plus tard" par son GTIN
 * @param {string} gtin - GTIN du produit à supprimer
 * @returns {Promise<void>}
 */
export const deleteProductFromLater = async (gtin: string): Promise<void> => {
  try {
    await initStorage();
    
    // Récupère la liste actuelle des produits "à voir plus tard"
    const laterProductsJSON = await AsyncStorage.getItem(LATER_PRODUCTS_KEY);
    const laterProducts: Product[] = laterProductsJSON ? JSON.parse(laterProductsJSON) : [];
    
    // Filtre pour supprimer le produit avec le GTIN spécifié
    const newLaterProducts = laterProducts.filter(product => product.gtin !== gtin);
    
    // Sauvegarde la liste mise à jour
    await AsyncStorage.setItem(LATER_PRODUCTS_KEY, JSON.stringify(newLaterProducts));
    console.log(`Produit avec GTIN ${gtin} supprimé avec succès de la liste "à voir plus tard".`);
  } catch (error) {
    console.error(`Erreur lors de la suppression du produit avec GTIN ${gtin}:`, error);
    throw error;
  }
};

/**
 * Efface toutes les données stockées
 * @returns {Promise<void>}
 */
export const clearAllStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PRODUCTS_KEY);
    await AsyncStorage.removeItem(LATER_PRODUCTS_KEY);
    await initStorage(); // Réinitialise avec des tableaux vides
    console.log('Toutes les données ont été effacées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'effacement des données:', error);
    throw error;
  }
};