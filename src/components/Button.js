import React from 'react'
import{
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight,
    Button,
    Vibration
}from 'react-native'

const DURATION = 5
//Definindo os styles
const style = StyleSheet.create({

    button:{
        fontSize: 35,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 0.5,
        borderColor: '#888',
    },

    operationButton:{
        color:'#fff',
        backgroundColor: '#256EFF'
    },

    buttonDouble:{
        width : (Dimensions.get('window').width / 4) * 2,
    },
    buttonTriple:{
        width: (Dimensions.get('window').width / 4) * 3,
    }
})

//Criando o componente jsx responsavel por printar o botão
export default props =>{

    const styleButton = [style.button] //Criando um array com o Estilo inicial do botão

    //Caso seja necessario adicionar algumas propriedades particulares
    if(props.double) styleButton.push(style.buttonDouble)
    if(props.triple) styleButton.push(style.buttonTriple)
    if(props.operation) styleButton.push(style.operationButton)
    if(props.vibra) Vibration.vibrate(DURATION)


    return(
        <TouchableHighlight onPress={props.onClick}>
            <Text style = {styleButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}