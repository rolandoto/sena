import { rolConstant } from "../../_constants";

export const addRoleReducer = (state = {}, action) => {
    switch (action.type) {
        case rolConstant.ADDROLES_REQUEST:
            return {
                sendRequest: true,
            };
        case rolConstant.ADDROLES_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case rolConstant.ADDROLES_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
