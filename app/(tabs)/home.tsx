import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PageWrapper from '@/components/PageWrapper'

const Home = () => {
  return (
    <PageWrapper>
    <View>
      <Text style={styles.text}>Home</Text>
    </View>
    </PageWrapper>
  )
}
const styles = StyleSheet.create({
    text: {
      fontSize: 18,
      padding:20
    },
  });
  

export default Home