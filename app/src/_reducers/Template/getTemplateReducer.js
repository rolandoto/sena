import { templateConstants } from "../../_constants";

export const getTemplateReducer = (state = {}, action) => {
    switch (action.type) {
        case templateConstants.GETTEMPLATE_REQUEST:
            return {
                show: true,
            };
        case templateConstants.GETTEMPLATE_SUCCESS:
            return {
                status: action.response.status,
                template: action.response.template,
                message: action.response.message,
            };
        case templateConstants.GETTEMPLATE_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case templateConstants.HIDEMODAL:
            return {};
        default:
            return state;
    }
};
