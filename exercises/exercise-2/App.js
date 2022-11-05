import React from 'react';
import { StyleSheet, View, Alert, FlatList, StatusBar } from 'react-native';
import Button from './Button';
import data from './buttons.json';

export default function App() {
  function handleButtonPress(message) {
    Alert.alert('Alert', message);
  }

  function renderItem({ item }) {
    return (
      <Button
        info={item.info}
        light={item.light}
        danger={item.danger}
        style={styles.button}
        success={item.success}
        primary={item.primary}
        warning={item.warning}
        rounded={item.rounded}
        secondary={item.secondary}
        onPress={() => handleButtonPress(item.message)}
      >
        {item.title}
      </Button>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  button: {
    margin: 10
  }
});
