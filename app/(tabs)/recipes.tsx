import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

const Recipes = () => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
    <View>
      <Text style={styles.text}>Recipes</Text>
      </View>
    </View></View>
  )
}
const styles = StyleSheet.create({
    text: {
      fontSize: 18,
      padding:20
    },
    root: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      backgroundColor: '#fdf2f0',
      borderRadius: 40,
    },
  });
  
export default Recipes