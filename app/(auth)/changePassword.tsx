import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "@/hooks/useToast";
import useChangePassword from "@/hooks/auth/useChangePassword";

type Params = {
  email?: string;
  token?: string;
};

type Props = {
  Close?: (value: boolean) => void;
};

const ChangePassword: React.FC<Props> = ({ Close }) => {
  const { params } = useRoute();
  const { email: routeEmail, token: routeToken } = params as Params;

  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  const { changePassword, loading, error } = useChangePassword();
  const { triggerToast } = useToast();

  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [touched, setTouched] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (routeEmail && routeToken) {
      setEmail(routeEmail);
      setToken(routeToken);
    }
  }, [routeEmail, routeToken]);



  const validateField = (field: keyof typeof values) => {
    let error = "";

    if (field === "oldPassword" && !email) {
      if (!values.oldPassword.trim())
        error = "L'ancien mot de passe est requis";
    }

    if (field === "newPassword") {
      if (!values.newPassword.trim())
        error = "Le nouveau mot de passe est requis";
      else if (values.newPassword.length < 8)
        error = "Le mot de passe doit contenir au moins 8 caractères";
      else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(
          values.newPassword
        )
      )
        error =
          "Mot de passe doit contenir majuscule, minuscule, chiffre et caractère spécial";
      else if (values.oldPassword && values.newPassword === values.oldPassword)
        error = "Le nouveau mot de passe doit être différent de l'ancien";
    }

    if (field === "confirmPassword") {
      if (!values.confirmPassword.trim()) error = "Confirmation requise";
      else if (values.confirmPassword !== values.newPassword)
        error = "Les mots de passe ne correspondent pas";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleBlur = (field: keyof typeof values) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((e) => e === "") &&
      values.newPassword &&
      values.confirmPassword &&
      (email || values.oldPassword)
    );
  };

  const handleSubmit = async () => {
    const allFields: (keyof typeof values)[] = [
      "oldPassword",
      "newPassword",
      "confirmPassword",
    ];
    const newTouched = {
      oldPassword: true,
      newPassword: true,
      confirmPassword: true,
    };
    setTouched(newTouched);
    allFields.forEach(validateField);

    if (!isFormValid()) {
      triggerToast("Veuillez corriger les erreurs", "error");
      return;
    }

    await changePassword({
      currentPassword: values.oldPassword,
      newPassword: values.newPassword,
      newPasswordConfirmation: values.confirmPassword,
      emailParam: email,
      token,
    });

  };

  const getInputStyle = (field: keyof typeof errors) => {
    const hasError = touched[field] && errors[field];
    const hasServerError =
      field === "oldPassword"
        ? error?.current_password
        : field === "newPassword"
        ? error?.new_password
        : false;

    return [styles.input, (hasError || hasServerError) && styles.inputError];
  };

  const renderField = (
    label: string,
    field: keyof typeof values,
    showKey: keyof typeof showPasswords,
    showIf?: boolean
  ) => {
    if (showIf === false) return null;

    return (
      <View className="w-full max-w-md mb-4">
        <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
          {label}
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={getInputStyle(field)}
            
            secureTextEntry={!showPasswords[showKey]}
            value={values[field]}
            onChangeText={(text) => setValues({ ...values, [field]: text })}
            onBlur={() => handleBlur(field)}
            placeholder="********"
          />
          <TouchableOpacity
            onPress={() =>
              setShowPasswords((prev) => ({
                ...prev,
                [showKey]: !prev[showKey],
              }))
            }
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPasswords[showKey] ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {touched[field] && errors[field] ? (
          <Text style={styles.errorText}>{errors[field]}</Text>
        ) : field === "oldPassword" && error?.current_password ? (
          <Text style={styles.errorText}>{error.current_password[0]}</Text>
        ) : field === "newPassword" && error?.new_password ? (
          <Text style={styles.errorText}>{error.new_password[0]}</Text>
        ) : null}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      className="bg-custom-orange"
      style={{ flex: 1 }}
      behavior="padding"
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
            <Text className="text-custom-blue text-3xl ClashDisplayBold text-center">
              Changer mon mot de passe
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            {renderField("Ancien mot de passe", "oldPassword", "old", !email)}
            {renderField("Nouveau mot de passe", "newPassword", "new")}
            {renderField("Confirmer", "confirmPassword", "confirm")}

            <TouchableOpacity
              style={[
                styles.button,
                (!isFormValid() || loading) && styles.buttonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid() || loading}
            >
                <Text className="text-white ArchivoBold text-lg">
                  Modifier le mot de passe
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
  inputWrapper: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fdba74",
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 14,
  },
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
  submitButton: {
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChangePassword;
