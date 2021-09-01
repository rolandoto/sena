import { solicityConstants } from "../../_constants";

export const getMotivesOrProhibitionsReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.GETMOTIVESORPROHIBITIONS_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.GETMOTIVESORPROHIBITIONS_SUCCESS:
            return {
                status: action.response.status,
                motiverOrProhibions: action.response.motiverOrProhibions,
            };
        case solicityConstants.GETMOTIVESORPROHIBITIONS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
