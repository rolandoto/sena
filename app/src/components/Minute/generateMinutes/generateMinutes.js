import React, { Component } from "react";
import { connect } from "react-redux";
import { searchActions, generatorActions, minuteActions, templateActions } from "../../../_actions";
import Speech from "./speechRecognition";
import Timer from "./timer";
import { Attended } from "./attended";
import "./generateMinutes.css";
import JoditEditor from "jodit-react";
import moment from "moment";
import { MenuItem, FormControl, Select, TextField } from "@material-ui/core/";

class GenerateMinutes extends Component {
    constructor(props) {
        super();

        this.state = {
            content: "",
            objectives: "",
            topics: "",
            selectTemplate: "",
            showTemplate: false,
            show: "",
        };
    }

    componentDidMount() {
        this.props.getTemplates();
    }

    validateParams(params = []) {
        for (let i in params) {
            if (params[i] === "") {
                return false;
            }
        }

        return true;
    }

    eHandleSubmit = (e) => {
        e.preventDefault();
        const citationInfo = {
            content: this.minute["meeting_content"].value,
            start_date: moment(this.minute["start_date"].value).format("LL"),
            end_date: moment(this.minute["end_date"].value).format("LL"),
            place: this.minute["place"].value,
            direction: this.minute["direction"].value,
            city_and_date: this.minute["city_and_date"].value,
            comite_name: this.minute["comite_name"].value,
            objectives: this.state.objectives,
            topics: this.state.topics,
            template: this.state.selectTemplate,
            solicityID: this.props.match.params.id
        };

        if (
            this.validateParams([
                citationInfo.content,
                citationInfo.objectives,
                citationInfo.topics,
                citationInfo.template,
                citationInfo.end_date,
                citationInfo.start_date,
                citationInfo.comite_name,
                citationInfo.city_and_date,
                citationInfo.direction,
                citationInfo.place,
            ])
        ) {
            this.props.generateMinute(citationInfo);
        } else {
            this.setState({
                showTemplate: true,
            });
        }
    };

    takeAttended = (_) => {
        this.props.getAttendees();
    };

    closeGenerate = (_) => {
        this.props.closeModal();
    };

