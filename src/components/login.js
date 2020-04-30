import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';

export default class LoginTab extends Component {
    state = {
        email: '',
        password: ''

    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }
    signUp = () => {
        const { email, password } = this.state
        axios.post('http://192.168.1.72:8080/login', { email, password }).then((response) => {
            AsyncStorage.setItem('token', response.data.token)
            console.log(response.data.token)
        }).catch((e) => {
            console.log(e.response.data)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.loginText}>Bejelentkezés</Text>
                <TextInput style={styles.inputBox} placeholder="Email"
                    onChangeText={val => this.onChangeText('email', val)} />
                <TextInput style={styles.inputBox} placeholder="Jelszó"
                    onChangeText={val => this.onChangeText('password', val)}
                    secureTextEntry={true} />
                <Button title="Bejelentkezés" onPress={this.signUp} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    inputBox: {
        margin: 10,
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    loginText: {
        fontSize: 20,
        paddingBottom: 20
    }
})

