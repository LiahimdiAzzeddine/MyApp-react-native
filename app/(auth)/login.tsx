import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useLogin } from "@/hooks/auth/useLogin";
import { Ionicons } from "@expo/vector-icons"; 

export default function LoginScreen() {
  const router = useRouter();
  const { handleSubmit, loading, errorMessage } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async () => {
    const success = await handleSubmit({ email, password });
    if (success) {
      router.replace("/(tabs)");
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-custom-orange">
      <Text className="text-xl font-bold text-orange-500 mb-6">Connexion</Text>

      {/* Email */}
      <View className="w-full max-w-md mb-4">
        <Text className="text-orange-500 font-bold text-center mb-1">
          Mon adresse mail
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Adresse email"
          autoCapitalize="none"
          keyboardType="email-address"
          className="w-full p-3 border-2 rounded-xl text-base bg-white border-orange-300 focus:border-orange-500"
        />
      </View>

      {/* Mot de passe */}
      <View className="w-full max-w-md mb-4">
        <Text className="text-orange-500 font-bold text-center mb-1">
          Mon mot de passe
        </Text>
        <View className="relative">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry={!showPassword}
            className="w-full p-3 border-2 rounded-xl text-base bg-white border-orange-300 focus:border-orange-500"
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
      </View>

      {/* Message d'erreur */}
      {errorMessage ? (
        <Text className="text-red-500 text-sm text-center mb-2">
          {errorMessage}
        </Text>
      ) : null}

      {/* Bouton Connexion */}
      <Pressable
        onPress={onSubmit}
        disabled={loading}
        className="bg-orange-500 rounded-xl px-6 py-3 mb-4 active:scale-95"
      >
        <Text className="text-white font-bold text-lg">
          {loading ? "Connexion..." : "Se connecter"}
        </Text>
      </Pressable>

      {/* Loader */}
      {loading && <ActivityIndicator size="small" color="#f97316" />}

      {/* Mot de passe oublié */}
      <Pressable>
        <Text className="text-orange-500 text-sm font-medium mb-2">
          Mot de passe oublié ?
        </Text>
      </Pressable>

      {/* Créer un compte */}
      <Pressable>
        <Text className="text-orange-500 text-sm font-medium">
          Je crée mon compte
        </Text>
      </Pressable>
    </View>
  );
}
