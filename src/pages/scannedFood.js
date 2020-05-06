import React, { useState } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, Text, Button, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";
import { BaseRouter } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

Tab1 = ({ route, navigation }) => {
    const [imageSource, setImageSource] = useState(true)
    foodSubmit = async (data) => {
        const token = await AsyncStorage.getItem('userToken')
        if (!route.params.error) {
            try {
                response = await Axios.post('http://192.168.1.72:8080/foods', { name: data.name, type: data.tpye, quantity: data.quantity, unit: data.unit }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            } catch (e) {
                console.log(e.response.data)
            }
        } else {
            try {
                const response = await RNFetchBlob.fetch('POST', 'http://192.168.1.72:8080/barcode/add', {
                    Authorization: "Bearer " + token,
                    otherHeader: "foo",
                    'Content-Type': 'multipart/form-data',
                }, [
                    { name: 'image', filename: 'avatar.png', data: imageSource.data },
                    { name: 'code', data: route.params.barcode },
                    { name: 'name', data: data.name },
                    { name: 'quantity', data: data.quantity },
                    { name: 'unit', data: data.unit },
                ])
                console.log(response)
            } catch (e) {
                console.log(e);
            }
        }
    }
    selectImage = async () => {
        ImagePicker.showImagePicker({ quality: 0.5 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('imagepicker Error:', response.error)
            } else if (response.customButton) {
                console.log('User tapped a custom button: ', response.customButton)
            } else {
                setImageSource(response)
            }
        })
    }

    const [name, setName] = React.useState(route.params.name)
    const [quantity, setQuantity] = React.useState(route.params.quantity)
    const [unit, setUnit] = React.useState(route.params.unit)


    // if (route.params.error) {
    //     showMessage({
    //         message: route.params.error,
    //         type: "default",
    //         backgroundColor: "red",
    //         color: "white",
    //         duration: 5000
    //     });
    // }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {imageSource.uri && <Image
                        style={{
                            flex: 1,
                            width: 350,
                            height: 300,
                            resizeMode: 'contain'
                        }}
                        source={{ uri: imageSource.uri }} />}
                    <Text>Termék név: </Text>
                    <Text>{}</Text>
                    <TextInput style={styles.inputBox} value={name} onChangeText={text => setName(text)}></TextInput>
                    <Text>Mennyiség: </Text>
                    <TextInput style={styles.inputBox} keyboardType="numeric" value={String(quantity)} onChangeText={text => setQuantity(text)}></TextInput>
                    <Text>Mértékegység: </Text>
                    <TextInput style={styles.inputBox} value={unit} onChangeText={text => setUnit(text)}></TextInput>
                    {!route.params.error ? (<Image
                        style={{
                            flex: 1,
                            width: 350,
                            height: 300,
                            resizeMode: 'contain'
                        }}
                        source={{ uri: `http://192.168.1.72:8080/barcode/${route.params.barcode}/image` }} />) : (<Button title="Kép hozzáadás" onPress={() => selectImage()} />)}
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