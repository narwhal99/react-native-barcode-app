import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
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
                    <Button title="Kijelentkezés" onPress={() => signOut()}></Button>
                </View>) : (
                    <Text>Nincs user</Text>
                )}
        </SafeAreaView>
    )
}