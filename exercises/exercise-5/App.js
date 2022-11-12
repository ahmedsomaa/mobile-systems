import React from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Alert, Text, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  state = {
    label: 'You',
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
    const { poi1, poi2 } = this.state;

    return (
      <View style={styles.container}>
        {this.renderMap()}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => this.getLocation()}>
            <Text style={styles.label}>You</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ ...this.state, location: poi1, label: 'POI 1' })}
          >
            <Text style={styles.label}>POI 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ ...this.state, location: poi2, label: 'POI 2' })}
          >
            <Text style={styles.label}>POI 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  map: {
    flex: 1
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
