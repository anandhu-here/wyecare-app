const initialState = {
    refresh : false,
    notify:false,
    join:false,
    profile:null
}

export const cal_agnecy = (state=initialState, action) =>{
    switch (action.type) {
        case "NEW_NOTIF_AGENCY":
            return{
                ...state,
                notify:action.payload
            }
        case "JOIN_REQUEST":
            return {
                ...state,
                join:action.payload
            }
        case "FETCH_PROFILE":
            return{
                ...state,
                profile:action.payload
            }
        case "REFRESH":
            return{
                ...state,
                refresh:action.payload
            }
            break;
    
        default:
            return{
                ...state
            }
            break;
    }
}