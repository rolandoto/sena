import { solicityConstants } from "../../_constants";

export const getMotiveOrProhibitionReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.GETMOTIVESORPROHIBITION_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.GETMOTIVESORPROHIBITION_SUCCESS:
            return {
                status: action.response.status,
                motiverOrProhibion: action.response.motiverOrProhibion,
            };
        case solicityConstants.GETMOTIVESORPROHIBITION_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case solicityConstants.CLOSEMOTIVEORPROHIBITION: 
            return {}
        default:
            return state;
    }
};
