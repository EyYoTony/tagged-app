import { SET_PROFILE_TAGS, ADD_TAG_TO_TAGS } from '../constants'
import { append } from 'ramda'

export default (state = [], action) => {
  switch (action.type) {
    case SET_PROFILE_TAGS:
      return action.payload
    case ADD_TAG_TO_TAGS:
      return append(action.payload, state)
    default:
      return state
  }
}
