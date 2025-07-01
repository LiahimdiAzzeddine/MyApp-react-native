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
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from '@react-native-picker/picker';

import useSuggestRecipe from "@/hooks/recipes/useSuggestRecipe";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";
import * as ImagePicker from "expo-image-picker";
import { IngredientInput, RecipeValues } from "@/types/recipe";
import RecipeDetails from "@/components/recipes/RecipeDetails";
import RecipesHeader from "@/components/ui/recipeHeader";
//import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'; // ou autre lib pour icône


const backgroundImage = require("@/assets/images/recipes/background.png");
const backgroundPicker = require("@/assets/images/recipes/pickerbg.png");

interface ValidationErrors {
  titre?: string;
  nbperson?: string;
  types?: string;
  difficulty?: string;
  prep_time?: string;
  cook_time?: string;
  rest_time?: string;
  ingredients?: string;
  steps?: string;
  cgus?: string;
}

const Suggestrecipe: React.FC = () => {
  const { handleSubmit, loading, error, success } = useSuggestRecipe();
  const [stepInput, setStepInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedCGUs, setAcceptedCGUs] = useState<boolean>(false);
  const [unit, setUnit] = useState<'min' | 'hour'>('hour');

  const [image, setImage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const router = useRouter();

  const [values, setValues] = useState<RecipeValues>({
    titre: "",
    nbperson: "",
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
    // Validation du nombre de personnes
    if (!values.nbperson.trim()) {
      errors.nbperson = "Le nombre de personnes est obligatoire";
      isValid = false;
    } else if (isNaN(Number(values.nbperson)) || Number(values.nbperson) <= 0 || Number(values.nbperson) > 50) {
      errors.nbperson = "Le nombre de personnes doit être un nombre entre 1 et 50";
      isValid = false;
    }
    if (!acceptedCGUs) {
      errors.cgus = "Vous devez accepter les CGU.";
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
    console.log("🚀 ~ validateForm ~ errors:", errors)
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
    if (validateForm()) {
      const mappedRecipe = {
        id: Date.now(), // ou un UUID si disponible
        title: values.titre,
        nbperson: Number(values.nbperson),
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
        image_name: image ? { uri: image } : null, // vide ou une valeur par défaut si besoin
      };
      setSelectedRecipe(mappedRecipe);
      setModalVisible(true);
    } else {
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
    const finalValues = { ...values };

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
  useEffect(() => {
    if (success) {
      setValues({
        titre: "",
        nbperson: "",
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
  }, [success])

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
              {/* Nombre des personnes */}
              <View style={styles.inputGroup}>
                <Text className="text-base" style={styles.label}>
                  Pour combien de personnes ?
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    error?.nbperson || validationErrors.nbperson
                      ? styles.inputError
                      : null,
                  ]}
                  value={values.nbperson}
                  onChangeText={(text) => handleInputChange("nbperson", text)}
                  placeholder="Nombre de personnes"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
                {(error?.nbperson || validationErrors.nbperson) && (
                  <Text style={styles.errorText}>
                    {error?.nbperson?.[0] || validationErrors.nbperson}
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
  <Text style={styles.label}>Temps de repos :</Text>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <TextInput
      style={[
        styles.input,
        { flex: 1 },
        error?.rest_time || validationErrors.rest_time ? styles.inputError : null,
      ]}
      value={values.rest_time}
      onChangeText={(text) => handleInputChange("rest_time", text)}
      placeholder="Temps de repos"
      placeholderTextColor="#999"
      keyboardType="numeric"
    />

    <Picker
      selectedValue={unit}
      style={{ height: 50, width: 120 }}
      onValueChange={(itemValue) => setUnit(itemValue)}
    >
      <Picker.Item label="Heure(s)" value="hour" />
      <Picker.Item label="Minute(s)" value="min" />
    </Picker>
  </View>

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
                <View style={styles.containerg}>
                  <Text className="text-custom-gray" style={{ fontFamily: "ArchivoLight" }}>Vous n’avez pas de photo ?</Text>
                  <Text className="text-custom-gray text-center" style={{ fontFamily: "ArchivoLight" }}>Pas d’inquiétude on se charge du shooting pour vous !</Text>

                  <TouchableOpacity
                    onPress={() => setAcceptedCGUs(!acceptedCGUs)}
                    accessibilityLabel={acceptedCGUs ? "CGU acceptées" : "Accepter les CGU"}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: acceptedCGUs }}
                    style={styles.checkboxContainer}
                  >
                    <View style={[styles.checkbox, acceptedCGUs && styles.checkedCheckbox]}>
                      {acceptedCGUs && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.labelText}>
                      J'accepte les{" "}
                      <Text
                        onPress={() => router.push('/settingsPage/CGUConfidentiality')}
                        style={styles.linkText}
                      >
                        conditions générales d'utilisation
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  {(error?.nbperson || validationErrors.cgus) && (
                    <Text style={styles.errorTextcgu}>
                      {error?.nbperson || validationErrors.cgus}
                    </Text>
                  )}

                </View>
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
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fad4ce" }} edges={['top', 'left', 'right']}>
            <RecipesHeader goToPage={() => setModalVisible(false)} />
            <RecipeDetails recipe={selectedRecipe} custom={true} />
          </SafeAreaView>
        )}

      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  containerImg: {
    alignItems: "center",
  },
  containerg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: 8,
    paddingTop: 15
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkedCheckbox: {
    backgroundColor: "#B71C1C",
    borderColor: "#B71C1C",
  },
  labelText: {
    fontSize: 14,
    color: "#B71C1C",

  },
  linkText: {
    color: "#B71C1C",
    textDecorationLine: 'underline',
  },

  placeholder: {
    width: 160,
    height: 140,
    borderWidth: 1,
    borderColor: "#f3cfcf",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePreview: {
    width: 160,
    height: 140,
    borderRadius: 10,
    marginBottom: 20,
  },

  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#fff",
  },

  formContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: "#D32F2F",
    fontFamily: "ArchivoLight",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFCDD2", // custom-red-clear equivalent
    borderRadius: 12,
    padding: 12,
    fontFamily: "ArchivoLight",
    color: "#333",
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#B71C1C", // dark red for error
  },
  errorText: {
    color: "#B71C1C", // dark red for error
    fontSize: 14,
    marginTop: 4,
    fontFamily: "ArchivoLight",
  },
  errorTextcgu: {
    color: "#B71C1C", // dark red for error
    fontSize: 14,
    fontFamily: "ArchivoLight",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: "ArchivoLight",
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#FFF",
    fontFamily: "ArchivoLight",
  },
  activeButton: {
    backgroundColor: "#D32F2F",
    borderColor: "#D32F2F",
  },
  buttonText: {
    color: "#D32F2F",
    fontFamily: "ArchivoLight",
  },
  activeButtonText: {
    color: "#FFF",
  },
  boldText: {
    fontWeight: "bold",
  },
  infoText: {
    color: "#666",
    fontSize: 14,
    padding: 10,
    fontFamily: "ArchivoLight",
  },
  ingredientInputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  ingredientInput: {
    borderWidth: 1,
    borderColor: "#FFCDD2",
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#D32F2F", // rouge
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#FFF",
    fontFamily: "ArchivoLight",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  tag: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#D32F2F",
    fontFamily: "ArchivoLight",
    marginRight: 8,
  },
  removeTagButton: {
    backgroundColor: "#EF5350",
    width: 25,
    height: 25,
    justifyContent: "center",
    borderRadius: 12,
    margin: "auto",
  },
  removeTagButtonText: {
    color: "white",
    margin: "auto",
  },
  submitContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  visualizeButton: {
    backgroundColor: "#D32F2F",
  },

  submitButton: {
    backgroundColor: "#FAD4CE",
    borderColor: "#FAD4CE",
  },
  submitButtonText: {
    color: "#B71C1C",
    fontFamily: "ArchivoLight",
  },
});
export default Suggestrecipe;
