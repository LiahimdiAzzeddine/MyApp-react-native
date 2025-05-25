import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

export  const InputField = ({
  label,
  value,
  placeholder,
  keyboardType,
  onChangeText,
  secureTextEntry,
  error,
  autoComplete,
  icon,
}: {
  label: string;
  value: string;
  placeholder?:string;
  keyboardType?:KeyboardTypeOptions | undefined;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string[];
  icon?: React.ReactNode;
  autoComplete:any,
}) => (
  <View className="w-full max-w-md mb-4">
    <Text className="text-custom-text-orange mb-1 text-base text-center ArchivoBold">
      {label}
    </Text>
    <View style={{ position: "relative" }}>
      <TextInput
        className={`w-full p-3 border-2  text-base bg-white ${
          error ? "border-red-500" : "border-orange-300"
        }`}
        style={{borderRadius: 15,}}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
      />
      {icon}
    </View>
    {error && (
      <Text className="text-red-500 text-sm text-center mb-2">{error[0]}</Text>
    )}
  </View>
);
