
export interface Ingredient {
    qt: string;
    unit: string;
    name: string;
  }
  export type Step = {
  id: string;
  description: string;
};

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
    difficulte: string;
    totalTime: string;
    regimes: string[];
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
  // Types definitions
export interface IngredientInput {
  name: string;
  quantity: string;
  unit: string;
}

export interface RecipeValues {
  titre: string;
  types: string[];
  difficulty: string;
  filters: string[];
  prep_time: string;
  cook_time: string;
  rest_time: string;
  ingredients: IngredientInput[];
  steps: string[];
  image:string|null;
}

  

export interface UseRecipesLastResult {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}
const formatTime = (totalMinutes:number) => {
  if (totalMinutes === 0) return null;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes} min`;
};
const extractMinutes = (timeString:string) => {
  if (!timeString) return 0;

  const hours = timeString.match(/(\d+)\s*h/);
  const minutes = timeString.match(/(\d+)\s*min/);

  let totalMinutes = 0;
  if (hours) totalMinutes += parseInt(hours[1]) * 60;
  if (minutes) totalMinutes += parseInt(minutes[1]);

  return totalMinutes;
};
export const calculateTotalTime = (timecook:string,timerest:string,timebake:string) => {
  const cookTime = extractMinutes(timecook);
  const restTime = extractMinutes(timerest);
  const bakeTime = extractMinutes(timebake);

  const totalMinutes = cookTime + restTime + bakeTime;
  return formatTime(totalMinutes);
};
export const generateImageUrl = (id:number, imageName:string) => {
  
  if (!id || !imageName) return null;

  const idPadded = String(id).padStart(6, '0'); 
  const thousands = idPadded.slice(0, 3); 
  const hundreds = idPadded.slice(3); 
  return "https://files.foodhea.com/recipe/files/"+thousands+"/"+hundreds+"/"+imageName;
};

export const convertRecetteToSteps = (recette: Record<string, string>): Step[] => {
  return Object.entries(recette).map(([id, description]) => ({
    id,
    description,
  }));
};

export const groupSteps = (steps: Step[], groupSize: number): Step[][] => {
  const groups: Step[][] = [];
  for (let i = 0; i < steps.length; i += groupSize) {
    groups.push(steps.slice(i, i + groupSize));
  }
  return groups;
};
