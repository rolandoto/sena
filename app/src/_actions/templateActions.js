import { templateConstants } from "../_constants";
import { templateService } from "../services";

export const templateActions = {
    getCustomFields,
    showModal,
    hideModal,
    createTemplate,
    getTemplates,
    getTemplate,
    updateTemplate,
    deleteTemplate,
};

function getCustomFields(type) {
    return (dispatch) => {
        dispatch(request());

        templateService
            .getCustomFields(type)
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
        return { type: templateConstants.GETCUSTOMFIELDS_REQUEST };
    }
    function success(response) {
        return { type: templateConstants.GETCUSTOMFIELDS_SUCCESS, response };
    }
    function failure(response) {
        return { type: templateConstants.GETCUSTOMFIELDS_FAILURE, response };
    }
}

function getTemplates() {
    return (dispatch) => {
        dispatch(request());

        templateService
            .getTemplates()
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
        return { type: templateConstants.GETTEMPLATES_REQUEST };
    }
    function success(response) {
        return { type: templateConstants.GETTEMPLATES_SUCCESS, response };
    }
    function failure(response) {
        return { type: templateConstants.GETTEMPLATES_FAILURE, response };
    }
}

function getTemplate(templateID) {
    return (dispatch) => {
        dispatch(request());

        templateService
            .getTemplate(templateID)
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
        return { type: templateConstants.GETTEMPLATE_REQUEST };
    }
    function success(response) {
        return { type: templateConstants.GETTEMPLATE_SUCCESS, response };
    }
    function failure(response) {
        return { type: templateConstants.GETTEMPLATE_FAILURE, response };
    }
}

function createTemplate(data) {
    return (dispatch) => {
        dispatch(request());

        templateService
            .createTemplate(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));

                    templateService
                        .getTemplates()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successTemplate(response));
                            } else {
                                dispatch(failureTemplate(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failureTemplate(err));
                        });

                    setTimeout((_) => {
                        dispatch(finish());
                    }, 1600);
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: templateConstants.CREATETEMPLATE_REQUEST };
    }
    function finish() {
        return { type: templateConstants.FINISH_CREATE_TEMPLATE };
    }
    function success(response) {
        return { type: templateConstants.CREATETEMPLATE_SUCCESS, response };
    }
    function failure(response) {
        return { type: templateConstants.CREATETEMPLATE_FAILURE, response };
    }
    function successTemplate(response) {
        return { type: templateConstants.GETTEMPLATES_SUCCESS, response };
    }
    function failureTemplate(response) {
        return { type: templateConstants.GETTEMPLATES_FAILURE, response };
    }
}

function updateTemplate(data) {
    return (dispatch) => {
        dispatch(request());

        templateService
            .updateTemplate(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    templateService
                        .getTemplates()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successTemplate(response));
                            } else {
                                dispatch(failureTemplate(response));
                            }
                        })
                        .catch((err) => {
                            dispatch(failureTemplate(err));
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
        return { type: templateConstants.UPDATETEMPLATE_REQUEST };
    }
    function finish() {
        return { type: templateConstants.FINISH_CREATE_TEMPLATE };
    }
    function success(response) {
        return { type: templateConstants.UPDATETEMPLATE_SUCCESS, response };
    }
    function failure(response) {
        return { type: templateConstants.UPDATETEMPLATE_FAILURE, response };
    }
    function successTemplate(response) {
        return { type: templateConstants.GETTEMPLATES_SUCCESS, response };
    }
    function failureTemplate(response) {
        return { type: templateConstants.GETTEMPLATES_FAILURE, response };
    }
}

function deleteTemplate(data) {
    return (dispatch) => {
        dispatch(request());

        templateService
            .deleteTemplate(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    templateService
                        .getTemplates()
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
        return { type: templateConstants.DELETETEMPLATE_REQUEST };
    }
    function success(response) {
        return { type: templateConstants.DELETETEMPLATE_SUCCESS, response };
    }
    function failure(response) {
        return { type: templateConstants.DELETETEMPLATE_FAILURE, response };
    }
    function successGet(response) {
        return { type: templateConstants.GETTEMPLATES_SUCCESS, response };
    }
    function failureGet(response) {
        return { type: templateConstants.GETTEMPLATES_FAILURE, response };
    }
}

function showModal() {
    return (dispatch) => {
        dispatch(show());
    };

    function show() {
        return { type: templateConstants.SHOWMODAL };
    }
}

function hideModal() {
    return (dispatch) => {
        dispatch(hide());
    };

    function hide() {
        return { type: templateConstants.HIDEMODAL };
    }
}
