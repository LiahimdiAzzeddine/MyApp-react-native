
// Définition des interfaces
export interface Additif {
    code: string;
    label: string;
    label2: string;
    fonction1: string;
    fonction2: string;
    noteUFC: string;
    url: string;
  }
  
  export interface Ingredient {
    id: string;
    quantity: string;
    label: string;
    codeAdditif: string;
    allergene: string;
    additif: Additif | null;
    children: Ingredient[];
  }
  
  export interface Line {
    id: string;
    idNut: string;
    parent: string;
    name: string;
    quantity: string;
    unit: string;
    order: number;
    vnr: string;
    symbol: string;
    nutType: string;
    forced: boolean;
  }
  
  export  interface Recipe {
    // Dépend de ta fonction createRecipe
    [key: string]: any;
  }
  
  export interface Product {
    commentaire: any;
    isFoodheaProduct: boolean;
    image: string | null;
    name: string | null;
    generic_name: string | null;
    transparency_scale: number;
    trademark: string | null;
    markInfo: string | null;
    provider: string | null;
    nutriscore: string | null;
    nova: string | null;
    gtin: string;
    additifs: Additif[];
    adviceconso: string | null;
    planetScore: string;
    nutriscore_comment: string | null;
    recipes: Recipe[];
    portion: string | null;
    portioneq: string | null;
    useportion: string | null;
    unit: string | null;
    lines: Line[];
    ingredients: Ingredient[];
    allergens: string[];
    origin: any[]; // Tu as mis originJson = [], si jamais tu veux définir mieux, dis-le moi
    emballage: string | null;
    transformation: string | null;
    transcondi: string | null;
    alreadyRequest: boolean;
    scores: any;
    conservation: any;
    utilisation: any;
    engagements: any;
  }
  