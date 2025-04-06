import { View, TouchableOpacity, StyleSheet, Image, ImageStyle, Dimensions } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import React from 'react';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={style.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Define image sources for each tab (active and inactive)
        const imageSources = {
          home: {
            active: require('@/assets/icons/accueil_active.png'),
            inactive: require('@/assets/icons/accueil_active.png')
          },
          helpTico: {
            active: require('@/assets/icons/help.png'),
            inactive: require('@/assets/icons/help.png')
          },
          index: {
            active: require('@/assets/icons/scanner.png'),
            inactive: require('@/assets/icons/scanner.png')
          },
          recipes: {
            active: require('@/assets/icons/recipes_active.png'),
            inactive: require('@/assets/icons/recipes_active.png')
          },
          tips: {
            active: require('@/assets/icons/tips.png'),
            inactive: require('@/assets/icons/tips.png')
          },
        };

        // Taille standard pour toutes les icônes standard
        const standardSize = screenWidth * 0.15; // Taille standard pour les icônes normales
        
        // Le scanner est plus large, mais reste au même niveau que les autres icônes
        const iconSizes: Record<string, ImageStyle> = {
          home: { width: standardSize, height: standardSize },
          helpTico: { width: standardSize, height: standardSize },
          recipes: { width: standardSize, height: standardSize },
          tips: { width: standardSize, height: standardSize },
          index: { width: standardSize * 1.7, height: standardSize }, // Plus large mais même hauteur
        };

        // Select the appropriate image based on focus state
        const imageSource = route.name in imageSources 
          ? (isFocused ? imageSources[route.name].active : imageSources[route.name].inactive)
          : imageSources.home.active;
        
        const iconStyle = iconSizes[route.name] || { width: standardSize, height: standardSize };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.name}
            style={style.tabBarItem}
          >
            <Image
              source={imageSource}
              style={iconStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly', // Distribution égale des éléments
    alignItems: 'center', // Alignement vertical au centre
    paddingHorizontal: 5,
    paddingVertical: 10,
    height: 85, // Hauteur uniforme pour la barre
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2, // Espacement horizontal pour chaque élément
  },
});

export default TabBar;