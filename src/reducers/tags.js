import { SET_TAGS } from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case SET_TAGS:
      return action.payload
    default:
      return state
  }
}
