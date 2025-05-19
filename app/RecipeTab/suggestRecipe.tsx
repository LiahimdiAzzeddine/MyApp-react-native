import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import useSuggestRecipe from '@/hooks/recipes/useSuggestRecipe';
import { useRouter } from 'expo-router';
import RenderHeaderTab from '@/components/ui/renderHeader';
  const backgroundImage = require("@/assets/images/recipes/background.png");

// Types definitions
interface IngredientInput {
  name: string;
  quantity: string;
  unit: string;
}

interface RecipeValues {
  titre: string;
  types: string[];
  difficulty: string;
  filters: string[];
  prep_time: string;
  cook_time: string;
  rest_time: string;
  ingredients: IngredientInput[];
  steps: string[];
}



const Suggestrecipe: React.FC = () => {
  const { handleSubmit, loading, error, success } = useSuggestRecipe();
  const [stepInput, setStepInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [recette, setRecette] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
      const router = useRouter();
  
  const onClose=()=>{
    router.navigate("/recipes");
  }


  const [values, setValues] = useState<RecipeValues>({
    titre: '',
    types: [],
    difficulty: '',
    filters: [],
    prep_time: '',
    cook_time: '',
    rest_time: '',
    ingredients: [],
    steps: [],
  });

  const [ingredientInput, setIngredientInput] = useState<IngredientInput>({
    name: '',
    quantity: '',
    unit: '',
  });

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);

  const canVisualizeRecipe = (): boolean => {
    return values.ingredients.length < 1 || values.steps.length < 1;
  };

  const visualiseRecette = () => {
    if (canVisualizeRecipe()) {
      // Déclencher une alerte si les conditions ne sont pas remplies
      Alert.alert(
        'Information',
        'Ajouter au moins un ingrédient et une étape avant de visualiser la recette.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Si les conditions sont remplies, afficher la recette
    const total_time = formatTime(
      Number(values.cook_time) +
      Number(values.prep_time) +
      Number(values.rest_time)
    );
    
   // setRecette(createViewRecipe(values, total_time));
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    await handleSubmit(values);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (name: keyof RecipeValues, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleIngredientChange = (name: keyof IngredientInput, value: string) => {
    setIngredientInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addIngredient = () => {
    if (ingredientInput.name && ingredientInput.quantity) {
      setValues((prevValues) => ({
        ...prevValues,
        ingredients: [...prevValues.ingredients, ingredientInput],
      }));
      setIngredientInput({ name: '', quantity: '', unit: '' });
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs de l\'ingrédient.');
    }
  };

  const removeIngredient = (indexToRemove: number) => {
    Alert.alert(
      'Attention',
      'Supprimer l\'ingrédient ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            setValues((prevValues) => ({
              ...prevValues,
              ingredients: prevValues.ingredients.filter(
                (_, index) => index !== indexToRemove
              ),
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
      setStepInput('');
    }
  };

  const removeStep = (indexToRemove: number) => {
    Alert.alert(
      'Attention',
      'Supprimer cette étape ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
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
        return { ...prevValues, types: [...types, type] };
      }
    });
  };

  // Fonction utilitaire pour convertir les minutes en heures et minutes
  function formatTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0
      ? `${hours}h ${minutes > 0 ? `${minutes}min` : ''}`
      : `${minutes}min`;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>
         <RenderHeaderTab
          title="Proposer une recette"
          titleColor="#c32721"
          backgroundImage={backgroundImage}
        />
        <View style={styles.formContainer}>
          {/* Titre de la recette */}
          <View style={styles.inputGroup}>
            <Text className="text-base" style={styles.label} >Titre de la recette :</Text>
            <TextInput
              style={[
                styles.input,
                error?.titre ? styles.inputError : null
              ]}
              value={values.titre}
              onChangeText={(text) => handleInputChange('titre', text)}
              placeholder="Titre de la recette"
              placeholderTextColor="#999"
            />
            {error?.titre && (
              <Text style={styles.errorText}>{error.titre[0]}</Text>
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
                      values.types.includes(type) ? styles.activeButton : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        values.types.includes(type) ? styles.activeButtonText : null,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
            {error?.type && (
              <Text style={styles.errorText}>{error.type[0]}</Text>
            )}
          </View>

          {/* Difficulté */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Difficulté :</Text>
            <View style={styles.buttonGroup}>
              {["Facile", "Moyen", "Difficile"].map((difficulty) => (
                <TouchableOpacity
                  key={difficulty}
                  onPress={() => handleInputChange('difficulty', difficulty)}
                  style={[
                    styles.filterButton,
                    values.difficulty === difficulty ? styles.activeButton : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      values.difficulty === difficulty ? styles.activeButtonText : null,
                    ]}
                  >
                    {difficulty}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {error?.difficulty && (
              <Text style={styles.errorText}>{error.difficulty[0]}</Text>
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
                    values.filters.includes(filter) ? styles.activeButton : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      values.filters.includes(filter) ? styles.activeButtonText : null,
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
            <Text style={styles.label}>Temps de préparation (en min) :</Text>
            <TextInput
              style={[
                styles.input,
                error?.prep_time ? styles.inputError : null
              ]}
              value={values.prep_time}
              onChangeText={(text) => handleInputChange('prep_time', text)}
              placeholder="Temps de préparation"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            {error?.prep_time && (
              <Text style={styles.errorText}>{error.prep_time[0]}</Text>
            )}
          </View>

          {/* Temps de cuisson */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Temps de cuisson (en min) :</Text>
            <TextInput
              style={[
                styles.input,
                error?.cook_time ? styles.inputError : null
              ]}
              value={values.cook_time}
              onChangeText={(text) => handleInputChange('cook_time', text)}
              placeholder="Temps de cuisson"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            {error?.cook_time && (
              <Text style={styles.errorText}>{error.cook_time[0]}</Text>
            )}
          </View>

          {/* Temps de repos */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Temps de repos (en min) :</Text>
            <TextInput
              style={[
                styles.input,
                error?.rest_time ? styles.inputError : null
              ]}
              value={values.rest_time}
              onChangeText={(text) => handleInputChange('rest_time', text)}
              placeholder="Temps de repos"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            {error?.rest_time && (
              <Text style={styles.errorText}>{error.rest_time[0]}</Text>
            )}
          </View>

          {/* Temps total */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Temps total :{' '}
              {Number(values.cook_time) +
                Number(values.prep_time) +
                Number(values.rest_time) > 0 && (
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
              Temps total calculé à partir du temps de cuisson, préparation et repos.
            </Text>
          </View>

          {/* Ingrédients */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ingrédients :</Text>
            <View style={styles.ingredientInputGroup}>
              <TextInput
                style={[styles.ingredientInput, { flex: 1 }]}
                value={ingredientInput.quantity}
                onChangeText={(text) => handleIngredientChange('quantity', text)}
                placeholder="Quantité"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.ingredientInput, { flex: 1 }]}
                value={ingredientInput.unit}
                onChangeText={(text) => handleIngredientChange('unit', text)}
                placeholder="Unité"
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.ingredientInput, { flex: 2 }]}
                value={ingredientInput.name}
                onChangeText={(text) => handleIngredientChange('name', text)}
                placeholder="Nom de l'ingrédient"
                placeholderTextColor="#999"
              />
            </View>
            {error?.ingredients && (
              <Text style={styles.errorText}>{error.ingredients[0]}</Text>
            )}
            <TouchableOpacity
              onPress={addIngredient}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>+ ajouter un ingrédient</Text>
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
                error?.steps ? styles.inputError : null
              ]}
              value={stepInput}
              onChangeText={setStepInput}
              placeholder="Étape"
              placeholderTextColor="#999"
              multiline
            />
            {error?.steps && (
              <Text style={styles.errorText}>{error.steps[0]}</Text>
            )}
            <TouchableOpacity
              onPress={addStep}
              style={styles.addButton}
            >
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
            <Text style={styles.infoText}>
              Pas d'inquiétude on se charge du shooting photo !
            </Text>
                 
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
              disabled={loading}
              className="rounded-xl py-3 px-4 mb-6 m-auto"
            >
              <Text style={styles.submitButtonText} className='text-base'>
                {loading ? "Envoi..." : "Envoyer ma recette"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal pour afficher la recette */}
        {recette && (
            /*
          <RecipeModal
            isVisible={modalOpen}
            onClose={() => setModalOpen(false)}
            recipe={recette}
          />*/
          <Text>Recipe Modal</Text>
        )}

        {isLoading &&  <ActivityIndicator size="large" color="#2196F3" />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#fff',
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
    color: '#D32F2F',
    fontFamily: 'ArchivoLight',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFCDD2', // custom-red-clear equivalent
    borderRadius: 12,
    padding: 12,
    fontFamily: 'ArchivoLight',
    color: '#333',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#B71C1C', // dark red for error
  },
  errorText: {
    color: '#B71C1C', // dark red for error
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'ArchivoLight',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontFamily:"ArchivoLight"
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#D32F2F',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#FFF',
    fontFamily:"ArchivoLight"
  },
  activeButton: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },
  buttonText: {
    color: '#D32F2F',
    fontFamily: 'ArchivoLight',
  },
  activeButtonText: {
    color: '#FFF',
  },
  boldText: {
    fontWeight: 'bold',
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    padding:10,
    fontFamily: 'ArchivoLight',
  },
  ingredientInputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ingredientInput: {
    borderWidth: 1,
    borderColor: '#FFCDD2',
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontFamily: 'ArchivoLight',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  tag: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D32F2F',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#D32F2F',
    fontFamily: 'ArchivoLight',
    marginRight: 8,
  },
  removeTagButton: {
    backgroundColor: '#EF5350',
    width: 25,
    height: 25,
    justifyContent:"center",
    borderRadius: 12,
    margin:"auto",
  },
  removeTagButtonText: {
    color: 'white',
    margin:"auto"
  },
  submitContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  visualizeButton: {
    backgroundColor: '#D32F2F',
  },

  submitButton: {
    backgroundColor: '#FAD4CE',
    borderColor: '#FAD4CE',
  },
  submitButtonText: {
    color: '#B71C1C',
    fontFamily: 'ArchivoLight',
  },
});

export default Suggestrecipe;