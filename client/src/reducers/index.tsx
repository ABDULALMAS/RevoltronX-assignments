import { combineReducers, Reducer } from "redux";

import users, { AuthData } from "./auth";

import articles, { ArticleState } from "./article";
import profiles, { ProfileState } from "./profile";
import bookMarks, {BookMarkState} from './bookMarks';
import highlights , {highlightsState} from "./highLights";

export interface RootState {

  users: AuthData;

  articles: ArticleState;
  profiles: ProfileState[];
  bookMarks: BookMarkState;
  highlights: highlightsState;
}

const rootReducer: Reducer<RootState> = combineReducers({

  users,
  articles,
  profiles,
  bookMarks,
  highlights,
});

export default rootReducer;