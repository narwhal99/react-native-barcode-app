import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';


Tab1 = ({ route, navigation }) => {
    const { name } = route.params;
    const { quantity } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text>Termék név: {JSON.stringify(name)}</Text>
                <Text>Mennyiség: {JSON.stringify(quantity)}</Text>
            </View>
        </SafeAreaView>
    )
}


export default Tab1;