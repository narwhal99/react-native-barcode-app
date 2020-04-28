/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BarcodeScanner from 'react-native-barcode-scanner-google'
import axios from 'axios'
export default class App extends Component {
  state = {
    data: ''
  }
  async componentDidMount() {

    axios.get('http://192.168.1.72:8080/test').then((data) => {
      this.setState({ data: data.data })
    }).catch((e) => {
      console.error(e)
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <BarcodeScanner style={{ flex: 1 }}
          onBarcodeRead={({ data, type }) => {
            Alert.alert(`Barcode ‘${data}’ of type ‘${type}’ was scanned.`);
          }}
        /> */}
        <Text>text</Text>
        <Text>{this.state.data}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
})
