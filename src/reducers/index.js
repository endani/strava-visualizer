import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';

export default combineReducers({
  token: tokenReducer,
  user: userReducer,
});
