import React, { Component } from "react";
import { connect } from "react-redux";
import { SolicityDetail } from "../../Solicity/solicities/solicityDetail";
import "./citations.css";
import {
    userActions,
    solicityActions,
    citationActions,
} from "../../../_actions";
import { HighlightOff, CloudUpload } from "@material-ui/icons";
import { Link } from "react-router-dom";

class Citations extends Component {
    componentDidMount() {
        this.props.getCitaions();
    }

    eHancleClickCitation = (citationID) => {
        this.props.getSelected(citationID);
    };

    getMonth(n) {
        switch (n + 1) {
            case 1:
                return "Enero";
            case 2:
                return "Febrero";
            case 3:
                return "Marzo";
            case 4:
                return "Abril";
            case 5:
                return "Mayo";
            case 6:
                return "Junio";
            case 7:
                return "Julio";
            case 8:
                return "Agosto";
            case 9:
                return "Septiembre";
            case 10:
                return "Octubre";
            case 11:
                return "Noviembre";
            case 12:
                return "Diciembre";
            default:
                return "Null";
        }
    }

    eHandleShowDetails = (key) => {
        this.props.getDetails(key);
    };

    eHandleHideModal = (_) => {
        this.props.hideSelectedModal();
    };

    eHandleNewDocumentUpload = (citationID) => {
        const formData = new FormData(this.formUploadNewStatus);
        this.props.uploadStatus(citationID, formData);
    };

    hideModalNewChange = (_) => {
        this.props.hideModalUpload();
    };

    submitCitation = (id) => {
        this.props.sendCitation({
            citationID: id,
        });
    };

