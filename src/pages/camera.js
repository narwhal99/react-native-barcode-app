import React, { Component } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

import BarcodeScanner from 'react-native-barcode-scanner-google'
import axios from 'axios'

export default App = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BarcodeScanner style={{ flex: 1 }}
        onBarcodeRead={({ data, type }) => {
          axios.get(`http://192.168.1.72:8080/barcode/${data}`).then((item) => {
            // Alert.alert(`Barcode ‘${data}’`);
            navigation.navigate('scannedFood', {
              name: item.data.name,
              quantity: item.data.quantity,
              unit: item.data.unit
            })
          }).catch((e) => {
            console.error(e)
          })
        }}
      />
    </SafeAreaView >
  );
}


const styles = StyleSheet.create({
})
