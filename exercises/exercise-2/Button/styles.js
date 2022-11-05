import { StyleSheet } from 'react-native';

// Ward, D (01/30/2019) React Native Cookbook/Chapter 3/Reusable Button (1.0.0) [mobile app].
// https://github.com/warlyware/react-native-cookbook/tree/master/chapter-3/reusable-button.

// ----------------------------------------------------- Book Styles
const Base = StyleSheet.create({
  main: {
    padding: 10,
    borderRadius: 3
  },
  label: {
    color: '#fff'
  },
  rounded: {
    borderRadius: 20
  }
});

const Danger = StyleSheet.create({
  main: {
    backgroundColor: '#dc3545'
  }
});

const Info = StyleSheet.create({
  main: {
    backgroundColor: '#0dcaf0'
  }
});

const Success = StyleSheet.create({
  main: {
    backgroundColor: '#198754'
  }
});

const Default = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  label: {
    color: '#333'
  }
});

// ----------------------------------------------------- Added Styles
const Primary = StyleSheet.create({
  main: {
    backgroundColor: '#0d6efd'
  }
});

const Secondary = StyleSheet.create({
  main: {
    backgroundColor: '#6c757d'
  }
});

const Warning = StyleSheet.create({
  main: {
    backgroundColor: '#ffc107'
  },
  label: {
    color: '#333'
  }
});

const Light = StyleSheet.create({
  main: {
    backgroundColor: '#f8f9fa'
  },
  label: {
    color: '#333'
  }
});

export { Base, Danger, Warning, Light, Primary, Info, Success, Secondary, Default };
