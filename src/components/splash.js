import React from 'react'
import { View, Image, SafeAreaView, Button } from 'react-native';


export default Splash = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image
                style={{
                    width: 250,
                    height: 250
                }}
                source={require('../icons/splash.png')} />
        </View >
    )
}