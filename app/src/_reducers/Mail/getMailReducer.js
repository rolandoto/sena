import { mailConstants } from "../../_constants";

export const getMailReducer = (state = {}, action) => {
    switch (action.type) {
        case mailConstants.GETMAIL_REQUEST:
            return {
                loading: true,
            };
        case mailConstants.GETMAIL_SUCCESS:
            return {
                status: action.response.status,
                mail: action.response.mail,
                message: action.response.message,
            };
        case mailConstants.GETMAIL_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case mailConstants.CLOSEMODAL_ALLMODALSMAILS:
            return {};
        default:
            return state;
    }
};
