import { rolConstant } from "../../_constants";

export const roleReducer = (state = {}, action) => {
    switch (action.type) {
        case rolConstant.GETROLES_REQUEST:
            return {
                loadingRequest: true,
            };
        case rolConstant.GETROLES_SUCCESS:
            return {
                status: action.response.status,
                roles: action.response.body,
                message: action.response.message,
            };
        case rolConstant.GETROLES_FAILURE:
            return {
                status: action.response.status,
                roles: action.response.body,
                message: action.response.message,
            };
        default:
            return state;
    }
};
