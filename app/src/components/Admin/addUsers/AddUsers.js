import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions , rolActions } from "../../../_actions";
import "./AddUsers.css";

import { MenuItem, FormControl, Select } from "@material-ui/core";

class AddUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRol: "",
            showError: "",
            message: "",
        };
    }

    onChangeRol = (event) => {
        this.setState({
            selectedRol: event.target.value,
        });
    };

    componentDidMount() {
        this.props.getRoles();
    }

    evaluateData(userInfo) {
        this.setState({
            showError: "",
            message: "",
        });

        if (this.state.selectedRol === "") {
            return {
                status: false,
                showError: "rol",
                message: "Debes seleccionar un rol.",
            };
        }

        if (userInfo.firstName.length < 1) {
            return {
                status: false,
                showError: "first_name",
                message: "Este campo es requerido.",
            };
        }

        if (userInfo.lastName.length < 1) {
            return {
                status: false,
                showError: "last_name",
                message: "Este campo es requerido.",
            };
        }

        if (userInfo.username.length < 6) {
            return {
                status: false,
                showError: "username",
                message: "El nombre de usuario debe contener mas de 6 caracteres.",
            };
        }

        if (!userInfo.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            return {
                status: false,
                showError: "email",
                message: "Debes intruducir un email correcto.",
            };
        }

        if (userInfo.password.length < 6) {
            return {
                status: false,
                showError: "password",
                message: "La contraseña debe contener 6 caracteres.",
            };
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            return {
                status: false,
                showError: "password",
                message: "Las contraseñas no coinciden",
            };
        }

        userInfo.rol = this.state.selectedRol;

        return {
            status: true,
            user: userInfo,
        };
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        const userInfo = {
            firstName: this.userFirstName.value,
            lastName: this.userLastName.value,
            username: this.username.value,
            email: this.userEmail.value,
            password: this.userPassword.value,
            confirmPassword: this.userConfirmPassword.value,
        };
        const evaluateUser = this.evaluateData(userInfo);
        if (evaluateUser.status) {
            this.props.register(evaluateUser.user);
        } else {
            this.setState({
                showError: evaluateUser.showError,
                message: evaluateUser.message,
            });
        }
    };

    clearForm = (_) => {
        setTimeout((_) => {
            this.registerForm.reset();
        }, 500);
    };

    render() {
        const { roleReducer, registerUserReducer } = this.props;

        if (registerUserReducer.status) {
            this.clearForm();
        }

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit">
                            <div className="title">Añadir usuario</div>
                            <div className="subtitle">
                                Aquí podrás añadir nuevos usuarios a la aplicación
                            </div>
                            <form
                                method="POST"
                                ref={(ele) => (this.registerForm = ele)}
                                onSubmit={this.handleSubmitForm}
                            >
                                <div className="form_group">
                                    <FormControl>
                                        <Select
                                            value={this.state.selectedRol}
                                            onChange={this.onChangeRol}
                                            displayEmpty
                                        >
                                            <MenuItem value="">Seleccionar rol</MenuItem>
                                            {roleReducer.status &&
                                                roleReducer.roles.map((rol) => (
                                                    <MenuItem key={rol._id} value={rol._id}>
                                                        {rol.role_name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                    {this.state.showError === "rol" && (
                                        <div className="alert_error_login">
                                            {this.state.message}
                                        </div>
                                    )}
                                </div>

                                <div className="form_group">
                                    <div className="rows">
                                        <div className="col_6">
                                            <input
                                                type="text"
                                                className="form_control"
                                                placeholder="Nombre"
                                                name="firstName"
                                                ref={(input) => (this.userFirstName = input)}
                                            />
                                            {this.state.showError === "first_name" && (
                                                <div className="alert_error_login">
                                                    {this.state.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col_6">
                                            <input
                                                type="text"
                                                className="form_control"
                                                name="lastName"
                                                placeholder="Apellido"
                                                ref={(input) => (this.userLastName = input)}
                                            />
                                            {this.state.showError === "last_name" && (
                                                <div className="alert_error_login">
                                                    {this.state.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form_group">
                                    <div className="rows">
                                        <div className="col_6">
                                            <input
                                                type="text"
                                                className="form_control"
                                                placeholder="Usuario"
                                                name="username"
                                                ref={(input) => (this.username = input)}
                                            />

                                            {this.state.showError === "username" && (
                                                <div className="alert_error_login">
                                                    {this.state.message}
                                                </div>
                                            )}
                                            {!registerUserReducer.status &&
                                                registerUserReducer.type === "username" && (
                                                    <div className="alert_error_login">
                                                        {registerUserReducer.message}
                                                    </div>
                                                )}
                                        </div>
                                        <div className="col_6">
                                            <input
                                                type="text"
                                                className="form_control"
                                                name="email"
                                                placeholder="Correo electrónico"
                                                ref={(input) => (this.userEmail = input)}
                                            />
                                            {this.state.showError === "email" && (
                                                <div className="alert_error_login">
                                                    {this.state.message}
                                                </div>
                                            )}
                                            {!registerUserReducer.status &&
                                                registerUserReducer.type === "email" && (
                                                    <div className="alert_error_login">
                                                        {registerUserReducer.message}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                <div className="form_group">
                                    <div className="rows">
                                        <div className="col_6">
                                            <input
                                                type="password"
                                                className="form_control"
                                                placeholder="Contraseña"
                                                name="password"
                                                ref={(input) => (this.userPassword = input)}
                                            />
                                            {this.state.showError === "password" && (
                                                <div className="alert_error_login">
                                                    {this.state.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col_6">
                                            <input
                                                type="password"
                                                className="form_control"
                                                name="confirmPassword"
                                                placeholder="Confirmar contraseña"
                                                ref={(input) => (this.userConfirmPassword = input)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn_big btn_orange">Iniciar sesión</button>
                                {!registerUserReducer.status &&
                                    registerUserReducer.type === "general" && (
                                        <div className="alert_error_login">
                                            {registerUserReducer.message}
                                        </div>
                                    )}

                                {registerUserReducer.status && (
                                    <div className="alert_success_edit">
                                        {registerUserReducer.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer, roleReducer, registerUserReducer } = state;
    return { authReducer, roleReducer, registerUserReducer };
}

const actionCreator = {
    getRoles: rolActions.getAllRoles,
    register: userActions.registerUser,
};

const addUsersComponent = connect(mapStateToProps, actionCreator)(AddUsers);
export { addUsersComponent as AddUsers };
