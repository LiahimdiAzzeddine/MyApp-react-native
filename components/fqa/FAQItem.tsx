import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import RenderHtml from 'react-native-render-html';

type FAQItemProps = {
  question: string;
  answer: string;
  index: number;
  length: number;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index, length }) => {
  const [isOpen, setIsOpen] = useState(false);
    const { width } = useWindowDimensions();



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
const stripHtml = (html:any) => {
  return html
    .replace(/<br\s*\/?>/gi, '\n')     // Remplace <br> par 1 saut de ligne
    .replace(/<\/p>/gi, '\n')          // Remplace </p> par 1 saut de ligne
    .replace(/<[^>]+>/g, '')           // Supprime toutes les autres balises HTML
    .replace(/\n{2,}/g, '\n\n ')          // Remplace plusieurs sauts de ligne par un seul
    .trim();
};


  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.textContainer}>
          <Text className='ArchivoLight text-lg text-custom-blue leading-archivo '>{highlightTiCO(stripHtml(question))}</Text>
        </View>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#1a5b90"
        />
      </TouchableOpacity>

      {isOpen && (
    <View style={styles.answerBox}>
    <Text className='ArchivoLight text-base text-custom-blue leading-archivo '>
      {stripHtml(answer)}
    </Text>
      
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
    paddingHorizontal:16,
    paddingTop:8
  },
  textContainer: {
    width: '85%',
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
    paddingHorizontal:16,
    paddingVertical:10
  },
  separator: {
    height: 1,
    backgroundColor: '#f5a623', // equivalent to border-custom-text-orange
    width: '100%',
  },
});

export default FAQItem;
