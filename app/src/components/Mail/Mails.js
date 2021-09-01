import React, { Component } from "react";
import { connect } from "react-redux";
import { mailActions } from "../../_actions";
import { EditOutlined, DeleteOutline } from "@material-ui/icons";
import { Modal } from "./Modal";

const buttonClass = "button_generate_citation";

class Mails extends Component {
    componentDidMount() {
        this.props.getMails();
        this.props.getPermits();
    }

    getEmail = (key) => {
        this.props.getMail(key);
    };

    createMail = (_) => {
        this.props.open_modal("create_mail");
    };

    deleteMail = (key) => {
        const verify = window.confirm("Estas seguro de eliminar el mail?");
        if (!verify) {
            return false;
        }
        this.props.deleteMail({ mailID: key });
    };

    render() {
        const {
            getMailsReducer,
            mailModalReducer,
            createMailReducer,
            getMailReducer,
            updateMailReducer,
        } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    {createMailReducer.status && (
                        <div className="push_template push_template_success">
                            El email se ha creado correctamente
                        </div>
                    )}
                    {createMailReducer.status === false && (
                        <div className="push_template push_template_error">
                            Ha ocurrido un error
                        </div>
                    )}

                    {updateMailReducer.status && (
                        <div className="push_template push_template_success">
                            {updateMailReducer.message}
                        </div>
                    )}
                    {updateMailReducer.status === false && (
                        <div className="push_template push_template_error">
                            {updateMailReducer.message}
                        </div>
                    )}

                    {mailModalReducer.create_mail && (
                        <Modal
                            type="createMailType"
                            modalTitle="Crear email"
                            modalSubtitle="Una forma sencilla de crear los mails para tu aplicación"
                        />
                    )}

                    {getMailReducer.status && (
                        <Modal
                            type="createMailType"
                            modalTitle="Editar email"
                            modalSubtitle="Una forma sencilla de editar los emails de tu aplicación"
                            emailData={getMailReducer.mail}
                        />
                    )}

                    <div className="center_container">
                        <div className="container_white_edit w900">
                            <div className="center_elements space_between">
                                <div>
                                    <h3 className="title">Mails</h3>
                                    <p className="subtitle">
                                        Administra los mails que serán enviados desde Siscomited
                                    </p>
                                </div>

                                <div>
                                    <button
                                        className={buttonClass}
                                        onClick={() => this.createMail()}
                                    >
                                        Crear mail
                                    </button>
                                </div>
                            </div>

                            <ul className="templates_list">
                                {getMailsReducer.status &&
                                    getMailsReducer.mails.map((mail) => (
                                        <li className="templates_item" key={mail._id}>
                                            <div>{mail.name}</div>
                                            <div className="template_action_item">
                                                <div onClick={() => this.getEmail(mail._id)}>
                                                    <EditOutlined />
                                                </div>
                                                <div onClick={() => this.deleteMail(mail._id)}>
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
        getMailsReducer,
        mailModalReducer,
        createMailReducer,
        getMailReducer,
        updateMailReducer,
    } = state;
    return {
        getMailsReducer,
        mailModalReducer,
        createMailReducer,
        getMailReducer,
        updateMailReducer,
    };
}

const actionCreator = {
    getMails: mailActions.getMails,
    createMail: mailActions.createMail,
    getMail: mailActions.getMail,
    deleteMail: mailActions.deleteMail,
    open_modal: mailActions.modal,
    getPermits: mailActions.getMailPermits,
};

const mailsComponent = connect(mapStateToProps, actionCreator)(Mails);
export { mailsComponent as Mails };
