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
  } from "../constants/actionTypes.js";
  import * as api from "../api/index.js";
  import { Await } from "react-router-dom";



  export const getArticle = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchArticle(id);
      console.log(data);

  
      dispatch({ type: FETCH_POST, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const createArticle = (article, navigate) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.createArticle(article);
    //   console.log(data);
      dispatch({ type: CREATE, payload: data });
      
      navigate(`/articles/${data._id}`);
  
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

  export const getArticles = (page) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchArticles(page);
      console.log(data);
  
      dispatch({ type: FETCH_ALL, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

  export const getArticlesBySearch = (searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const {
        data: { data },
      } = await api.fetchArticlesBySearch(searchQuery);
      console.log(data);

      dispatch({ type: FETCH_BY_SEARCH, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
  

  export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
      console.log(data)
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
  
      dispatch({ type: COMMENT, payload: data });
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };

  export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };