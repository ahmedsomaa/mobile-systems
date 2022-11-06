import React, { Component } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../Button';
import styles from './styles';

export default class HomeScreen extends Component {
  // state with list of the 7 continents
  state = {
    links: [
      {
        danger: true,
        title: 'Asia',
        url: 'https://en.wikipedia.org/wiki/Asia'
      },
      {
        warning: true,
        title: 'Africa',
        url: 'https://en.wikipedia.org/wiki/Africa'
      },
      {
        info: true,
        title: 'Europe',
        url: 'https://en.wikipedia.org/wiki/Europe'
      },
      {
        success: true,
        title: 'North America',
        url: 'https://en.wikipedia.org/wiki/North_America'
      },
      {
        light: true,
        title: 'South America',
        url: 'https://en.wikipedia.org/wiki/South_America'
      },
      {
        secondary: true,
        title: 'Australia',
        url: 'https://en.wikipedia.org/wiki/Australia_(continent)'
      },
      {
        primary: true,
        title: 'Antarctica',
        url: 'https://en.wikipedia.org/wiki/Antarctica'
      }
    ]
  };

  // callback function for each button onPress function
  handleButtonPress = (button) => {
    const { url, title } = button;
    this.props.navigation.navigate('Browser', { url, title });
  };

  // callback function passed to Array.map function
  // to handle the view for each link object
  renderButton = (button, index) => {
    return (
      <Button
        key={index}
        info={button.info}
        light={button.light}
        danger={button.danger}
        style={styles.button}
        success={button.success}
        primary={button.primary}
        warning={button.warning}
        rounded={button.rounded}
        secondary={button.secondary}
        onPress={() => this.handleButtonPress(button)}
      >
        {button.title}
      </Button>
    );
  };

  // the render view
  // credits to this code from
  // Ward, D (01/30/2019) React Native Cookbook/Chapter 3/Reusable Button (1.0.0) [mobile app].
  // https://github.com/warlyware/react-native-cookbook/tree/master/chapter-3/reusable-button.
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonList}>{this.state.links.map(this.renderButton)}</View>
      </SafeAreaView>
    );
  }
}
