import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  ActivityIndicator, 
  ScrollView, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Platform 
} from "react-native";
import useContact, { FormValues } from "@/hooks/useContact";

// Types pour la validation locale
interface LocalFormValues {
  email: string;
  titre: string;
  message: string;
}

interface ValidationErrors {
  [key: string]: string[] | undefined;
  email?: string[];
  titre?: string[];
  message?: string[];
}

const Contact: React.FC = () => {
  const { handleSubmit, loading, error, sended } = useContact();
  const [values, setValues] = useState<LocalFormValues>({ 
    email: "", 
    titre: "", 
    message: "" 
  });
  
  // État pour les erreurs de validation locale
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Fonction de validation d'un champ individuel
  const validateField = (name: keyof LocalFormValues, value: string): string[] => {
    switch (name) {
      case "email":
        if (!value.trim()) return ["L'adresse email est requise."];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return ["Veuillez entrer une adresse email valide."];
        return [];
        
      case "titre":
        if (!value.trim()) return ["Le titre est requis."];
        if (value.trim().length < 3) return ["Le titre doit contenir au moins 3 caractères."];
        if (value.trim().length > 100) return ["Le titre ne peut pas dépasser 100 caractères."];
        return [];
        
      case "message":
        if (!value.trim()) return ["Le message est requis."];
        if (value.trim().length < 10) return ["Le message doit contenir au moins 10 caractères."];
        if (value.trim().length > 1000) return ["Le message ne peut pas dépasser 1000 caractères."];
        return [];
        
      default:
        return [];
    }
  };

  // Fonction de changement avec validation
  const onChange = (field: keyof LocalFormValues, value: string): void => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Validation en temps réel
    const fieldErrors = validateField(field, value);
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (fieldErrors.length > 0) {
        newErrors[field] = fieldErrors;
      } else {
        // Supprimer l'erreur si le champ devient valide
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  // Validation complète du formulaire
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.entries(values).forEach(([key, value]) => {
      const errors = validateField(key as keyof LocalFormValues, value);
      if (errors.length > 0) {
        newErrors[key] = errors;
        isValid = false;
      }
    });

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (): void => {
    // Validation complète avant soumission
    if (!validateForm()) {
      return;
    }

    handleSubmit(values as unknown as FormValues);
  };

  // Réinitialiser les erreurs de validation locale quand le formulaire est envoyé avec succès
  useEffect(() => {
    if (sended) {
      setValidationErrors({});
      setValues({ email: "", titre: "", message: "" });
    }
  }, [sended]);

  // Combiner les erreurs de validation locale et celles du serveur
  const getFieldError = (field: keyof LocalFormValues): string[] | undefined => {
    return validationErrors[field] || error?.[field];
  };

  // Vérifier si le formulaire peut être soumis
  const canSubmit = (): boolean => {
    const hasValues = Boolean(values.email.trim() && values.titre.trim() && values.message.trim());
    
    // Vérifier qu'il n'y a pas d'erreurs pour les champs qui ont des valeurs
    const hasValidationErrors = Object.entries(validationErrors).some(([key, errors]) => {
      return errors && errors.length > 0;
    });
    
    return hasValues && !hasValidationErrors && !loading;
  };

  return (
    <KeyboardAvoidingView
      className="bg-custom-orange"
      style={{ flex: 1 }}
      behavior={"padding"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text className="text-custom-blue text-3xl ClashDisplayBold">
              Nous contacter
            </Text>
          </View>
          
          <View style={{ flex: 1 }}>
            {/* Email */}
            <View className="w-full max-w-md mb-4">
              <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
                Mon adresse mail
              </Text>
              <TextInput
                className={`w-full p-3 border-2 text-base bg-white ${
                  getFieldError("email") ? "border-red-500" : "border-orange-300"
                }`}
                style={{ borderRadius: 15 }}
                value={values.email}
                onChangeText={(text) => onChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                accessible
                accessibilityLabel="Email"
                accessibilityHint="Entrez votre adresse email"
                placeholder="exemple@email.com"
                placeholderTextColor="#999"
              />
              {getFieldError("email") && (
                <Text style={styles.errorText}>{getFieldError("email")![0]}</Text>
              )}
            </View>

            {/* Titre */}
            <View className="w-full max-w-md mb-4">
              <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
                Titre
              </Text>
              <TextInput
                className={`w-full p-3 border-2 text-base bg-white ${
                  getFieldError("titre") ? "border-red-500" : "border-orange-300"
                }`}
                style={{ borderRadius: 15 }}
                value={values.titre}
                onChangeText={(text) => onChange("titre", text)}
                accessible
                accessibilityLabel="Titre"
                accessibilityHint="Entrez le titre de votre message"
                placeholder="Sujet de votre message"
                placeholderTextColor="#999"
                maxLength={100}
              />
              {getFieldError("titre") && (
                <Text style={styles.errorText}>{getFieldError("titre")![0]}</Text>
              )}
              <Text style={styles.characterCount}>
                {values.titre.length}/100 caractères
              </Text>
            </View>

            {/* Message */}
            <View className="w-full max-w-md mb-4">
              <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
                Message
              </Text>
              <TextInput
                style={styles.textarea}
                className={`w-full p-3 border-2 text-base bg-white ${
                  getFieldError("message") ? "border-red-500" : "border-orange-300"
                }`}
                value={values.message}
                onChangeText={(text) => onChange("message", text)}
                multiline
                numberOfLines={4}
                accessible
                accessibilityLabel="Message"
                accessibilityHint="Entrez votre message détaillé"
                placeholder="Décrivez votre demande en détail..."
                placeholderTextColor="#999"
                maxLength={1000}
              />
              {getFieldError("message") && (
                <Text style={styles.errorText}>{getFieldError("message")![0]}</Text>
              )}
              <Text style={styles.characterCount}>
                {values.message.length}/1000 caractères
              </Text>
            </View>

            {/* Message de succès */}
            {sended && (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>
                  ✅ Votre message a été envoyé avec succès !
                </Text>
              </View>
            )}

            {/* Bouton Envoyer */}
            <TouchableOpacity
              style={[
                styles.button, 
                (!canSubmit()) && styles.buttonDisabled
              ]}
              onPress={handleFormSubmit}
              disabled={!canSubmit()}
              accessibilityRole="button"
              accessibilityLabel="Envoyer le message"
              accessibilityState={{ disabled: !canSubmit() }}
            >
              <Text style={styles.buttonText}>
                {loading ? "Envoi..." : "Envoyer"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF8200",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#FFB877",
    opacity: 0.9,
  },
  container: {
    backgroundColor: "#ffeda3",
    padding: 25,
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textarea: {
    borderRadius: 15,
    height: 100,
    textAlignVertical: "top",
    fontFamily: "ArchivoRegular",
    backgroundColor: "white",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 4,
    width: "100%",
    fontFamily: "ArchivoRegular",
  },
  characterCount: {
    color: "#888",
    fontSize: 12,
    textAlign: "right",
    marginTop: 2,
    fontFamily: "ArchivoRegular",
  },
  successContainer: {
    backgroundColor: "#D1FAE5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "#10B981",
    borderWidth: 1,
  },
  successText: {
    color: "#065F46",
    textAlign: "center",
    fontFamily: "ArchivoBold",
    fontSize: 14,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "ArchivoBold",
  },
});