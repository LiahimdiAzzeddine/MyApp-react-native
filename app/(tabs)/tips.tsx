import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PageWrapper from '@/components/PageWrapper'

const Tips = () => {
  return (
    <PageWrapper>
    <Text style={styles.text}>Tips</Text>
 </PageWrapper>
  )
}
const styles = StyleSheet.create({

    text: {
      fontSize: 18,
      padding:10
    },
  });
  
export default Tips