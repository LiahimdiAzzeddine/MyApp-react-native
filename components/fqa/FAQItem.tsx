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

function stripHtmlTags(html:any) {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

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
          <Text className='ArchivoLight text-lg text-custom-blue leading-archivo '>{highlightTiCO(stripHtmlTags(question))}</Text>
        </View>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#1a5b90"
        />
      </TouchableOpacity>

      {isOpen && (
    <View style={styles.answerBox}>
      <RenderHtml
        contentWidth={width}
        source={{ html: answer }}
        tagsStyles={{
          p: styles.answerText,
          b: { fontWeight: 'bold' },
          i: { fontStyle: 'italic' }
        }}
      />
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
