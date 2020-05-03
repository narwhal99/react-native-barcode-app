import React, { useState } from 'react';
import { View, Avatar, TextInput, AsyncStorage, SafeAreaView, StyleSheet, Text, Button, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';


Tab1 = ({ route, navigation }) => {
    const [isImageViewVisible, setImageView] = useState(true)
    foodSubmit = async (data) => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            response = await Axios.post('http://192.168.1.72:8080/foods', { name: data.name, type: data.tpye, quantity: data.quantity, unit: data.unit }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            )
            console.log(response.data)
        } catch (e) {
            console.log(e.response.data)
        }
    }

    const [name, setName] = React.useState(route.params.name)
    const [quantity, setQuantity] = React.useState(route.params.quantity)
    const [unit, setUnit] = React.useState(route.params.unit)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Termék név: </Text>
                    <Text>{}</Text>
                    <TextInput style={styles.inputBox} value={name} onChangeText={text => setName(text)}></TextInput>
                    <Text>Mennyiség: </Text>
                    <TextInput style={styles.inputBox} keyboardType="numeric" value={String(quantity)} onChangeText={text => setQuantity(text)}></TextInput>
                    <Text>Mértékegység: </Text>
                    <TextInput style={styles.inputBox} value={unit} onChangeText={text => setUnit(text)}></TextInput>
                    <Image
                        style={{
                            flex: 1,
                            width: 350,
                            height: 300,
                            resizeMode: 'contain'
                        }}
                        source={{ uri: 'http://192.168.1.72:8080/barcode/5998828591518/image' }} />
                    <View style={styles.submitButton}>
                        <Button
                            onPress={() => this.foodSubmit({ name, quantity, unit })}
                            title="Hozzáadás"
                            color="red"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2a9d8f'
    },
    inputBox: {
        borderColor: 'gray', borderWidth: 1,
        margin: 10,
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    submitButton: {
        width: "90%", margin: 10, backgroundColor: "red"
    }
})


export default Tab1;