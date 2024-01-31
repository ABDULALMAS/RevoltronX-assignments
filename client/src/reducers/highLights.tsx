

export interface highlightsState{
    highlights: {

        _id: string;
        tagId: string;
        userId: string;
        highlights: string[];
    }[]
}

const highLightReducer = (state: highlightsState = { highlights: []}, action: any) => {
switch(action.type){
    case "FETCH_HIGHLIGHTS":
        return{
            ...state,
            highlights: action.payload
        }
        default: 
   return state;
}
}

export default highLightReducer