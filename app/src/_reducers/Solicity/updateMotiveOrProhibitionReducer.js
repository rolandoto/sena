import { solicityConstants } from "../../_constants";

export const updateMotiveOrProhibitionReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.UPDATEMOTIVESORPROHIBITIONS_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.UPDATEMOTIVESORPROHIBITIONS_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case solicityConstants.UPDATEMOTIVESORPROHIBITIONS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case solicityConstants.CLOSEMOTIVEORPROHIBITION:
            return {};
        default:
            return state;
    }
};
