import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authActions, rolActions } from "../../_actions";
import "./Navbar.css";
import { Home, Face, Build, ExitToApp } from "@material-ui/icons";

class Navbar extends Component {
    constructor(props) {
        super();

        this.state = {
            mobileView: false,
        };
    }

    logout = (_) => {
        this.props.logout();
    };

    componentDidMount() {
        this.props.getRoleInfo(this.props.authReducer.userInfo.user_role);

        setTimeout((_) => {
            if (window.innerWidth <= 800) {
                this.setState({
                    mobileView: true,
                });
            } else {
                this.setState({
                    mobileView: false,
                });
            }

            window.addEventListener("resize", (e) => {
                if (e.currentTarget.innerWidth <= 800) {
                    this.setState({
                        mobileView: true,
                    });
                } else {
                    this.setState({
                        mobileView: false,
                    });
                }
            });
        }, 500);
    }

    render() {
        const { authReducer, getRolInfoReducer } = this.props;

        return (
            <div
                className={
                    this.state.mobileView
                        ? "navbar_component mobile_view"
                        : "navbar_component desktop_view"
                }
            >
                <div className="profile_view">
                    <div className="image_profile">
                        <img
                            src={
                                authReducer.userInfo &&
                                authReducer.userInfo.profilePicture
                                    ? authReducer.userInfo.profilePicture
                                    : "/assets/img/usuario.png"
                            }
                            className="profile_picture"
                            alt="profile_picture"
                        />
                    </div>

                    {!this.state.mobileView && (
                        <div className="profile_info">
                            {authReducer.userInfo && (
                                <React.Fragment>
                                    <span>
                                        {authReducer.userInfo.first_name +
                                            " " +
                                            authReducer.userInfo.last_name}
                                    </span>
                                    {getRolInfoReducer.status && (
                                        <span>
                                            {
                                                getRolInfoReducer.rolInfo
                                                    .role_name
                                            }
                                        </span>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    )}
                </div>

                <div className="list_of_apps">
                    <ul>
                        <li className="list_item">
                            <Link to="/">
                                {!this.state.mobileView && <span>Inicio</span>}

                                {this.state.mobileView && (
                                    <div className="iconMobile">
                                        <Home />
                                    </div>
                                )}
                            </Link>
                        </li>
                        <li className="list_item">
                            <Link to="/editProfile">
                                {!this.state.mobileView && (
                                    <span>Editar perfil</span>
                                )}

                                {this.state.mobileView && (
                                    <div className="iconMobile">
                                        <Face />
                                    </div>
                                )}
                            </Link>
                        </li>
                        <li className="list_item">
                            <Link to="/changePassword">
                                {!this.state.mobileView && (
                                    <span>Cambiar contraseña</span>
                                )}

                                {this.state.mobileView && (
                                    <div className="iconMobile">
                                        <Build />
                                    </div>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="list_of_apps">
                    <ul>
                        <li
                            className="list_item logout_button"
                            onClick={this.logout}
                        >
                            {!this.state.mobileView && (
                                <span>Cerrar sesión</span>
                            )}

                            {this.state.mobileView && (
                                <div className="iconMobile">
                                    <ExitToApp />
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const actionCreator = {
    logout: authActions.logout,
    getRoleInfo: rolActions.getRoleInfo,
};

function mapStateToProps(state) {
    const { authReducer, getRolInfoReducer } = state;
    return { authReducer, getRolInfoReducer };
}

const navbarComponent = connect(mapStateToProps, actionCreator)(Navbar);
export { navbarComponent as Navbar };
