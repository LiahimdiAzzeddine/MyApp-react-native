import React from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import useFAQ from '@/hooks/useFAQ';
import FAQItem from '@/components/fqa/FAQItem';
import LoadingStateFaq from '@/components/fqa/LoadingStateFaq';
import { EmptyStateFaq } from '@/components/fqa/EmptyStateFaq';
import ErrorState from '@/components/recipes/ErrorState';

const { width } = Dimensions.get('window');

const FAQComponent: React.FC = () => {
  const { faqs, loading, error } = useFAQ();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <ImageBackground
        resizeMode="contain"
        style={styles.headerImage}
      >
        <Text style={styles.headerText}>Foire aux questions</Text>
      </ImageBackground>

      {/* FAQ List Section */}
      <ScrollView contentContainerStyle={styles.faqList}>
        {loading && <LoadingStateFaq />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && faqs.length === 0 && <EmptyStateFaq />}
        {!loading && !error && faqs.length > 0 &&
          faqs.map((faq, index) => (
            <FAQItem
              key={faq.id || index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              length={faqs.length}
            />
          ))
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  headerText: {
    fontSize: 26,
    color: '#1a5b90',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  faqList: {
    padding: 16,
    paddingBottom: 60,
  },
});

export default FAQComponent;
