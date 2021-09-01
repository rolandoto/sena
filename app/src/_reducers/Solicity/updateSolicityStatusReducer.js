import { solicityConstants } from "../../_constants";

export const updateSolicityStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.CHANGESOLICITYSTATUS_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.CHANGESOLICITYSTATUS_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case solicityConstants.CHANGESOLICITYSTATUS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
