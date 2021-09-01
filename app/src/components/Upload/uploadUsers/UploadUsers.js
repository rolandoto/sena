import React, { Component } from "react";
import { connect } from "react-redux";
import "./UploadUsers.css";
import { uploadActions } from "../../../_actions";
import { ArrowUpward } from "@material-ui/icons/";
import { FormationProgram } from "./formationProgram";

class UploadUsers extends Component {
    constructor() {
        super();

        this.state = {
            manual: false,
            childs: [],
            error: {
                show: false,
                message: "",
            },
        };
    }

    eHandleSubmitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(this.formData);
        this.formData.reset();
        this.props.uploadApprentices(formData);
    };

    evalueData = (arr = []) => {
        for (const [key] of Object.entries(arr)) {
            if (arr[key].length < 1) {
                return false;
            }
        }

        return true;
    };

    eHandleSubmitFormIndividual = (e) => {
        e.preventDefault();
        const data = {
            firstName: e.target.firstName.value,
            first_lastName: e.target.first_lastName.value,
            second_lastName: e.target.second_lastName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            document: e.target.document.value,
            document_number: e.target.document_number.value,
        };

        if (e.target.formationProgram) {
            if (e.target.formationProgram.length) {
                let inputArr = [];
                e.target.formationProgram.forEach((input) => {
                    inputArr.push(input.value);
                });
                data.formationProgram = inputArr;
            } else {
                data.formationProgram = e.target.formationProgram.value;
            }
        }
        if (this.evalueData(data)) {
            this.formDataSingle.reset();
            this.props.uploadSingleApprentice(data);
        } else {
            this.setState({
                error: {
                    show: true,
                    message: "Debes llenar todos los campos requeridos",
                },
            });
            setTimeout((_) => {
                this.setState({
                    error: {
                        show: false,
                        message: "",
                    },
                });
            }, 3000);
        }
    };

    submitForm = (e) => {
        e.preventDefault();
        this.eHandleSubmitForm(e);
    };

    render() {
        const { uploadReducer, uploadSingleAppreticeReducer } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container direction_column">
                        <div className="actionButtons">
                            <div
                                onClick={() => this.setState({ manual: false })}
                            >
                                Subir csv
                            </div>
                            <div
                                onClick={() => this.setState({ manual: true })}
                            >
                                Subir manual
                            </div>
                        </div>
                        <div className="container_white_edit min_height center_elements wrap">
                            {uploadReducer.loading && (
                                <div className="loading_file">
                                    <div className="text_loading">
                                        Estamos procesando el archivo.
                                    </div>
                                    <div className="loader_upload"></div>
                                </div>
                            )}

                            {uploadSingleAppreticeReducer.loading && (
                                <div className="loading_file">
                                    <div className="text_loading">
                                        Estamos subiendo el aprendiz.
                                    </div>
                                    <div className="loader_upload"></div>
                                </div>
                            )}

                            {uploadSingleAppreticeReducer.status === false && (
                                <div className="show_alert_error">
                                    {uploadSingleAppreticeReducer.message}
                                </div>
                            )}

                            {uploadSingleAppreticeReducer.status && (
                                <div className="alert_success_edit">
                                    {uploadSingleAppreticeReducer.message}
                                </div>
                            )}

                            {this.state.error.show && (
                                <div className="show_alert_error">
                                    {this.state.error.message}
                                </div>
                            )}

                            {!this.state.manual && (
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
                                        <p className="select_text">
                                            Arrastra tu archivo aquí
                                        </p>
                                    </div>
                                </form>
                            )}

                            {this.state.manual && (
                                <div className="manualStudentCreation">
                                    <div className="title">
                                        Añadir estudiante
                                    </div>
                                    <div className="subtitle">
                                        Aquí podrás añadir nuevos estudiantes
                                        uno por uno.
                                    </div>
                                    <form
                                        method="POST"
                                        encType="multipart/form-data"
                                        onSubmit={
                                            this.eHandleSubmitFormIndividual
                                        }
                                        className="mt-15"
                                        ref={(input) =>
                                            (this.formDataSingle = input)
                                        }
                                    >
                                        <div className="form_group">
                                            <input
                                                type="text"
                                                className="form_control"
                                                placeholder="Nombre"
                                                name="firstName"
                                                ref={(input) =>
                                                    (this.nameEdit = input)
                                                }
                                            />
                                        </div>
                                        <div className="form_group">
                                            <div className="rows">
                                                <div className="col_6">
                                                    <input
                                                        type="text"
                                                        className="form_control"
                                                        placeholder="Primer apellido"
                                                        name="first_lastName"
                                                        ref={(input) =>
                                                            (this.nameEdit = input)
                                                        }
                                                    />
                                                </div>
                                                <div className="col_6">
                                                    <input
                                                        type="text"
                                                        className="form_control"
                                                        placeholder="Segundo apellido"
                                                        name="second_lastName"
                                                        ref={(input) =>
                                                            (this.nameEdit = input)
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
                                                        placeholder="Email"
                                                        name="email"
                                                        ref={(input) =>
                                                            (this.nameEdit = input)
                                                        }
                                                    />
                                                </div>
                                                <div className="col_6">
                                                    <input
                                                        type="text"
                                                        className="form_control"
                                                        placeholder="Teléfono"
                                                        name="phone"
                                                        ref={(input) =>
                                                            (this.nameEdit = input)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form_group">
                                            <div className="rows">
                                                <div className="col_6">
                                                    <select
                                                        type="text"
                                                        className="form_control"
                                                        name="document"
                                                        ref={(input) =>
                                                            (this.nameEdit = input)
                                                        }
                                                    >
                                                        <option value="">
                                                            Seleccionar tipo de
                                                            documento
                                                        </option>
                                                        <option value="CC">
                                                            Cédula
                                                        </option>
                                                        <option value="TI">
                                                            Tarjeta de identidad
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="col_6">
                                                    <input
                                                        type="text"
                                                        className="form_control"
                                                        placeholder="Número de documento"
                                                        name="document_number"
                                                        ref={(input) =>
                                                            (this.nameEdit = input)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rows custom_title_add_program">
                                            <div className="title">
                                                Programas de formación
                                            </div>
                                            <div className="rows">
                                                <div
                                                    className="btn_add_new_student"
                                                    onClick={() =>
                                                        this.setState({
                                                            childs:
                                                                this.state
                                                                    .childs
                                                                    .length > 1
                                                                    ? this.state.childs.pop()
                                                                    : [],
                                                        })
                                                    }
                                                >
                                                    -
                                                </div>
                                                <div
                                                    className="btn_add_new_student"
                                                    onClick={() =>
                                                        this.setState({
                                                            childs: [
                                                                ...this.state
                                                                    .childs,
                                                                <FormationProgram
                                                                    key={
                                                                        this
                                                                            .state
                                                                            .childs
                                                                            .length
                                                                    }
                                                                />,
                                                            ],
                                                        })
                                                    }
                                                >
                                                    +
                                                </div>
                                            </div>
                                        </div>
                                        <div>{this.state.childs}</div>

                                        <div className="links_section_form">
                                            <button className="btn btn_big btn_orange">
                                                Crear aprendiz
                                            </button>
                                        </div>
                                    </form>
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
    const { authReducer, uploadReducer, uploadSingleAppreticeReducer } = state;
    return { authReducer, uploadReducer, uploadSingleAppreticeReducer };
}

const actionCreator = {
    uploadApprentices: uploadActions.uploadApprentices,
    uploadSingleApprentice: uploadActions.uploadSingleAppretice,
};

const uploadUsersComponent = connect(
    mapStateToProps,
    actionCreator
)(UploadUsers);
export { uploadUsersComponent as UploadUsers };
