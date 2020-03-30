import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


const Home = () =>{
    <View style = {style.container}>
        <Text style = {style.text}>Entregue aqui</Text>
    </View>
}


const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#256eff',
        justifyContent: 'center',
    },

    text:{
        fontSize: 20,
        color: '#fff'
    },
})


export default Home