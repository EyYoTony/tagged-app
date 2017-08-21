import { SET_GEO } from '../constants'

export default (state = { access_token: '' }, action) => {
  return cond([
    [equals(SET_SESSION), always(action.payload)],
    [T, always(state)]
  ])(action.type)
}
