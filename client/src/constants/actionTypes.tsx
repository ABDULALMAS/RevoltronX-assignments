<<<<<<< HEAD


=======
>>>>>>> role-based-access-control
type Action =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "FETCH_ALL"
  | "FETCH_POST"
  | "COMMENT"
  | "FETCH_BY_SEARCH"
  | "FETCH_ALL_PROFILES"
  | "START_LOADING"
  | "END_LOADING"
  | "AUTH"
<<<<<<< HEAD
  | "LOGOUT";

=======
  | "LOGOUT"
  |"FETCH_ARTICLES_TABLE_DATA"
  | "UPDATE_ARTICLE_STATUS";

  
>>>>>>> role-based-access-control
export const CREATE: Action = "CREATE";
export const UPDATE: Action = "UPDATE";
export const DELETE: Action = "DELETE";
export const FETCH_ALL: Action = "FETCH_ALL";
export const FETCH_POST: Action = "FETCH_POST";
export const COMMENT: Action = "COMMENT";

export const FETCH_BY_SEARCH: Action = "FETCH_BY_SEARCH";
export const FETCH_ALL_PROFILES: Action = "FETCH_ALL_PROFILES";

export const START_LOADING: Action = "START_LOADING";
export const END_LOADING: Action = "END_LOADING";

export const AUTH: Action = "AUTH";
<<<<<<< HEAD
export const LOGOUT: Action = "LOGOUT";
=======
export const LOGOUT: Action = "LOGOUT";
export const FETCH_ARTICLES_TABLE_DATA: Action = "FETCH_ARTICLES_TABLE_DATA";
export const UPDATE_ARTICLE_STATUS: Action = "UPDATE_ARTICLE_STATUS";
>>>>>>> role-based-access-control
