
export function createRecipe(recipeData: any) {
    const extractMinutes = (timeString: string) => {
      if (!timeString) return 0;
  
      const hours = timeString.match(/(\d+)\s*h/);
      const minutes = timeString.match(/(\d+)\s*min/);
  
      let totalMinutes = 0;
      if (hours) totalMinutes += parseInt(hours[1]) * 60;
      if (minutes) totalMinutes += parseInt(minutes[1]);
  
      return totalMinutes;
    };
  
    // Fonction pour formater les minutes en heures et minutes
    const formatTime = (totalMinutes: number) => {
      if (totalMinutes === 0) return null;
  
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
  
      if (hours === 0) return `${minutes} min`;
      if (minutes === 0) return `${hours}h`;
      return `${hours}h ${minutes} min`;
    };
  
    const calculateTotalTime = () => {
      const cookTime = extractMinutes(recipeData?.timecook);
      const restTime = extractMinutes(recipeData?.timerest);
      const bakeTime = extractMinutes(recipeData?.timebake);
  
      const totalMinutes = cookTime + restTime + bakeTime;
      return formatTime(totalMinutes);
    };
  
    const ingredients = Array.isArray(recipeData.ingredients)
      ? recipeData.ingredients.map((ingredient: any) => ({
          qt: ingredient.qt ?? "",
          unit: ingredient.unit ?? "",
          name: ingredient.name ?? "",
        }))
      : [];
  
    const generateImageUrl = (id: string, imageName: string) => {
      if (!id || !imageName) return null;
  
      const idPadded = String(id).padStart(6, '0'); 
      const thousands = idPadded.slice(0, 3); 
      const hundreds = idPadded.slice(3); 
      return "https://files.foodhea.com/recipe/files/" + thousands + "/" + hundreds + "/" + imageName;
    };
  
    const recette =
      recipeData.recette && typeof recipeData.recette === "object"
        ? Object.keys(recipeData.recette).map((stepKey: string) => ({
            step: stepKey,
            description: recipeData.recette[stepKey] ?? "",
          }))
        : [];
  
    const totalTime = calculateTotalTime();
  
    return {
      id: recipeData.id ?? null,
      title: recipeData.title ?? "Titre de la recette",
      subtitle: recipeData.subtitle ?? "Sous-titre de la recette",
      nbperson: recipeData.nbperson ?? 0,
      image: generateImageUrl(recipeData.id, recipeData.image_name),
      image_name: recipeData.image_name ? recipeData.image_name : null,
      recette,
      timecook: recipeData.timecook ?? "Temps de cuisson non précisé",
      timebake: recipeData.timebake ?? "Temps de cuisson au four non précisé",
      timerest: recipeData.timerest ?? "Temps de repos non précisé",
      ingredients,
      labels: recipeData.labels ?? "",
      labels_more: recipeData.labels_more ?? "",
      regimes: recipeData.regimes ?? [],
      type: recipeData.type ?? "Inconnu",
      totalTime: totalTime ?? "Indisponible",
    };
  }