import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { evaluate, sqrt, pow } from 'mathjs';

const { height, width } = Dimensions.get('window');

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [isResult, setIsResult] = useState(false);
  const [savedResult, setSavedResult] = useState('');

  const buttons = [
    ['C', 'DEL', '√', '^2'],
    [7, 8, 9, '/'],
    [4, 5, 6, '*'],
    [1, 2, 3, '-'],
    [0, '.', '=', '+']
  ];

  const calculator = () => {
    try {
      let result = evaluate(currentNumber);
      setCurrentNumber(result.toString());
      setSavedResult(result.toString());
      setIsResult(true);
    } catch (error) {
      setCurrentNumber('Error');
    }
  };

  const handleInput = (buttonPressed) => {
    if (isResult && [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].includes(buttonPressed)) {
      setCurrentNumber(buttonPressed.toString());
      setIsResult(false);
      return;
    }

    if (['+', '-', '*', '/'].includes(buttonPressed)) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      setIsResult(false);
      return;
    } else if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].includes(buttonPressed)) {
      Vibration.vibrate(35);
    }

    switch (buttonPressed) {
      case 'DEL':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.slice(0, -1));
        setIsResult(false);
        return;
      case 'C':
        Vibration.vibrate(35);
        setLastNumber('');
        setCurrentNumber('');
        setIsResult(false);
        return;
      case '=':
        Vibration.vibrate(35);
        setLastNumber(currentNumber);
        calculator();
        return;
      case 'ANS':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber + savedResult);
        setIsResult(false);
        return;
      case '√':
        Vibration.vibrate(35);
        try {
          const result = sqrt(parseFloat(currentNumber));
          setCurrentNumber(result.toString());
          setSavedResult(result.toString());
        } catch (error) {
          setCurrentNumber('Error');
        }
        setIsResult(true);
        return;
      case '^2':
        Vibration.vibrate(35);
        try {
          const result = pow(parseFloat(currentNumber), 2);
          setCurrentNumber(result.toString());
          setSavedResult(result.toString());
        } catch (error) {
          setCurrentNumber('Error');
        }
        setIsResult(true);
        return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  };

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#222222' : '#EEEEEE',
      minHeight: '35%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 15,
      position: 'relative'
    },
    resultText: {
      color: darkMode ? '#FFFFFF' : '#222222',
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#888888' : '#888888',
      fontSize: 20,
      marginBottom: 10,
    },
    themeButton: {
      position: 'absolute',
      top: 15,
      left: 15,
      backgroundColor: darkMode ? '#222222' : '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      flex: 1,
      flexDirection: 'column',
      padding: 10,
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    button: {
      borderColor: darkMode ? '#222222' : '#999999',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: width / 4 - 20,
      height: width / 4 - 20,
      borderRadius: 10,
      marginBottom: 10,
    },
    textButton: {
      color: darkMode ? '#FFFFFF' : '#222222',
      fontSize: 24,
    },
    buttonSpecial: {
      backgroundColor: darkMode ? '#444444' : '#CCCCCC',
      color: darkMode ? '#222222' : '#000',
    },
    ansButton: {
      backgroundColor: '#DD0000',
      color: 'white',
      width: width / 2 - 20,
      height: width / 6 - 30,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      marginLeft: 1,
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#222222' : '#EEEEEE' }}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo
            name={darkMode ? 'light-up' : 'moon'}
            size={24}
            color={darkMode ? 'white' : 'black'}
            onPress={() => setDarkMode(!darkMode)}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.ansButton}
            onPress={() => handleInput('ANS')}
          >
            <Text style={[styles.textButton, { color: 'white' }]}>ANS</Text>
          </TouchableOpacity>
        </View>
        {buttons.map((row, rowIndex) =>
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((button) =>
              button === '√' || button === '^2' || button === 'C' || button === 'DEL' || button === '/' || button === '*' || button === '-' || button === '+' ? (
                <TouchableOpacity
                  key={button}
                  style={[styles.button, styles.buttonSpecial]}
                  onPress={() => handleInput(button)}
                >
                  <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={button}
                  style={[styles.button, { backgroundColor: darkMode ? '#333333' : '#FFFFFF' }]}
                  onPress={() => handleInput(button)}
                >
                  <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
      </View>
    </View>
  );
}
  
