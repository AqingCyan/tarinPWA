import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const preloadedState = {
  from: '北京',
  to: '上海',
  isCitySelectVisible: false,
  currentSelectingLeftCity: false,
  cityData: null,
  isLoadingCityData: false,
  isDateSelectVisible: false,
  highSpeed: false,
}

export default createStore(
  combineReducers(reducers),
  preloadedState,
  applyMiddleware(thunk)
)
