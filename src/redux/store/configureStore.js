import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { defaultQuakeData, quakeDataReducer } from '../reducers'; 

const store = createStore(
    quakeDataReducer,
    defaultQuakeData,
    applyMiddleware(thunk)
  );

export default store;
