import { useBottomSheet } from '@/context/BottomSheetContext';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

type Props = {
  allergenes: string[];
};

// Définir les images avec leur chemin d'importation correct pour React Native
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

const Allergenes: React.FC<Props> = ({ allergenes }) => {
  const { setIsCourager } = useBottomSheet();

  return (
    <View>
      <Text style={{ color: '#0000FF', fontSize: 18, fontWeight: 'bold', paddingTop: 24 }}>Allergènes</Text>

      {allergenes && allergenes.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, paddingTop: 24, paddingBottom: 24 }}>
          {allergenes.map((allergene, index) => (
            <View key={index} style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }}>
              {allergenesImg[allergene] ? (
                <Image
                  source={allergenesImg[allergene]}
                  style={{ width: 48, height: 48 }}
                  resizeMode="contain"
                />
              ) : (
                <TouchableOpacity
                  style={{
                    width: 56,
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#e5e7eb',
                    borderRadius: 28,
                  }}
                  onPress={() => setIsCourager(true)}
                >
                  <Text style={{ color: '#0000FF', fontSize: 24 }}>?</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: 24, paddingBottom: 24 }}>
          <Text style={{ color: '#0000FF', fontSize: 14 }}>Ne contient pas d'Allergènes</Text>
          <TouchableOpacity onPress={() => setIsCourager(true)}>
            <Text style={{ color: '#0000FF', textDecorationLine: 'underline', fontWeight: 'bold', marginTop: 4, fontSize: 13 }}>
              À confirmer par la marque
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Allergenes;