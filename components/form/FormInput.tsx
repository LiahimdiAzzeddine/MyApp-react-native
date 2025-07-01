import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export default function FormInput({ label, error, required = false, style, ...props }: FormInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          style,
        ]}
        placeholderTextColor="#999"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: '500',
  },
  required: {
    color: '#B71C1C',
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFCDD2",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: "#B71C1C",
  },
  errorText: {
    color: "#B71C1C",
    fontSize: 14,
    marginTop: 4,
  },
});