import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  CREATE,
  DELETE,
  UPDATE,
  START_LOADING,
  END_LOADING,
  COMMENT,
<<<<<<< HEAD
=======
  FETCH_ARTICLES_TABLE_DATA
>>>>>>> role-based-access-control
} from "../constants/actionTypes.tsx";
import * as api from "../api/index.tsx";
import { Dispatch } from "redux";


interface NewArticle {

  
  category: string,
  selectedFile: string,
  name: string,
  
  title: string,
  message: string,
  creator?: string
}
  
  
  



export const getArticle = (id: string | undefined) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchArticle(id);
   


    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createArticle = (article: NewArticle, navigate: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createArticle(article);
   
    dispatch({ type: CREATE, payload: data });
    
<<<<<<< HEAD
    navigate(`/articles/${data._id}`);
=======
    // navigate(`/articles/${data._id}`);
    navigate("/articles")
>>>>>>> role-based-access-control

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getArticles = (page: number | string) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchArticles(page);
  

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesBySearch = (searchQuery: any) => async (dispatch : any) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.fetchArticlesBySearch(searchQuery);
    

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


export const deletePost = (id: string) => async (dispatch : any) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id : string) => async (dispatch : any) => {
  try {
    const { data } = await api.likePost(id);
    
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value: any, id: string) => async (dispatch :any) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id: string, post: NewArticle, navigate: any) => async (dispatch :any) => {
  try {
    const { data } = await api.updatePost(id, post);
<<<<<<< HEAD
=======
   
>>>>>>> role-based-access-control
    dispatch({ type: UPDATE, payload: data });
    navigate("/articles")
  } catch (error) {
    console.log(error);
  }
};