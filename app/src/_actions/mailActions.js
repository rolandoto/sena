import { mailConstants } from "../_constants";
import { mailService } from "../services";

export const mailActions = {
    getMail,
    getMails,
    getMailPermits,
    createMail,
    updateMail,
    deleteMail,
    closeAllModals,
    modal,
};

function getMailPermits() {
    return (dispatch) => {
        dispatch(request());

        mailService
            .getMailPermits()
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
        return { type: mailConstants.GETMAILPERMITS_REQUEST };
    }
    function success(response) {
        return { type: mailConstants.GETMAILPERMITS_SUCCESS, response };
    }
    function failure(response) {
        return { type: mailConstants.GETMAILPERMITS_FAILURE, response };
    }
}

function getMail(mailID) {
    return (dispatch) => {
        dispatch(request());

        mailService
            .getMail(mailID)
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
        return { type: mailConstants.GETMAIL_REQUEST };
    }
    function success(response) {
        return { type: mailConstants.GETMAIL_SUCCESS, response };
    }
    function failure(response) {
        return { type: mailConstants.GETMAIL_FAILURE, response };
    }
}

function getMails() {
    return (dispatch) => {
        dispatch(request());

        mailService
            .getMails()
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
        return { type: mailConstants.GETMAILS_REQUEST };
    }
    function success(response) {
        return { type: mailConstants.GETMAILS_SUCCESS, response };
    }
    function failure(response) {
        return { type: mailConstants.GETMAILS_FAILURE, response };
    }
}

function createMail(data) {
    return (dispatch) => {
        dispatch(request());

        mailService
            .createMail(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    mailService
                        .getMails()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successGet(response));
                            } else {
                                dispatch(failureGet(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failure(err));
                        });
                } else {
                    dispatch(failure(response));
                }

                setTimeout((_) => {
                    dispatch(closeAlert());
                }, 1600);
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: mailConstants.CREATEMAIL_REQUEST };
    }
    function closeAlert() {
        return { type: mailConstants.CREATEMAILCLOSEMODAL };
    }
    function success(response) {
        return { type: mailConstants.CREATEMAIL_SUCCESS, response };
    }
    function failure(response) {
        return { type: mailConstants.CREATEMAIL_FAILURE, response };
    }
    function successGet(response) {
        return { type: mailConstants.GETMAILS_SUCCESS, response };
    }
    function failureGet(response) {
        return { type: mailConstants.GETMAILS_FAILURE, response };
    }
}

function updateMail(data) {
    return (dispatch) => {
        dispatch(request());

        mailService
            .updateMail(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    mailService
                        .getMails()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successGet(response));
                            } else {
                                dispatch(failureGet(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failure(err));
                        });
                } else {
                    dispatch(failure(response));
                }

                setTimeout((_) => {
                    dispatch(closeAlert());
                }, 1600);
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: mailConstants.UPDATEMAIL_REQUEST };
    }
    function success(response) {
        return { type: mailConstants.UPDATEMAIL_SUCCESS, response };
    }
    function failure(response) {
        return { type: mailConstants.UPDATEMAIL_FAILURE, response };
    }
    function closeAlert() {
        return { type: mailConstants.CREATEMAILCLOSEMODAL };
    }
    function successGet(response) {
        return { type: mailConstants.GETMAILS_SUCCESS, response };
    }
    function failureGet(response) {
        return { type: mailConstants.GETMAILS_FAILURE, response };
    }
}

function deleteMail(data) {
    return (dispatch) => {
        dispatch(request());

        mailService
            .deleteMail(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    mailService
                        .getMails()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successGet(response));
                            } else {
                                dispatch(failureGet(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failure(err));
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
        return { type: mailConstants.DELETEMAIL_REQUEST };
    }
    function success(response) {
        return { type: mailConstants.DELETEMAIL_SUCCESS, response };
    }
    function failure(response) {
        return { type: mailConstants.DELETEMAIL_FAILURE, response };
    }
    function successGet(response) {
        return { type: mailConstants.GETMAILS_SUCCESS, response };
    }
    function failureGet(response) {
        return { type: mailConstants.GETMAILS_FAILURE, response };
    }
}

function closeAllModals() {
    return (dispatch) => {
        dispatch(closeModal());
    };

    function closeModal() {
        return { type: mailConstants.CLOSEMODAL_ALLMODALSMAILS };
    }
}

function modal() {
    return (dispatch) => {
        dispatch(createMail());
    };

    function createMail() {
        return { type: mailConstants.OPENCREATEMAILMODAL };
    }
}
