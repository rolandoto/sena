import { userConstants } from "../../_constants";

export const citationsReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.GETMYCITATIONS_REQUEST:
            return {
                requestLoading: true,
            };
        case userConstants.GETMYCITATIONS_SUCCESS:
            return {
                status: action.response.status,
                citations: action.response.citations,
            };
        case userConstants.GETSEARCHEDUSER_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
