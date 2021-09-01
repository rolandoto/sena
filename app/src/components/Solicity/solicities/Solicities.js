import React, { Component } from "react";
import { connect } from "react-redux";
import { SolicityDetail } from "./solicityDetail";
import { solicityActions, generatorActions, templateActions } from "../../../_actions";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import { HighlightOff } from "@material-ui/icons";
import { TextField, MenuItem, FormControl, Select } from "@material-ui/core/";
import moment from "moment";
import "./solicities.css";
import { Link } from "react-router-dom";
import { history } from "../../../helpers";

class Solicities extends Component {
    constructor(props) {
        super();

        this.state = {
            showGenerateModal: false,
            solicityID: "",
            solicityDate: new Date(),
            solicityHour: new Date(),
            solicityLink: "",
            selectTemplate: "",
            citationDescription: "",
        };
    }

    componentDidMount() {
        this.props.getSolicities();
        this.props.getTemplates();
    }

    eHandleChangeStatus = (key, status) => {
        const solicityData = {
            solicityID: key,
            status: status,
        };

        this.props.changeStatus(solicityData);
    };

    eHandleShowDetails = (key) => {
        this.props.getDetails(key);
    };

    showGenerateModal = (key) => {
        this.setState({
            showGenerateModal: true,
            solicityID: key,
        });
    };

    hideGenerateModal = (key) => {
        this.setState({
            showGenerateModal: false,
            solicityID: "",
        });
    };

    changeDate = (value) => {
        this.setState({
            solicityDate: value,
        });
    };

    changeHour = (value) => {
        this.setState({
            solicityHour: value,
        });
    };

    changeLink = (ref) => {
        this.setState({
            solicityLink: ref.target.value,
        });
    };

    changeCitationDescription = (ref) => {
        this.setState({
            citationDescription: ref.target.value,
        });
    };

    eSubmitGenerateSolicity = (e) => {
        e.preventDefault();
        const citationData = {
            solicityID: this.solicityID.value,
            citationDate: this.state.solicityDate,
            citationHour: this.state.solicityHour,
            citationLink: this.state.solicityLink,
            template: this.state.selectTemplate,
            description: this.state.citationDescription,
        };
        this.props.generateCitation(citationData);
    };

    onChangeTemplate = (event) => {
        this.setState({
            selectTemplate: event.target.value,
        });
    };

