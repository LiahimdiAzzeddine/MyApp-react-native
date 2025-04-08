import { View, TouchableOpacity, StyleSheet, Image, ImageStyle, Dimensions, ImageSourcePropType } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

// Define allowed route names
type RouteName = 'home' | 'helpTico' | 'index' | 'recipes' | 'tips';

// Image sources for active/inactive tabs
const imageSources: Record<RouteName, { active: ImageSourcePropType; inactive: ImageSourcePropType }> = {
  home: {
    active: require('@/assets/icons/accueil_active.png'),
    inactive: require('@/assets/icons/accueil_active.png'),
  },
  helpTico: {
    active: require('@/assets/icons/help.png'),
    inactive: require('@/assets/icons/help.png'),
  },
  index: {
    active: require('@/assets/icons/scanner.png'),
    inactive: require('@/assets/icons/scanner.png'),
  },
  recipes: {
    active: require('@/assets/icons/recipes_active.png'),
    inactive: require('@/assets/icons/recipes_active.png'),
  },
  tips: {
    active: require('@/assets/icons/tips.png'),
    inactive: require('@/assets/icons/tips.png'),
  },
};

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const screenWidth = Dimensions.get('window').width;
  const standardSize = screenWidth * 0.15;
  const insets = useSafeAreaInsets();

  const iconSizes: Record<RouteName, ImageStyle> = {
    home: { width: standardSize, height: standardSize, maxWidth: 63, maxHeight: 63 },
    helpTico: { width: standardSize, height: standardSize, maxWidth: 63, maxHeight: 63 },
    recipes: { width: standardSize, height: standardSize, maxWidth: 63, maxHeight: 63 },
    tips: { width: standardSize, height: standardSize, maxWidth: 63, maxHeight: 63 },
    index: { width: standardSize * 1.7, height: standardSize, maxWidth: 108, maxHeight: 108 },
  };

  return (
    <View style={[style.tabBar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const routeName = route.name as RouteName;

        const imageSource = routeName in imageSources
          ? isFocused
            ? imageSources[routeName].active
            : imageSources[routeName].inactive
          : imageSources.home.active;

        const iconStyle = iconSizes[routeName] || { width: standardSize, height: standardSize };

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
            key={route.key}
            style={style.tabBarItem}
          >
            <Image source={imageSource} style={iconStyle} resizeMode="contain" />
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    maxHeight:100
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    
  },
});

export default TabBar;
