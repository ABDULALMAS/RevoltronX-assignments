import { combineReducers } from "redux";
import auth from "./auth"
import articles from './article'
import profiles from './profile'

export default combineReducers({
   auth, articles, profiles
})