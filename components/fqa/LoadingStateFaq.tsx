import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const LoadingStateFaq: React.FC = () => {
  const loadingItems = Array.from({ length: 10 });

  return (
    <FlatList
      data={loadingItems}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ index }) => (
        <View style={styles.item}>
          <View style={styles.row}>
            <View style={styles.placeholder} />
            <Ionicons name="chevron-down" size={24} color="#9ca3af" />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#fb923c', // Tailwind's custom-text-orange equivalent
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: {
    height: 36,
    backgroundColor: '#e5e7eb', // Tailwind's bg-gray-200
    borderRadius: 8,
    width: '95%',
  },
});

export default LoadingStateFaq;
