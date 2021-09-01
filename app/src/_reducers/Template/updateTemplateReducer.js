import { templateConstants } from "../../_constants";

export const updateTemplateReducer = (state = {}, action) => {
    switch (action.type) {
        case templateConstants.UPDATETEMPLATE_REQUEST:
            return {
                show: true,
            };
        case templateConstants.UPDATETEMPLATE_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case templateConstants.UPDATETEMPLATE_FAILURE:
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
