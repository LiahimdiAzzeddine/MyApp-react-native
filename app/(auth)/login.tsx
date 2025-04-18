import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import { View, TextInput, Button, Alert, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useLogin } from '@/hooks/auth/useLogin';

export default function LoginScreen() {
  const router = useRouter();
  const { handleSubmit, loading, errorMessage } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  


  const onSubmit = async () => {
    const success = await handleSubmit({ email, password });
    if (success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mot de passe"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <Button title={loading ? 'Connexion en cours...' : 'Se connecter'} onPress={onSubmit} disabled={loading} />

      {loading && <ActivityIndicator size="small" color="#007AFF" style={{ marginTop: 10 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  btn:{
    backgroundColor:"bleu"
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});