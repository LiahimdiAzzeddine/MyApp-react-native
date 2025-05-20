import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import useForgotPassword from '@/hooks/auth/useForgotPassword';

const ForgotPassword = () => {
  const { handleForgotPassword, loading, error } = useForgotPassword();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async () => {
    const result = await handleForgotPassword({ email });

    if (result.success) {
      setSuccessMessage('Un email de réinitialisation a été envoyé.');
      Alert.alert('Succès','Un email de réinitialisation a été envoyé.');
    
    } else {
      setSuccessMessage(null);
            Alert.alert('error',error?String(error):'Une erreur est survenue.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>
        Réinitialiser{'\n'}le mot de passe
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Mon adresse mail</Text>
        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : styles.inputDefault,
          ]}
          value={email}
          onChangeText={setEmail}
          placeholder="Entrez votre email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Réinitialiser</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    color: '#0077b6',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#fb8500',
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    fontSize: 16,
  },
  inputDefault: {
    borderColor: '#ffb703',
  },
  inputError: {
    borderColor: '#ef233c',
  },
  errorText: {
    color: '#ef233c',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#fb8500',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPassword;
