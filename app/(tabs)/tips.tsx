import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

const Tips = () => {
  const { userToken } = useContext(AuthContext);

  if (!userToken) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <View style={styles.root}>
      <View style={styles.container}>
    <View>
      <Text style={styles.text}>Tips</Text>
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
      backgroundColor: '#f0f0f0',
      borderRadius: 40,
    },
  });
  
export default Tips