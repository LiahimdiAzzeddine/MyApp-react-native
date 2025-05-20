import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

type FAQItemProps = {
  question: string;
  answer: string;
  index: number;
  length: number;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index, length }) => {
  const [isOpen, setIsOpen] = useState(false);

  const highlightTiCO = (text: string) => {
    const parts = text.split(/(TiCO)/i);
    return parts.map((part, idx) => {
      if (part.toLowerCase() === 'tico') {
        return (
          <Text key={idx} style={styles.ticoBold}>
            Ti<Text style={styles.ticoInner}>CO</Text>
          </Text>
        );
      }
      return <Text key={idx}>{part}</Text>;
    });
  };

  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.textContainer}>
          <Text style={styles.questionText}>{highlightTiCO(question)}</Text>
        </View>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#1a5b90"
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.answerBox}>
          <Text style={styles.answerText}>{highlightTiCO(answer)}</Text>
        </View>
      )}

      <View style={styles.separatorContainer}>
        {index < length - 1 ? (
          <View style={styles.separator} />
        ) : (
          <View style={{ height: 16 }} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    width: '85%',
  },
  questionText: {
    color: '#1a5b90',
    fontSize: 18,
    flexWrap: 'wrap',
  },
  ticoBold: {
    fontWeight: 'bold',
  },
  ticoInner: {
    letterSpacing: -1,
  },
  answerBox: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff5d3',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    width: '96%',
  },
  answerText: {
    color: '#1a5b90',
    fontSize: 14,
  },
  separatorContainer: {
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#f5a623', // equivalent to border-custom-text-orange
    width: '100%',
  },
});

export default FAQItem;
