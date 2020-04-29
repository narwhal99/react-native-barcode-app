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
          axios.get(`http://world.openfoodfacts.org/api/v0/product/${data}`).then((item) => {
            // Alert.alert(`Barcode ‘${data}’ ${item.data.product.product_name_hu} `);
            navigation.navigate('scannedFood', {
              name: item.data.product.product_name_hu,
              quantity: item.data.product.quantity
              
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
