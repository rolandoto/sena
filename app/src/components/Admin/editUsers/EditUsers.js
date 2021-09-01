import React, { Component } from "react";
import { connect } from "react-redux";
import { userActions } from "../../../_actions";
import "./EditUsers.css";
import { HighlightOff } from "@material-ui/icons";

class EditUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalEditUser: false,
        };
    }

    eHandleTypeSearch(search) {
        let credentials = {
            searchValue: search,
        };
        let validateIfIsEmail = search.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (validateIfIsEmail) {
            credentials.type = "email";
        } else {
            credentials.type = "user";
        }
        return credentials;
    }

    eHandleSearch = (_) => {
        const getSearch = this.eHandleTypeSearch(this.searchUserOrEmail.value);
        this.props.searchUsers(getSearch);
    };

    editUserSelected = (user) => {
        this.props.searchUser(user);
        this.setState({
            showModalEditUser: true,
        });
    };

    closeNewRoleModal = (_) => {
        this.setState({
            showModalEditUser: false,
        });
    };

    eHandleTriggerEditUser = (e) => {
        e.preventDefault();

        const editUser = {
            userID: this.userID.value,
            username: this.userEdit.value,
            email: this.emailEdit.value,
            firstName: this.nameEdit.value,
            lastName: this.lasNameEdit.value,
        };

        this.props.edit(editUser);
    };

    render() {
        const { searchUsersReducer, searchedUserReducer, editUserSearchReducer } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit show_overflow_on_mobile">
                            <div className="title">Editar usuarios</div>
                            <div className="subtitle">
                                Para editar un usuario debes diligenciar su nombre de usuario o
                                correo electrónico.
                            </div>
                            <form autoComplete="off">
                                <div className="form_group_search">
                                    <input
                                        type="text"
                                        name="userOrEmail"
                                        ref={(input) => (this.searchUserOrEmail = input)}
                                        onChange={this.eHandleSearch}
                                        placeholder="Usuario o correo electrónico"
                                        className="form_control"
                                    />
                                </div>
                            </form>
                            {searchUsersReducer.status && (
                                <div className="search_container">
                                    <ul className="search_list">
                                        {searchUsersReducer.users.map((user) => (
                                            <li
                                                className="search_list_item"
                                                key={user._id}
                                                onClick={() => this.editUserSelected(user._id)}
                                            >
                                                <div className="two_colums_search">
                                                    <div className="picture_column">
                                                        <img
                                                            src={
                                                                user.profilePicture
                                                                    ? user.profilePicture
                                                                    : "/assets/img/usuario.png"
                                                            }
                                                            className="profile_picture"
                                                            alt="profile_picture"
                                                        />
                                                    </div>
                                                    <div className="search_info_user">
                                                        <div className="title_search">
                                                            {user.email}
                                                        </div>
                                                        <div className="subtitle">
                                                            {user.username}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {this.state.showModalEditUser && searchedUserReducer.status && (
                                <div className="modal_overlay_role min_height min_height_mobile">
                                    <div className="close_modal" onClick={this.closeNewRoleModal}>
                                        <HighlightOff />
                                    </div>

                                    <div className="form_desing_edit">
                                        <div className="title">Editar usuario</div>
                                        <div className="subtitle">
                                            Bienvenido al editor de usuario, recuerda que por
                                            motivos de seguridad no puedes cambiar la contraseña ni
                                            la foto de perfil.
                                        </div>

                                        <form method="POST" onSubmit={this.eHandleTriggerEditUser}>
                                            <input
                                                type="hidden"
                                                className="form_control"
                                                placeholder="Nombre"
                                                name="userID"
                                                ref={(input) => (this.userID = input)}
                                                defaultValue={searchedUserReducer.userInfo._id}
                                            />

                                            <div className="form_group">
                                                <div className="rows">
                                                    <div className="col_6">
                                                        <input
                                                            type="text"
                                                            className="form_control"
                                                            placeholder="Nombre"
                                                            name="firstName"
                                                            ref={(input) => (this.nameEdit = input)}
                                                            defaultValue={
                                                                searchedUserReducer.userInfo
                                                                    .first_name
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col_6">
                                                        <input
                                                            type="text"
                                                            className="form_control"
                                                            name="lastName"
                                                            placeholder="Apellido"
                                                            ref={(input) =>
                                                                (this.lasNameEdit = input)
                                                            }
                                                            defaultValue={
                                                                searchedUserReducer.userInfo
                                                                    .last_name
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form_group">
                                                <div className="rows">
                                                    <div className="col_6">
                                                        <input
                                                            type="text"
                                                            className="form_control"
                                                            name="username"
                                                            placeholder="Usuario"
                                                            ref={(input) => (this.userEdit = input)}
                                                            defaultValue={
                                                                searchedUserReducer.userInfo
                                                                    .username
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col_6">
                                                        <input
                                                            type="text"
                                                            className="form_control"
                                                            name="email"
                                                            placeholder="Email"
                                                            ref={(input) =>
                                                                (this.emailEdit = input)
                                                            }
                                                            defaultValue={
                                                                searchedUserReducer.userInfo.email
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="links_section_form">
                                                <button className="btn btn_big btn_orange">
                                                    Editar usuario
                                                </button>
                                            </div>

                                            {!editUserSearchReducer.status && (
                                                <div className="alert_error_edit mt-2">
                                                    {editUserSearchReducer.message}
                                                </div>
                                            )}

                                            {editUserSearchReducer.status && (
                                                <div className="alert_success_edit">
                                                    {editUserSearchReducer.message}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer, searchUsersReducer, searchedUserReducer, editUserSearchReducer } = state;
    return { authReducer, searchUsersReducer, searchedUserReducer, editUserSearchReducer };
}

const actionCreator = {
    searchUsers: userActions.searchUser,
    searchUser: userActions.searchedUser,
    edit: userActions.editUser,
};

const editUsersComponent = connect(mapStateToProps, actionCreator)(EditUsers);
export { editUsersComponent as EditUsers };
