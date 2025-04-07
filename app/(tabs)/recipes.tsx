import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PageWrapper from '@/components/PageWrapper'

const Recipes = () => {
  return (
    <PageWrapper>
    <Text style={styles.text}>Recipes</Text>
 </PageWrapper>

  )
}
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    padding:20
  },
});

export default Recipes