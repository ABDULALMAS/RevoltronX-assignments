
export interface  BookMarkState {
    bookMarks: {

        id: string,
        bookmarks: string[],
    }[]
}

const bookMarkReducer = (state: BookMarkState = { bookMarks: []}, action: any) => {
switch(action.type){
    case "FETCH_BOOKMARKS":
   return{
    ...state,
    bookMarks: action.payload,
   }
   default: 
   return state;
}
}

export default bookMarkReducer