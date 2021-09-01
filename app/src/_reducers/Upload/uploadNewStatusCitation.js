import { userConstants } from "../../_constants";

export const uploadNewStatusCitation = (state = {}, action) => {
    switch (action.type) {
        case userConstants.UPLOADNEWCITATIONSTATUS_REQUEST:
            return {
                searchLoading: true,
            };
        case userConstants.UPLOADNEWCITATIONSTATUS_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case userConstants.UPLOADNEWCITATIONSTATUS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case userConstants.UPLOADNEWCITATIONSTATUS_HIDEMODAL:
            return {
                finish: true,
            };
        default:
            return state;
    }
};
