import { solicityConstants } from "../../_constants";

export const saveMotiveOrProhibitionReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.SAVEMOTIVESORPROHIBITIONS_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.SAVEMOTIVESORPROHIBITIONS_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case solicityConstants.SAVEMOTIVESORPROHIBITIONS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case solicityConstants.SAVEMOTIVESORPROHIBITIONS_FINISH:
            return {};
        default:
            return state;
    }
};
