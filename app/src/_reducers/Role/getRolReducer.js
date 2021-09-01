import { rolConstant } from "../../_constants";

export const getRolReducer = (state = {}, action) => {
    switch (action.type) {
        case rolConstant.GETROL_REQUEST:
            return {
                loading: true,
            };
        case rolConstant.GETROL_SUCCESS:
            return {
                status: action.response.status,
                rol: action.response.rolInfo,
            };
        case rolConstant.GETROL_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case rolConstant.FINISHUPDATE:
            return {};
        default:
            return state;
    }
};
