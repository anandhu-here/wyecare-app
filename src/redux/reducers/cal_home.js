const initialState = {
    shiftPublished:[],
    shiftDisplay:false,
    assign_detail:{
        open:false,
        month:null,
        year:null,
        day:null
    }
}

export const calhomeReducer = (state=initialState, action) =>{
    switch(action.type){
        case "SHIFT_PUBLISHED_FROM_HOME":
            return{
                ...state,
                shiftPublished:action.payload
            }
        case "SHIFT_DISPLAY_FOR_HOME":
            return{
                ...state,
                shiftDisplay:action.payload
            }
        case "OPEN_ASSIGN":
            return{
                ...state,
                assign_detail:action.payload
            }
        default:
            return {
                ...state
            }
    }
}