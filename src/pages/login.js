import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

LoginTab = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Bejelentkezés</Text>
            <TextInput style={styles.inputBox} placeholder="Email" />
            <TextInput style={styles.inputBox} placeholder="Jelszó" secureTextEntry={true}/>
            <Button title="Bejelentkezés"/>
        </View>
    )
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

export default LoginTab;