    render() {
        const {
            getSolicitiesReducer,
            getRolInfoReducer,
            getSolicityReducer,
            templatesReducer,
            generateConstantReducer,
        } = this.props;
        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    {getSolicityReducer.status && <SolicityDetail />}
                    {this.state.showGenerateModal && (
                        <div className="center_container overlay_black">
                            <div className="container_white_edit custom_container_details">
                                {generateConstantReducer.loading && (
                                    <div className="loading_file">
                                        <div className="text_loading">
                                            Estamos procesando los datos
                                        </div>
                                        <div className="loader_upload"></div>
                                    </div>
                                )}

                                {generateConstantReducer.status && (
                                    <div className="loading_file">
                                        <div className="text_loading">
                                            La citación se ha generado correctamente
                                        </div>
                                        <Link to="/citations" className="btn btn_white">
                                            Ver citaciones
                                        </Link>
                                    </div>
                                )}

                                {generateConstantReducer.status === false && (
                                    <div className="push_template push_template_error">
                                        Ha ocurrido un error al generar la citación
                                    </div>
                                )}

                                <div
                                    className="close_modal"
                                    onClick={() => this.hideGenerateModal()}
                                >
                                    <HighlightOff />
                                </div>
                                <div className="title">Generar citación</div>
                                <form method="POST" onSubmit={this.eSubmitGenerateSolicity}>
                                    <input
                                        type="hidden"
                                        ref={(input) => (this.solicityID = input)}
                                        defaultValue={this.state.solicityID}
                                    />
                                    <div className="grid_pickers">
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                label="Fecha"
                                                format="MM/dd/yyyy"
                                                required
                                                value={this.state.solicityDate}
                                                onChange={this.changeDate}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                            />
                                            <KeyboardTimePicker
                                                margin="normal"
                                                label="Hora"
                                                value={this.state.solicityHour}
                                                onChange={this.changeHour}
                                                required
                                                KeyboardButtonProps={{
                                                    "aria-label": "change time",
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <div className="form_group_material">
                                        <TextField
                                            label="Link de la reunión"
                                            multiline
                                            fullWidth
                                            required
                                            value={this.state.solicityLink}
                                            onChange={this.changeLink}
                                            variant="outlined"
                                        />
                                    </div>
                                    <div className="form_group_material">
                                        <TextField
                                            label="Descripción"
                                            multiline
                                            fullWidth
                                            required
                                            value={this.state.citationDescription}
                                            onChange={this.changeCitationDescription}
                                            variant="outlined"
                                        />
                                    </div>
                                    <div className="form_group">
                                        <FormControl>
                                            <Select
                                                value={this.state.selectTemplate}
                                                onChange={this.onChangeTemplate}
                                                displayEmpty
                                                required
                                            >
                                                <MenuItem value="">Plantilla</MenuItem>
                                                {templatesReducer.status &&
                                                    templatesReducer.templates.map((item) => (
                                                        <MenuItem value={item._id} key={item._id}>
                                                            {item.templateName}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <button className="btn btn_big btn_teal mt-5">Generar</button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="center_container">
                        <div className="container_white_edit show_overflow_on_mobile">
                            <div className="title">Listado de solicitudes</div>
                            <ul className="solicityList">
                                {getSolicitiesReducer.status &&
                                    getSolicitiesReducer.solicities.map((solicity) => (
                                        <li key={solicity._id} className="solicityListItem">
                                            <div className="itemDate">
                                                {moment(solicity.create_at).format("L")}
                                            </div>
                                            <div className="center_elements">
                                                <div className="status">
                                                    {solicity.statusDetail}
                                                </div>

                                                {getRolInfoReducer.status &&
                                                    getRolInfoReducer.rolInfo.capacity ===
                                                        "director" && (
                                                        <select
                                                            className="select_style_solicity"
                                                            defaultValue={solicity.status}
                                                            onChange={(value) =>
                                                                this.eHandleChangeStatus(
                                                                    solicity._id,
                                                                    value.target.value
                                                                )
                                                            }
                                                        >
                                                            <option value="approved">
                                                                Aprobar
                                                            </option>
                                                            <option value="pending">
                                                                Pendiente
                                                            </option>
                                                            <option value="reject">
                                                                No aprobar
                                                            </option>
                                                        </select>
                                                    )}
                                                {solicity.status === "approved" &&
                                                    getRolInfoReducer.status &&
                                                    getRolInfoReducer.rolInfo.capacity ===
                                                        "admin" && (
                                                        <div
                                                            className="button_generate_citation"
                                                            onClick={() =>
                                                                solicity.citation &&
                                                                solicity.citation !== ""
                                                                    ? history.push("/citations")
                                                                    : this.showGenerateModal(
                                                                          solicity._id
                                                                      )
                                                            }
                                                        >
                                                            {solicity.citation &&
                                                                solicity.citation !== "" && (
                                                                    <span>Ver citaciones</span>
                                                                )}
                                                            {!solicity.citation && (
                                                                <span>Generar citación</span>
                                                            )}
                                                        </div>
                                                    )}
                                                <div
                                                    className="button_generate_citation"
                                                    onClick={() =>
                                                        this.eHandleShowDetails(solicity._id)
                                                    }
                                                >
                                                    Detalles
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        getSolicitiesReducer,
        updateSolicityStatusReducer,
        getRolInfoReducer,
        getSolicityReducer,
        templatesReducer,
        generateConstantReducer,
    } = state;
    return {
        getSolicitiesReducer,
        updateSolicityStatusReducer,
        getRolInfoReducer,
        getSolicityReducer,
        templatesReducer,
        generateConstantReducer,
    };
}

const actionCreator = {
    getSolicities: solicityActions.getSolicities,
    changeStatus: solicityActions.changeSolicityStatus,
    getDetails: solicityActions.getSolicityDetails,
    generateCitation: generatorActions.generateCitation,
    getTemplates: templateActions.getTemplates,
};

const solicitiesComponent = connect(mapStateToProps, actionCreator)(Solicities);
export { solicitiesComponent as Solicities };
