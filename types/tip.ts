export interface TipCategory {
    id: number;
    label: string;
    image_url: string;
    created: string;
    updated: string;
  }
  
  export interface Tip {
    id: number;
    id_categ: number;
    titre: string;
    details: string;
    publication: string;
    created_at: string;
    updated_at: string;
    category: TipCategory;
  }
  
export interface UseLastTipsResult {
    tips: Tip[];
    loading: boolean;
    error: string | null;
  }
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