import { userConstants } from "../_constants";
import { authService } from "../services";
import cookie from "react-cookies";
import { history } from "../helpers";

export const authActions = {
    userLogin,
    validateToken,
    logout,
};

function userLogin(credentials) {
    return (dispatch) => {
        dispatch(request());

        authService
            .userLogin(credentials)
            .then((response) => {
                if (response.auth) {
                    cookie.save("userToken", response.token, { path: "/" });
                    dispatch(success(response));
                    history.push("/");
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: userConstants.USERLOGIN_REQUEST };
    }
    function success(response) {
        return { type: userConstants.USERLOGIN_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.USERLOGIN_FAILURE, response };
    }
}

function validateToken(token) {
    return (dispatch) => {
        dispatch(request());

        authService
            .validateToken(token)
            .then((response) => {
                if (response.auth) {
                    dispatch(success(response));
                    history.push("/");
                } else {
                    dispatch(failure(response));
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: userConstants.USERLOGIN_REQUEST };
    }
    function success(response) {
        return { type: userConstants.USERLOGIN_SUCCESS, response };
    }
    function failure(response) {
        return { type: userConstants.USERLOGIN_FAILURE, response };
    }
}

function logout() {
    return (dispatch) => {
        cookie.remove("userToken", { path: "/" });
        if (!cookie.load("userToken")) {
            dispatch(logout());
            history.push("/login");
        }
    };

    function logout() {
        return { type: userConstants.USER_LOGOUT };
    }
}
