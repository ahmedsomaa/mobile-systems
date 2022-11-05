import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default class App extends Component {
  state = {
    results: ''
  };

  onLoad = async () => {
    this.setState({ results: 'Loading, please wait...' });
    const response = await fetch('https://2s4b8wlhik.execute-api.us-east-1.amazonaws.com/studentData', {
      method: 'GET'
    });
    const results = await response.text();
    this.setState({ results });
  };

  render() {
    const { results } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <TextInput style={styles.preview} value={results} placeholder='Results...' editable={false} multiline />
          <TouchableOpacity onPress={this.onLoad} style={styles.btn}>
            <Text>Load data</Text>
          </TouchableOpacity>
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
