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
  Platform,
  Dimensions,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Check } from 'lucide-react-native';
import * as ImagePicker from "expo-image-picker";

import useSuggestRecipe from "@/hooks/recipes/useSuggestRecipe";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";
import { IngredientInput, RecipeValues, ValidationErrors, MappedRecipe } from "@/types/recipe";
import RecipeDetails from "@/components/recipes/RecipeDetails";
import RecipesHeader from "@/components/ui/recipeHeader";
import FormInput from "@/components/form/FormInput";
import ButtonGroup from "@/components/form/ButtonGroup";
import styles from "./styles";

// Mock images - replace with actual Pexels URLs

const backgroundImage = require("@/assets/images/recipes/background.png");
const backgroundPicker = require("@/assets/images/recipes/pickerbg.png");

const DISH_TYPES = ["Entrée", "Plat", "Dessert", "Apéritif", "Boisson"];
const DIFFICULTY_LEVELS = ["Facile", "Moyen", "Difficile"];
const DIETARY_FILTERS = ["Végétarien", "Végan", "Sans lactose", "Sans gluten", "Sans oeufs"];

const SuggestRecipe: React.FC = () => {
  const { handleSubmit, loading, error, success } = useSuggestRecipe();
  const [stepInput, setStepInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedCGUs, setAcceptedCGUs] = useState<boolean>(false);
  const [restTimeUnit, setRestTimeUnit] = useState<'min' | 'hour'>('hour');
  const [image, setImage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<MappedRecipe | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const router = useRouter();
  const insets = useSafeAreaInsets();


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
    image: null,
  });

  const [ingredientInput, setIngredientInput] = useState<IngredientInput>({
    name: "",
    quantity: "",
    unit: "",
  });

  // Enhanced keyboard handling for Android
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        // Force layout recalculation on Android
        if (Platform.OS === 'android') {
          // Multiple timeouts to ensure proper layout reset
          setTimeout(() => setKeyboardHeight(0), 50);
          setTimeout(() => setKeyboardHeight(0), 100);
          setTimeout(() => setKeyboardHeight(0), 200);
        }
      }
    );

    // Listen for screen dimension changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenHeight(window.height);
    });

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
      subscription?.remove();
    };
  }, []);

  // Function to format validation errors for alert display
  const formatErrorsForAlert = (errors: ValidationErrors): string => {
    const errorMessages: string[] = [];

    if (errors.titre) errorMessages.push(`• ${errors.titre}`);
    if (errors.nbperson) errorMessages.push(`• ${errors.nbperson}`);
    if (errors.types) errorMessages.push(`• ${errors.types}`);
    if (errors.difficulty) errorMessages.push(`• ${errors.difficulty}`);
    if (errors.prep_time) errorMessages.push(`• ${errors.prep_time}`);
    if (errors.cook_time) errorMessages.push(`• ${errors.cook_time}`);
    if (errors.rest_time) errorMessages.push(`• ${errors.rest_time}`);
    if (errors.ingredients) errorMessages.push(`• ${errors.ingredients}`);
    if (errors.steps) errorMessages.push(`• ${errors.steps}`);
    if (errors.cgus) errorMessages.push(`• ${errors.cgus}`);

    return errorMessages.join('\n');
  };

  // Function to format server errors for alert display
  const formatServerErrorsForAlert = (serverErrors: any): string => {
    const errorMessages: string[] = [];

    if (serverErrors?.titre) errorMessages.push(`• Titre: ${serverErrors.titre.join(', ')}`);
    if (serverErrors?.nbperson) errorMessages.push(`• Nombre de personnes: ${serverErrors.nbperson.join(', ')}`);
    if (serverErrors?.type) errorMessages.push(`• Type de plat: ${serverErrors.type.join(', ')}`);
    if (serverErrors?.difficulty) errorMessages.push(`• Difficulté: ${serverErrors.difficulty.join(', ')}`);
    if (serverErrors?.prep_time) errorMessages.push(`• Temps de préparation: ${serverErrors.prep_time.join(', ')}`);
    if (serverErrors?.cook_time) errorMessages.push(`• Temps de cuisson: ${serverErrors.cook_time.join(', ')}`);
    if (serverErrors?.rest_time) errorMessages.push(`• Temps de repos: ${serverErrors.rest_time.join(', ')}`);
    if (serverErrors?.ingredients) errorMessages.push(`• Ingrédients: ${serverErrors.ingredients.join(', ')}`);
    if (serverErrors?.steps) errorMessages.push(`• Étapes: ${serverErrors.steps.join(', ')}`);
    if (serverErrors?.filters) errorMessages.push(`• Régimes: ${serverErrors.filters.join(', ')}`);

    return errorMessages.join('\n');
  };

  const validateForm = (cgu: boolean): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {};
    let isValid = true;

    // Title validation
    if (!values.titre.trim()) {
      errors.titre = "Le titre de la recette est obligatoire";
      isValid = false;
    } else if (values.titre.trim().length < 3) {
      errors.titre = "Le titre doit contenir au moins 3 caractères";
      isValid = false;
    }

    // Number of people validation
    if (!values.nbperson.trim()) {
      errors.nbperson = "Le nombre de personnes est obligatoire";
      isValid = false;
    } else if (isNaN(Number(values.nbperson)) || Number(values.nbperson) <= 0 || Number(values.nbperson) > 50) {
      errors.nbperson = "Le nombre de personnes doit être un nombre entre 1 et 50";
      isValid = false;
    }

    // CGU validation
    if (!acceptedCGUs && cgu) {
      errors.cgus = "Vous devez accepter les CGU.";
      isValid = false;
    }

    // Dish type validation
    if (values.types.length === 0) {
      errors.types = "Veuillez sélectionner au moins un type de plat";
      isValid = false;
    }

    // Difficulty validation
    if (!values.difficulty) {
      errors.difficulty = "Veuillez sélectionner une difficulté";
      isValid = false;
    }

    // Time validations
    if (!values.prep_time || isNaN(Number(values.prep_time)) || Number(values.prep_time) <= 0) {
      errors.prep_time = "Le temps de préparation doit être un nombre positif";
      isValid = false;
    }

    if (!values.cook_time || isNaN(Number(values.cook_time)) || Number(values.cook_time) < 0) {
      errors.cook_time = "Le temps de cuisson doit être un nombre positif ou zéro";
      isValid = false;
    }

    if (values.rest_time && (isNaN(Number(values.rest_time)) || Number(values.rest_time) < 0)) {
      errors.rest_time = "Le temps de repos doit être un nombre positif ou zéro";
      isValid = false;
    }

    // Ingredients validation
    if (values.ingredients.length === 0) {
      errors.ingredients = "Veuillez ajouter au moins un ingrédient";
      isValid = false;
    }

    // Steps validation
    if (values.steps.length === 0) {
      errors.steps = "Veuillez ajouter au moins une étape";
      isValid = false;
    }

    setValidationErrors(errors);

    return { isValid, errors };
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
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setValues((prev) => ({ ...prev, image: result.assets[0] }));
    }
  };

  const visualizeRecipe = () => {
    const { isValid, errors } = validateForm(false);
    setValidationErrors(errors); // on met quand même à jour l’état pour affichage visuel dans le formulaire

    if (isValid) {
      const restTimeInMinutes = restTimeUnit === 'hour'
        ? Number(values.rest_time) * 60
        : Number(values.rest_time);

      const mappedRecipe: MappedRecipe = {
        id: Date.now(),
        title: values.titre,
        nbperson: Number(values.nbperson),
        difficulte: values.difficulty,
        timecook: values.cook_time + "min",
        timebake: values.prep_time + "min",
        timerest: restTimeInMinutes + "min",
        regimes: values.filters,
        ingredients: values.ingredients.map((i) => ({
          qt: i.quantity,
          unit: i.unit,
          name: i.name,
        })),
        recette: values.steps.reduce((acc: { [key: string]: string }, step, index) => {
          acc[`etape${index + 1}`] = step;
          return acc;
        }, {}),
        image_name: image ? { uri: image } : null,
      };

      setSelectedRecipe(mappedRecipe);
      setModalVisible(true);
    } else {
      const errorMessage = formatErrorsForAlert(errors); // on utilise les erreurs retournées directement
      if (errorMessage.trim() !== '') {
        Alert.alert(
          "Erreurs de validation",
          `Veuillez corriger les erreurs suivantes :\n\n${errorMessage}`,
          [{ text: "OK", style: "default" }]
        );
      }
    }
  };


  const handleFormSubmit = async () => {
    setValidationErrors({});
    const { isValid, errors } = validateForm(true);

    if (!isValid) {
      const errorMessage = formatErrorsForAlert(validationErrors);
      Alert.alert(
        "Erreurs de validation",
        `Veuillez corriger les erreurs suivantes avant de soumettre :\n\n${errorMessage}`,
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    const finalValues = { ...values };
    if (restTimeUnit === 'hour' && values.rest_time) {
      finalValues.rest_time = (Number(values.rest_time) * 60).toString();
    }

    setIsLoading(true);
    try {
      await handleSubmit(finalValues);
    } catch (err) {
      let errorMessage = "Une erreur inattendue est survenue lors de la soumission.";

      if (error) {
        const serverErrorMessage = formatServerErrorsForAlert(error);
        if (serverErrorMessage) {
          errorMessage = `Erreurs du serveur :\n\n${serverErrorMessage}`;
        }
      }

      Alert.alert(
        "Erreur de soumission",
        errorMessage,
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // Show server errors in alert when they occur
  useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      const serverErrorMessage = formatServerErrorsForAlert(error);
      if (serverErrorMessage) {
        Alert.alert(
          "Erreurs de validation du serveur",
          `Veuillez corriger les erreurs suivantes :\n\n${serverErrorMessage}`,
          [{ text: "OK", style: "default" }]
        );
      }
    }
  }, [error]);

  const handleInputChange = (name: keyof RecipeValues, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleIngredientChange = (name: keyof IngredientInput, value: string) => {
    setIngredientInput((prev) => ({ ...prev, [name]: value }));
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
      if (validationErrors.ingredients) {
        setValidationErrors((prev) => ({ ...prev, ingredients: undefined }));
      }
    } else {
      Alert.alert(
        "Ingrédient incomplet",
        "Veuillez remplir au moins le nom et la quantité de l'ingrédient.",
        [{ text: "OK", style: "default" }]
      );
    }
  };


  const removeIngredient = (indexToRemove: number) => {
    const ingredientToRemove = values.ingredients[indexToRemove];
    Alert.alert(
      "Supprimer l'ingrédient",
      `Êtes-vous sûr de vouloir supprimer "${ingredientToRemove.quantity} ${ingredientToRemove.unit} ${ingredientToRemove.name}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setValues((prevValues) => ({
              ...prevValues,
              ingredients: prevValues.ingredients.filter((_, index) => index !== indexToRemove),
            }));
          },
        },
      ]
    );
  };

  const addStep = () => {
    if (stepInput.trim()) {
      setValues((prevValues) => ({
        ...prevValues,
        steps: [...prevValues.steps, stepInput.trim()],
      }));
      setStepInput("");
      if (validationErrors.steps) {
        setValidationErrors((prev) => ({ ...prev, steps: undefined }));
      }
    } else {
      Alert.alert(
        "Étape vide",
        "Veuillez saisir une étape valide avant de l'ajouter.",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  const removeStep = (indexToRemove: number) => {
    const stepToRemove = values.steps[indexToRemove];
    const truncatedStep = stepToRemove.length > 50 ? stepToRemove.substring(0, 50) + "..." : stepToRemove;

    Alert.alert(
      "Supprimer l'étape",
      `Êtes-vous sûr de vouloir supprimer l'étape ${indexToRemove + 1} ?\n\n"${truncatedStep}"`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setValues((prevValues) => ({
              ...prevValues,
              steps: prevValues.steps.filter((_, index) => index !== indexToRemove),
            }));
          },
        },
      ]
    );
  };

  const handleTypeToggle = (type: string) => {
    setValues((prevValues) => {
      const types = [...prevValues.types];
      if (types.includes(type)) {
        return { ...prevValues, types: types.filter((t) => t !== type) };
      } else {
        const newTypes = [...types, type];
        if (validationErrors.types && newTypes.length > 0) {
          setValidationErrors((prev) => ({ ...prev, types: undefined }));
        }
        return { ...prevValues, types: newTypes };
      }
    });
  };

  const handleDifficultyToggle = (difficulty: string) => {
    const newDifficulty = values.difficulty === difficulty ? "" : difficulty;
    handleInputChange("difficulty", newDifficulty);
    if (validationErrors.difficulty && newDifficulty) {
      setValidationErrors((prev) => ({ ...prev, difficulty: undefined }));
    }
  };

  const handleFilterToggle = (filter: string) => {
    setValues((prevValues) => {
      const filters = prevValues.filters.includes(filter)
        ? prevValues.filters.filter((f) => f !== filter)
        : [...prevValues.filters, filter];
      return { ...prevValues, filters };
    });
  };

  const formatTime = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0
      ? `${hours}h ${minutes > 0 ? `${minutes}min` : ""}`
      : `${minutes}min`;
  };

  const getTotalTime = (): number => {
    const prepTime = Number(values.prep_time) || 0;
    const cookTime = Number(values.cook_time) || 0;
    const restTime = Number(values.rest_time) || 0;
    const restTimeInMinutes = restTimeUnit === 'hour' ? restTime * 60 : restTime;
    return prepTime + cookTime + restTimeInMinutes;
  };

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
      setAcceptedCGUs(false);
      Alert.alert(
        "Succès",
        "Votre recette a été soumise avec succès ! Elle sera examinée par notre équipe avant publication.",
        [{ text: "Parfait !", style: "default" }]
      );
    }
  }, [success]);

  // Calculate dynamic container height to prevent black space
  const containerHeight = Platform.OS === 'android' && keyboardHeight > 0
    ? screenHeight - keyboardHeight
    : screenHeight;

  return (
    <SafeAreaView style={[styles.outerContainer, { height: containerHeight }]} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : insets.bottom}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} > */}
        <View style={styles.innerContainer}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              // Dynamic padding based on keyboard state
              Platform.OS === 'android' && keyboardHeight > 0 && {
                paddingBottom: Math.max(20, keyboardHeight * 0.1)
              }
            ]}
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}
            // Force scroll view to maintain proper height
            scrollEventThrottle={16}

          >
            <RenderHeaderTab
              title="Proposer une recette"
              titleColor="#c32721"
              backgroundImage={backgroundImage}
            />

            <View style={styles.formContainer}>
              <FormInput
                label="Titre de la recette"
                value={values.titre}
                onChangeText={(text) => handleInputChange("titre", text)}
                placeholder="Titre de la recette"
                error={error?.titre?.[0] || validationErrors.titre}
                required
              />

              <FormInput
                label="Pour combien de personnes ?"
                value={values.nbperson}
                onChangeText={(text) => handleInputChange("nbperson", text)}
                placeholder="Nombre de personnes"
                keyboardType="numeric"
                error={error?.nbperson?.[0] || validationErrors.nbperson}
                required
              />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Type de plats <Text style={styles.required}>*</Text></Text>
                <ButtonGroup
                  options={DISH_TYPES}
                  selectedValues={values.types}
                  onToggle={handleTypeToggle}
                  error={error?.type?.[0] || validationErrors.types}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Difficulté <Text style={styles.required}>*</Text></Text>
                <ButtonGroup
                  options={DIFFICULTY_LEVELS}
                  selectedValues={values.difficulty ? [values.difficulty] : []}
                  onToggle={handleDifficultyToggle}
                  multiSelect={false}
                  error={error?.difficulty?.[0] || validationErrors.difficulty}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Régimes</Text>
                <ButtonGroup
                  options={DIETARY_FILTERS}
                  selectedValues={values.filters}
                  onToggle={handleFilterToggle}
                  error={error?.filters?.[0]}
                />
              </View>

              <FormInput
                label="Temps de préparation (en min)"
                value={values.prep_time}
                onChangeText={(text) => handleInputChange("prep_time", text)}
                placeholder="Temps de préparation"
                keyboardType="numeric"
                error={error?.prep_time?.[0] || validationErrors.prep_time}
                required
              />

              <FormInput
                label="Temps de cuisson (en min)"
                value={values.cook_time}
                onChangeText={(text) => handleInputChange("cook_time", text)}
                placeholder="Temps de cuisson"
                keyboardType="numeric"
                error={error?.cook_time?.[0] || validationErrors.cook_time}
                required
              />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Temps de repos</Text>
                <View style={styles.timeInputContainer}>
                  <TextInput
                    style={[
                      styles.timeInput,
                      (error?.rest_time || validationErrors.rest_time) ? styles.inputError : null,
                    ]}
                    value={values.rest_time}
                    onChangeText={(text) => handleInputChange("rest_time", text)}
                    placeholder="Temps de repos"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={restTimeUnit}
                      style={styles.picker}
                      onValueChange={(itemValue) => setRestTimeUnit(itemValue)}
                    >
                      <Picker.Item label="Heures" value="hour" style={{ color: "#666", }} />
                      <Picker.Item label="Minutes" value="min" style={{ color: "#666", }} />
                    </Picker>
                  </View>
                </View>
                {(error?.rest_time || validationErrors.rest_time) && (
                  <Text style={styles.errorText}>
                    {error?.rest_time?.[0] || validationErrors.rest_time}
                  </Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  Temps total : {getTotalTime() > 0 && (
                    <Text style={styles.boldText}>{formatTime(getTotalTime())}</Text>
                  )}
                </Text>
                <Text style={styles.infoText}>
                  Temps total calculé à partir du temps de cuisson, préparation et repos.
                </Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Ingrédients <Text style={styles.required}>*</Text></Text>
                <View style={styles.ingredientInputGroup}>
                  <TextInput
                    style={[styles.ingredientInput, { flex: 1 }]}
                    value={ingredientInput.quantity}
                    onChangeText={(text) => handleIngredientChange("quantity", text)}
                    placeholder="Quantité"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={[styles.ingredientInput, { flex: 1 }]}
                    value={ingredientInput.unit}
                    onChangeText={(text) => handleIngredientChange("unit", text)}
                    placeholder="Unité"
                    placeholderTextColor="#999"
                  />
                  <TextInput
                    style={[styles.ingredientInput, { flex: 2 }]}
                    value={ingredientInput.name}
                    onChangeText={(text) => handleIngredientChange("name", text)}
                    placeholder="Nom de l'ingrédient"
                    placeholderTextColor="#999"
                  />
                </View>
                {(error?.ingredients || validationErrors.ingredients) && (
                  <Text style={styles.errorText}>
                    {error?.ingredients?.[0] || validationErrors.ingredients}
                  </Text>
                )}
                <TouchableOpacity onPress={addIngredient} style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Ajouter un ingrédient</Text>
                </TouchableOpacity>

                <View style={styles.tagsContainer}>
                  {values.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
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

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Étapes <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.multilineInput,
                    (error?.steps || validationErrors.steps) ? styles.inputError : null,
                  ]}
                  value={stepInput}
                  onChangeText={setStepInput}
                  placeholder="Décrivez une étape de la recette"
                  placeholderTextColor="#999"
                  multiline
                  textAlignVertical="top"
                />
                {(error?.steps || validationErrors.steps) && (
                  <Text style={styles.errorText}>
                    {error?.steps?.[0] || validationErrors.steps}
                  </Text>
                )}
                <TouchableOpacity onPress={addStep} style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Ajouter une étape</Text>
                </TouchableOpacity>

                <View style={styles.tagsContainer}>
                  {values.steps.map((step, index) => (
                    <View key={index} style={styles.stepTag}>
                      <Text style={styles.stepNumber}>Étape {index + 1}</Text>
                      <Text style={styles.stepText}>{step}</Text>
                      <TouchableOpacity
                        onPress={() => removeStep(index)}
                        style={styles.removeTagButtonStep}
                      >
                        <Text style={styles.removeTagButtonText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.submitContainer}>
                <View style={styles.imageContainer}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                  ) : (
                    <TouchableOpacity onPress={pickImage}>
                      <View style={styles.imagePlaceholder}>
                        <Image source={backgroundPicker} style={styles.placeholderImage} />
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
                    <Text style={styles.addButtonText}>
                      {image ? "Changer la photo" : "Ajouter une photo"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.cguContainer}>
                  <Text style={styles.noPhotoText}>Vous n'avez pas de photo ?</Text>
                  <Text style={styles.noPhotoSubtext}>
                    Pas d'inquiétude on se charge du shooting pour vous !
                  </Text>

                  <TouchableOpacity
                    onPress={() => setAcceptedCGUs(!acceptedCGUs)}
                    accessibilityLabel={acceptedCGUs ? "CGU acceptées" : "Accepter les CGU"}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: acceptedCGUs }}
                    style={styles.checkboxContainer}
                  >
                    <View style={[styles.checkbox, acceptedCGUs && styles.checkedCheckbox]}>
                      {acceptedCGUs && <Check size={16} color="#fff" />}
                    </View>
                    <Text style={styles.cguText}>
                      J'accepte les{" "}
                      <Text
                        onPress={() => router.push('/settingsPage/CGUConfidentiality')}
                        style={styles.linkText}
                      >
                        conditions générales d'utilisation
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  {validationErrors.cgus && (
                    <Text style={styles.errorText}>{validationErrors.cgus}</Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={visualizeRecipe}
                  style={styles.visualizeButton}
                  disabled={loading || isLoading}
                >
                  <Text style={styles.visualizeButtonText}>Je visualise ma recette</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleFormSubmit}
                  style={styles.submitButton}
                  disabled={loading || isLoading}
                >
                  <Text style={styles.submitButtonText}>
                    {loading || isLoading ? "Envoi..." : "Envoyer ma recette"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {(loading || isLoading) && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#D32F2F" />
              </View>
            )}
          </ScrollView>
        </View>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>

      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedRecipe && (
          <SafeAreaView style={styles.modalContainer} edges={['top', 'left', 'right']}>
            <RecipesHeader goToPage={() => setModalVisible(false)} />
            <RecipeDetails recipe={selectedRecipe} custom={true} />
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default SuggestRecipe;