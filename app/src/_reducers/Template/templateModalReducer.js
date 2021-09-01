import { templateConstants } from "../../_constants";

export const templateModalReducer = (state = {}, action) => {
    switch (action.type) {
        case templateConstants.SHOWMODAL:
            return {
                show: true,
            };
        case templateConstants.HIDEMODAL:
            return {};
        default:
            return state;
    }
};
