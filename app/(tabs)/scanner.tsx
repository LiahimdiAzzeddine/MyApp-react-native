import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function ScannerScreen() {
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);

  const handleBarcodeScan = (data: string) => {
    setLastScannedCode(data);
    // Logique supplémentaire possible ici
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scannerContainer} >
      </View>
      
      {lastScannedCode && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Dernier code : {lastScannedCode}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  scannerContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff'
    
  },
  resultContainer: {
    padding: 15,
    backgroundColor: '#fff'
  },
  resultText: {
    color: 'white',
    textAlign: 'center'
  }
});