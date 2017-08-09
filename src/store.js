import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import tags from './reducers/tags'

const store = createStore(
  combineReducers({
    tags
  }),
  applyMiddleware(thunk)
)

export default store
