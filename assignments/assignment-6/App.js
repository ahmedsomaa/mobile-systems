import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import Album from './components/Album';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Album />
      </Provider>
    );
  }
}
