import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import useForgotPassword from "@/hooks/auth/useForgotPassword";

const ForgotPassword = () => {
  const { handleForgotPassword, loading, error } = useForgotPassword();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onSubmit = async () => {
    const result = await handleForgotPassword({ email });

    if (result.success) {
      setSuccessMessage("Un email de réinitialisation a été envoyé.");
      Alert.alert("Succès", "Un email de réinitialisation a été envoyé.");
    } else {
      setSuccessMessage(null);
      Alert.alert("Erreur", error ? String(error) : "Une erreur est survenue.");
    }
  };

  const isDisabled = loading || !isValidEmail(email);

  return (
    <KeyboardAvoidingView
      className="bg-custom-orange flex-1 static"
      style={{ flex: 1, padding: 25 }}
      behavior={"padding"}
    >
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
        <Text className="text-custom-blue text-3xl ClashDisplayBold text-center">
          Réinitialiser{"\n"}le mot de passe
        </Text>
      </View>

      <View style={{ flex: 4, alignItems: "center" }}>
        <View style={styles.form}>
          <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
            Mon adresse mail
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Entrez votre email"
            keyboardType="email-address"
            autoComplete="email"
            autoCapitalize="none"
            style={{borderRadius: 15,}}
               className={`w-full p-3 border-2  text-base bg-white ${
          error ? "border-red-500" : "border-orange-300"
        }`}
          />

          {error && <Text className="text-red-500 text-sm text-center mb-2">{error}</Text>}

          <TouchableOpacity
            style={[styles.button, isDisabled && styles.buttonDisabled]}
            onPress={onSubmit}
            disabled={isDisabled}
          >
            <Text className="text-white ArchivoBold text-lg">Réinitialiser</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  button: {
        marginTop: 20,
    backgroundColor: "#FF8200",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#FFB877", // plus clair pour montrer l'état désactivé
  },
});

export default ForgotPassword;
