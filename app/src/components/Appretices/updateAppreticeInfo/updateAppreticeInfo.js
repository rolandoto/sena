import React, { Component } from "react";
import { connect } from "react-redux";
import { HighlightOff } from "@material-ui/icons";
import { appreticeActions } from "../../../_actions";

class UpdateAppreticeInfo extends Component {
    saveAppreticeInfo = (_) => {
        const appreticeInfo = {
            appreticeID: this.props.getAppreticeInfoReducer.appretice._id,
            email: this.eHandleAppreticeEmail.value,
            phone: this.eHandleAppreticePhone.value,
        };
        this.props.saveAppretice(appreticeInfo);
    };

    eHandleHideModal = (_) => {
        this.props.closeModal();
    };

    render() {
        const { getAppreticeInfoReducer, saveAppreticeInfoReducer } = this.props;
        return (
            <div className="showOverlayUpdateInfo center_elements height_100">
                <div className="editContainerAppreticeInfo center_elements column_direction">
                    <div className="close_modal" onClick={() => this.eHandleHideModal()}>
                        <HighlightOff />
                    </div>
                    <div className="editAppreticeNoForm">
                        <div className="form_group">
                            <input
                                type="text"
                                name="appreticeEmail"
                                ref={(input) => (this.eHandleAppreticeEmail = input)}
                                defaultValue={
                                    getAppreticeInfoReducer.status
                                        ? getAppreticeInfoReducer.appretice.email
                                        : ""
                                }
                                placeholder="Email"
                                className="form_control"
                                required
                            />
                        </div>

                        <div className="form_group">
                            <input
                                type="text"
                                name="appreticePhone"
                                ref={(input) => (this.eHandleAppreticePhone = input)}
                                defaultValue={
                                    getAppreticeInfoReducer.status
                                        ? getAppreticeInfoReducer.appretice.phone
                                        : ""
                                }
                                placeholder="Teléfono"
                                className="form_control"
                                required
                            />
                        </div>
                        <div className="form_group">
                            <div
                                className="btn btn_big btn_teal"
                                onClick={this.saveAppreticeInfo}
                            >
                                Guardar
                            </div>
                        </div>
                        {getAppreticeInfoReducer.loading && (
                            <div className="loading_file">
                                <div className="text_loading_new">Estamos buscando al aprendiz</div>
                                <div className="loader_upload"></div>
                            </div>
                        )}
                        {saveAppreticeInfoReducer.loading && (
                            <div className="loading_file">
                                <div className="text_loading_new">
                                    Estamos procesando tu solicitud
                                </div>
                                <div className="loader_upload"></div>
                            </div>
                        )}
                        {saveAppreticeInfoReducer.status && (
                            <div className="alert_success_edit">
                                {saveAppreticeInfoReducer.message}
                            </div>
                        )}
                        {!saveAppreticeInfoReducer.status && (
                            <div className="alert_error_edit">
                                {saveAppreticeInfoReducer.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { getAppreticeInfoReducer, saveAppreticeInfoReducer } = state;
    return { getAppreticeInfoReducer, saveAppreticeInfoReducer };
}

const actionCreator = {
    saveAppretice: appreticeActions.saveAppreticeInfo,
    closeModal: appreticeActions.closeModalAppreticeInfo,
};

const updateAppreticeInfoComponent = connect(mapStateToProps, actionCreator)(UpdateAppreticeInfo);
export { updateAppreticeInfoComponent as UpdateAppreticeInfo };
