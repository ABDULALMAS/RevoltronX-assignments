import { combineReducers, Reducer } from "redux";
import users, { AuthData } from "./auth";
import articles, { ArticleState } from "./article";
import profiles, { ProfileState } from "./profile";

export interface RootState {
  users: AuthData;
  articles: ArticleState;
  profiles: ProfileState[];
}

const rootReducer: Reducer<RootState> = combineReducers({
  users,
  articles,
  profiles,
});

export default rootReducer;