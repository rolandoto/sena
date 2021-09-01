import { userConstants } from "../../_constants";

export const searchUsersReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.SEARCHUSER_REQUEST:
            return {
                searchLoading: true,
            };
        case userConstants.SEARCHUSER_SUCCESS:
            return {
                status: action.response.status,
                users: action.response.users,
                message: action.response.message,
            };
        case userConstants.SEARCHUSER_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
