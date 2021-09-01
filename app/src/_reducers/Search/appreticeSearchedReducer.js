import { searchConstants } from "../../_constants";

export const apreticeSearchedReducer = (state = {}, action) => {
    switch (action.type) {
        case searchConstants.SEARCHONEAPRETICE_REQUEST:
            return {
                requestLoading: true,
            };
        case searchConstants.HIDESEARCHEDMODAL:
            return {
                hideModal: true,
            };
        case searchConstants.SEARCHONEAPRETICE_SUCCESS:
            return {
                status: action.response.status,
                appretice: action.response.appretice,
                message: action.response.message,
            };
        case searchConstants.SEARCHONEAPRETICE_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
