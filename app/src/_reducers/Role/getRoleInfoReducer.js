import { rolConstant } from "../../_constants";

export const getRolInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case rolConstant.GETROLINFO_REQUEST:
            return {
                requestRolInfo: true,
            };
        case rolConstant.GETROLINFO_SUCCESS:
            return {
                status: action.response.status,
                rolInfo: action.response.rolInfo,
            };
        case rolConstant.GETROLINFO_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
