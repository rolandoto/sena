import { citationConstants } from "../_constants";
import { citationService } from "../services";

export const citationActions = {
    sendCitation,
};

function sendCitation(data) {
    return (dispatch) => {
        dispatch(request());

        citationService
            .sendCitation(data)
            .then((response) => {
                if (response.auth) {
                    dispatch(success(response));
                } else {
                    dispatch(failure(response));
                }

                setTimeout(_ => {
                    dispatch(finish())
                } , 1600)
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: citationConstants.SENDCITATIONMAIL_REQUEST };
    }
    function success(response) {
        return { type: citationConstants.SENDCITATIONMAIL_SUCCESS, response };
    }
    function failure(response) {
        return { type: citationConstants.SENDCITATIONMAIL_FAILURE, response };
    }
    function finish() {
        return { type: citationConstants.ENDCITATIONALERTS };
    }
}