import { mailConstants } from "../../_constants";

export const getMailsReducer = (state = {}, action) => {
    switch (action.type) {
        case mailConstants.GETMAILS_REQUEST:
            return {
                loading: true,
            };
        case mailConstants.GETMAILS_SUCCESS:
            return {
                status: action.response.status,
                mails: action.response.mails,
                message: action.response.message,
            };
        case mailConstants.GETMAILS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
