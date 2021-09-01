import { searchConstants } from "../../_constants";

export const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case searchConstants.SEARCHAPPRETICE_REQUEST:
            return {
                requestLoading: true,
            };
        case searchConstants.SEARCHAPPRETICE_SUCCESS:
            return {
                status: action.response.status,
                appretices: action.response.appretices,
                message: action.response.message,
            };
        case searchConstants.SEARCHAPPRETICE_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case searchConstants.FINISHSEARCHED:
            return {
                status: false,
                message: "Finish",
            };
        default:
            return state;
    }
};
