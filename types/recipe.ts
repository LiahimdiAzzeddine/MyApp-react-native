
export interface Ingredient {
    qt: string;
    unit: string;
    name: string;
  }
  
  export interface RecetteEtapes {
    etape1?: string;
    etape2?: string;
    etape3?: string;
    etape4?: string;
    etape5?: string;
    etape6?: string;
  }
  
  export interface Recipe {
    manager: any;
    id: number;
    errmsg: string | null;
    created: string;
    createdby: number;
    updated: string;
    updatedby: number;
    re_visibility: string;
    ownerLabel: string | null;
    id_product: number | null;
    id_client: number | null;
    id_tm: number | null;
    id_reccateg: number | null;
    title: string;
    subtitle: string | null;
    nbperson: number;
    _image: string | null;
    _imageUrl: string;
    ingredients: Ingredient[];
    json_ingredients: any;
    recette: RecetteEtapes;
    allergenes: string;
    labels: string;
    labels_more: string | null;
    timecook: string;
    timebake: string;
    timerest: string;
    timeall: string;
    image_name: string;
    disabled: boolean | null;
    forceJson: boolean;
  }
  

export interface UseRecipesLastResult {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}