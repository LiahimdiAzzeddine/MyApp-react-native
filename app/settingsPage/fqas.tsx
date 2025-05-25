import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import useFAQ from '@/hooks/useFAQ';
import FAQItem from '@/components/fqa/FAQItem';
import LoadingStateFaq from '@/components/fqa/LoadingStateFaq';
import { EmptyStateFaq } from '@/components/fqa/EmptyStateFaq';
import ErrorState from '@/components/recipes/ErrorState';
import RenderHeaderTab from '@/components/ui/renderHeader';
import { FlatList } from 'react-native';


const FAQComponent: React.FC = () => {
  const { faqs, loading, error } = useFAQ();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <RenderHeaderTab
          title="Foire aux questions"
          titleColor="#0F548D"
        />

      {/* FAQ List Section */}
    {!loading && !error && (
  <FlatList
    contentContainerStyle={styles.faqList}
    data={faqs}
    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
    renderItem={({ item, index }) => (
      <FAQItem
        question={item.question}
        answer={item.answer}
        index={index}
        length={faqs.length}
      />
    )}
    ListEmptyComponent={<EmptyStateFaq />}
  />
)}
{loading && <LoadingStateFaq />}
{!loading && error && <ErrorState message={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  faqList: {
    paddingBottom: 60,
  },
});

export default FAQComponent;
