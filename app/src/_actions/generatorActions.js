import { generatorConstants } from "../_constants";
import { generatorService } from "../services";
import { history } from "../helpers";

export const generatorActions = {
    generateCitation,
    hideAndRedirect,
    generateMinute,
    resetCitationMinute,
};

function generateCitation(data) {
    return (dispatch) => {
        dispatch(request());

        generatorService
            .generateCitation(data)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));

                    setTimeout(_ => {
                        dispatch(finish())
                        history.push('/citations')
                    } , 2500);
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: generatorConstants.GENERATORCITATION_REQUEST };
    }
    function finish() {
        return { type: generatorConstants.REDIRECTTOCITATIONS };
    }
    function success(response) {
        return { type: generatorConstants.GENERATORCITATION_SUCCESS, response };
    }
    function failure(response) {
        return { type: generatorConstants.GENERATORCITATION_FAILURE, response };
    }
}

function hideAndRedirect() {
    return (dispatch) => {
        dispatch(rHide());
        dispatch(finishSearched());
        history.push("/myCitations");
    };

    function rHide() {
        return { type: generatorConstants.REDIRECTTOCITATIONS };
    }
    function finishSearched() {
        return { type: "FINISHSEARCHED" };
    }
}

function generateMinute(data) {
    return (dispatch) => {
        dispatch(request());

        generatorService
            .generateMinute(data)
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
        return { type: generatorConstants.GENERATORMINUTE_REQUEST };
    }
    function success(response) {
        return { type: generatorConstants.GENERATORMINUTE_SUCCESS, response };
    }
    function failure(response) {
        return { type: generatorConstants.GENERATORMINUTE_FAILURE, response };
    }
}

function resetCitationMinute() {
    return (dispatch) => {
        dispatch(reset());
    };

    function reset() {
        return { type: generatorConstants.RESETACTION_MINUTE };
    }
}
