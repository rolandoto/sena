import { templateConstants } from "../../_constants";

export const getCustomFieldsReducer = (state = {}, action) => {
    switch (action.type) {
        case templateConstants.GETCUSTOMFIELDS_REQUEST:
            return {
                loading: true,
            };
        case templateConstants.GETCUSTOMFIELDS_SUCCESS:
            return {
                status: action.response.status,
                fields: action.response.fields,
                solicity: action.response.solicity,
            };
        case templateConstants.GETCUSTOMFIELDS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
