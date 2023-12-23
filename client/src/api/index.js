import axios from "axios";

const API = axios.create({
    // baseURL: "http://localhost:5000",
    baseURL: process.env.REACT_APP_BASE_URL,
  });


  API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });


  export const updatePost = (id, updatedPost) =>
  API.patch(`/articles/${id}`, updatedPost);
  export const createArticle = (newArticle) => API.post("/articles", newArticle);
  export const fetchArticle = (id) => API.get(`/articles/${id}`);

  export const fetchArticles = (page) => API.get(`/articles?page=${page}`);

  export const deletePost = (id) => API.delete(`/articles/${id}`);
  export const likePost = (id) => API.patch(`/articles/${id}/likePost`);



  export const comment = (value, id) =>
  API.post(`/articles/${id}/commentPost`, { value });

  export const fetchArticlesBySearch = (searchQuery) =>
  API.get(
    `/articles/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );




  export const fetchProfile = () => API.get("/profile");

  export const createProfile = (newProfile) => API.post("/profile", newProfile)
  export const updateProfile = (id, updatedProfile) =>
  API.patch(`/profile/${id}`, updatedProfile);



export const signIn = (FormData) => API.post("/users/signin", FormData);
export const signUp = (FormData) => API.post("/users/signup", FormData);