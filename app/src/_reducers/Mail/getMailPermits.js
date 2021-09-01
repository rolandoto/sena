import { mailConstants } from "../../_constants";

export const getMailPermits = (state = {}, action) => {
    switch (action.type) {
        case mailConstants.GETMAILPERMITS_REQUEST:
            return {
                loading: true,
            };
        case mailConstants.GETMAILPERMITS_SUCCESS:
            return {
                status: action.response.status,
                types: action.response.types,
                message: action.response.message,
            };
        case mailConstants.GETMAILPERMITS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
