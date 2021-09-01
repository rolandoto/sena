import { citationConstants } from "../../_constants";

export const sendCitationReducer = (state = {}, action) => {
    switch (action.type) {
        case citationConstants.SENDCITATIONMAIL_REQUEST:
            return {
                loading: true,
            };
        case citationConstants.SENDCITATIONMAIL_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case citationConstants.SENDCITATIONMAIL_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case citationConstants.ENDCITATIONALERTS:
            return {};
        default:
            return state;
    }
};
