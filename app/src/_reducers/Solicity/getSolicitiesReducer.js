import { solicityConstants } from "../../_constants";

export const getSolicitiesReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.GETSOLICITIES_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.GETSOLICITIES_SUCCESS:
            return {
                status: action.response.status,
                solicities: action.response.solicities,
                message: action.response.message,
            };
        case solicityConstants.GETSOLICITIES_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
