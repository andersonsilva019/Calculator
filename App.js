import React, { Component } from 'react';
import { StyleSheet, Text, View,Vibration } from 'react-native';
import Button from './src/components/Button'
import Display from './src/components/Display'


const initState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
}

//const PATTERN = [1000,2000,3000]


export default class App extends Component {

  state = {...initState}
  //Assim que for pressionado um digito, mudo o estado para o numero pressionado
  addDigit = n =>{
    
    //Para resolver o problema do . ser digitado mais de uma vez. Ele ignora
    if(n === '.' && this.state.displayValue.includes('.')){
        return 
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '':this.state.displayValue
    const displayValue = currentValue + n

    this.setState({displayValue, clearDisplay: false})

    if(n !== '.'){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }

  }

  setVibration = () =>{
    Vibration.vibrate(PATTERN,true)
  }

  //Quando apertar o AC
  clearMemory = () =>{
    this.setState({...initState})
  }

  //recebe qual é a operação a ser realizada
  setOperation = operation =>{
    if(this.state.current === 0){
      //setando a operação passada e apontando para a posição 1 do array
      //Limpando o display
      this.setState({operation, current: 1, clearDisplay: true})  
    }else{
      const equals = operation === '='
      const values = [...this.state.values]
      try{
        values[0] = eval(`${ values[0]} ${this.state.operation} ${this.state.values[1]} `)
      }catch(e){
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        //clearDisplay: !equals,
        clearDisplay: true,
        values,
      })
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue}/>
          <View style={styles.buttons}>
            <Button label='AC'vibra triple onClick={this.clearMemory}/>
            <Button label='/' vibra operation onClick={() => this.setOperation('/')}/>
            <Button label='7' vibra onClick={() => this.addDigit(7)}/>
            <Button label='8' vibra onClick={() => this.addDigit(8)}/>
            <Button label='9' vibra onClick={() => this.addDigit(9)}/>
            <Button label='*' vibra operation onClick={() => this.setOperation('*')} />
            <Button label='4' vibra onClick={() => this.addDigit(4)}/>
            <Button label='5' vibra onClick={() => this.addDigit(5)}/>
            <Button label='6' vibra onClick={() => this.addDigit(6)}/>
            <Button label='-' vibra operation onClick={() => this.setOperation('-')}/>
            <Button label='1' vibra onClick={() => this.addDigit(1)}/>
            <Button label='2' vibra onClick={() => this.addDigit(2)}/>
            <Button label='3' vibra onClick={() => this.addDigit(3)}/>
            <Button label='+' vibra operation onClick={() => this.setOperation('+')}/>
            <Button label='0' vibra double onClick={() => this.addDigit(0)}/>
            <Button label='.' vibra onClick={() => this.addDigit('.')}/>
            <Button label='=' vibra operation onClick={() => this.setOperation('=')}/>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons:{
    flexDirection:'row',
    flexWrap: "wrap",
  },
});
