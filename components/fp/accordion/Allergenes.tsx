import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useBottomSheet } from '@/context/BottomSheetContext';

type Props = {
  allergenes: string[];
};

const allergenesImg: Record<string, any> = {
  peanuts: require('@/assets/images/fp/Allergenes/Arachides.png'),
  celery: require('@/assets/images/fp/Allergenes/Celeri.png'),
  molluscs: require('@/assets/images/fp/Allergenes/Mollusques.png'),
  crustaceans: require('@/assets/images/fp/Allergenes/Crustaces.png'),
  nuts: require('@/assets/images/fp/Allergenes/Fruits_a_coque.png'),
  gluten: require('@/assets/images/fp/Allergenes/Gluten.png'),
  milk: require('@/assets/images/fp/Allergenes/Lait.png'),
  lupin: require('@/assets/images/fp/Allergenes/Lupin.png'),
  mustard: require('@/assets/images/fp/Allergenes/Moutarde.png'),
  eggs: require('@/assets/images/fp/Allergenes/Oeuf.png'),
  fish: require('@/assets/images/fp/Allergenes/Poisson.png'),
  'sesame-seeds': require('@/assets/images/fp/Allergenes/Sesame.png'),
  soybeans: require('@/assets/images/fp/Allergenes/Soja.png'),
  'sulphur-dioxide-and-sulphites': require('@/assets/images/fp/Allergenes/Sulfites.png'),
};

const allergenesEngToFr: Record<string, string> = {
  peanuts: 'Arachides',
  celery: 'Céleri',
  molluscs: 'Mollusques',
  crustaceans: 'Crustacés',
  nuts: 'Noix',
  gluten: 'Gluten',
  milk: 'Lait',
  lupin: 'Lupin',
  mustard: 'Moutarde',
  eggs: 'Œufs',
  fish: 'Poisson',
  'sesame-seeds': 'Graines de sésame',
  soybeans: 'Soja',
  'sulphur-dioxide-and-sulphites': 'Dioxyde de soufre et sulfites',
};

const Allergenes: React.FC<Props> = ({ allergenes }) => {
  const { setIsCourager } = useBottomSheet();

  return (
    <View>
     <Text
          className="text-xl text-custom-blue ArchivoBold "
          style={{ paddingVertical: 5 }}
        >
          <Text className="text-custom-blue ArchivoBold">Allergènes</Text>
        </Text>

      {allergenes && allergenes.length > 0 ? (
        <View style={styles.gridContainer}>
          {allergenes.map((allergene, index) => (
            <View key={index} style={styles.allergenContainer}>
              {allergenesImg[allergene] ? (
                <Image
                  source={allergenesImg[allergene]}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <TouchableOpacity style={styles.placeholder} onPress={() => setIsCourager(true)}>
                  <Text style={styles.placeholderText}>?</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.label}>
                {allergenesEngToFr[allergene] || 'Incertain'}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noAllergenContainer}>
          <Text style={styles.noAllergenText}>Ne contient pas d'Allergènes</Text>
          <TouchableOpacity onPress={() => setIsCourager(true)}>
            <Text style={styles.confirmText}>À confirmer par la marque</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  allergenContainer: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 48,
    height: 48,
  },
  placeholder: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 28,
  },
  placeholderText: {
    color: '#0000FF',
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    color: '#0F548D',
    fontFamily: 'ArchivoBold',
    textAlign: 'center',
  },
  noAllergenContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 24,
    paddingBottom: 24,
  },
  noAllergenText: {
    color: '#0000FF',
    fontSize: 14,
  },
  confirmText: {
    color: '#0000FF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 13,
  },
});

export default Allergenes;
