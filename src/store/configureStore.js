import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import quakeDataReducer from '../reducers'; 

const store = createStore(
    quakeDataReducer,
    applyMiddleware(thunk)
  );

export default store;
