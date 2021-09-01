import { appreticeConstants } from "../_constants";
import { appreticeService } from "../services";

export const appreticeActions = {
    getAppreticeInfo,
    saveAppreticeInfo,
    closeModalAppreticeInfo,
};

function getAppreticeInfo(appreticeID) {
    return (dispatch) => {
        dispatch(request());

        appreticeService
            .getAppreticeInfo(appreticeID)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: appreticeConstants.GETAPPRETICEINFO_REQUEST };
    }
    function success(response) {
        return { type: appreticeConstants.GETAPPRETICEINFO_SUCCESS, response };
    }
    function failure(response) {
        return { type: appreticeConstants.GETAPPRETICEINFO_FAILURE, response };
    }
}

function closeModalAppreticeInfo() {
    return (dispatch) => {
        dispatch(closeModal());
    };

    function closeModal() {
        return { type: appreticeConstants.GETAPPRETICEINFO_FINISH };
    }
}

function saveAppreticeInfo(appretice) {
    return (dispatch) => {
        dispatch(request());

        appreticeService
            .saveAppreticeInfo(appretice)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    setTimeout((_) => {
                        dispatch(finish());
                    }, 1000);
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: appreticeConstants.UPDATEAPPRETICEINFO_REQUEST };
    }
    function finish() {
        return { type: appreticeConstants.UPDATEAPPRETICEINFO_FINISH };
    }
    function success(response) {
        return { type: appreticeConstants.UPDATEAPPRETICEINFO_SUCCESS, response };
    }
    function failure(response) {
        return { type: appreticeConstants.UPDATEAPPRETICEINFO_FAILURE, response };
    }
}
