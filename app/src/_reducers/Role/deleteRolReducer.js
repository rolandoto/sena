import { rolConstant } from "../../_constants";

export const deleteRolReducer = (state = {}, action) => {
    switch (action.type) {
        case rolConstant.DELETEROL_REQUEST:
            return {
                loading: true,
            };
        case rolConstant.DELETEROL_SUCCESS:
            return {
                status: action.response.status,
                show: action.response.show,
                message: action.response.message,
            };
        case rolConstant.DELETEROL_FAILURE:
            return {
                status: action.response.status,
                show: action.response.show,
                message: action.response.message,
            };
        case rolConstant.FINISHDELETE:
            return {};
        default:
            return state;
    }
};
