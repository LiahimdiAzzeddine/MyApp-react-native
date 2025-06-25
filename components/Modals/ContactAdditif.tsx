// screens/ContactAdditif.tsx
import React, { useState } from 'react';
import { View, Text, Button, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CustomModal from './Modal';
import { markerStyle } from './markerEffect';
import { useBottomSheet } from '@/context/BottomSheetContext';

type Additif = {
  code: string;
  label: string;
  noteUFC: number;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  additifs: Additif[];
  togglePanel: () => void;
};

const ContactAdditif: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  additifs,
  togglePanel,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [showInfo, setShowInfo] = useState<'additifs' | 'transformation'>('additifs');
  const displayedAdditifs = showAll ? additifs : additifs.slice(0, 3);
  const {scrollRef,scrollRefpage } = useBottomSheet();

  const getPastilleImage = (note:number) => {
  if (note == 1) {
    return require('@/assets/images/fp/pastille-note-1.png'); // High severity
  } else if (note == 2) {
    return require('@/assets/images/fp/pastille-note-2.png'); // Medium severity
  } else if (note == 3) {
    return require('@/assets/images/fp/pastille-note-3.png'); // Low-medium severity
  } else {
    return require('@/assets/images/fp/pastille-note-4.png'); // Low severity
  }
};

  const MoreInfo = async () => {
    setIsOpen(false);
    setTimeout(() => {
    togglePanel();
    }, 50);
  //   setTimeout(() => {
  // if(scrollRef.current){
  //    scrollRef.current?.scrollTo({ y: 700, animated: true }); // ✅ scroll de 200px
  // }
  //  if(scrollRefpage.current){
  //    scrollRefpage.current?.scrollTo({ y: 700, animated: true }); // ✅ scroll de 200px
  // }
   
  // }, 500);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              showInfo === 'transformation' && styles.activeTab,
            ]}
            onPress={() => setShowInfo('transformation')}
          >
            <Text style={showInfo != 'transformation'?styles.tabText: styles.tabActiveText}>Naturalité</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              showInfo === 'additifs' && styles.activeTab,
            ]}
            onPress={() => setShowInfo('additifs')}
          >
            <Text style={showInfo != 'additifs'?styles.tabText: styles.tabActiveText}>Additifs</Text>
          </TouchableOpacity>
        </View>
<View style={{ maxHeight: 270 }}>
        <ScrollView style={{paddingLeft:15,paddingRight:5,paddingTop:15 }}>
          {showInfo === 'transformation' ? (
            <>
            <Text style={styles.infoText}>
                  La naturalité des ingrédients s’oppose à
                  l’ultra-transformation. Il est important de choisir des
                  aliments peu ou pas transformés pour prendre soin de votre
                  santé.
                </Text>
                <Text style={styles.infoText}>
                  En attendant plus d’information sur ce produit regardez les
                  types d’additifs et la liste des ingrédients, si vous pourriez
                  les avoir dans votre cuisine c’est tout bon, sinon cela
                  nécessite plus d’information de la part de la marque.
                </Text>
            </>
      
          ) : (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 5,justifyContent:'center' }}>
  <Text style={{ fontWeight: 'bold', fontSize: 30 }} className='text-custom-blue'>
    +{additifs.length}
  </Text>
  <Image
    source={require('@/assets/images/fp/additifs.png')}
    style={{ width: 60, height: 60, resizeMode: 'contain' }}
  />
</View>
  <View style={markerStyle.marker}>
      {/* Surlignage */}
      <View style={markerStyle.highlight} />
      {/* Texte */}
      <Text style={markerStyle.text} className='text-custom-blue'>Additifs</Text>
    </View>
              {displayedAdditifs.map((item, index) => (
                <View key={index} style={styles.additifRow}>
                    <Image
    source={getPastilleImage(item.noteUFC)}
    style={{ width: 20, height: 20, resizeMode: 'contain',marginRight:5 }}
  />
                  <Text className='text-custom-blue ArchivoBold'>{item.code}</Text>
                  <Text  className='text-custom-blue Archivo'>: {item.label}</Text>
                </View>
              ))}
              
            </View>
          )}
        </ScrollView>
        {showInfo === 'additifs' && (
        <TouchableOpacity onPress={MoreInfo}>
                <Text style={styles.moreInfo}>En savoir plus</Text>
              </TouchableOpacity>
            
            )}</View> 
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
 
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabButton: {
    borderWidth: 1,
    borderColor: '#0f548d',
    borderRadius: 20,
    padding: 8,
    marginHorizontal: 3,
  },
  activeTab: {
    backgroundColor: '#0f548d',
    
  },
  tabText: {
    color: '#0f548d',
    fontFamily:"ArchivoBold"
  },
  tabActiveText: {
    color: 'white',
    fontFamily:"ArchivoBold"
  },
  infoText: {
    color: '#0f548d',
    marginVertical: 5,
  },
  headerText: {
    textAlign: 'center',
  },
  additifRow: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
 
 
  moreInfo: {
    color: '#0f548d',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily:"ArchivoLight"
  },
});

export default ContactAdditif;
