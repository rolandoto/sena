import { editProfileConstant } from "../../_constants";

export const editProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case editProfileConstant.EDITPROFILE_REQUEST:
            return {
                editProfileValidating: true,
            };
        case editProfileConstant.EDITPROFILE_SUCCESS:
            return {
                status: action.response.status,
                error: action.response.errorText,
                message: action.response.message,
            };
        case editProfileConstant.EDITPROFILE_FAILURE:
            return {
                status: action.response.status,
                error: action.response.errorText,
                message: action.response.message,
            };
        default:
            return state;
    }
};
