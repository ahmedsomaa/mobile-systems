import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function SecondScreen() {
  return (
    <View style={styles.container}>
      <Text>Thanks for using my app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAD9A1',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
