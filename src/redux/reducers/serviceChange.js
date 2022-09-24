import {
    CHANGE_EVENT_FIELD,
    EDIT_EVENT,
    CLEAR_EVENT_FIELD
} from "../types/calendar";


const initialState = {
    id: "",
    eventName: "",
    date: "",
    time: "",
    participants: "",
    description: "",
    searchcontent:""
};



export const serviceChangeReducer = (state = initialState, action) =>{
    switch(action.type){
        case EDIT_EVENT:
            return {
                ...action.payload
            }
            case CHANGE_EVENT_FIELD:
                const {
                    name, value
                } = action.payload;
                return {
                    ...state, [name]: value
                };
            case "NEW_SEARCH":
                return{
                    searchcontent:action.payload
                }
            case CLEAR_EVENT_FIELD:
                return {
                    ...initialState
                }
                default:
                    return state;
    }
}