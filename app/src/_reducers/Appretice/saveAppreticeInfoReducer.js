import { appreticeConstants } from "../../_constants";

export const saveAppreticeInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case appreticeConstants.UPDATEAPPRETICEINFO_REQUEST:
            return {
                loading: true,
            };
        case appreticeConstants.UPDATEAPPRETICEINFO_SUCCESS:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case appreticeConstants.UPDATEAPPRETICEINFO_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case appreticeConstants.UPDATEAPPRETICEINFO_FINISH:
            return {
                finish: true,
            };
        default:
            return state;
    }
};
