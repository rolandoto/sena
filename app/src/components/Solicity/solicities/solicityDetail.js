import React, { Component } from "react";
import { connect } from "react-redux";
import { solicityActions, appreticeActions } from "../../../_actions";
import { HighlightOff } from "@material-ui/icons";
import { UpdateAppreticeInfo } from '../../../components'

class SolicityDetail extends Component {
    closeSolicityDetail = (_) => {
        this.props.closeModal();
    };

    editAppreticeInfo = (appreticeID) => {
        this.setState({
            showModalAppreticeInfo: true,
        });
        this.props.appreticeInfo(appreticeID);
    };

    render() {
        const { getSolicityReducer , getAppreticeInfoReducer} = this.props;
        return (
            <div className="center_container overlay_black">
                <div className="container_white_edit custom_container_details">
                    <div className="close_modal" onClick={() => this.closeSolicityDetail()}>
                        <HighlightOff />
                    </div>
                    <div className="title mb-2">Detalles de la solicitud</div>
                    <div className="mb-2">
                        <p>
                            <span className="subTitleBold">Estado:</span>{" "}
                            <span className="subtitle">
                                {getSolicityReducer.solicity.statusDetail}
                            </span>
                        </p>
                    </div>
                    <div className="title_search mb-2">Instructor</div>
                    <div className="mb-2">
                        <p>
                            <span className="subTitleBold">Nombre:</span>{" "}
                            <span className="subtitle">
                                {getSolicityReducer.solicity.instructor.first_name}
                            </span>
                        </p>
                        <p>
                            <span className="subTitleBold">Email:</span>{" "}
                            <span className="subtitle">
                                {getSolicityReducer.solicity.instructor.email}
                            </span>
                        </p>
                    </div>
                    <div className="title_search mb-2">Motivo citación</div>
                    <p className="subtitle mb-2">
                        {getSolicityReducer.solicity.motivesOrProhibition.description}
                    </p>

                    <div className="title_search mb-2">Aprendices</div>
                    <ul className="list_solicity_details mb-4">
                        {getSolicityReducer.solicity.appretices.map((appretice) => (
                            <li
                                className="appretices_item_solicity_details center_elements column_direction left-align position_relative"
                                key={appretice.appretice_id}
                            >
                            {getAppreticeInfoReducer.status && getAppreticeInfoReducer.appretice._id ===  appretice.appretice_id &&
                                <UpdateAppreticeInfo />
                            }
                                <div className="subTitleLow mb-2">Detalles del aprendiz</div>
                                <p>
                                    <span className="subTitleBold">Nombre:</span>{" "}
                                    <span className="subtitle">{appretice.full_name}</span>
                                </p>
                                <p>
                                    <span className="subTitleBold">Email:</span>{" "}
                                    <span className="subtitle">{appretice.email}</span>
                                </p>
                                <p>
                                    <span className="subTitleBold">Teléfono:</span>{" "}
                                    <span className="subtitle">{appretice.phone}</span>
                                </p>
                                <button
                                    className="btn btn_big btn_teal mt-5"
                                    onClick={() => this.editAppreticeInfo(appretice.appretice_id)}
                                >
                                    Editar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="title_search mb-2">Archivos</div>
                    <ul className="list_solicity_details mb-4">
                        {getSolicityReducer.solicity.files.map((file, key) => (
                            <li
                                className="file_item_solicity_details center_elements column_direction"
                                key={key}
                            >
                                <div>
                                    <img
                                        src="/assets/img/file.png"
                                        width="80"
                                        alt="show uploaded file"
                                    />
                                </div>
                                <div className="subTitleLow mb-2 customTextStyle">{file.originalname}</div>
                                <a
                                    className="btn btn_big btn_teal mt-5 text_center"
                                    href={getSolicityReducer.solicity.fileDomail + file.filename}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ver
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { getSolicityReducer , getAppreticeInfoReducer } = state;
    return {
        getSolicityReducer,
        getAppreticeInfoReducer
    };
}

const actionCreator = {
    closeModal: solicityActions.closeSolicityDetail,
    appreticeInfo: appreticeActions.getAppreticeInfo,
};

const solicityDetailComponent = connect(mapStateToProps, actionCreator)(SolicityDetail);
export { solicityDetailComponent as SolicityDetail };
