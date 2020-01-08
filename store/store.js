import Reducer from '../reducer/reducer';
import { combineReducers, createStore } from 'redux';
const reducer = combineReducers({
    Reducer:Reducer

});
const store = createStore(reducer);

export default store;