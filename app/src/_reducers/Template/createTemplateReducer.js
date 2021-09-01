import { templateConstants } from "../../_constants";

export const createTemplateReducer = (state = {}, action) => {
    switch (action.type) {
        case templateConstants.CREATETEMPLATE_REQUEST:
            return {
                show: true,
            };
        case templateConstants.CREATETEMPLATE_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case templateConstants.CREATETEMPLATE_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case templateConstants.FINISH_CREATE_TEMPLATE:
            return {};
        default:
            return state;
    }
};
