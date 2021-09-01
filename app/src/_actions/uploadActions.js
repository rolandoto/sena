import { uploadConstants } from "../_constants";
import { uploadService } from "../services";

export const uploadActions = {
    uploadApprentices,
    hideAlert,
    uploadInstructors,
    uploadNewFileSolicity,
    uploadSingleAppretice,
};

function uploadApprentices(form) {
    return (dispatch) => {
        dispatch(request());

        uploadService
            .uploadAppretices(form)
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
        return { type: uploadConstants.APPRENTICESUPLOAD_REQUEST };
    }
    function success(response) {
        return { type: uploadConstants.APPRENTICESUPLOAD_SUCCESS, response };
    }
    function failure(response) {
        return { type: uploadConstants.APPRENTICESUPLOAD_FAILURE, response };
    }
}

function uploadSingleAppretice(form) {
    return (dispatch) => {
        dispatch(request());
        uploadService
            .uploadSingleAppretice(form)
            .then((res) => {
                if (res.status) {
                    dispatch(success(res));
                } else {
                    dispatch(failure(res));
                }

                setTimeout((_) => {
                    dispatch(finish());
                }, 3000);
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function finish() {
        return { type: uploadConstants.APPRENTICESINGLEUPLOAD_FINISH };
    }
    function request() {
        return { type: uploadConstants.APPRENTICESINGLEUPLOAD_REQUEST };
    }
    function success(response) {
        return {
            type: uploadConstants.APPRENTICESINGLEUPLOAD_SUCCESS,
            response,
        };
    }
    function failure(response) {
        return {
            type: uploadConstants.APPRENTICESINGLEUPLOAD_FAILURE,
            response,
        };
    }
}

function uploadInstructors(form) {
    return (dispatch) => {
        dispatch(request());

        uploadService
            .uploadInstructors(form)
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
        return { type: uploadConstants.APPRENTICESUPLOAD_REQUEST };
    }
    function success(response) {
        return { type: uploadConstants.APPRENTICESUPLOAD_SUCCESS, response };
    }
    function failure(response) {
        return { type: uploadConstants.APPRENTICESUPLOAD_FAILURE, response };
    }
}

function uploadNewFileSolicity(form, solicityID) {
    return (dispatch) => {
        dispatch(request());

        uploadService
            .uploadNewFileSolicity(form, solicityID)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    setTimeout((_) => {
                        dispatch(clear());
                    }, 500);
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: uploadConstants.UPLOADNEWFILESOLICITY_REQUEST };
    }
    function success(response) {
        return {
            type: uploadConstants.UPLOADNEWFILESOLICITY_SUCCESS,
            response,
        };
    }
    function failure(response) {
        return {
            type: uploadConstants.UPLOADNEWFILESOLICITY_FAILURE,
            response,
        };
    }
    function clear() {
        return { type: uploadConstants.UPLOADNEWFILESOLICITY_CLEAR };
    }
}

function hideAlert() {
    return (dispatch) => {
        dispatch(hideAlert());
    };

    function hideAlert() {
        return { type: uploadConstants.UPLOADALERT_HIDE };
    }
}
