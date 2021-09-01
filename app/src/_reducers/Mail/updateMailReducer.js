import { mailConstants } from "../../_constants";

export const updateMailReducer = (state = {}, action) => {
    switch (action.type) {
        case mailConstants.UPDATEMAIL_REQUEST:
            return {
                loading: true,
            };
        case mailConstants.UPDATEMAIL_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case mailConstants.UPDATEMAIL_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case mailConstants.CREATEMAILCLOSEMODAL:
            return {};
        default:
            return state;
    }
};
