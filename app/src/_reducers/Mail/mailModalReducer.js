import { mailConstants } from "../../_constants";

export const mailModalReducer = (state = {}, action) => {
    switch (action.type) {
        case mailConstants.OPENCREATEMAILMODAL:
            return {
                create_mail: true,
            };
        case mailConstants.CLOSEMODAL_ALLMODALSMAILS:
            return {};
        default:
            return state;
    }
};
