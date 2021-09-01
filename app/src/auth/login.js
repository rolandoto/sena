import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "../_actions";
import "./login.css";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formError: {
                show: false,
                type: null,
                message: "",
            },
        };
    }

    validateCredentials = (credentials) => {
        if (credentials.usernameoremail.length > 0) {
            if (credentials.password.length >= 3) {
                let validateIfIsEmail = credentials.usernameoremail.match(
                    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                );
                if (validateIfIsEmail) {
                    credentials.type = "email";
                } else {
                    credentials.type = "user";
                }

                this.setState({
                    formError: {
                        show: false,
                        type: null,
                        message: "",
                    },
                });

                return credentials;
            } else {
                this.setState({
                    formError: {
                        show: true,
                        type: "passwordError",
                        message: "Debes ingresar una contraseña de 6 digitos o mas",
                    },
                });
                return false;
            }
        } else {
            this.setState({
                formError: {
                    show: true,
                    type: "userOrEmailError",
                    message: "Este campo es requerido",
                },
            });
            return false;
        }
    };

    eHandleFormSubmit = (e) => {
        e.preventDefault();
        const userLogin = {
            usernameoremail: this.usernameoremail.value,
            password: this.password.value,
        };
        const validateCredentials = this.validateCredentials(userLogin);
        if (validateCredentials) {
            this.props.login(validateCredentials);
        }
    };

    render() {
        const { authReducer } = this.props;

        return (
            <div className="login_component">
                <div className="container_login">
                    <div className="form_desing_part">
                        <h3 className="login_text_header">Iniciar sesión</h3>
                        <form method="POST" onSubmit={this.eHandleFormSubmit}>
                            <div className="form_group">
                                <input
                                    type="text"
                                    name="usernameoremail"
                                    id="usernameoremail"
                                    ref={(input) => (this.usernameoremail = input)}
                                    className="form_control"
                                    placeholder="Usuario o correo electrónico"
                                />
                                {this.state.formError.show &&
                                    this.state.formError.type === "userOrEmailError" && (
                                        <div className="alert_error_login">
                                            {this.state.formError.message}
                                        </div>
                                    )}
                            </div>

                            <div className="form_group">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    ref={(input) => (this.password = input)}
                                    className="form_control"
                                    placeholder="Contraseña"
                                />
                                {this.state.formError.show &&
                                    this.state.formError.type === "passwordError" && (
                                        <div className="alert_error_login">
                                            {this.state.formError.message}
                                        </div>
                                    )}

                                {!authReducer.auth && !this.state.formError.show && (
                                    <div className="alert_error_login">{authReducer.message}</div>
                                )}
                            </div>

                            <div className="links_section_form">
                                <a href="https://deprueba.com" className="forgot_password_link">
                                    Olvidaste tu contraseña?
                                </a>
                                <button className="btn btn_large btn_orange">Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                    <div className="custom_desing_circles">
                        <div className="custom_desing_circles_left">
                            <div
                                className={
                                    authReducer.validating
                                        ? "circle_side circle1_desing loading_circle"
                                        : "circle_side circle1_desing"
                                }
                            ></div>
                            <div className="circle_side circle2_desing"></div>
                            <div className="circle_side circle3_desing"></div>
                        </div>
                    </div>

                    {authReducer.validating && (
                        <div className="message_circle_white">
                            <p>Estamos validando tus credenciales</p>
                            <div className="loader_login"></div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer } = state;
    return { authReducer };
}

const actionCreator = {
    login: authActions.userLogin,
};

const loginComponent = connect(mapStateToProps, actionCreator)(Login);
export { loginComponent as Login };
