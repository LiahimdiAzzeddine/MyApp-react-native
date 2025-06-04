/**
 * Interface pour les données brutes d'un conseil provenant de l'API
 */
interface RawTipData {
    id?: string | number;
    titre?: string;
    details?: string;
    created_at?: string;
    publication?: string;
    category?: {
      label?: string;
      image_url?: string;
    };
    // Autres propriétés potentielles du conseil brut...
  }
  
  /**
   * Interface pour un conseil formaté
   */
  export interface FormattedTip {
    id: string | number | null;
    title: string;
    image: string;
    details: string;
    createdAt: string;
    category: {
      name: string;
      image: string;
    };
    publicationDate: string;
  }
  
  /**
   * Formate les données brutes d'un conseil en un format utilisable par l'application
   * @param tipData - Les données brutes du conseil
   * @returns Un objet conseil formaté
   */
  export function createTip(tipData: RawTipData): FormattedTip {
    // Formater l'URL de l'image
    const formatImageUrl = (url?: string): string => {
      if (!url) return ''; // Retourner une chaîne vide si l'URL est undefined
      
      let formattedUrl = url.trim().replace(/\s/g, '%20'); // Remplacer les espaces
      
      // Ajouter https:// si manquant
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
      }
      
      return formattedUrl;
    };
const stripHtml = (html:any) => {
  return html
    .replace(/<br\s*\/?>/gi, '\n')     // Remplace <br> par 1 saut de ligne
    .replace(/<\/p>/gi, '\n')          // Remplace </p> par 1 saut de ligne
    .replace(/<[^>]+>/g, '')           // Supprime toutes les autres balises HTML
    .replace(/\n{2,}/g, '\n\n ')          // Remplace plusieurs sauts de ligne par un seul
    .trim();
};


  
    // Retourner le conseil formaté
    return {
      id: tipData.id ?? null,
      title: tipData.titre ?? "Titre du conseil",
      image: formatImageUrl(tipData.category?.image_url), // Formater l'image principale
      details: stripHtml(tipData.details) ?? "Détails non disponibles",
      createdAt: tipData.created_at ?? "Date inconnue",
      category: {
        name: tipData.category?.label ?? "Catégorie inconnue",  // Nom de la catégorie
        image: formatImageUrl(tipData.category?.image_url),     // Formater l'image de la catégorie
      },
      publicationDate: tipData.publication ?? "Date de publication inconnue",  // Date de publication
    };
  }
  
  /**
   * Formate plusieurs conseils à partir d'un tableau de données brutes
   * @param tipsData - Tableau de données brutes de conseils
   * @returns Un tableau de conseils formatés
   */
  export function createTips(tipsData: RawTipData[]): FormattedTip[] {
    return tipsData.map(tip => createTip(tip));
  }