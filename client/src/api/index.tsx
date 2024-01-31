import axios from "axios";
import article from "../reducers/article";

interface NewArticle {


  tagId?: string,
  category: string,
    selectedFile: string,
    name: string,
    
    title: string,
    message: string,
    creator?: string
  }
    
   
 


interface NewProfile {
  userId?: string;
  _id? : number;
photo?: string;
name?: string;
email?: string;
age?: string;
gender?: string;
DOB?: string;
phoneNumber?: string;
}


interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}


const API = axios.create({
 // baseURL: "http://localhost:5000",

    baseURL: process.env.REACT_APP_BASE_URL,
  });


  API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
         JSON.parse(localStorage.getItem("profile")!).token
      }`;
    }
    return req;
  });


  export const updatePost = (id: string, updatedPost: NewArticle) =>
  API.patch(`/articles/${id}`, updatedPost);
  export const createArticle = (newArticle: NewArticle) => API.post("/articles", newArticle);
  export const fetchArticle = (id : string | undefined) => API.get(`/articles/${id}`);

  export const fetchArticles = (page: number | string) => API.get(`/articles?page=${page}`);

  export const deletePost = (id: string) => API.delete(`/articles/${id}`);
  export const likePost = (id: string) => API.patch(`/articles/${id}/likePost`);



  export const comment = (value: any, id: string) =>
  API.post(`/articles/${id}/commentPost`, { value });

  export const fetchArticlesBySearch = (searchQuery: any) =>
  API.get(
    `/articles/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );




  export const fetchProfile = () => API.get("/profile");

  export const createProfile = (newProfile : NewProfile) => API.post("/profile", newProfile)
  export const updateProfile = (id : number | undefined, updatedProfile : NewProfile) =>
  API.patch(`/profile/${id}`, updatedProfile);



export const signIn = (FormData : FormData) => API.post("/users/signin", FormData);
export const signUp = (FormData : FormData) => API.post("/users/signup", FormData);

export const getUsers = () => API.get("/users/getUsers");
export const updateUserRoleAPI = (id:string, role: string) => API.patch(`/users/${id}`,{role});

export const getArticlesTableDataApi = () => API.get('/articles/articlesTableData');

export const updateArticleStatusApi = (articleId: string, status: string) => API.patch(`/articles/updateArticleStatus/${articleId}`,{status})
export const createBookMarkApi = (id: string, articleId: string) => API.post(`/bookmarks/${id}`, {articleId});
export const getBookMarksApi = (id: string) => API.get(`/bookmarks/${id}`)


export const createHighlightsApi = (highlights: string, userId: string, tagId: string) => API.post(`/articles/highlights/${tagId}`,{highlights, userId});
export const getHighlightsApi = (userId: string, tagId: string) => API.get(`/articles/highlights/${userId}/${tagId}`);

export const updateScrollPositionApi = (scrollPosition: number, userId: string, tagId: string) => API.post(`articles/updateScrollPosition/${tagId}`,{scrollPosition, userId})

export const createNotesApi = (note: any, tagId: string, userId: string) => API.post(`/articles/createNote/${userId}`,{ note, tagId})

