import { editProfileConstant, userConstants } from "../_constants";
import { editProfileService, authService } from "../services";
import { history } from "../helpers";
import cookie from "react-cookies";

export const editProfileActions = {
    editProfile,
};

function editProfile(form) {
    return (dispatch) => {
        dispatch(request());

        editProfileService
            .editProfile(form)
            .then((response) => {
                if (response.status) {
                    dispatch(success(response));
                    authService
                        .profileUpdate()
                        .then((response) => {
                            if (response.auth) {
                                dispatch(profUpdate(response));
                                setTimeout((_) => {
                                    dispatch(
                                        success({
                                            status: false,
                                            errorText: "none",
                                            message: "",
                                        })
                                    );
                                }, 1500);
                            } else {
                                dispatch(
                                    failure({
                                        status: false,
                                        errorText: "update",
                                        message: "Hubo un error al actualizar tus datos",
                                    })
                                );

                                setTimeout((_) => {
                                    dispatch(
                                        success({
                                            status: false,
                                            errorText: "none",
                                            message: "",
                                        })
                                    );
                                }, 1500);
                            }
                        })
                        .catch((err) => {
                            dispatch(profFailure(err));
                        });
                } else {
                    dispatch(failure(response));
                    if (response.error === "token") {
                        cookie.remove("userToken", { path: "/" });
                        if (!cookie.load("userToken")) {
                            history.push("/login");
                        }
                    }
                }
            })
            .catch((err) => {
                dispatch(failure(err));
            });
    };

    function request() {
        return { type: editProfileConstant.EDITPROFILE_REQUEST };
    }
    function success(response) {
        return { type: editProfileConstant.EDITPROFILE_SUCCESS, response };
    }
    function failure(response) {
        return { type: editProfileConstant.EDITPROFILE_FAILURE, response };
    }

    function profUpdate(response) {
        return { type: userConstants.USERLOGIN_SUCCESS, response };
    }
    function profFailure(response) {
        return { type: userConstants.USERLOGIN_FAILURE, response };
    }
}
