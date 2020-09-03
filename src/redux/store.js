import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import allReducers from './reducers'

const store = createStore(allReducers, applyMiddleware(thunkMiddleware))

export default store
