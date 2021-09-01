import { solicityConstants } from "../../_constants";

export const saveSolicityReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.SAVESOLICITY_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.SAVESOLICITY_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case solicityConstants.SAVESOLICITY_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case solicityConstants.SAVESOLICITY_FINISH:
            return {};
        default:
            return state;
    }
};
