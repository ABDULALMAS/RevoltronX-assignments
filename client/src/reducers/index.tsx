import { combineReducers, Reducer } from "redux";
<<<<<<< HEAD
import auth, { AuthState } from "./auth";
=======
import users, { AuthData } from "./auth";
>>>>>>> role-based-access-control
import articles, { ArticleState } from "./article";
import profiles, { ProfileState } from "./profile";
import bookMarks, {BookMarkState} from './bookMarks';
import highlights , {highlightsState} from "./highLights";

export interface RootState {
<<<<<<< HEAD
  auth: AuthState;
=======
  users: AuthData;
>>>>>>> role-based-access-control
  articles: ArticleState;
  profiles: ProfileState[];
  bookMarks: BookMarkState;
  highlights: highlightsState;
}

const rootReducer: Reducer<RootState> = combineReducers({
<<<<<<< HEAD
  auth,
=======
  users,
>>>>>>> role-based-access-control
  articles,
  profiles,
  bookMarks,
  highlights,
});

export default rootReducer;