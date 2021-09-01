import React, { Component } from "react";
import { connect } from "react-redux";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import { templateActions } from "../../../_actions";
import { HighlightOff } from "@material-ui/icons";
import { defaultCitation, defaultMinute } from "../../../config";
import { TextField } from "@material-ui/core";

class CreateTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: props.template ? props.template.template : "",
            templateName: props.template ? props.template.templateName : "",
            default: "citation",
        };
    }
    componentDidMount() {
        this.props.getFields(this.selectType.value);
        this.setState({
            code: this.state.default === "citation" ? defaultCitation : defaultMinute,
        });
    }

    eHandleFields = (_) => {
        this.props.getFields(this.selectType.value);
    };

    closeNewRoleModal = (_) => {
        this.props.hideModal();
    };

    eHandleCreateTemplate = (e) => {
        e.preventDefault();
        const templateData = {
            templateName: this.state.templateName,
            template: this.instance.getValue(),
        };

        this.props.create(templateData);
    };

    eHandleEditTemplate = e => {
        e.preventDefault();
        const templateData = {
            templateID: e.target.templateID.value,
            templateName: this.state.templateName,
            template: this.instance.getValue(),
        };

        this.props.updateTemplate(templateData)
    }

    render() {
        const { getCustomFieldsReducer } = this.props;

        return (
            <div className="center_container overlay_black">
                <div className="container_white_edit custom_container_details_template w900">
                    <div className="close_modal" onClick={() => this.closeNewRoleModal()}>
                        <HighlightOff />
                    </div>
                    <form method="POST" onSubmit={!this.props.template ? this.eHandleCreateTemplate : this.eHandleEditTemplate}>
                        <div className="rows">
                            <div className="col_8">
                                <h5 className="title">Plantilla por defecto</h5>
                                <span className="subtitle">
                                    Escoge una plantilla por defecto para crear tu nueva plantilla.
                                </span>
                                {!this.props.template && (
                                    <select
                                        className="select_style_solicity custom_template"
                                        value={this.state.default}
                                        onChange={(value) =>
                                            this.setState({
                                                default: value.target.value,
                                            })
                                        }
                                    >
                                        <option value="citation">Citación</option>
                                        <option value="minute">Acta</option>
                                    </select>
                                )}

                                {this.props.template && (
                                    <input type="hidden" name="templateID" defaultValue={this.props.template._id} required={true} />
                                )}

                                <div className="form_group_material">
                                    <TextField
                                        label="Nombre de la plantilla"
                                        multiline
                                        fullWidth
                                        required
                                        value={this.state.templateName}
                                        onChange={(value) =>
                                            this.setState({
                                                templateName: value.target.value,
                                            })
                                        }
                                        variant="outlined"
                                    />
                                </div>

                                <CodeMirror
                                    value={
                                        this.state.default === "citation"
                                            ? defaultCitation
                                            : defaultMinute
                                    }
                                    editorDidMount={(editor) => {
                                        this.instance = editor;
                                    }}
                                    options={{
                                        lineNumbers: true,
                                        mode: "htmlmixed",
                                    }}
                                />
                            </div>
                            <div className="col_4">
                                <h4 className="title">Campos personalizados</h4>
                                <pre className="subtitle mb-2 white_spaces_break">
                                    Para poner un campo personalizado debes encerrarlo dentro de{" "}
                                    {`%{nombre_del_campo}`}
                                </pre>
                                <select
                                    className="select_style_solicity custom_template"
                                    ref={(input) => (this.selectType = input)}
                                    onChange={this.eHandleFields}
                                >
                                    <option value="citation">Citación</option>
                                    <option value="minute">Acta</option>
                                </select>
                                <ul className="custom_fields_list">
                                    {getCustomFieldsReducer.status &&
                                        Object.values(getCustomFieldsReducer.fields).map(
                                            (field, key) => (
                                                <li className="custom_fields_item" key={key}>
                                                    {field}
                                                </li>
                                            )
                                        )}
                                </ul>
                                <button className="btn btn_big btn_teal">
                                    {this.props.template ? "Editar plantilla" : "Crear plantilla"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { getCustomFieldsReducer } = state;
    return {
        getCustomFieldsReducer,
    };
}

const actionCreator = {
    getFields: templateActions.getCustomFields,
    hideModal: templateActions.hideModal,
    create: templateActions.createTemplate,
    updateTemplate: templateActions.updateTemplate,
};

const createTemplatesComponent = connect(mapStateToProps, actionCreator)(CreateTemplates);
export { createTemplatesComponent as CreateTemplates };
