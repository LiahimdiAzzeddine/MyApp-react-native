import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import useSuggestRecipe from "@/hooks/recipes/useSuggestRecipe";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";
import * as ImagePicker from "expo-image-picker";
import { IngredientInput, RecipeValues } from "@/types/recipe";
import RecipeDetails from "@/components/recipes/RecipeDetails";
import RecipesHeader from "@/components/ui/recipeHeader";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

const backgroundImage = require("@/assets/images/recipes/background.png");
const backgroundPicker = require("@/assets/images/recipes/pickerbg.png");

interface ValidationErrors {
  titre?: string;
  types?: string;
  difficulty?: string;
  prep_time?: string;
  cook_time?: string;
  rest_time?: string;
  ingredients?: string;
  steps?: string;
}

const Suggestrecipe: React.FC = () => {
  const { handleSubmit, loading, error, success } = useSuggestRecipe();
  const [stepInput, setStepInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  const [values, setValues] = useState<RecipeValues>({
    titre: "",
    types: [],
    difficulty: "",
    filters: [],
    prep_time: "",
    cook_time: "",
    rest_time: "",
    ingredients: [],
    steps: [],
    image: image,
  });

  const [ingredientInput, setIngredientInput] = useState<IngredientInput>({
    name: "",
    quantity: "",
    unit: "",
  });

  // Fonction de validation des données
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    // Validation du titre
    if (!values.titre.trim()) {
      errors.titre = "Le titre de la recette est obligatoire";
      isValid = false;
    } else if (values.titre.trim().length < 3) {
      errors.titre = "Le titre doit contenir au moins 3 caractères";
      isValid = false;
    }

    // Validation du type de plat
    if (values.types.length === 0) {
      errors.types = "Veuillez sélectionner au moins un type de plat";
      isValid = false;
    }

    // Validation de la difficulté
    if (!values.difficulty) {
      errors.difficulty = "Veuillez sélectionner une difficulté";
      isValid = false;
    }

    // Validation des temps (doivent être des nombres positifs)
    if (
      !values.prep_time ||
      isNaN(Number(values.prep_time)) ||
      Number(values.prep_time) <= 0
    ) {
      errors.prep_time = "Le temps de préparation doit être un nombre positif";
      isValid = false;
    }

    if (
      !values.cook_time ||
      isNaN(Number(values.cook_time)) ||
      Number(values.cook_time) < 0
    ) {
      errors.cook_time =
        "Le temps de cuisson doit être un nombre positif ou zéro";
      isValid = false;
    }

    if (
      values.rest_time &&
      (isNaN(Number(values.rest_time)) || Number(values.rest_time) < 0)
    ) {
      errors.rest_time =
        "Le temps de repos doit être un nombre positif ou zéro";
      isValid = false;
    }

    // Validation des ingrédients
    if (values.ingredients.length === 0) {
      errors.ingredients = "Veuillez ajouter au moins un ingrédient";
      isValid = false;
    }

    // Validation des étapes
    if (values.steps.length === 0) {
      errors.steps = "Veuillez ajouter au moins une étape";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "L'accès à la galerie est nécessaire pour choisir une photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Forcer un recadrage carré
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setValues((prev) => ({ ...prev, image: result.assets[0] }));
    }
  };

  const visualiseRecette = () => {
    if(validateForm()){
       const mappedRecipe = {
      id: Date.now(), // ou un UUID si disponible
      title: values.titre,
      difficulte: values.difficulty,
      timecook: values.cook_time + "min",
      timebake: values.prep_time + "min",
      timerest: values.rest_time + "min",
      regimes: values.filters,
      ingredients: values.ingredients.map((i) => ({
        qt: i.quantity,
        unit: i.unit,
        name: i.name,
      })),
   
      recette: values.steps.reduce(
        (acc: { [key: string]: string }, step, index) => {
          acc[`etape${index + 1}`] = step;
          return acc;
        },
        {}
      ),
      image_name:image? { uri: image }:null, // vide ou une valeur par défaut si besoin
    };
    console.log("🚀 ~ visualiseRecette ~ mappedRecipe:", mappedRecipe);

    setSelectedRecipe(mappedRecipe);
    setModalVisible(true);
    }else{
       Alert.alert(
        "Erreur de validation",
        "Veuillez corriger les erreurs dans le formulaire.",
        [{ text: "OK" }]
      );
    }
   
  };

  const handleFormSubmit = async () => {
    // Réinitialiser les erreurs de validation
    setValidationErrors({});

    // Valider le formulaire
    if (!validateForm()) {
      Alert.alert(
        "Erreur de validation",
        "Veuillez corriger les erreurs dans le formulaire avant de soumettre.",
        [{ text: "OK" }]
      );
      return;
    }

    // Mettre à jour l'image dans les valeurs
    const finalValues = { ...values};

    setIsLoading(true);
    try {
      await handleSubmit(finalValues);   
    } catch (err) {
      Alert.alert("Erreur", "Une erreur est survenue lors de la soumission.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleInputChange = (name: keyof RecipeValues, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    // Effacer l'erreur de validation pour ce champ
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleIngredientChange = (
    name: keyof IngredientInput,
    value: string
  ) => {
    setIngredientInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addIngredient = () => {
    if (ingredientInput.name.trim() && ingredientInput.quantity.trim()) {
      setValues((prevValues) => ({
        ...prevValues,
        ingredients: [
          ...prevValues.ingredients,
          {
            ...ingredientInput,
            name: ingredientInput.name.trim(),
            quantity: ingredientInput.quantity.trim(),
            unit: ingredientInput.unit.trim(),
          },
        ],
      }));
      setIngredientInput({ name: "", quantity: "", unit: "" });
      // Effacer l'erreur de validation pour les ingrédients
      if (validationErrors.ingredients) {
        setValidationErrors((prev) => ({ ...prev, ingredients: undefined }));
      }
    } else {
      Alert.alert(
        "Erreur",
        "Veuillez remplir au moins le nom et la quantité de l'ingrédient."
      );
    }
  };

  const removeIngredient = (indexToRemove: number) => {
    Alert.alert("Attention", "Supprimer l'ingrédient ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Supprimer",
        onPress: () => {
          setValues((prevValues) => ({
            ...prevValues,
            ingredients: prevValues.ingredients.filter(
              (_, index) => index !== indexToRemove
            ),
          }));
        },
      },
    ]);
  };

  const addStep = () => {
    if (stepInput.trim()) {
      setValues((prevValues) => ({
        ...prevValues,
        steps: [...prevValues.steps, stepInput.trim()],
      }));
      setStepInput("");
      // Effacer l'erreur de validation pour les étapes
      if (validationErrors.steps) {
        setValidationErrors((prev) => ({ ...prev, steps: undefined }));
      }
    } else {
      Alert.alert("Erreur", "Veuillez saisir une étape valide.");
    }
  };

  const removeStep = (indexToRemove: number) => {
    Alert.alert("Attention", "Supprimer cette étape ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Supprimer",
        onPress: () => {
          setValues((prevValues) => ({
            ...prevValues,
            steps: prevValues.steps.filter(
              (_, index) => index !== indexToRemove
            ),
          }));
        },
      },
    ]);
  };

  const addFilter = (filter: string) => {
    setValues((prevValues) => {
      const filters = prevValues.filters.includes(filter)
        ? prevValues.filters.filter((f) => f !== filter)
        : [...prevValues.filters, filter];
      return { ...prevValues, filters };
    });
  };

  const handleTypeToggle = (type: string) => {
    setValues((prevValues) => {
      const types = [...prevValues.types];
      if (types.includes(type)) {
        return { ...prevValues, types: types.filter((t) => t !== type) };
      } else {
        const newTypes = [...types, type];
        // Effacer l'erreur de validation pour les types
        if (validationErrors.types && newTypes.length > 0) {
          setValidationErrors((prev) => ({ ...prev, types: undefined }));
        }
        return { ...prevValues, types: newTypes };
      }
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    handleInputChange("difficulty", difficulty);
    // Effacer l'erreur de validation pour la difficulté
    if (validationErrors.difficulty) {
      setValidationErrors((prev) => ({ ...prev, difficulty: undefined }));
    }
  };

  // Fonction utilitaire pour convertir les minutes en heures et minutes
  function formatTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0
      ? `${hours}h ${minutes > 0 ? `${minutes}min` : ""}`
      : `${minutes}min`;
  }
  useEffect(()=>{
       if (success) {
        setValues({
          titre: "",
          types: [],
          difficulty: "",
          filters: [],
          prep_time: "",
          cook_time: "",
          rest_time: "",
          ingredients: [],
          steps: [],
          image: null,
        });
        setImage(null);
        
        Alert.alert("Succès", "Votre recette a été soumise avec succès !");
        //router.replace("/recipetab/recipes")
      }
  },[success])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={"padding"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={styles.container}>
            <RenderHeaderTab
              title="Proposer une recette"
              titleColor="#c32721"
              backgroundImage={backgroundImage}
            />
            <View style={styles.formContainer}>
              {/* Titre de la recette */}
              <View style={styles.inputGroup}>
                <Text className="text-base" style={styles.label}>
                  Titre de la recette :
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    error?.titre || validationErrors.titre
                      ? styles.inputError
                      : null,
                  ]}
                  value={values.titre}
                  onChangeText={(text) => handleInputChange("titre", text)}
                  placeholder="Titre de la recette"
                  placeholderTextColor="#999"
                />
                {(error?.titre || validationErrors.titre) && (
                  <Text style={styles.errorText}>
                    {error?.titre?.[0] || validationErrors.titre}
                  </Text>
                )}
              </View>

              {/* Type de plats */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Type de plats :</Text>
                <View style={styles.buttonGroup}>
                  {["Entrée", "Plat", "Dessert", "Apéritif", "Boisson"].map(
                    (type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => handleTypeToggle(type)}
                        style={[
                          styles.filterButton,
                          values.types.includes(type)
                            ? styles.activeButton
                            : null,
                        ]}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            values.types.includes(type)
                              ? styles.activeButtonText
                              : null,
                          ]}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
                {(error?.type || validationErrors.types) && (
                  <Text style={styles.errorText}>
                    {error?.type?.[0] || validationErrors.types}
                  </Text>
                )}
              </View>

              {/* Difficulté */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Difficulté :</Text>
                <View style={styles.buttonGroup}>
                  {["Facile", "Moyen", "Difficile"].map((difficulty) => (
                    <TouchableOpacity
                      key={difficulty}
                      onPress={() => handleDifficultyChange(difficulty)}
                      style={[
                        styles.filterButton,
                        values.difficulty === difficulty
                          ? styles.activeButton
                          : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          values.difficulty === difficulty
                            ? styles.activeButtonText
                            : null,
                        ]}
                      >
                        {difficulty}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {(error?.difficulty || validationErrors.difficulty) && (
                  <Text style={styles.errorText}>
                    {error?.difficulty?.[0] || validationErrors.difficulty}
                  </Text>
                )}
              </View>

              {/* Filtres */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Régimes :</Text>
                <View style={styles.buttonGroup}>
                  {[
                    "Végétarien",
                    "Végan",
                    "Sans lactose",
                    "Sans gluten",
                    "Sans oeufs",
                  ].map((filter) => (
                    <TouchableOpacity
                      key={filter}
                      onPress={() => addFilter(filter)}
                      style={[
                        styles.filterButton,
                        values.filters.includes(filter)
                          ? styles.activeButton
                          : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          values.filters.includes(filter)
                            ? styles.activeButtonText
                            : null,
                        ]}
                      >
                        {filter}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {error?.filters && (
                  <Text style={styles.errorText}>{error.filters[0]}</Text>
                )}
              </View>

              {/* Temps de préparation */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Temps de préparation (en min) :
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    error?.prep_time || validationErrors.prep_time
                      ? styles.inputError
                      : null,
                  ]}
                  value={values.prep_time}
                  onChangeText={(text) => handleInputChange("prep_time", text)}
                  placeholder="Temps de préparation"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
                {(error?.prep_time || validationErrors.prep_time) && (
                  <Text style={styles.errorText}>
                    {error?.prep_time?.[0] || validationErrors.prep_time}
                  </Text>
                )}
              </View>

              {/* Temps de cuisson */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Temps de cuisson (en min) :</Text>
                <TextInput
                  style={[
                    styles.input,
                    error?.cook_time || validationErrors.cook_time
                      ? styles.inputError
                      : null,
                  ]}
                  value={values.cook_time}
                  onChangeText={(text) => handleInputChange("cook_time", text)}
                  placeholder="Temps de cuisson"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
                {(error?.cook_time || validationErrors.cook_time) && (
                  <Text style={styles.errorText}>
                    {error?.cook_time?.[0] || validationErrors.cook_time}
                  </Text>
                )}
              </View>

              {/* Temps de repos */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Temps de repos (en min) :</Text>
                <TextInput
                  style={[
                    styles.input,
                    error?.rest_time || validationErrors.rest_time
                      ? styles.inputError
                      : null,
                  ]}
                  value={values.rest_time}
                  onChangeText={(text) => handleInputChange("rest_time", text)}
                  placeholder="Temps de repos"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
                {(error?.rest_time || validationErrors.rest_time) && (
                  <Text style={styles.errorText}>
                    {error?.rest_time?.[0] || validationErrors.rest_time}
                  </Text>
                )}
              </View>

              {/* Temps total */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Temps total :{" "}
                  {Number(values.cook_time) +
                    Number(values.prep_time) +
                    Number(values.rest_time) >
                    0 && (
                    <Text style={styles.boldText}>
                      {formatTime(
                        Number(values.cook_time) +
                          Number(values.prep_time) +
                          Number(values.rest_time)
                      )}
                    </Text>
                  )}
                </Text>
                <Text style={styles.infoText}>
                  Temps total calculé à partir du temps de cuisson, préparation
                  et repos.
                </Text>
              </View>

              {/* Ingrédients */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Ingrédients :</Text>
                <View style={styles.ingredientInputGroup}>
                  <TextInput
                    style={[styles.ingredientInput, { flex: 1 }]}
                    value={ingredientInput.quantity}
                    onChangeText={(text) =>
                      handleIngredientChange("quantity", text)
                    }
                    placeholder="Quantité"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[styles.ingredientInput, { flex: 1 }]}
                    value={ingredientInput.unit}
                    onChangeText={(text) =>
                      handleIngredientChange("unit", text)
                    }
                    placeholder="Unité"
                    placeholderTextColor="#999"
                  />
                  <TextInput
                    style={[styles.ingredientInput, { flex: 2 }]}
                    value={ingredientInput.name}
                    onChangeText={(text) =>
                      handleIngredientChange("name", text)
                    }
                    placeholder="Nom de l'ingrédient"
                    placeholderTextColor="#999"
                  />
                </View>
                {(error?.ingredients || validationErrors.ingredients) && (
                  <Text style={styles.errorText}>
                    {error?.ingredients?.[0] || validationErrors.ingredients}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={addIngredient}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>
                    + ajouter un ingrédient
                  </Text>
                </TouchableOpacity>

                <View style={styles.tagsContainer}>
                  {values.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>
                        {ingredient.quantity}
                        {ingredient.unit} - {ingredient.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeIngredient(index)}
                        style={styles.removeTagButton}
                      >
                        <Text style={styles.removeTagButtonText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              {/* Étapes */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Étapes :</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.multilineInput,
                    error?.steps || validationErrors.steps
                      ? styles.inputError
                      : null,
                  ]}
                  value={stepInput}
                  onChangeText={setStepInput}
                  placeholder="Étape"
                  placeholderTextColor="#999"
                  multiline
                />
                {(error?.steps || validationErrors.steps) && (
                  <Text style={styles.errorText}>
                    {error?.steps?.[0] || validationErrors.steps}
                  </Text>
                )}
                <TouchableOpacity onPress={addStep} style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ ajouter une étape</Text>
                </TouchableOpacity>

                <View style={styles.tagsContainer}>
                  {values.steps.map((step, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>
                        Étape {index + 1}: {step}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeStep(index)}
                        style={styles.removeTagButton}
                      >
                        <Text style={styles.removeTagButtonText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.submitContainer}>
                <View style={styles.containerImg}>
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={styles.imagePreview}
                    />
                  ) : (
                    <TouchableOpacity onPress={pickImage}>
                      <View style={styles.placeholder}>
                        <Image
                          source={backgroundPicker}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 15,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <Text style={styles.addButtonText}>Ajouter une photo</Text>
                  </TouchableOpacity>
                  
                </View>
                <Text className="text-custom-gray pb-8 pt-4" style={{fontFamily:"ArchivoLight"}}>Pas d'inquiétude on se charge du shooting photo !</Text>
                <TouchableOpacity
                  onPress={visualiseRecette}
                  style={styles.visualizeButton}
                  className="bg-custom-red rounded-xl py-3 px-4 mb-4 m-auto"
                >
                  <Text className="text-base text-white ArchivoLight">
                    Je visualise ma recette
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleFormSubmit}
                  style={styles.submitButton}
                  disabled={loading || isLoading}
                  className="rounded-xl py-3 px-4 mb-6 m-auto"
                >
                  <Text style={styles.submitButtonText} className="text-base">
                    {loading || isLoading ? "Envoi..." : "Envoyer ma recette"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {isLoading && <ActivityIndicator size="large" color="#2196F3" />}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedRecipe && (
          <SafeAreaView style={{flex:1,backgroundColor:"#fad4ce"}}  edges={['top', 'left', 'right']}>
          <RecipesHeader   goToPage={() => setModalVisible(false)} />
          <RecipeDetails recipe={selectedRecipe} custom={true} />
          </SafeAreaView>
        )}
        
      </Modal>
    </>
  );
};

export default Suggestrecipe;
