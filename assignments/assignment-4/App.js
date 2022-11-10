import React, { Component } from 'react';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const key1 = '@MyApp:key1';
const key2 = '@MyApp:key2';
const key3 = '@MyApp:key3';

const playlist = [
  {
    title: 'People Watching',
    artist: 'Keller Williams',
    album: 'Keller Williams Live at The Westcott Theater on 2012-09-22',
    uri: 'https://ia800308.us.archive.org/7/items/kwilliams2012-09-22.at853.flac16/kwilliams2012-09-22at853.t16.mp3'
  },
  {
    title: 'Hunted By A Freak',
    artist: 'Mogwai',
    album: 'Mogwai Live at Ancienne Belgique on 2017-10-20',
    uri: 'https://ia601509.us.archive.org/17/items/mogwai2017-10-20.brussels.fm/Mogwai2017-10-20Brussels-07.mp3'
  },
  {
    title: 'Nervous Tic Motion of the Head to the Left',
    artist: 'Andrew Bird',
    album: 'Andrew Bird Live at Rio Theater on 2011-01-28',
    uri: 'https://ia800503.us.archive.org/8/items/andrewbird2011-01-28.early.dr7.flac16/andrewbird2011-01-28.early.t07.mp3'
  }
];

export default class App extends Component {
  state = {
    text1: '',
    text2: '',
    text3: '',
    storedValue1: '',
    storedValue2: '',
    storedValue3: '',
    options: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    isPlaying: false,
    playbackInstance: null,
    volume: 1.0,
    currentTrackIndex: 0,
    isBuffering: false
  };

  onLoad = async () => {
    try {
      const [[_k1, v1], [_k2, v2], [_k3, v3]] = await AsyncStorage.multiGet([key1, key2, key3]);
      this.setState({ storedValue1: v1, storedValue2: v2, storedValue3: v3 });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  };

  onSave = async () => {
    const { text1, text2, text3 } = this.state;
    try {
      await AsyncStorage.multiSet([
        [key1, text1],
        [key2, text2],
        [key3, text3]
      ]);
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  };

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering
    });
  };

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = {
      uri: playlist[this.state.currentTrackIndex].uri
    };
    const status = {
      shouldPlay: this.state.isPlaying,
      volume: this.state.volume
    };
    playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    try {
      await playbackInstance.loadAsync(source, status, false);
      this.setState({
        playbackInstance
      });
    } catch (error) {
      Alert.alert('Error', "Couldn't load Audio File");
    }
  }

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: 1,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: 1
      });
      this.loadAudio();
      this.onLoad();
    } catch (error) {
      Alert.alert('Error', 'Filed to load audio or local data');
    }
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    try {
      isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
      this.setState({
        isPlaying: !isPlaying
      });
    } catch (error) {
      Alert.alert('Error', 'Filed to play/pause audio');
    }
  };

  handlePreviousTrack = async () => {
    let { playbackInstance, currentTrackIndex } = this.state;
    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        currentTrackIndex === 0 ? (currentTrackIndex = playlist.length - 1) : (currentTrackIndex -= 1);
        this.setState({
          currentTrackIndex
        });
        this.loadAudio();
      }
    } catch (error) {
      Alert.alert('Error', 'Filed to load previous audio track');
    }
  };

  handleNextTrack = async () => {
    let { playbackInstance, currentTrackIndex } = this.state;
    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        currentTrackIndex < playlist.length - 1 ? (currentTrackIndex += 1) : (currentTrackIndex = 0);
        this.setState({
          currentTrackIndex
        });
        this.loadAudio();
      }
    } catch (error) {
      Alert.alert('Error', 'Filed to load next audio track');
    }
  };

  renderSongInfo() {
    const { playbackInstance, currentTrackIndex } = this.state;
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>{playlist[currentTrackIndex].title}</Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>{playlist[currentTrackIndex].artist}</Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>{playlist[currentTrackIndex].album}</Text>
      </View>
    ) : null;
  }

  render() {
    const {
      text1,
      text2,
      text3,
      options,
      storedValue1,
      storedValue2,
      storedValue3,
      currentTrackIndex,
      isBuffering,
      isPlaying
    } = this.state;

    return (
      <View style={styles.container}>
        <Text style={[styles.largeText, styles.buffer]}>{isBuffering && isPlaying ? 'Buffering...' : null}</Text>
        {this.renderSongInfo()}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
            <Feather name='skip-back' size={32} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
            {isPlaying ? (
              <Feather name='pause' size={32} color='#fff' />
            ) : (
              <Feather name='play' size={32} color='#fff' />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
            <Feather name='skip-forward' size={32} color='#fff' />
          </TouchableOpacity>
        </View>
        <Text style={styles.preview}>
          {`${playlist[0].title} stored rating:${storedValue1}\n${playlist[1].title} stored rating: ${storedValue2}\n${playlist[2].title} stored rating: ${storedValue3}`}
        </Text>
        <View>
          {currentTrackIndex === 0 && (
            <Picker
              style={styles.input}
              selectedValue={text1}
              onValueChange={(item) => this.setState({ ...this.state, text1: item })}
            >
              {options.map((option, i) => (
                <Picker.Item key={'option' + i} value={option} label={option} />
              ))}
            </Picker>
          )}
          {currentTrackIndex === 1 && (
            <Picker
              style={styles.input}
              selectedValue={text2}
              onValueChange={(item) => this.setState({ ...this.state, text2: item })}
            >
              {options.map((option, i) => (
                <Picker.Item key={'option' + i} value={option} label={option} />
              ))}
            </Picker>
          )}
          {currentTrackIndex === 2 && (
            <Picker
              style={styles.input}
              selectedValue={text3}
              onValueChange={(item) => this.setState({ ...this.state, text3: item })}
            >
              {options.map((option, i) => (
                <Picker.Item key={'option' + i} value={option} label={option} />
              ))}
            </Picker>
          )}
          <TouchableOpacity onPress={this.onSave} style={styles.button}>
            <Text>Save Locally</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onLoad} style={styles.button}>
            <Text>Load data</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191A1A',
    alignItems: 'center',
    justifyContent: 'center'
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#191A1A'
  },
  buffer: {
    color: '#fff'
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#fff'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    margin: 20
  },
  controls: {
    flexDirection: 'row'
  },
  preview: {
    backgroundColor: '#bdc3c7',
    width: 300,
    height: 100,
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginBottom: 50
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 5,
    marginTop: 10
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 3,
    marginTop: 10
  }
});
