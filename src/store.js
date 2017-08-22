import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import tags from './reducers/tags'
import tag from './reducers/tag'
import geo from './reducers/geo'
import session from './reducers/session'
import profileTags from './reducers/profile-tags'

const store = createStore(
  combineReducers({
    profileTags,
    tags,
    tag,
    geo,
    session
  }),
  applyMiddleware(thunk)
)

export default store
