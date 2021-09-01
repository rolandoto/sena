import { searchConstants } from "../../_constants";

export const instructorSearchedReducer = (state = {}, action) => {
    switch (action.type) {
        case searchConstants.SEARCHONEINSTRUCTOR_REQUEST:
            return {
                requestLoading: true,
            };
        case searchConstants.HIDESEARCHEDMODAL:
            return {
                hideModal: true,
            };
        case searchConstants.SEARCHONEINSTRUCTOR_SUCCESS:
            return {
                status: action.response.status,
                instructor: action.response.instructor,
                message: action.response.message,
            };
        case searchConstants.SEARCHONEINSTRUCTOR_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
