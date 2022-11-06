import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class BrowserScreen extends Component {
  componentDidMount() {
    const { title } = this.props.route.params;
    this.props.navigation.setOptions({ title: `${title} Webview` });
  }

  render() {
    const { url } = this.props.route.params;
    return <WebView source={{ uri: url }} />;
  }
}
