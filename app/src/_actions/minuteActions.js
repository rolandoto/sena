import { minuteConstant, generatorConstants } from "../_constants";
import { minuteService } from "../services";

export const minuteActions = {
    getAttendees,
    closeModal,
};

function getAttendees(key) {
    return (dispatch) => {
        dispatch(request());

        minuteService
            .getAttendess(key)
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
        return { type: minuteConstant.GETATTENDEES_REQUEST };
    }
    function success(response) {
        return { type: minuteConstant.GETATTENDEES_SUCCESS, response };
    }
    function failure(response) {
        return { type: minuteConstant.GETATTENDEES_FAILURE, response };
    }
}

function closeModal() {
    return (dispatch) => {
        dispatch(close());
    };
    function close() {
        return { type: generatorConstants.RESETACTION_MINUTE };
    }
}
