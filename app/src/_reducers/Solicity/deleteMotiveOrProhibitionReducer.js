import { solicityConstants } from "../../_constants";

export const deleteMotiveOrProhibitionReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.DELETEMOTIVESORPROHIBITIONS_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.DELETEMOTIVESORPROHIBITIONS_SUCCESS:
            return {
                status: action.response.status,
                show: action.response.show,
                message: action.response.message,
            };
        case solicityConstants.DELETEMOTIVESORPROHIBITIONS_FAILURE:
            return {
                status: action.response.status,
                show: action.response.show,
                message: action.response.message,
            };
        case solicityConstants.CLOSEMOTIVEORPROHIBITION:
            return {};
        default:
            return state;
    }
};
