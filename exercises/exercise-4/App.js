import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const key1 = '@MyApp:key1';
const key2 = '@MyApp:key2';
const key3 = '@MyApp:key3';

export default class App extends Component {
  state = {
    text1: '',
    text2: '',
    text3: '',
    storedValue1: '',
    storedValue2: '',
    storedValue3: '',
    options: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars']
  };

  onLoad = async () => {
    try {
      const [[_k1, v1], [_k2, v2], [_k3, v3]] = await AsyncStorage.multiGet([key1, key2, key3]);
      this.setState({ storedValue1: v1, storedValue2: v2, storedValue3: v3 });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  };

  onSave = async () => {
    const { text1, text2, text3 } = this.state;
    try {
      await AsyncStorage.multiSet([
        [key1, text1],
        [key2, text2],
        [key3, text3]
      ]);
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  };

  componentDidMount() {
    this.onLoad();
  }

  render() {
    const { text1, text2, text3, options, storedValue1, storedValue2, storedValue3 } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.preview}>
          {storedValue1 &&
            storedValue2 &&
            storedValue3 &&
            `Picker 1 stored value: ${storedValue1}\nPicker 2 stored value: ${storedValue2}\nPicker 3 stored value: ${storedValue3}`}
        </Text>
        <View>
          <Picker
            style={styles.input}
            selectedValue={text1}
            onValueChange={(item) => this.setState({ ...this.state, text1: item })}
          >
            {options.map((option, i) => (
              <Picker.Item key={'option' + i} value={option} label={option} />
            ))}
          </Picker>
          <Picker
            style={styles.input}
            selectedValue={text2}
            onValueChange={(item) => this.setState({ ...this.state, text2: item })}
          >
            {options.map((option, i) => (
              <Picker.Item key={'option' + i} value={option} label={option} />
            ))}
          </Picker>
          <Picker
            style={styles.input}
            selectedValue={text3}
            onValueChange={(item) => this.setState({ ...this.state, text3: item })}
          >
            {options.map((option, i) => (
              <Picker.Item key={'option' + i} value={option} label={option} />
            ))}
          </Picker>
          <TouchableOpacity onPress={this.onSave} style={styles.button}>
            <Text>Save Locally</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onLoad} style={styles.button}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  preview: {
    backgroundColor: '#bdc3c7',
    width: 300,
    height: 80,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 5,
    marginTop: 10
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 3,
    marginTop: 10
  }
});
