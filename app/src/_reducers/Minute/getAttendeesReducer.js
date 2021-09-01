import { minuteConstant } from "../../_constants";

export const getAttendeesReducer = (state = {}, action) => {
    switch (action.type) {
        case minuteConstant.GETATTENDEES_REQUEST:
            return {
                loading: true,
            };
        case minuteConstant.GETATTENDEES_SUCCESS:
            return {
                status: action.response.status,
                solicityID: action.response.solicityID,
                appretices: action.response.appretices,
                message: action.response.message,
            };
        case minuteConstant.GETATTENDEES_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
