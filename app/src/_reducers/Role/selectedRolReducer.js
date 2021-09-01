import { rolConstant } from "../../_constants";

export const selectedRolReducer = (state = {}, action) => {
    switch (action.type) {
        case rolConstant.SETSELECTEDROL:
            return {
                selected: action.rol,
            };
        default:
            return state;
    }
};
