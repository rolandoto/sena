import { userConstants } from "../../_constants";

export const searchedUserReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.GETSEARCHEDUSER_REQUEST:
            return {
                requestLoading: true,
            };
        case userConstants.GETSEARCHEDUSER_SUCCESS:
            return {
                status: action.response.status,
                userInfo: action.response.userInfo,
                message: action.response.message,
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
