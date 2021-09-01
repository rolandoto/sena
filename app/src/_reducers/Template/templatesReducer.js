import { templateConstants } from "../../_constants";

export const templatesReducer = (state = {}, action) => {
    switch (action.type) {
        case templateConstants.GETTEMPLATES_REQUEST:
            return {
                show: true,
            };
        case templateConstants.GETTEMPLATES_SUCCESS:
            return {
                status: action.response.status,
                templates: action.response.templates,
                message: action.response.message,
            };
        case templateConstants.GETTEMPLATES_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
