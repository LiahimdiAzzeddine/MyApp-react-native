import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, ScrollView } from "react-native";
import useContact,{FormValues} from "@/hooks/useContact";



const Contact = () => {
  const { handleSubmit, loading, error, sended } = useContact();
  const [values, setValues] = useState({ email: "", titre: "", message: "" });

  

  const onChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = () => {
    handleSubmit(values as unknown as FormValues);
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nous contacter</Text>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mon adresse mail</Text>
          <TextInput
            style={[styles.input, error?.email ? styles.inputError : styles.inputDefault]}
            value={values.email}
            onChangeText={(text) => onChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            accessible
            accessibilityLabel="Email"
            accessibilityHint="Entrez votre adresse email"
          />
          {error?.email && <Text style={styles.errorText}>{error.email[0]}</Text>}
        </View>

        {/* Titre */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Titre</Text>
          <TextInput
            style={[styles.input, error?.titre ? styles.inputError : styles.inputDefault]}
            value={values.titre}
            onChangeText={(text) => onChange("titre", text)}
            accessible
            accessibilityLabel="Titre"
            accessibilityHint="Entrez le titre"
          />
          {error?.titre && <Text style={styles.errorText}>{error.titre[0]}</Text>}
        </View>

        {/* Message */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.textarea, error?.message ? styles.inputError : styles.inputDefault]}
            value={values.message}
            onChangeText={(text) => onChange("message", text)}
            multiline
            numberOfLines={4}
            accessible
            accessibilityLabel="Message"
            accessibilityHint="Entrez votre message"
          />
          {error?.message && <Text style={styles.errorText}>{error.message[0]}</Text>}
        </View>

        {/* Bouton Envoyer */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleFormSubmit}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Envoyer le message"
        >
          <Text style={styles.buttonText}>{loading ? "Envoi..." : "Envoyer"}</Text>
        </TouchableOpacity>

        {/* Spinner en overlay */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFA500" />
          </View>
        )}
      </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1D4ED8", // bleu custom
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
  },
  label: {
    color: "#F97316", // orange-500
    marginBottom: 6,
    fontWeight: "700",
    fontSize: 16,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 15,
    fontSize: 16,
    fontFamily: "Archivo-Regular", // si tu utilises cette police
  },
  textarea: {
    width: "100%",
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 15,
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
    fontFamily: "Archivo-Regular",
  },
  inputError: {
    borderColor: "#EF4444", // rouge-500
  },
  inputDefault: {
    borderColor: "#FB923C", // orange-300
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 4,
    width: "100%",
  },
  button: {
    backgroundColor: "#F97316",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    marginTop: 10,
    alignSelf: "center",
    transform: [{ scale: 1 }],
  },
  buttonDisabled: {
    opacity: 0.6,
    transform: [{ scale: 0.9 }],
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "Archivo-Bold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(31, 41, 55, 0.6)", // gris foncé avec transparence
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
