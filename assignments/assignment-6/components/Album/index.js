import React, { Component } from 'react';
import randomColor from 'randomcolor';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchPhotos, addPhoto, removePhoto } from '../../redux/photos/actions';
import store from '../../redux';
import { Album as AlbumText, Title, URL, ThumbnailURL } from '../Text';

class Album extends Component {
  state = {
    log: '',
    currentIndex: 0,
    images: [
      {
        albumId: 2,
        title: 'The starks',
        url: 'https://via.placeholder.com/600x600/cfcfcf/000000.png?text=The+Starks',
        thumbnailUrl: 'https://via.placeholder.com/150x150/cfcfcf/000000.png?text=The+Starks',
        id: 4
      },
      {
        albumId: 2,
        title: 'The lannisters',
        url: 'https://via.placeholder.com/600x600/ff0000/ff0.png?text=The+Lannisters',
        thumbnailUrl: 'https://via.placeholder.com/150x150/ff0000/ff0.png?text=The+Lannisters',
        id: 5
      },
      {
        albumId: 2,
        title: 'The targaryens',
        url: 'https://via.placeholder.com/600x600/000000/f00.png?text=The+Targaryens',
        thumbnailUrl: 'https://via.placeholder.com/150x150/000000/f00.png?text=The+Targaryens',
        id: 6
      }
    ]
  };

  componentDidMount() {
    this.props.fetchPhotos();
  }

  addPhoto = () => {
    const photo = {
      albumId: 2,
      title: 'dolore esse a in eos sed',
      url: `https://via.placeholder.com/600.png/${randomColor().replace('#', '')}`,
      thumbnailUrl: `https://via.placeholder.com/150.png/${randomColor().replace('#', '')}`
    };
    this.props.addPhoto(photo);
  };

  addNextPhoto = () => {
    let photo;
    const { images, currentIndex } = this.state;
    if (currentIndex < images.length) {
      photo = images[currentIndex];
    } else {
      photo = {
        albumId: 2,
        title: 'dolore esse a in eos sed',
        url: `https://via.placeholder.com/600.png/${randomColor().replace('#', '')}`,
        thumbnailUrl: `https://via.placeholder.com/150.png/${randomColor().replace('#', '')}`
      };
    }
    this.props.addPhoto(photo);
    const { photos } = store.getState().photos;
    const log = photos[photos.length - 1];
    if (currentIndex === images.length) {
      this.setState({ ...this.setState, currentIndex: 0, log });
    } else {
      this.setState({ ...this.setState, currentIndex: currentIndex + 1, log });
    }
  };

  removePhoto = (photo) => {
    this.props.removePhoto(photo);
  };

  render() {
    const { log } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.toolbar}>
          {log !== null && (
            <>
              <AlbumText>{log.albumId}</AlbumText>
              <Title>{log.title}</Title>
              <URL>{log.url}</URL>
              <ThumbnailURL>{log.thumbnailUrl}</ThumbnailURL>
            </>
          )}
        </View>
        <ScrollView>
          <View style={styles.imageContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={this.addPhoto}>
                <Text style={styles.buttonText}>Add Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.addNextPhoto}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
            {this.props.photos
              ? this.props.photos.map((photo) => {
                  return (
                    <TouchableOpacity onPress={() => this.removePhoto(photo)} key={Math.random()}>
                      <Image style={{ width: 300, height: 300, resizeMode: 'cover' }} source={{ uri: photo.url }} />
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    flex: 1
  },
  toolbar: {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 20
  },
  log: {
    fontSize: 10
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    margin: 10,
    padding: 20,
    backgroundColor: '#3498db'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  glamorous: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const mapStateToProps = (state) => {
  return {
    photos: state.photos.photos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPhotos: () => dispatch(fetchPhotos()),
    addPhoto: (photo) => dispatch(addPhoto(photo)),
    removePhoto: (id) => dispatch(removePhoto(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);
