
import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { toyReducer } from './toy/toy.reducer' 
// import { userReducer } from './user/user.reducer'


const rootReducer = combineReducers({
    toyModule: toyReducer,
    // userModule: userReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

//* For debugging
window.gStore = store