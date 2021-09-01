import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadActions } from "../../../_actions";
import { ArrowUpward } from "@material-ui/icons/";
import "./uploadInstructors.css";

class UploadInstructors extends Component {
    eHandleSubmitForm = (_) => {
        const formData = new FormData(this.formData);
        this.formData.reset();
        this.props.uploadInstructors(formData);
    };

    submitForm = (e) => {
        e.preventDefault();
        this.eHandleSubmitForm();
    };

    render() {
        const { uploadReducer } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit min_height center_elements">
                            {uploadReducer.loading && (
                                <div className="loading_file">
                                    <div className="text_loading">
                                        Estamos procesando el archivo.
                                    </div>
                                    <div className="loader_upload"></div>
                                </div>
                            )}

                            <form
                                method="POST"
                                encType="multipart/form-data"
                                onSubmit={this.eHandleSubmitForm}
                                className="form_total_size center_elements h300"
                                ref={(input) => (this.formData = input)}
                            >
                                <input
                                    type="file"
                                    name="fileUpload"
                                    id="fileUpload"
                                    onChange={this.submitForm}
                                    className="file_input_container"
                                    required={true}
                                />

                                <div className="container_upload_section">
                                    <div className="file_upload_icon">
                                        <div className="overlay_white">
                                            <ArrowUpward />
                                        </div>
                                    </div>
                                    <p className="select_text">Arrastra tu archivo aquí</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer, uploadReducer } = state;
    return { authReducer, uploadReducer };
}

const actionCreator = {
    uploadInstructors: uploadActions.uploadInstructors,
};

const uploadInstructorsComponent = connect(mapStateToProps, actionCreator)(UploadInstructors);
export { uploadInstructorsComponent as UploadInstructors };
