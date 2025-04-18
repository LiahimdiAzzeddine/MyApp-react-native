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