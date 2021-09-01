import { solicityConstants } from "../../_constants";

export const getSolicityReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.GETSOLICITIE_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.GETSOLICITIE_SUCCESS:
            return {
                status: action.response.status,
                solicity: action.response.solicity,
                message: action.response.message,
            };
        case solicityConstants.GETSOLICITIE_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case solicityConstants.GETSOLICITIE_CLOSE_MODAL:
            return {};
        default:
            return state;
    }
};
