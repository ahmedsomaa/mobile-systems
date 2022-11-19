import { ADD_PHOTO, REMOVE_PHOTO, FETCH_PHOTOS } from './actions';

const initialState = {
  photos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        ...state,
        photos: [...action.payload]
      };
    case ADD_PHOTO:
      return {
        ...state,
        photos: [...state.photos, action.payload]
      };
    case REMOVE_PHOTO:
      return {
        ...state,
        photos: state.photos.filter((photo) => {
          return photo.id !== action.payload.id;
        })
      };
    default:
      return state;
  }
};