    render() {
        const {
            citationsReducer,
            citationSelectedReducer,
            uploadNewStatusCitation,
            getSolicityReducer,
            sendCitationReducer,
        } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    {sendCitationReducer.status && (
                        <div className="push_template push_template_success">
                            {sendCitationReducer.message}
                        </div>
                    )}
                    {sendCitationReducer.status === false && (
                        <div className="push_template push_template_error">
                            {sendCitationReducer.message}
                        </div>
                    )}
                    {getSolicityReducer.status && <SolicityDetail />}
                    <div className="center_container">
                        <div className="container_white_edit show_overflow_on_mobile center_elements">
                            <div className="block_container">
                                <div className="title">Tus citaciones</div>
                                <div className="subtitle">
                                    En esta lista podrás encontrar todas las
                                    citaciones que hayas generado, tambien
                                    podrás actualizar sus estados en cada fase
                                    del proceso.
                                </div>
                                <div className="solicityList">
                                    {citationsReducer.status &&
                                        citationsReducer.citations.map(
                                            (citation) => (
                                                <div
                                                    key={citation._id}
                                                    onClick={() =>
                                                        this.eHancleClickCitation(
                                                            citation._id
                                                        )
                                                    }
                                                    className="citation_item"
                                                >
                                                    <div className="title_search">
                                                        Descripción
                                                    </div>
                                                    <div className="subtitle">
                                                        {citation.description}
                                                    </div>
                                                    <div className="title_search">
                                                        Fecha de generación
                                                    </div>
                                                    <div className="subtitle">
                                                        {citation.date}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>

                            {citationSelectedReducer.status && (
                                <div className="modal_overlay_role m600">
                                    <div
                                        className="close_modal"
                                        onClick={() => this.eHandleHideModal()}
                                    >
                                        <HighlightOff />
                                    </div>

                                    {uploadNewStatusCitation.status && (
                                        <div className="modalMessageOverlay">
                                            <span className="textMessageUploadNew">
                                                {
                                                    uploadNewStatusCitation.message
                                                }
                                            </span>
                                            <button
                                                className="btn btn_teal"
                                                onClick={
                                                    this.hideModalNewChange
                                                }
                                            >
                                                Aceptar
                                            </button>
                                        </div>
                                    )}

                                    {uploadNewStatusCitation.status ===
                                        false && (
                                        <div className="modalMessageOverlay">
                                            <span className="textMessageUploadNew">
                                                {
                                                    uploadNewStatusCitation.message
                                                }
                                            </span>
                                            <button
                                                className="btn btn_orange"
                                                onClick={
                                                    this.hideModalNewChange
                                                }
                                            >
                                                Aceptar
                                            </button>
                                        </div>
                                    )}

                                    <div className="info_citation_container">
                                        <div className="title">
                                            Ultimo cambio
                                        </div>
                                        <div className="subtitle">
                                            Este es el utlimo cambio generado de
                                            la citación si quieres ver los
                                            cambios anteriores puedes
                                            encontrarlos en la parte inferior
                                        </div>

                                        <div className="container_info_uploads">
                                            <div className="col_6">
                                                {citationSelectedReducer.citations.map(
                                                    (citation) =>
                                                        citation._id ===
                                                        citationSelectedReducer
                                                            .parent
                                                            .lastChange ? (
                                                            <div
                                                                key={
                                                                    citation._id
                                                                }
                                                                className="last_change_uploaded"
                                                            >
                                                                <img
                                                                    src="/assets/img/pdfCitations.png"
                                                                    className="image_responsive"
                                                                    alt="pdf uploaded"
                                                                />
                                                                <div className="action_buttons">
                                                                    <button
                                                                        className="btn btn_orange"
                                                                        onClick={() =>
                                                                            this.submitCitation(
                                                                                citation._id
                                                                            )
                                                                        }
                                                                    >
                                                                        Enviar
                                                                    </button>

                                                                    <a
                                                                        href={
                                                                            citation.pdfLink
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="btn btn_teal"
                                                                    >
                                                                        Ver PDF
                                                                    </a>
                                                                </div>

                                                                {citationSelectedReducer
                                                                    .parent
                                                                    .minute && (
                                                                    <a
                                                                        className="button_generate_citation btn_big mt-5"
                                                                        href={
                                                                            citationSelectedReducer
                                                                                .parent
                                                                                .minute
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        Ver acta
                                                                    </a>
                                                                )}

                                                                <Link
                                                                    className="button_generate_citation btn_big mt-5"
                                                                    to={
                                                                        "/generateMinutes/" +
                                                                        citation.solicity
                                                                    }
                                                                >
                                                                    Generar acta
                                                                </Link>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )
                                                )}
                                            </div>
                                            <div className="col_6 upload_new_file_change column_direction">
                                                <form
                                                    method="POST"
                                                    className="uploadNewFileContainer"
                                                    ref={(input) =>
                                                        (this.formUploadNewStatus = input)
                                                    }
                                                >
                                                    <div className="container_to_ipload">
                                                        <input
                                                            type="file"
                                                            name="newFileToUpload"
                                                            id="newFileToUpload"
                                                            className="uploadNewFileContainer"
                                                            onChange={() =>
                                                                this.eHandleNewDocumentUpload(
                                                                    citationSelectedReducer
                                                                        .parent
                                                                        ._id
                                                                )
                                                            }
                                                            ref={(input) =>
                                                                (this.fileNewUpload = input)
                                                            }
                                                        />
                                                        <div className="uploadNewFile">
                                                            <CloudUpload />
                                                            <span>
                                                                Subir nuevo
                                                                archivo
                                                            </span>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div
                                                    className="button_generate_citation mt-5"
                                                    onClick={() =>
                                                        this.eHandleShowDetails(
                                                            citationSelectedReducer
                                                                .parent.solicity
                                                        )
                                                    }
                                                >
                                                    Ver solicitud
                                                </div>

                                                {uploadNewStatusCitation.searchLoading && (
                                                    <div className="loading_file">
                                                        <div className="text_loading_new">
                                                            Estamos procesando
                                                            el archivo.
                                                        </div>
                                                        <div className="loader_upload"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="title_search">
                                            Listado de cambios
                                        </div>
                                        <div className="citationScrollChanges">
                                            {citationSelectedReducer.status &&
                                                citationSelectedReducer.citations.map(
                                                    (citation) => (
                                                        <div
                                                            key={citation._id}
                                                            className="citation_item center_vertical"
                                                        >
                                                            <div className="title_search">
                                                                Fecha de
                                                                generación
                                                            </div>
                                                            <div className="subtitle">
                                                                {new Date(
                                                                    citation.createdAt
                                                                ).getDate() +
                                                                    " de " +
                                                                    this.getMonth(
                                                                        new Date(
                                                                            citation.createdAt
                                                                        ).getMonth()
                                                                    ) +
                                                                    " del " +
                                                                    new Date(
                                                                        citation.createdAt
                                                                    ).getFullYear()}
                                                            </div>
                                                            <div className="floating_button">
                                                                <a
                                                                    href={
                                                                        citation.pdfLink
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    Ver PDF
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                        </div>
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
    const {
        authReducer,
        citationsReducer,
        citationSelectedReducer,
        uploadNewStatusCitation,
        getSolicityReducer,
        sendCitationReducer,
    } = state;
    return {
        authReducer,
        citationsReducer,
        citationSelectedReducer,
        uploadNewStatusCitation,
        getSolicityReducer,
        sendCitationReducer,
    };
}

const actionCreator = {
    getCitaions: userActions.getCitaions,
    getSelected: userActions.getSelectedCitaion,
    hideSelectedModal: userActions.hideModalSelectedCitation,
    uploadStatus: userActions.uploadCitationStatus,
    hideModalUpload: userActions.hideModalNewChange,
    getDetails: solicityActions.getSolicityDetails,
    sendCitation: citationActions.sendCitation,
};

const citationsComponent = connect(mapStateToProps, actionCreator)(Citations);
export { citationsComponent as Citations };
