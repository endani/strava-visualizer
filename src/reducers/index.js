import { combineReducers } from "redux";

import tokenReducer from "./token";
import userReducer from "./user";
import activitiesReducer from "./activity";

export default combineReducers({
  token: tokenReducer,
  user: userReducer,
  activities: activitiesReducer,
});
