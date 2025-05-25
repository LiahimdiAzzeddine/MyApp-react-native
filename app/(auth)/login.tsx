import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { useLogin } from "@/hooks/auth/useLogin";
import { Ionicons } from "@expo/vector-icons";
import useSendValidationEmail from "@/hooks/auth/useSendValidationEmail";
import { TouchableOpacity } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { handleSubmit, loading, errorMessage, status, setStatus } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // États pour la validation temps réel
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const { sendValidationEmail } = useSendValidationEmail({
    to_email: email,
    setStatus,
  });

  // Vérifie si l'email est valide
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validation en temps réel de l'email
  useEffect(() => {
    if (emailTouched) {
      if (email.trim() === "") {
        setEmailError("L'adresse email est requise");
      } else if (!isValidEmail(email)) {
        setEmailError("Format d'email invalide");
      } else {
        setEmailError("");
      }
    }
  }, [email, emailTouched]);

  // Validation en temps réel du mot de passe
  useEffect(() => {
    if (passwordTouched) {
      if (password.trim() === "") {
        setPasswordError("Le mot de passe est requis");
      } else if (password.length < 6) {
        setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      } else {
        setPasswordError("");
      }
    }
  }, [password, passwordTouched]);

  // Le formulaire est valide si l'email est correct, le mot de passe rempli et aucune erreur
  const isFormValid = isValidEmail(email) && password.trim() !== "" && !emailError && !passwordError;

  const onSubmit = async () => {
    // Marquer tous les champs comme touchés avant la soumission
    setEmailTouched(true);
    setPasswordTouched(true);
    
    if (isFormValid) {
      const success = await handleSubmit({ email, password });
      if (success) {
        router.replace("/(tabs)");
      }
    }
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
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text className="text-custom-blue text-3xl ClashDisplayBold">
              Connexion
            </Text>
          </View>

          <View style={{ flex: 2}}>
            {/* Email */}
            <View className="w-full max-w-md mb-4">
              <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
                Mon adresse mail
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                onBlur={() => setEmailTouched(true)}
                placeholder="Adresse email"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                style={{
                  borderRadius: 15,
                  borderColor: emailError && emailTouched ? "#ef4444" : "#fed7aa"
                }}
                className={`w-full p-3 border-2 text-base bg-white ${
                  emailError && emailTouched ? "border-red-500" : "border-orange-300 focus:border-custom-text-orange"
                }`}
              />
              {/* Afficher l'erreur temps réel ou l'erreur du serveur */}
              {emailTouched && emailError ? (
                <Text className="text-red-500 text-sm text-center mt-1">
                  {emailError}
                </Text>
              ) : errorMessage?.email ? (
                <Text className="text-red-500 text-sm text-center mt-1">
                  {errorMessage.email[0]}
                </Text>
              ) : null}
            </View>

            {/* Mot de passe */}
            <View className="w-full max-w-md mb-2">
              <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
                Mon mot de passe
              </Text>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  onBlur={() => setPasswordTouched(true)}
                  placeholder="Mot de passe"
                  autoComplete="password"
                  secureTextEntry={!showPassword}
                  style={{
                    borderColor: passwordError && passwordTouched ? "#ef4444" : "#fed7aa"
                  }}
                  className={`w-full p-3 border-2 rounded-xl text-base bg-white ${
                    passwordError && passwordTouched ? "border-red-500" : "border-orange-300 focus:border-custom-text-orange"
                  }`}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4"
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#888"
                  />
                </Pressable>
              </View>
              {/* Afficher l'erreur temps réel ou l'erreur du serveur */}
              {passwordTouched && passwordError ? (
                <Text className="text-red-500 text-sm text-center mt-1">
                  {passwordError}
                </Text>
              ) : errorMessage?.password ? (
                <Text className="text-red-500 text-sm text-center mt-1">
                  {errorMessage.password[0]}
                </Text>
              ) : null}
            </View>

            <View className="w-full mb-4">
              <Pressable>
                <Text
                  className="text-custom-text-orange text-base Archivo"
                  onPress={() => router.push("/(auth)/forgotPassword")}
                >
                  Mot de passe oublié ?
                </Text>
              </Pressable>
            </View>

            {/* Bouton Connexion */}
            <TouchableOpacity
              style={[
                styles.button,
                (!isFormValid || loading) && styles.buttonDisabled,
              ]}
              onPress={onSubmit}
              disabled={!isFormValid || loading}
            >
              <Text className="text-white ArchivoBold text-lg">
                {loading ? "Connexion..." : "Se connecter"}
              </Text>
            </TouchableOpacity>

            {/* Créer un compte */}
            <Pressable>
              <Text
                className="text-custom-text-orange text-base Archivo mt-4 text-center"
                onPress={() => router.push("/(auth)/register")}
              >
                Je crée mon compte
              </Text>
            </Pressable>

            {/* Message d'erreur général */}
            {errorMessage?.account && (
              <Text className="text-red-500 text-sm text-center mt-2">
                {errorMessage.account[0] ?? errorMessage.message}
              </Text>
            )}

            {status == 404 && (
              <Pressable className="mt-2">
                <Text
                  className="text-custom-text-orange text-base Archivo text-center"
                  onPress={() => sendValidationEmail()}
                >
                  Demander un nouveau lien de validation
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF8200",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#FFB877", // plus clair pour montrer l'état désactivé
  },
  container: {
    backgroundColor: "#ffeda3",
    padding: 25,
    flexGrow: 1,
    justifyContent: "center",
  },
});