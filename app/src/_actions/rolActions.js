import { rolConstant } from "../_constants";
import { roleService } from "../services";

export const rolActions = {
    getRoleInfo,
    getAllRoles,
    addRol,
    getCapacities,
    selectedRol,
    updateRol,
    closeUpdate,
    deleteRol,
};

function getRoleInfo(roleID, edit = false) {
    return (dispatch) => {
        dispatch(request());

        roleService
            .getUserRole(roleID)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    dispatch(setRol(response.rolInfo.capacity));
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return {
            type: !edit
                ? rolConstant.GETROLINFO_REQUEST
                : rolConstant.GETROL_REQUEST,
        };
    }
    function success(response) {
        return {
            type: !edit
                ? rolConstant.GETROLINFO_SUCCESS
                : rolConstant.GETROL_SUCCESS,
            response,
        };
    }
    function failure(response) {
        return {
            type: !edit
                ? rolConstant.GETROLINFO_FAILURE
                : rolConstant.GETROL_FAILURE,
            response,
        };
    }
    function setRol(rol) {
        return { type: rolConstant.SETSELECTEDROL, rol };
    }
}

function selectedRol(rol) {
    return (dispatch) => {
        dispatch(setRol(rol));
    };

    function setRol(rol) {
        return { type: rolConstant.SETSELECTEDROL, rol };
    }
}

function getAllRoles() {
    return (dispatch) => {
        dispatch(request());

        roleService
            .getAllRoles()
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
        return { type: rolConstant.GETROLES_REQUEST };
    }
    function success(response) {
        return { type: rolConstant.GETROLES_SUCCESS, response };
    }
    function failure(response) {
        return { type: rolConstant.GETROLES_FAILURE, response };
    }
}

function addRol(rolData) {
    return (dispatch) => {
        dispatch(request());

        roleService
            .addNewRol(rolData)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    roleService
                        .getAllRoles()
                        .then((response) => {
                            if (response.status) {
                                dispatch(successRoles(response));
                                setTimeout((_) => {
                                    dispatch(request());
                                }, 1500);
                            } else {
                                dispatch(failureRoles(response));
                                setTimeout((_) => {
                                    dispatch(request());
                                }, 1500);
                            }
                        })
                        .catch((err) => {
                            dispatch(failureRoles(err));
                            setTimeout((_) => {
                                dispatch(request());
                            }, 1500);
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
        return { type: rolConstant.ADDROLES_REQUEST };
    }
    function success(response) {
        return { type: rolConstant.ADDROLES_SUCCESS, response };
    }
    function failure(response) {
        return { type: rolConstant.ADDROLES_FAILURE, response };
    }
    function successRoles(response) {
        return { type: rolConstant.GETROLES_SUCCESS, response };
    }
    function failureRoles(response) {
        return { type: rolConstant.GETROLES_FAILURE, response };
    }
}

function getCapacities() {
    return (dispatch) => {
        dispatch(request());

        roleService
            .getCapacities()
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
        return { type: rolConstant.GETROLCAPACITIES_REQUEST };
    }
    function success(response) {
        return { type: rolConstant.GETROLCAPACITIES_SUCCESS, response };
    }
    function failure(response) {
        return { type: rolConstant.GETROLCAPACITIES_FAILURE, response };
    }
}

function updateRol(rol) {
    return (dispatch) => {
        dispatch(request());

        roleService
            .updateRol(rol)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    dispatch(finish());
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: rolConstant.UPDATEROL_REQUEST };
    }
    function finish() {
        return { type: rolConstant.FINISHUPDATE };
    }
    function success(response) {
        return {
            type: rolConstant.UPDATEROL_SUCCESS,
            response,
        };
    }
    function failure(response) {
        return {
            type: rolConstant.UPDATEROL_FAILURE,
            response,
        };
    }
}

function deleteRol(id) {
    return (dispatch) => {
        dispatch(request());

        roleService
            .deleteRol(id)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    setTimeout((_) => {
                        dispatch(finish());
                    }, 1500);
                    roleService
                        .getAllRoles()
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
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: rolConstant.DELETEROL_REQUEST };
    }
    function finish() {
        return { type: rolConstant.FINISHDELETE };
    }
    function success(response) {
        return {
            type: rolConstant.DELETEROL_SUCCESS,
            response,
        };
    }
    function failure(response) {
        return {
            type: rolConstant.DELETEROL_FAILURE,
            response,
        };
    }

    function successDelete(response) {
        return { type: rolConstant.GETROLES_SUCCESS, response };
    }
    function failureDelete(response) {
        return { type: rolConstant.GETROLES_FAILURE, response };
    }
}

function closeUpdate() {
    return (dispatch) => {
        dispatch(finish());
    };

    function finish() {
        return { type: rolConstant.FINISHUPDATE };
    }
}
