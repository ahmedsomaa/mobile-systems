// ---------------------------------------------------- Actions
export const ADD_PHOTO = 'ADD_PHOTO';
export const REMOVE_PHOTO = 'REMOVE_PHOTO';
export const FETCH_PHOTOS = 'FETCH_PHOTOS';

// ---------------------------------------------------- Action Creators
export const addPhoto = (photo) => {
  return {
    type: ADD_PHOTO,
    payload: photo
  };
};

export const removePhoto = (photo) => {
  return {
    type: REMOVE_PHOTO,
    payload: photo
  };
};

export const fetchPhotos = () => {
  return {
    type: FETCH_PHOTOS,
    payload: [
      {
        albumId: 2,
        title: 'dolore esse a in eos sed',
        url: 'https://via.placeholder.com/600.png/f783bd',
        thumbnailUrl: 'https://via.placeholder.com/150.png/d83ea2',
        id: 2
      },
      {
        albumId: 2,
        title: 'dolore esse a in eos sed',
        url: 'https://via.placeholder.com/600.png/8e6eef',
        thumbnailUrl: 'https://via.placeholder.com/150.png/bf6d2a',
        id: 3
      }
    ]
  };
};
