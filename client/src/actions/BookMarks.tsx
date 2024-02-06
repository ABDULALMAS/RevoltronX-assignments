import * as api from "../api/index.tsx";


export const createBookMark = (id: string, payload:{articleId: string}, navigate: any) => async(dispatch: any) => {
try {
    const { data } = await api.createBookMarkApi(id, payload.articleId);
    console.log(data)

} catch (error) {
    console.error(error);
}}

export const getBookMarks = (id: string) => async (dispatch: any) => {
    try {
        const { data } =  await api.getBookMarksApi(id);
        console.log(data)

        dispatch({type: "FETCH_BOOKMARKS", payload: data.result})
    } catch (error) {
        
    }
}