import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import activitiesReducer from './activitiesReducer';

export default combineReducers({
  token: tokenReducer,
  user: userReducer,
  activities: activitiesReducer,
});
