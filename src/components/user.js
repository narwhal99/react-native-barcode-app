import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
<<<<<<< HEAD
import { AuthContext } from "./context";

export default User = () => {
    const [user, setUser] = React.useState(null)
    const { signOut } = React.useContext(AuthContext);

    async function getUser() {

        token = await AsyncStorage.getItem('userToken')
        await axios.get('http://192.168.1.72:8080/getUser', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((data) => {
            setUser(data.data.user)
        }).catch(e => {
            console.log(e.response.data)
        })
=======


export default User = () => {
    const [user, setUser] = React.useState(null)

    async function getUser() {
        let token = ''
        try {
            token = await AsyncStorage.getItem('token')
        } catch (e) {
            console.log(e)
        }

        if (!token) {
            setUser(null)
        } else {
            await axios.get('http://192.168.1.72:8080/getUser', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((data) => {
                setUser(data.data.user)
            }).catch(e => {
                console.log(e.response.data)
            })
        }
    }
    async function logOut() {
        let token = ''
        try {
            token = await AsyncStorage.getItem('token')
        } catch (e) {
            console.log(e)
        }
        if (!token) {
            setUser(null)
        } else {
            await axios.get('http://192.168.1.72:8080/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response)=>{
                console.log('Sikeressen kijelentkeztél')
            })
        }
>>>>>>> development
    }
    React.useEffect(() => {
        getUser()
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {user ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
<<<<<<< HEAD
                    <Button title="Kijelentkezés" onPress={() => signOut()}></Button>
=======
                    <Button title="Kijelentkezés" onPress={logOut}></Button>
>>>>>>> development
                </View>) : (
                    <Text>Nincs user</Text>
                )}
        </SafeAreaView>
    )
}