import React, { Component } from "react";
import { connect } from "react-redux";
import { CreateTemplates } from "../../../components";
import { templateActions } from "../../../_actions";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import "./templates.css";

class Templates extends Component {
    eHandleShowModal = (_) => {
        this.props.showModal();
    };

    componentDidMount() {
        this.props.getTemplates();
    }

    deleteTemplate = (key) => {
        const verify = window.confirm("Estas seguro de eliminar la plantilla?");
        if (!verify) {
            return false;
        }
        this.props.deleteTemplate({
            templateID: key,
        });
    };

    getTemplate = (key) => {
        this.props.getTemplate(key);
    };

    render() {
        const {
            templateModalReducer,
            templatesReducer,
            createTemplateReducer,
            getTemplateReducer,
            updateTemplateReducer,
        } = this.props;
        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    {templateModalReducer.show && <CreateTemplates />}
                    {getTemplateReducer.status && (
                        <CreateTemplates template={getTemplateReducer.template} />
                    )}
                    {createTemplateReducer.status && (
                        <div className="push_template push_template_success">
                            La plantilla se ha creado correctamente
                        </div>
                    )}
                    {createTemplateReducer.status === false && (
                        <div className="push_template push_template_error">
                            Ha ocurrido un error al crear la plantilla
                        </div>
                    )}
                    {updateTemplateReducer.status && (
                        <div className="push_template push_template_success">
                            {updateTemplateReducer.message}
                        </div>
                    )}
                    {updateTemplateReducer.status === false && (
                        <div className="push_template push_template_error">
                            {updateTemplateReducer.message}
                        </div>
                    )}
                    <div className="center_container">
                        <div className="container_white_edit min_height min_height_mobile show_overflow">
                            <div className="center_elements space_between">
                                <div>
                                    <h3 className="title">Plantillas</h3>
                                    <p className="subtitle">
                                        Aqui puedes gestionar todas tus plantillas
                                    </p>
                                </div>

                                <button
                                    className="btn btn_teal"
                                    onClick={() => this.eHandleShowModal()}
                                >
                                    Crear nueva
                                </button>
                            </div>

                            <ul className="templates_list">
                                {templatesReducer.status &&
                                    templatesReducer.templates.map((template) => (
                                        <li className="templates_item" key={template._id}>
                                            <div>{template.templateName}</div>
                                            <div className="template_action_item">
                                                <div onClick={() => this.getTemplate(template._id)}>
                                                    <EditOutlined />
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        this.deleteTemplate(template._id)
                                                    }
                                                >
                                                    <DeleteOutline />
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
        templateModalReducer,
        templatesReducer,
        createTemplateReducer,
        getTemplateReducer,
        updateTemplateReducer,
    } = state;
    return {
        templateModalReducer,
        templatesReducer,
        createTemplateReducer,
        getTemplateReducer,
        updateTemplateReducer,
    };
}

const actionCreator = {
    showModal: templateActions.showModal,
    getTemplates: templateActions.getTemplates,
    deleteTemplate: templateActions.deleteTemplate,
    getTemplate: templateActions.getTemplate,
};

const templatesComponent = connect(mapStateToProps, actionCreator)(Templates);
export { templatesComponent as Templates };
