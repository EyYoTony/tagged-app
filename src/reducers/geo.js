import { SET_GEO } from '../constants'
//import { assoc } from 'ramda'

const emptyGeo = { lat: 0, lng: 0 }

export default (state = emptyGeo, action) => {
  switch (action.type) {
    case SET_GEO:
      return action.payload
    default:
      return state
  }
}
