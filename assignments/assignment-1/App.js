import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MainTabNavigator from './navigation/MainTabNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <MainTabNavigator />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
