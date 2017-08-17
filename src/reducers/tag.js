import {
  SET_TAG,
  SET_POSITION,
  SET_ART_TITLE,
  SET_CREATOR_ID,
  SET_CREATOR_NAME,
  SET_TAG_PHOTO,
  SET_ARTIST,
  CLEAR_TAG
} from '../constants'
import { merge } from 'ramda'

const emptyTag = {
  position: { lat: 0, lng: 0 },
  creatorName: '',
  creatorId: '',
  artTitle: '',
  dateTagged: '',
  photo: '',
  artist: ''
}

export default (state = emptyTag, action) => {
  switch (action.type) {
    case SET_TAG:
      return action.payload
    case SET_POSITION:
      return merge(state, { position: action.payload })
    case SET_ART_TITLE:
      return merge(state, { artTitle: action.payload })
    case SET_CREATOR_ID:
      return merge(state, { creatorId: action.payload })
    case SET_CREATOR_NAME:
      return merge(state, { creatorName: action.payload })
    case SET_TAG_PHOTO:
      console.log('reducer photo:', action.payload)
      return merge(state, { photo: action.payload })
    case SET_ARTIST:
      return merge(state, { artist: action.payload })
    case CLEAR_TAG:
      return emptyTag
    default:
      return state
  }
}
