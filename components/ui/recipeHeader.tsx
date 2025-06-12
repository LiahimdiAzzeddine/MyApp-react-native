import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface RecipeHeaderProps {
  goToPage: (page: string) => void;
}

const RecipesHeader: React.FC<RecipeHeaderProps> = ({ goToPage }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => goToPage("tabs")}>
        <Image source={require('@/assets/images/headers/fleche.png')} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Image source={require('@/assets/icons/tico.png')} style={styles.ticoIcon} resizeMode='contain'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fad4ce',
    paddingHorizontal:16,
    width:'100%',
    paddingVertical:10
  },

  icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  titleContainer: {
    padding:0,
  },
  ticoIcon: {
    height: 24,
    width: 70,
    resizeMode: 'contain',
    padding:0,
  },
});

export default RecipesHeader;
