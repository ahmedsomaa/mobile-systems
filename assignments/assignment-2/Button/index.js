import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Base, Default, Danger, Info, Success, Warning, Light, Secondary, Primary } from './styles';

// Ward, D (01/30/2019) React Native Cookbook/Chapter 3/Reusable Button (1.0.0) [mobile app].
// https://github.com/warlyware/react-native-cookbook/tree/master/chapter-3/reusable-button.
export default class Button extends Component {
  getTheme() {
    const { info, success, danger, warning, secondary, light, primary } = this.props;

    if (info) return Info;
    if (light) return Light;
    if (danger) return Danger;
    if (primary) return Primary;
    if (success) return Success;
    if (warning) return Warning;
    if (secondary) return Secondary;

    return Default;
  }

  render() {
    const theme = this.getTheme();
    const { children, onPress, style, rounded } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[Base.main, theme.main, rounded ? Base.rounded : null, style]}
      >
        <Text style={[Base.label, theme.label]}>{children}</Text>
      </TouchableOpacity>
    );
  }
}
