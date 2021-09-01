import { userConstants } from "../../_constants";

export const registerUserReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.USERREGISTER_REQUEST:
            return {
                sendingRequest: true,
            };
        case userConstants.USERREGISTER_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case userConstants.USERREGISTER_FAILURE:
            return {
                status: action.response.status,
                type: action.response.type,
                message: action.response.message,
            };
        default:
            return state;
    }
};
