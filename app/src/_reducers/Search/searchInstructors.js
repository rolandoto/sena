import { searchConstants } from "../../_constants";

export const searchInstructors = (state = {}, action) => {
    switch (action.type) {
        case searchConstants.SEARCHINSTRUCTOR_REQUEST:
            return {
                requestLoading: true,
            };
        case searchConstants.SEARCHINSTRUCTOR_SUCCESS:
            return {
                status: action.response.status,
                instructors: action.response.instructors,
                message: action.response.message,
            };
        case searchConstants.SEARCHINSTRUCTOR_FAILURE:
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
