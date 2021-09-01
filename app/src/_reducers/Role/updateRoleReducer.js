import { rolConstant } from "../../_constants";

export const updateRoleReducer = (state = {}, action) => {
    switch (action.type) {
        case rolConstant.UPDATEROL_REQUEST:
            return {
                loading: true,
            };
        case rolConstant.UPDATEROL_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case rolConstant.UPDATEROL_FAILURE:
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
