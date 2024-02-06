/* eslint-disable */
import {
  FETCH_ALL,
  FETCH_POST,
  DELETE,
  UPDATE,
  CREATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  COMMENT,
  FETCH_ARTICLES_TABLE_DATA,
  UPDATE_ARTICLE_STATUS,
} from "../constants/actionTypes";


export interface ArticleState {
  
  isLoading: any;
  articles: {
    _id: string; 
    category: string , 
    selectedFile: string;
       name: string;
       createdAt: string;
       title: string;
       message: string;
       tags: string[];
       likes: string[];
       creator: string;
       comments: string[];
  }[]
  
  
}

export default (state : ArticleState = { isLoading: true, articles: [] }, action: any) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case DELETE:
      return {
        ...state,
        articles: state.articles.filter((article) => article._id !== action.payload),
      };
    case COMMENT:
      return {
        ...state,
        articles: state.articles.map((article) => {
          if (article._id === action.payload._id) {
            return action.payload;
          }
          return article;
        }),
      };
    case UPDATE:
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === action.payload._id ? action.payload : article
        ),
      };
    case FETCH_ALL:
      return {
        ...state,
        articles: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        
        
      };
    case FETCH_BY_SEARCH:
      return { ...state, articles: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload };

    case CREATE:
      return { ...state, articles: [...state.articles, action.payload] };

    case FETCH_ARTICLES_TABLE_DATA:
      return {
        ...state,
        articles: action.payload.data,
      }

      case UPDATE_ARTICLE_STATUS :
        return {
          ...state,
          articles: state.articles.map((article) => (
            article._id === action.payload.data._id ? action.payload.data : article
          ))
        }

    default:
      return state;
  }
};

