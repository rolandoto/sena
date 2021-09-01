import { mailConstants } from "../../_constants";

export const createMailReducer = (state = {}, action) => {
    switch (action.type) {
        case mailConstants.CREATEMAIL_REQUEST:
            return {
                loading: true,
            };
        case mailConstants.CREATEMAIL_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case mailConstants.CREATEMAIL_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case mailConstants.CLOSEMODAL_ALLMODALSMAILS:
            return {}
        case mailConstants.CREATEMAILCLOSEMODAL:
            return {}
        default:
            return state;
    }
};
