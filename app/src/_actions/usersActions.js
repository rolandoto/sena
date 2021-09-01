import { userConstants } from "../_constants";
import { userService } from "../services";

export const userActions = {
    registerUser,
    searchUser,
    searchedUser,
    editUser,
    getCitaions,
    getSelectedCitaion,
    hideModalSelectedCitation,
    uploadCitationStatus,
    hideModalNewChange,
    updatePassword
};

function registerUser(user) {
    return (dispatch) => {
        dispatch(request());

        userService
            .registerUser(user)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    setTimeout((_) => {
                        dispatch(
                            success({
                                status: false,
                                message: "",
                            })
                        );
                    }, 1500);
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: userConstants.USERREGISTER_REQUEST };
    }
    function success(response) {
        return { type: userConstants.USERREGISTER_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.USERREGISTER_FAILURE, response };
    }
}

function searchUser(search) {
    return (dispatch) => {
        dispatch(request());

        userService
            .searchUsers(search)
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
        return { type: userConstants.SEARCHUSER_REQUEST };
    }
    function success(response) {
        return { type: userConstants.SEARCHUSER_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.SEARCHUSER_FAILURE, response };
    }
}

function searchedUser(userID) {
    return (dispatch) => {
        dispatch(request());

        userService
            .searchedUser(userID)
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
        return { type: userConstants.GETSEARCHEDUSER_REQUEST };
    }
    function success(response) {
        return { type: userConstants.GETSEARCHEDUSER_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.GETSEARCHEDUSER_FAILURE, response };
    }
}

function editUser(user) {
    return (dispatch) => {
        dispatch(request());

        userService
            .editUser(user)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    setTimeout((_) => {
                        dispatch(request());
                    }, 2000);
                } else {
                    dispatch(failure(response));
                    setTimeout((_) => {
                        dispatch(request());
                    }, 2000);
                }
            })
            .catch((err) => {
                dispatch(failure(err));
                setTimeout((_) => {
                    dispatch(request());
                }, 2000);
            });
    };

    function request() {
        return { type: userConstants.EDITSEARCHEDUSER_REQUEST };
    }
    function success(response) {
        return { type: userConstants.EDITSEARCHEDUSER_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.EDITSEARCHEDUSER_FAILURE, response };
    }
}

function getCitaions() {
    return (dispatch) => {
        dispatch(request());

        userService
            .getMyCitations()
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
        return { type: userConstants.GETMYCITATIONS_REQUEST };
    }
    function success(response) {
        return { type: userConstants.GETMYCITATIONS_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.GETSEARCHEDUSER_FAILURE, response };
    }
}

function getSelectedCitaion(citationID) {
    return (dispatch) => {
        dispatch(request());

        userService
            .getSelectedCitation(citationID)
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
        return { type: userConstants.GETSELECTEDCITATION_REQUEST };
    }
    function success(response) {
        return { type: userConstants.GETSELECTEDCITATION_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.GETSELECTEDCITATION_FAILURE, response };
    }
}

function hideModalSelectedCitation() {
    return (dispatch) => {
        dispatch(hideModal());
    };
    function hideModal() {
        return { type: userConstants.GETSELECTEDCITATION_HIDEMODAL };
    }
}

function uploadCitationStatus(citationID, form) {
    return (dispatch) => {
        dispatch(request());

        userService
            .uploadNewCitationStatus(citationID, form)
            .then((response) => {
                if (response.status) {
                    userService
                        .getSelectedCitation(citationID)
                        .then((response) => {
                            if (response.status) {
                                dispatch(successAfter(response));
                            } else {
                                dispatch(failureAfter(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failure(err));
                        });
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
        return { type: userConstants.UPLOADNEWCITATIONSTATUS_REQUEST };
    }
    function success(response) {
        return { type: userConstants.UPLOADNEWCITATIONSTATUS_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.UPLOADNEWCITATIONSTATUS_FAILURE, response };
    }
    function successAfter(response) {
        return { type: userConstants.GETSELECTEDCITATION_SUCCESS, response };
    }
    function failureAfter(response) {
        return { type: userConstants.GETSELECTEDCITATION_FAILURE, response };
    }
}

function hideModalNewChange() {
    return (dispatch) => {
        dispatch(hideModal());
    };
    function hideModal() {
        return { type: userConstants.UPLOADNEWCITATIONSTATUS_HIDEMODAL };
    }
}

function updatePassword(data) {
    return (dispatch) => {
        dispatch(request());

        userService
            .updatePassword(data)
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
        return { type: userConstants.USERUPDATEPASSWORD_REQUEST };
    }
    function success(response) {
        return { type: userConstants.USERUPDATEPASSWORD_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.USERUPDATEPASSWORD_FAILURE, response };
    }
}
