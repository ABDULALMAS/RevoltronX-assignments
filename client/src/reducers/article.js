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
  } from "../constants/actionTypes";
  
  export default (state = { isLoading: true, articles: [] }, action) => {
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
  
      case DELETE:
        return {
          ...state,
          articles: state.articles.filter((article) => article._id != action.payload),
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
  
      default:
        return state;
    }
  };