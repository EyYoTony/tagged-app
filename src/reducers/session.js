import { SET_SESSION } from '../constants'

export default (state = { access_token: '' }, action) => {
  switch (action.type) {
    case SET_SESSION:
      return action.payload
    default:
      return state
  }
}
