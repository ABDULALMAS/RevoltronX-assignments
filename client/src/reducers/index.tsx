import { combineReducers, Reducer } from "redux";
import auth, { AuthState } from "./auth";
import articles, { ArticleState } from "./article";
import profiles, { ProfileState } from "./profile";

export interface RootState {
  auth: AuthState;
  articles: ArticleState;
  profiles: ProfileState[];
}

const rootReducer: Reducer<RootState> = combineReducers({
  auth,
  articles,
  profiles,
});

export default rootReducer;