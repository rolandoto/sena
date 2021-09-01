import { uploadConstants, solicityConstants } from "../_constants";
import { solicityService } from "../services";
import { history } from "../helpers";

export const solicityActions = {
    getDrawSolicity,
    getMotiveOrProhibitions,
    saveMotiveOrProhibitions,
    saveSolicity,
    getSolicities,
    changeSolicityStatus,
    getSolicityDetails,
    closeSolicityDetail,
    updateMotiveOrProhibition,
    deleteMotiveOrProhibition,
    getMotiveOrProhibition,
    finishMotiveOrProhibition,
};

function getDrawSolicity() {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .getDrawSolicity()
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
        return { type: solicityConstants.GETSOLICITYDRAW_REQUEST };
    }
    function success(response) {
        return { type: uploadConstants.UPLOADNEWFILESOLICITY_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.GETSOLICITYDRAW_FAILURE, response };
    }
}

function getSolicities() {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .getSolicites()
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
        return { type: solicityConstants.GETSOLICITIES_REQUEST };
    }
    function success(response) {
        return { type: solicityConstants.GETSOLICITIES_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.GETSOLICITIES_FAILURE, response };
    }
}

function getMotiveOrProhibitions() {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .getMotivesOrProhibitions()
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
        return { type: solicityConstants.GETMOTIVESORPROHIBITIONS_REQUEST };
    }
    function success(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITIONS_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITIONS_FAILURE, response };
    }
}

function saveMotiveOrProhibitions(data) {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .saveMotivesOrProhibitions(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    setTimeout((_) => {
                        dispatch(finish());
                    }, 1000);
                    solicityService
                        .getMotivesOrProhibitions()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successSecondAction(response));
                            } else {
                                dispatch(failureSecondAction(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failureSecondAction(err));
                        });
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: solicityConstants.SAVEMOTIVESORPROHIBITIONS_REQUEST };
    }
    function success(response) {
        return { type: solicityConstants.SAVEMOTIVESORPROHIBITIONS_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.SAVEMOTIVESORPROHIBITIONS_FAILURE, response };
    }
    function finish(response) {
        return { type: solicityConstants.SAVEMOTIVESORPROHIBITIONS_FINISH, response };
    }

    function successSecondAction(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITIONS_SUCCESS, response };
    }
    function failureSecondAction(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITIONS_FAILURE, response };
    }
}

function saveSolicity(data) {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .saveSolicity(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));

                    setTimeout((_) => {
                        dispatch(finish());
                        history.push("/solicities");
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
        return { type: solicityConstants.SAVESOLICITY_REQUEST };
    }
    function success(response) {
        return { type: solicityConstants.SAVESOLICITY_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.SAVESOLICITY_FAILURE, response };
    }
    function finish() {
        return { type: solicityConstants.SAVESOLICITY_FINISH };
    }
}

function changeSolicityStatus(data) {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .changeSolicityStatus(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    solicityService
                        .getSolicites()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successGet(response));
                            } else {
                                dispatch(failureGet(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failureGet(err));
                        });
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: solicityConstants.CHANGESOLICITYSTATUS_REQUEST };
    }
    function success(response) {
        return { type: solicityConstants.CHANGESOLICITYSTATUS_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.CHANGESOLICITYSTATUS_FAILURE, response };
    }
    function successGet(response) {
        return { type: solicityConstants.GETSOLICITIES_SUCCESS, response };
    }
    function failureGet(response) {
        return { type: solicityConstants.GETSOLICITIES_FAILURE, response };
    }
}

function getSolicityDetails(id) {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .getSolicityDetails(id)
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
        return { type: solicityConstants.GETSOLICITIE_REQUEST };
    }
    function success(response) {
        return { type: solicityConstants.GETSOLICITIE_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.GETSOLICITIE_FAILURE, response };
    }
}

function closeSolicityDetail() {
    return (dispatch) => {
        dispatch(closeModal());
    };

    function closeModal() {
        return { type: solicityConstants.GETSOLICITIE_CLOSE_MODAL };
    }
}

function getMotiveOrProhibition(key) {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .getMotiveOrProhibition(key)
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
        return { type: solicityConstants.GETMOTIVESORPROHIBITION_REQUEST };
    }
    function success(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITION_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITION_FAILURE, response };
    }
}

function updateMotiveOrProhibition(data) {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .updateMotiveOrProhibition(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    solicityService
                        .getMotivesOrProhibitions()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successEdit(response));
                            } else {
                                dispatch(failureEdit(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failureEdit(err));
                        });

                    setTimeout((_) => {
                        dispatch(finish());
                    }, 2000);
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: solicityConstants.UPDATEMOTIVESORPROHIBITIONS_REQUEST };
    }
    function finish() {
        return { type: solicityConstants.CLOSEMOTIVEORPROHIBITION };
    }
    function success(response) {
        return { type: solicityConstants.UPDATEMOTIVESORPROHIBITIONS_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.UPDATEMOTIVESORPROHIBITIONS_FAILURE, response };
    }
    function successEdit(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITIONS_SUCCESS, response };
    }
    function failureEdit(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITIONS_FAILURE, response };
    }
}

function deleteMotiveOrProhibition(data) {
    return (dispatch) => {
        dispatch(request());

        solicityService
            .deleteMotiveOrProhibition(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    solicityService
                        .getMotivesOrProhibitions()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successDelete(response));
                            } else {
                                dispatch(failureDelete(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failureDelete(err));
                        });
                    setTimeout((_) => {
                        dispatch(finish());
                    }, 2000);
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: solicityConstants.DELETEMOTIVESORPROHIBITIONS_REQUEST };
    }
    function finish() {
        return { type: solicityConstants.CLOSEMOTIVEORPROHIBITION };
    }
    function success(response) {
        return { type: solicityConstants.DELETEMOTIVESORPROHIBITIONS_SUCCESS, response };
    }
    function failure(response) {
        return { type: solicityConstants.DELETEMOTIVESORPROHIBITIONS_FAILURE, response };
    }
    function successDelete(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITIONS_SUCCESS, response };
    }
    function failureDelete(response) {
        return { type: solicityConstants.GETMOTIVESORPROHIBITIONS_FAILURE, response };
    }
}

function finishMotiveOrProhibition() {
    return (dispatch) => {
        dispatch(finish());
    };

    function finish() {
        return { type: solicityConstants.CLOSEMOTIVEORPROHIBITION };
    }
}
