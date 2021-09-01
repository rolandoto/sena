import { userConstants } from "../../_constants";

export const citationSelectedReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.GETSELECTEDCITATION_REQUEST:
            return {
                requestLoading: true,
            };
        case userConstants.GETSELECTEDCITATION_SUCCESS:
            return {
                status: action.response.status,
                parent: action.response.parent,
                citations: action.response.citations,
            };
        case userConstants.GETSELECTEDCITATION_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case userConstants.GETSELECTEDCITATION_HIDEMODAL:
            return {
                status: false,
                isClose: true,
            };
        default:
            return state;
    }
};
