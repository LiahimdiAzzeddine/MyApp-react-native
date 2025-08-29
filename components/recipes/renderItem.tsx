import { Text, TouchableOpacity } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";
import styles from "../../app/recipetab/styles";

interface RenderItemWithRemove extends RenderItemParams<string> {
  removeStep: (index: number) => void;
}

export const renderItem = ({
  item,
  getIndex,
  drag,
  isActive,
  removeStep,
}: RenderItemWithRemove) => {
  const index = getIndex?.() ?? 0;

  return (
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      style={[
        styles.stepTag,
        {
          backgroundColor: isActive ? "#e0e0e0" : "#f8f8f8",
          opacity: isActive ? 0.8 : 1,
          transform: [{ scale: isActive ? 1 : 0.98 }],
          zIndex: isActive ? 1000 : 1,
          elevation: isActive ? 5 : 1,
        },
      ]}
    >
      <Text style={styles.stepNumber}>Étape {index + 1}</Text>
      <Text style={styles.stepText}>{item}</Text>
      <TouchableOpacity
        onPress={() => removeStep(index)}
        style={styles.removeTagButtonStep}
        disabled={isActive}
      >
        <Text style={styles.removeTagButtonText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
