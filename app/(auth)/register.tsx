import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import useRegister from "@/hooks/auth/useRegister";
import { Ionicons } from "@expo/vector-icons";
import { InputField } from "@/components/ui/InputField";
import { useRouter } from "expo-router";

// Types d'interface
interface FormValues {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  role_id: number;
}

interface FormErrors {
  [key: string]: string[] | undefined;
  email?: string[];
  username?: string[];
  password?: string[];
  confirm_password?: string[];
  acceptedCGUs?: string[];
}


interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  role_id: number;
}

interface ApiError {
  errors?: FormErrors;
  message?: string;
}

const AccountCreationForm = () => {
  const [values, setValues] = useState<FormValues>({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    role_id: 1,
  });
  
  const [acceptedCGUs, setAcceptedCGUs] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
const router=useRouter();
  const { register, loading } = useRegister();

  // Fonction de validation d'un champ individuel
  const validateField = (name: keyof FormValues | "confirm_password", value: string): string[] => {
    switch (name) {
      case "email":
        if (!value) return ["Le champ email est requis."];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return ["Email invalide."];
        return [];
        
      case "username":
        if (!value) return ["Le pseudo est requis."];
        if (value.length < 3) return ["Le pseudo doit faire au moins 3 caractères."];
        return [];
        
      case "password":
        if (!value) return ["Le mot de passe est requis."];
        if (value.length < 8) return ["Le mot de passe doit contenir au moins 8 caractères."];
        return [];
        
      case "confirm_password":
        if (value !== values.password) return ["Les mots de passe ne correspondent pas."];
        return [];
        
      default:
        return [];
    }
  };

  // Validation à chaque changement de champ
  const handleChange = (name: keyof FormValues, text: string): void => {
    setValues((prev) => ({ ...prev, [name]: text }));

    const fieldErrors = validateField(name, text);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors.length > 0 ? fieldErrors : undefined,
    }));

    // Si on modifie le mot de passe, on valide aussi la confirmation
    if (name === "password" && values.confirm_password) {
      const confirmErrors = validateField("confirm_password", values.confirm_password);
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: confirmErrors.length > 0 ? confirmErrors : undefined,
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const newErrors: FormErrors = {};

    // Validation complète avant soumission
    Object.entries(values).forEach(([key, val]) => {
      const errs = validateField(key as keyof FormValues, val.toString());
      if (errs.length) newErrors[key] = errs;
    });

    if (!acceptedCGUs) {
      newErrors["acceptedCGUs"] = ["Vous devez accepter les CGU."];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register({
        email: values.email,
        username: values.username,
        password: values.password,
        password_confirmation: values.confirm_password,
        role_id: 1,
      } as RegisterPayload);

    } catch (err) {
      const apiError = err as ApiError;
      if (apiError?.errors) {
        setErrors(apiError.errors);
      } else {
        // Gérer d'autres types d'erreurs
        console.error("Erreur lors de l'inscription:", err);
        Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription.");
      }
    }
  };

  const toggleCGUAcceptance = (): void => {
    setAcceptedCGUs(!acceptedCGUs);
    // Clear error CGUs on toggle
    setErrors((prevErrors) => {
      const copy = { ...prevErrors };
      delete copy.acceptedCGUs;
      return copy;
    });
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
              Je crée mon compte
            </Text>
          </View>
          
          <View style={{ flex: 1 }}>
            <InputField
              label="Mon adresse mail"
              value={values.email}
              onChangeText={(text: string) => handleChange("email", text)}
              error={errors.email}
              keyboardType="email-address"
              autoComplete="email"
            />

            <InputField
              label="Mon pseudo"
              value={values.username}
              onChangeText={(text: string) => handleChange("username", text)}
              error={errors.username}
              autoComplete="username"
            />

            <InputField
              label="Mon mot de passe"
              secureTextEntry={!showPassword}
              value={values.password}
              onChangeText={(text: string) => handleChange("password", text)}
              error={errors.password}
              autoComplete="new-password"
              icon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.icon}
                  accessibilityLabel={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              }
            />

            <InputField
              label="Confirmer mon mot de passe"
              secureTextEntry={!showCPassword}
              value={values.confirm_password}
              onChangeText={(text: string) => handleChange("confirm_password", text)}
              error={errors.confirm_password}
              autoComplete="new-password"
              icon={
                <Pressable
                  onPress={() => setShowCPassword(!showCPassword)}
                  style={styles.icon}
                  accessibilityLabel={showCPassword ? "Masquer la confirmation" : "Afficher la confirmation"}
                >
                  <Ionicons
                    name={showCPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#888"
                  />
                </Pressable>
              }
            />

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={toggleCGUAcceptance}
                style={styles.checkbox}
                accessibilityLabel={acceptedCGUs ? "CGU acceptées" : "Accepter les CGU"}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: acceptedCGUs }}
              >
                {acceptedCGUs && <View style={styles.checkedBox} />}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                J'ai lu et j'accepte les{" "}
                <Text style={styles.link} onPress={()=>router.push('/settingsPage/CGUConfidentiality')}>
                  CGU
                </Text>
              </Text>
            </View>
            
            {errors.acceptedCGUs && (
              <Text style={[styles.checkboxText, styles.errorText]}>
                {errors.acceptedCGUs[0]}
              </Text>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!acceptedCGUs || loading) && styles.disabled,
              ]}
              disabled={!acceptedCGUs || loading}
              onPress={handleSubmit}
              accessibilityLabel={loading ? "Inscription en cours..." : "Valider l'inscription"}
            >
              <Text style={styles.submitText}>
                {loading ? "Chargement..." : "Valider"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffeda3",
    padding: 25,
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: "#F97316",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    height: 12,
    width: 12,
    backgroundColor: "#F97316",
  },
  checkboxText: {
    flex: 1,
    color: "#F97316",
  },
  link: {
    textDecorationLine: "underline",
    color: "#F97316",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#F97316",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AccountCreationForm;