    render() {
        const { generateConstantReducer, getAttendeesReducer, templatesReducer } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    {this.state.showTemplate && (
                        <div className="center_container overlay_black">
                            <div className="container_white_edit custom_container_details w500">
                                <h2 className="color_teal text_center mb-2">
                                    Todos los campos son requeridos
                                </h2>
                                <div
                                    className="btn btn_teal btn_big text_center"
                                    onClick={() =>
                                        this.setState({
                                            showTemplate: false,
                                        })
                                    }
                                >
                                    Aceptar
                                </div>
                            </div>
                        </div>
                    )}

                    {getAttendeesReducer.status && <Attended />}

                    <div className="center_container">
                        {generateConstantReducer.status && (
                            <div className="show_alert_popUp alert_show">
                                <img
                                    src="/assets/img/check_alert.png"
                                    className="image_responsive_popup"
                                    alt="alert popup confirm"
                                />
                                <div className="subtitle">
                                    Revisa el PDF antes de cerrar esta pestaña
                                </div>

                                <div className="btn_section_flex">
                                    <a
                                        className="btn mt-5 w50 btn_teal"
                                        href={generateConstantReducer.pdfLink}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        Ver PDF
                                    </a>

                                    <button
                                        className="btn mt-5 w50 btn_teal"
                                        onClick={() => this.closeGenerate()}
                                    >
                                        Aceptar
                                    </button>

                                    {/* <button
                                        className="btn mt-5 w50 btn_orange"
                                        onClick={() => this.reintentForm()}
                                    >
                                        Reintentar
                                    </button> */}
                                </div>
                            </div>
                        )}

                        <div className="container_white_edit no_over_hidden min_width_editor">
                            {generateConstantReducer.loading && (
                                <div className="loading_file">
                                    <div className="text_loading">Estamos procesando los datos</div>
                                    <div className="loader_upload"></div>
                                </div>
                            )}

                            <div className="title">Generar Acta</div>

                            <div className="center_elements justify_right">
                                <div className="form_group">
                                    <FormControl>
                                        <Select
                                            value={this.state.selectTemplate}
                                            onChange={(value) =>
                                                this.setState({
                                                    selectTemplate: value.target.value,
                                                })
                                            }
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
                                {/* <button
                                    onClick={() => this.takeAttended(this.props.match.params.id)}
                                    className="button_generate_citation w200"
                                >
                                    Tomar asistencia
                                </button> */}
                            </div>

                            <form
                                ref={(input) => (this.minute = input)}
                                onSubmit={this.eHandleSubmit}
                            >
                                <Timer />

                                {this.state.show !== "" && (
                                    <div
                                        className="hide_carousel"
                                        onClick={() =>
                                            this.setState({
                                                show: "",
                                            })
                                        }
                                    >
                                        <h5 className="title_search">Ocultar</h5>
                                    </div>
                                )}

                                <div
                                    className="navigation_tab"
                                    onClick={() =>
                                        this.setState({
                                            show: "topics",
                                        })
                                    }
                                >
                                    <h5 className="title_search">Tema(s)</h5>
                                </div>

                                {this.state.show === "topics" && (
                                    <JoditEditor
                                        value={this.state.topics}
                                        onChange={(value) => {
                                            this.setState({
                                                topics: value,
                                            });
                                        }}
                                    />
                                )}

                                <div
                                    className="navigation_tab"
                                    onClick={() =>
                                        this.setState({
                                            show: "objects",
                                        })
                                    }
                                >
                                    <h5 className="title_search">Objetivo(s)</h5>
                                </div>

                                {this.state.show === "objects" && (
                                    <JoditEditor
                                        value={this.state.objectives}
                                        onChange={(value) => {
                                            this.setState({
                                                objectives: value,
                                            });
                                        }}
                                    />
                                )}

                                <div
                                    className="navigation_tab"
                                    onClick={() =>
                                        this.setState({
                                            show: "information",
                                        })
                                    }
                                >
                                    <h5 className="title_search">Información extra</h5>
                                </div>

                                <div className={this.state.show === "information" ? "" : "hidden"}>
                                    <div className="rows">
                                        <div className="col_6">
                                            <div className="form_group_material">
                                                <TextField
                                                    label="Lugar"
                                                    name="place"
                                                    multiline
                                                    fullWidth
                                                    value={this.state.solicityLink}
                                                    onChange={this.changeLink}
                                                    variant="outlined"
                                                />
                                            </div>
                                        </div>
                                        <div className="col_6">
                                            <div className="form_group_material">
                                                <TextField
                                                    label="Dirección"
                                                    name="direction"
                                                    multiline
                                                    fullWidth
                                                    value={this.state.solicityLink}
                                                    onChange={this.changeLink}
                                                    variant="outlined"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rows">
                                        <div className="col_6">
                                            <div className="form_group_material">
                                                <TextField
                                                    label="Ciudad y fecha"
                                                    name="city_and_date"
                                                    multiline
                                                    fullWidth
                                                    value={this.state.solicityLink}
                                                    onChange={this.changeLink}
                                                    variant="outlined"
                                                />
                                            </div>
                                        </div>
                                        <div className="col_6">
                                            <div className="form_group_material">
                                                <TextField
                                                    label="Nombre del comité o reunión"
                                                    name="comite_name"
                                                    multiline
                                                    fullWidth
                                                    value={this.state.solicityLink}
                                                    onChange={this.changeLink}
                                                    variant="outlined"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Speech />

                                <button className="btn btn_big btn_teal mt-5">Generar acta</button>
                            </form>
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
        searchReducer,
        generateConstantReducer,
        getAttendeesReducer,
        templatesReducer,
    } = state;
    return {
        authReducer,
        searchReducer,
        generateConstantReducer,
        getAttendeesReducer,
        templatesReducer,
    };
}

const actionCreator = {
    searchAppretice: searchActions.searchAppretices,
    generateMinute: generatorActions.generateMinute,
    resetMinute: generatorActions.resetCitationMinute,
    getAttendees: minuteActions.getAttendees,
    getTemplates: templateActions.getTemplates,
    closeModal: minuteActions.closeModal,
};

const generateMinutesComponent = connect(mapStateToProps, actionCreator)(GenerateMinutes);
export { generateMinutesComponent as GenerateMinutes };
