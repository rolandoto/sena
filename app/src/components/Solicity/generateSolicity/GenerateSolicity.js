import React, { Component } from "react";
import { connect } from "react-redux";
import { SelectAppretices } from "../../../components";
import { MenuItem, FormControl, Select, TextareaAutosize } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { uploadActions, solicityActions } from "../../../_actions";
import "./generateSolicity.css";
import { Link } from "react-router-dom";

class GenerateSolicity extends Component {
    constructor() {
        super();

        this.state = {
            selectedMotiveOrProhibition: "",
            filesUploaded: [],
            solicityID: "",
            execute: false,
        };
    }

    componentDidMount() {
        this.props.getDrawSolicity();
        this.props.getMotivesOrProhibitions();
    }

    eHandleSubmit = (e) => {
        e.preventDefault();
        const solicityData = {
            solicityID: this.state.solicityID,
            motiveOrProhibition: this.state.selectedMotiveOrProhibition,
            appretices: e.target.appreticesSelected.value,
            message: this.messageSolicity.value,
            appreticeSpokeMan: e.target.appreticeSpokeMan.value,
        };

        this.props.saveSolicity(solicityData);
    };

    onChangeMotiveOrProhibition = (event) => {
        this.setState({
            selectedMotiveOrProhibition: event.target.value,
        });
    };

    onChangeUploadFile = (e) => {
        e.preventDefault();
        const formData = new FormData(this.fileNewUpload);
        this.fileNewUpload.reset();
        this.setState({
            execute: false,
        });
        this.props.uploadFile(formData, this.state.solicityID);
    };

    setNewFilesReducer = (_) => {
        this.setState({
            filesUploaded: this.props.uploadSolicityFilesReducer.solicity.attachFiles,
            solicityID: this.props.uploadSolicityFilesReducer.solicity._id,
            execute: true,
        });
    };

    render() {
        const {
            authReducer,
            uploadSolicityFilesReducer,
            getMotivesOrProhibitionsReducer,
            saveSolicityReducer,
        } = this.props;

        if (uploadSolicityFilesReducer.status && !this.state.execute) {
            setTimeout((_) => {
                this.setNewFilesReducer();
            }, 200);
        }

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit show_overflow_on_mobile position_relative">
                            {saveSolicityReducer.loading && (
                                <div className="loading_file">
                                    <div className="text_loading">
                                        Estamos procesando la solicitud.
                                    </div>
                                    <div className="loader_upload"></div>
                                </div>
                            )}
                            {saveSolicityReducer.status &&  (
                                <div className="loading_file">
                                    <div className="text_loading">
                                        {saveSolicityReducer.message}
                                    </div>
                                </div>
                            )}
                            <div className="title">Generar solicitudes</div>
                            <div className="subtitle mb-2">
                                Si subes archivos la solicitud se va a guardar en estado de borrador
                                hasta que la envies.
                            </div>
                            <form onSubmit={this.eHandleSubmit}>
                                <SelectAppretices />
                                <div className="form_group">
                                    <FormControl>
                                        <Select
                                            value={this.state.selectedMotiveOrProhibition}
                                            onChange={this.onChangeMotiveOrProhibition}
                                            displayEmpty
                                            required
                                        >
                                            <MenuItem value="">Motivos o prohibiciones</MenuItem>
                                            {getMotivesOrProhibitionsReducer.status &&
                                                getMotivesOrProhibitionsReducer.motiverOrProhibions.map(
                                                    (item) => (
                                                        <MenuItem value={item._id} key={item._id}>
                                                            {item.title}
                                                        </MenuItem>
                                                    )
                                                )}
                                        </Select>
                                    </FormControl>
                                </div>
                                {/* <div className="form_group">
                                    <button className="btn btn_big btn_orange">
                                        Otros participantes
                                    </button>
                                </div> */}
                                <div className="form_group">
                                    <TextareaAutosize
                                        className="text_area_custom"
                                        rowsMin={3}
                                        placeholder="Mensaje"
                                        ref={(input) => (this.messageSolicity = input)}
                                        required
                                    />
                                </div>
                                <button className="btn btn_big btn_teal">Generar solicitud</button>
                            </form>
                        </div>
                        <div className="supplier_containers_data">
                            <div className="container_white_edit show_overflow_on_mobile w300">
                                <div className="title text_center">Adjuntar archivos</div>
                                <form method="POST" ref={(input) => (this.fileNewUpload = input)}>
                                    <div className="uploadNewArchiveSolicity">
                                        <div className="container_to_ipload_archive_solicity">
                                            <input
                                                type="file"
                                                name="fileUpload"
                                                id="fileUpload"
                                                className="uploadNewArchiveSolicityInput"
                                                onChange={this.onChangeUploadFile}
                                                multiple={true}
                                            />
                                            <div className="uploadNewArchiveSolicityText">
                                                <CloudUpload />
                                                <span>Subir nuevo archivo</span>
                                            </div>
                                        </div>

                                        {uploadSolicityFilesReducer.loading && (
                                            <div className="loading_file">
                                                <div className="text_loading_new">
                                                    Estamos procesando el archivo.
                                                </div>
                                                <div className="loader_upload"></div>
                                            </div>
                                        )}
                                    </div>
                                </form>

                                {this.state.filesUploaded.map((file, key) => (
                                    <div key={key} className="customArchiveUploaded">
                                        <div className="customArchiveUploadedName">
                                            {file.originalname}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="container_white_edit show_overflow_on_mobile w300">
                                <div className="title text_center">Tus datos</div>
                                {authReducer.auth && (
                                    <div className="full_width center_elements column_direction">
                                        <div className="customInfoInstructor">
                                            <strong className="color_teal">Email: </strong>
                                            <span>{authReducer.userInfo.email}</span>
                                        </div>
                                        <div className="customInfoInstructor">
                                            <strong className="color_teal">Nombre: </strong>
                                            <span>{authReducer.userInfo.first_name}</span>
                                        </div>
                                        <div className="customInfoInstructor">
                                            <strong className="color_teal">Apellido: </strong>
                                            <span>{authReducer.userInfo.last_name}</span>
                                        </div>
                                        <Link
                                            to="/editProfile"
                                            className="btn btn_big btn_teal center_margin text_center"
                                        >
                                            Cambar datos
                                        </Link>
                                    </div>
                                )}
                            </div>
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
        uploadSolicityFilesReducer,
        getSolicityDrawReducer,
        getMotivesOrProhibitionsReducer,
        saveSolicityReducer,
    } = state;
    return {
        authReducer,
        uploadSolicityFilesReducer,
        getSolicityDrawReducer,
        getMotivesOrProhibitionsReducer,
        saveSolicityReducer,
    };
}

const actionCreator = {
    uploadFile: uploadActions.uploadNewFileSolicity,
    getDrawSolicity: solicityActions.getDrawSolicity,
    getMotivesOrProhibitions: solicityActions.getMotiveOrProhibitions,
    saveSolicity: solicityActions.saveSolicity,
};

const generateSolicityComponent = connect(mapStateToProps, actionCreator)(GenerateSolicity);
export { generateSolicityComponent as GenerateSolicity };
