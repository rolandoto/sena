import { uploadConstants } from "../../_constants";

export const uploadSolicityFilesReducer = (state = {}, action) => {
    switch (action.type) {
        case uploadConstants.UPLOADNEWFILESOLICITY_REQUEST:
            return {
                loading: true,
            };
        case uploadConstants.UPLOADNEWFILESOLICITY_SUCCESS:
            return {
                status: action.response.status,
                solicity: action.response.solicity,
            };
        case uploadConstants.UPLOADNEWFILESOLICITY_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case uploadConstants.UPLOADNEWFILESOLICITY_CLEAR:
            return {
                end: true
            }
        default:
            return state;
    }
};
