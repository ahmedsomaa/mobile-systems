import React from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Alert, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import Notification from './Notification';

export default class App extends React.Component {
  state = {
    label: 'You',
    notify: false,
    message: 'This is a notification!',
    poi1: {
      coords: {
        latitude: 33.307146,
        longitude: -111.681177
      }
    },
    poi2: {
      coords: {
        latitude: 33.423204,
        longitude: -111.939612
      }
    },
    location: null
  };

  async componentDidMount() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('ERROR', 'Permission to access location was denied');
      return;
    }
    this.getLocation();
  }

  async getLocation() {
    const label = 'You';
    const location = await Location.getCurrentPositionAsync();
    this.setState({ label, location });
  }

  async changeLocation(location, label) {
    const message = `Changed to ${label}`;
    if (location) {
      this.setState({ ...this.state, location, label, notify: !this.state.notify, message });
    } else {
      const location = await Location.getCurrentPositionAsync();
      this.setState({ ...this.state, location, label, notify: !this.state.notify, message });
    }
  }

  toggleNotification = () => {
    this.setState({
      notify: !this.state.notify
    });
  };

  renderMap() {
    const { location, label } = this.state;
    return location ? (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
        
      >
        <Marker coordinate={location.coords} title={label} image={require('./assets/you-are-here.png')} />
      </MapView>
    ) : null;
  }

  render() {
    const { poi1, poi2, notify, message } = this.state;

    const displayNotification = notify ? (
      <Notification autoHide message={message} onClose={this.toggleNotification} />
    ) : null;

    return (
      <SafeAreaView style={styles.container}>
        {this.renderMap()}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => this.changeLocation(null, 'You')}>
            <Text style={styles.label}>You</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.changeLocation(poi1, 'POI 1')}>
            <Text style={styles.label}>POI 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.changeLocation(poi2, 'POI 2')}>
            <Text style={styles.label}>POI 2</Text>
          </TouchableOpacity>
        </View>
        {displayNotification}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    flex: 1,
    minHeight: 100
  },
  buttons: {
    top: '75%',
    right: '5%',
    position: 'absolute',
    alignSelf: 'flex-end'
  },
  button: {
    width: 50,
    height: 50,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  label: {
    fontWeight: 'bold'
  }
});
