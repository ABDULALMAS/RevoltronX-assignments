import * as api from "../api/index.tsx";
import {
    FETCH_ARTICLES_TABLE_DATA,
    UPDATE_ARTICLE_STATUS
}from '../constants/actionTypes.tsx'


export const getArticlesTableData = () => async (dispatch: any) => {
try {
    const { data } = await api.getArticlesTableDataApi();
    console.log(data)
    dispatch({ type: FETCH_ARTICLES_TABLE_DATA, payload: data})
} catch (error: any) {
    console.error("Fetch Articles Table Error:", error);

   
    if (error.response && error.response.status === 404) {
      
      console.error("Fetch Articles Table conflict:", error.response.data);
    } else {
      
      console.error("Unexpected error:", error.message);
    }
  }
};


export const updateArticleStatus = (articleId: string, payload: {status: string}, navigate: any) => async(dispatch: any) => {
try {
  const { data } = await api.updateArticleStatusApi(articleId, payload.status)
  console.log("article Id:",articleId)
 
  dispatch({type: UPDATE_ARTICLE_STATUS, payload: data})
  navigate("/admin/dashboard")
  console.log(data);
} catch (error) {
  console.log(error)
}

}