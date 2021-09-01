import { solicityConstants } from "../../_constants";

export const getSolicityDrawReducer = (state = {}, action) => {
    switch (action.type) {
        case solicityConstants.GETSOLICITYDRAW_REQUEST:
            return {
                loading: true,
            };
        case solicityConstants.GETSOLICITYDRAW_SUCCESS:
            return {
                status: action.response.status,
                solicity: action.response.solicity,
            };
        case solicityConstants.GETSOLICITYDRAW_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
