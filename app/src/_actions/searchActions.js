import { searchConstants } from "../_constants";
import { searchService } from "../services";

export const searchActions = {
    searchAppretices,
    searchAppretice,
    hideModalSearched,
};

function searchAppretices(searchData, instructor = false) {
    return (dispatch) => {
        if (!instructor) {
            dispatch(request());
            searchService
                .searchAppretices(searchData)
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
        } else {
            dispatch(requestInstructor());
            searchService
                .searchInstructors(searchData)
                .then((response) => {
                    if (response.status) {
                        dispatch(successInstructor(response));
                    } else {
                        dispatch(failureInstructor(response));
                    }
                })
                .catch((err) => {
                    dispatch(failureInstructor(err));
                });
        }
    };

    function request() {
        return { type: searchConstants.SEARCHAPPRETICE_REQUEST };
    }
    function success(response) {
        return { type: searchConstants.SEARCHAPPRETICE_SUCCESS, response };
    }
    function failure(response) {
        return { type: searchConstants.SEARCHAPPRETICE_SUCCESS, response };
    }
    function requestInstructor() {
        return { type: searchConstants.SEARCHINSTRUCTOR_REQUEST };
    }
    function successInstructor(response) {
        return { type: searchConstants.SEARCHINSTRUCTOR_SUCCESS, response };
    }
    function failureInstructor(response) {
        return { type: searchConstants.SEARCHINSTRUCTOR_FAILURE, response };
    }
}

function searchAppretice(appreticeID, instructor = false) {
    return (dispatch) => {
        if (!instructor) {
            dispatch(request());

            searchService
                .searchAppretice(appreticeID)
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
        } else {
            dispatch(requestInstructor());
            searchService
                .searchInstructor(appreticeID)
                .then((response) => {
                    if (response.status) {
                        dispatch(successInstructor(response));
                    } else {
                        dispatch(failureInstructor(response));
                    }
                })
                .catch((err) => {
                    dispatch(failureInstructor(err));
                });
        }
    };

    function request() {
        return { type: searchConstants.SEARCHONEAPRETICE_REQUEST };
    }
    function success(response) {
        return { type: searchConstants.SEARCHONEAPRETICE_SUCCESS, response };
    }
    function failure(response) {
        return { type: searchConstants.SEARCHONEAPRETICE_FAILURE, response };
    }
    function requestInstructor() {
        return { type: searchConstants.SEARCHONEINSTRUCTOR_REQUEST };
    }
    function successInstructor(response) {
        return { type: searchConstants.SEARCHONEINSTRUCTOR_SUCCESS, response };
    }
    function failureInstructor(response) {
        return { type: searchConstants.SEARCHONEINSTRUCTOR_FAILURE, response };
    }
}

function hideModalSearched() {
    return (dispatch) => {
        dispatch(hide());
    };

    function hide() {
        return { type: searchConstants.HIDESEARCHEDMODAL };
    }
}
