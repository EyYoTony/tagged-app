import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import tags from './reducers/tags'
import tag from './reducers/tag'
import geo from './reducers/geo'
import session from './reducers/session'

const store = createStore(
  combineReducers({
    tags,
    tag,
    geo,
    session
  }),
  applyMiddleware(thunk)
)

export default store
