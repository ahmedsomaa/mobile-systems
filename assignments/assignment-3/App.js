import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const VOWELS = ['A', 'E'];

export default class App extends Component {
  state = {
    results: '',
    buttons: ['A', 'B', 'C', 'D', 'E']
  };

  onLoad = async (letter) => {
    this.setState({ results: 'Loading, please wait...' });
    const response = await fetch('https://2s4b8wlhik.execute-api.us-east-1.amazonaws.com/studentData?grade=' + letter, {
      method: 'GET'
    });
    const students = await response.json();
    let results = `Students who received ${VOWELS.includes(letter) ? 'an' : 'a'} ${letter} grade:\n`;
    for (const student of students) {
      results += `• ${student}\n`;
    }
    this.setState({ results });
  };

  render() {
    const { results, buttons } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <TextInput style={styles.preview} value={results} placeholder='Results...' editable={false} multiline />
          {buttons.map((button, index) => (
            <TouchableOpacity key={'button-' + index + 1} onPress={() => this.onLoad(button)} style={styles.btn}>
              <Text>{button}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  preview: {
    width: 300,
    height: 400,
    padding: 10,
    color: '#333',
    borderRadius: 5,
    backgroundColor: '#bdc3c7'
  },
  btn: {
    padding: 10,
    marginTop: 10,
    borderRadius: 3,
    backgroundColor: '#3498db'
  }
});
