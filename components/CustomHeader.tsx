import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string;
  color?: string;
  backButtonColor?: string;
  titleColor?: string;
};

const CustomHeader = ({ 
  title, 
  color = '#fff',
  backButtonColor = '#000',
  titleColor = '#333'
}: Props) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: color }]}>
      <StatusBar
        backgroundColor={color}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
      />
      <View style={[styles.container, { backgroundColor: color }]}>
        {canGoBack ? (
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
            accessibilityLabel="Retour"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={backButtonColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderButton} />
        )}
        
        <Text 
          style={[styles.title, { color: titleColor }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        
        {/* Élément vide à droite pour équilibrer le header */}
        <View style={styles.placeholderButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
  },
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  placeholderButton: {
    width: 40,
    height: 40,
  }
});

export default CustomHeader;