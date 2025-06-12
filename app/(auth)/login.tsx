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
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useLogin } from "@/hooks/auth/useLogin";
import { Ionicons } from "@expo/vector-icons";
import useSendValidationEmail from "@/hooks/auth/useSendValidationEmail";

export default function LoginScreen() {
  const router = useRouter();
  const { handleSubmit, loading, errorMessage, status, setStatus } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  const { sendValidationEmail } = useSendValidationEmail({
    to_email: email,
    setStatus: setIsInactive,
  });

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (emailTouched) {
      if (!email.trim()) {
        setEmailError("L'adresse email est requise");
      } else if (!isValidEmail(email)) {
        setEmailError("Format d'email invalide");
      } else {
        setEmailError("");
      }
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched) {
      if (!password.trim()) {
        setPasswordError("Le mot de passe est requis");
      } else if (password.length < 6) {
        setPasswordError("Le mot de passe doit contenir au moins 6 caractères");
      } else {
        setPasswordError("");
      }
    }
  }, [password, passwordTouched]);

  useEffect(() => {
    const isAccountInactive =
      errorMessage?.account?.[0] ===
        "Le compte utilisateur est inactif. Veuillez valider l'inscription via votre boîte email." ||
      errorMessage?.message ===
        "Le compte utilisateur est inactif. Veuillez valider l'inscription via votre boîte email.";

    setIsInactive(!!isAccountInactive);
  }, [errorMessage]);

  const isFormValid =
    isValidEmail(email) &&
    password.trim() !== "" &&
    !emailError &&
    !passwordError;

  const onSubmit = async () => {
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!isFormValid) return;

    const success = await handleSubmit({ email, password });
    if (success) {
      router.replace("/(tabs)");
    }
  };

  return (
    <KeyboardAvoidingView className="bg-custom-orange" style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text className="text-custom-blue text-3xl ClashDisplayBold">Connexion</Text>
          </View>

          <View style={{ flex: 2 }}>
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
                keyboardType="email-address"
                style={{
                  borderColor: emailError ? "#ef4444" : "#fed7aa",
                }}
                className={`w-full p-3 border-2 text-base bg-white rounded-xl ${
                  emailError ? "border-red-500" : "border-orange-300"
                }`}
              />
              {emailTouched && emailError && (
                <Text className="text-red-500 text-sm text-center mt-1">{emailError}</Text>
              )}
              {!emailError && errorMessage?.email && (
                <Text className="text-red-500 text-sm text-center mt-1">{errorMessage.email[0]}</Text>
              )}
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
                  secureTextEntry={!showPassword}
                  style={{
                    borderColor: passwordError ? "#ef4444" : "#fed7aa",
                  }}
                  className={`w-full p-3 border-2 rounded-xl text-base bg-white ${
                    passwordError ? "border-red-500" : "border-orange-300"
                  }`}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} className="absolute right-3 top-4">
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
                </Pressable>
              </View>
              {passwordTouched && passwordError && (
                <Text className="text-red-500 text-sm text-center mt-1">{passwordError}</Text>
              )}
              {!passwordError && errorMessage?.password && (
                <Text className="text-red-500 text-sm text-center mt-1">{errorMessage.password[0]}</Text>
              )}
            </View>

            <View className="w-full mb-4">
              <Pressable onPress={() => router.push("/(auth)/forgotPassword")}>
                <Text className="text-custom-text-orange text-base Archivo text-center">
                  Mot de passe oublié ?
                </Text>
              </Pressable>
            </View>

            {/* Bouton Connexion */}
            <TouchableOpacity
              style={[styles.button, (!isFormValid || loading) && styles.buttonDisabled]}
              onPress={onSubmit}
              disabled={!isFormValid || loading}
            >
              <Text className="text-white ArchivoBold text-lg">
                {loading ? "Connexion..." : "Se connecter"}
              </Text>
            </TouchableOpacity>

            {/* Créer un compte */}
            <Pressable onPress={() => router.push("/(auth)/register")}>
              <Text className="text-custom-text-orange text-base Archivo mt-4 text-center">
                Je crée mon compte
              </Text>
            </Pressable>

            {/* Erreurs serveur générales */}
            {errorMessage?.account && (
              <Text className="text-red-500 text-sm text-center mt-2">
                {errorMessage.account[0] ?? errorMessage.message}
              </Text>
            )}

            {isInactive && (
              <Pressable className="mt-2" onPress={sendValidationEmail}>
                <Text className="text-custom-text-orange text-base Archivo text-center">
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
   header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
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
