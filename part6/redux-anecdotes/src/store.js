import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import andecdotesReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  anecdotes: andecdotesReducer,
  notification: notificationReducer,
  filter : filterReducer
});

const store = createStore(reducer, composeWithDevTools());

export default store;
