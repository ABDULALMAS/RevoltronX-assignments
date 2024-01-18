import { combineReducers, Reducer } from "redux";
<<<<<<< HEAD
import auth, { AuthState } from "./auth";
=======
import users, { AuthData } from "./auth";
>>>>>>> role-based-access-control
import articles, { ArticleState } from "./article";
import profiles, { ProfileState } from "./profile";

export interface RootState {
<<<<<<< HEAD
  auth: AuthState;
=======
  users: AuthData;
>>>>>>> role-based-access-control
  articles: ArticleState;
  profiles: ProfileState[];
}

const rootReducer: Reducer<RootState> = combineReducers({
<<<<<<< HEAD
  auth,
=======
  users,
>>>>>>> role-based-access-control
  articles,
  profiles,
});

export default rootReducer;