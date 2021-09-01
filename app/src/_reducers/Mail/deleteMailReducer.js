import { mailConstants } from "../../_constants";

export const deleteMailReducer = (state = {}, action) => {
    switch (action.type) {
        case mailConstants.DELETEMAIL_REQUEST:
            return {
                loading: true,
            };
        case mailConstants.DELETEMAIL_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case mailConstants.DELETEMAIL_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
