import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from "./context";

export default LoginTab = () => {
    const [email, setmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Bejelentkezés</Text>
            <TextInput style={styles.inputBox} placeholder="Email"
                value={email}
                onChangeText={setmail} />
            <TextInput style={styles.inputBox} placeholder="Jelszó"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true} />
            <Button title="Bejelentkezés" onPress={() => signIn({ email, password })} />
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

