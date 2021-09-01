import { rolConstant } from "../../_constants";

export const getRoleCapacitiesReducer = (state = {}, action) => {
    switch (action.type) {
        case rolConstant.GETROLCAPACITIES_REQUEST:
            return {
                requestRolInfo: true,
            };
        case rolConstant.GETROLCAPACITIES_SUCCESS:
            return {
                status: action.response.status,
                capacities: action.response.capacities,
            };
        case rolConstant.GETROLCAPACITIES_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
