// components/AccountCreationForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import useRegister from '@/hooks/auth/useRegister';
import { Ionicons } from '@expo/vector-icons';

const AccountCreationForm = ({ onClose }: { onClose: () => void }) => {
  const [values, setValues] = useState({
    email: '',
    userName: '',
    password: '',
    confirm_password: '',
    role_id: 1,
  });
  const [acceptedCGUs, setAcceptedCGUs] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const { register, loading } = useRegister();

  const handleSubmit = async () => {
    setErrors({});
    if (values.password !== values.confirm_password) {
      setErrors({
        confirm_password: ['Les mots de passe ne correspondent pas.'],
      });
      return;
    }

    try {
      await register({
        email: values.email,
        username: values.userName,
        password: values.password,
        password_confirmation: values.confirm_password,
        role_id: 1,
      });
      onClose();
    } catch (err: any) {
      if (err?.errors) {
        setErrors(err.errors);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Je crée mon compte</Text>

      <InputField
        label="Mon adresse mail"
        value={values.email}
        onChangeText={(text) => setValues({ ...values, email: text })}
        error={errors.email}
      />

      <InputField
        label="Mon pseudo"
        value={values.userName}
        onChangeText={(text) => setValues({ ...values, userName: text })}
        error={errors.username}
      />

      <InputField
        label="Mon mot de passe"
        secureTextEntry={!showPassword}
        value={values.password}
        onChangeText={(text) => setValues({ ...values, password: text })}
        error={errors.password}
        icon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
        onChangeText={(text) =>
          setValues({ ...values, confirm_password: text })
        }
        error={errors.confirm_password}
        icon={
          <TouchableOpacity onPress={() => setShowCPassword(!showCPassword)}>
          <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#888"
                      />
          </TouchableOpacity>
        }
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => setAcceptedCGUs(!acceptedCGUs)}
          style={styles.checkbox}
        >
          {acceptedCGUs && <View style={styles.checkedBox} />}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          J'ai lu et j'accepte les{' '}
          <Text
            style={styles.link}
            onPress={() => Alert.alert('CGU', 'Afficher CGU ici')}
          >
            CGU
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          !acceptedCGUs || loading ? styles.disabled : {},
        ]}
        disabled={!acceptedCGUs || loading}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Valider</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </ScrollView>
  );
};

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  error,
  icon,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string[];
  icon?: React.ReactNode;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {icon && <View style={styles.icon}>{icon}</View>}
    </View>
    {error && <Text style={styles.errorText}>{error[0]}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#004488',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#F97316',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FDBA74',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  icon: {
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: '#F97316',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    height: 12,
    width: 12,
    backgroundColor: '#F97316',
  },
  checkboxText: {
    flex: 1,
    color: '#F97316',
  },
  link: {
    textDecorationLine: 'underline',
    color: '#F97316',
  },
  submitButton: {
    backgroundColor: '#F97316',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountCreationForm;
