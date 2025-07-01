import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonGroupProps {
  options: string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  multiSelect?: boolean;
  error?: string;
}

export default function ButtonGroup({ 
  options, 
  selectedValues, 
  onToggle, 
  multiSelect = true,
  error 
}: ButtonGroupProps) {
  return (
    <View>
      <View style={styles.buttonGroup}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option);
          return (
            <TouchableOpacity
              key={option}
              onPress={() => onToggle(option)}
              style={[
                styles.filterButton,
                isSelected ? styles.activeButton : null,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isSelected ? styles.activeButtonText : null,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
  },
  activeButton: {
    backgroundColor: "#D32F2F",
    borderColor: "#D32F2F",
  },
  buttonText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: '500',
  },
  activeButtonText: {
    color: "#FFF",
  },
  errorText: {
    color: "#B71C1C",
    fontSize: 14,
    marginTop: 8,
  },
});