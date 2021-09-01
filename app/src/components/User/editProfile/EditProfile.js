import React, { Component } from "react";
import { connect } from "react-redux";
import { editProfileActions } from "../../../_actions";
import "./editProfile.css";

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCamera: false,
        };
    }

    mouseOver = (_) => {
        this.setState({
            showCamera: true,
        });
    };

    mouseLeave = (_) => {
        this.setState({
            showCamera: false,
        });
    };

    changeImagePreview = (_) => {
        if (this.profilePicture.files[0]) {
            this.profilePicturePreview.src = URL.createObjectURL(this.profilePicture.files[0]);
        }
    };

    editProfileTriggerSubmit = (e) => {
        e.preventDefault();
        const sendFormToEdit = new FormData(e.target);
        this.props.editProfile(sendFormToEdit);
    };

    render() {
        const { authReducer, editProfileReducer } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit">
                            <div className="header_edit_profile">
                                <h4>Editar perfil</h4>
                                <p className="profile_password_change">
                                    Recuerda que si queres cambiar tu contraseña, debes ir a la
                                    pestaña de cambiar contraseña.
                                </p>
                            </div>
                            <form
                                method="POST"
                                encType="multipart/form-data"
                                onSubmit={this.editProfileTriggerSubmit}
                            >
                                <div className="form_group center_horizontal">
                                    <img
                                        src={
                                            authReducer.userInfo.profilePicture
                                                ? authReducer.userInfo.profilePicture
                                                : "/assets/img/usuario.png"
                                        }
                                        ref={(input) => (this.profilePicturePreview = input)}
                                        className="profile_picture_change"
                                        alt="edit custom avatar"
                                    />
                                    <div className="cameraOverlayTop">
                                        <div className="cameraOverlay">
                                            camera
                                            <input
                                                type="file"
                                                name="imageProfile"
                                                ref={(input) => (this.profilePicture = input)}
                                                onChange={this.changeImagePreview}
                                                className="profile_picture_select"
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
                                                placeholder="Nombre"
                                                name="firstName"
                                                ref={(input) => (this.nameEdit = input)}
                                                defaultValue={authReducer.userInfo.first_name}
                                            />
                                        </div>
                                        <div className="col_6">
                                            <input
                                                type="text"
                                                className="form_control"
                                                name="lastName"
                                                placeholder="Apellido"
                                                ref={(input) => (this.lasNameEdit = input)}
                                                defaultValue={authReducer.userInfo.last_name}
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
                                                defaultValue={authReducer.userInfo.username}
                                            />
                                            {!editProfileReducer.status &&
                                                editProfileReducer.error === "user" && (
                                                    <div className="alert_error_edit">
                                                        {editProfileReducer.message}
                                                    </div>
                                                )}
                                        </div>
                                        <div className="col_6">
                                            <input
                                                type="text"
                                                className="form_control"
                                                name="email"
                                                placeholder="Email"
                                                ref={(input) => (this.emailEdit = input)}
                                                defaultValue={authReducer.userInfo.email}
                                            />
                                            {!editProfileReducer.status &&
                                                editProfileReducer.error === "email" && (
                                                    <div className="alert_error_edit">
                                                        {editProfileReducer.message}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                <div className="links_section_form">
                                    <button className="btn btn_big btn_orange">
                                        Editar perfil
                                    </button>
                                </div>

                                {!editProfileReducer.status &&
                                    editProfileReducer.error === "update" && (
                                        <div className="alert_error_edit">
                                            {editProfileReducer.message}
                                        </div>
                                    )}

                                {editProfileReducer.status &&
                                    editProfileReducer.error === "update" && (
                                        <div className="alert_success_edit">
                                            {editProfileReducer.message}
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

const actionCreator = {
    editProfile: editProfileActions.editProfile,
};

function mapStateToProps(state) {
    const { authReducer, editProfileReducer } = state;
    return { authReducer, editProfileReducer };
}

const editProfileComponent = connect(mapStateToProps, actionCreator)(EditProfile);
export { editProfileComponent as EditProfile };
