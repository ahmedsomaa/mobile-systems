import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules, TextInput, Switch, TouchableOpacity, FlatList } from 'react-native';

const { HelloManager } = NativeModules;

export default class App extends Component {
  state = {
    userName: null,
    greetingMessage: null,
    isAdmin: false,
    greeted: []
  };

  updateGreetingMessage = (result) => this.setState({ greetingMessage: result });

  greetUser = () => {
    this.refs.userName.blur();
    const { userName, isAdmin, greeted } = this.state;
    HelloManager.greetUser(userName, isAdmin, this.updateGreetingMessage);
    const user = { userName, isAdmin };
    const newList = [...greeted, user];
    this.setState({ greeted: newList });
  };

  renderListItem = ({ item: { userName, isAdmin } }) => {
    return <Text style={styles.message}>{`${userName} | ${isAdmin ? 'Admin' : 'Not Admin'}`}</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Enter User Name</Text>
        <TextInput
          ref='userName'
          autoCorrect={false}
          placeholder='User Name'
          style={styles.inputField}
          value={this.state.userName}
          onChangeText={(text) => this.setState({ userName: text })}
        />
        <Text style={styles.label}>Admin</Text>
        <Switch
          style={styles.radio}
          value={this.state.isAdmin}
          onValueChange={(value) => this.setState({ isAdmin: value })}
        />
        <TouchableOpacity
          onPress={this.greetUser}
          disabled={!this.state.userName}
          style={[styles.buttonStyle, !this.state.userName ? styles.disabled : null]}
        >
          <Text>Greet</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Response:</Text>
        <Text style={styles.message}>{this.state.greetingMessage}</Text>
        <Text style={styles.label}>List of Greeted Persons:</Text>
        {this.state.greeted.length !== 0 && <FlatList data={this.state.greeted} renderItem={this.renderListItem} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  inputField: {
    padding: 20,
    fontSize: 30,
    width: 200
  },
  label: {
    fontSize: 18,
    marginTop: 18,
    textAlign: 'center'
  },
  radio: {
    marginBottom: 20
  },
  buttonStyle: {
    padding: 20,
    backgroundColor: '#1DA1F2',
    color: '#fff',
    fontSize: 18
  },
  message: {
    fontSize: 22,
    marginLeft: 50,
    marginRight: 50
  },
  disabled: {
    backgroundColor: '#3C3C3C'
  }
});
