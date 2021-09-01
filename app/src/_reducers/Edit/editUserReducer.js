import { userConstants } from "../../_constants";

export const editUserSearchReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.EDITSEARCHEDUSER_REQUEST:
            return {
                requestLoading: true,
            };
        case userConstants.EDITSEARCHEDUSER_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case userConstants.EDITSEARCHEDUSER_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
