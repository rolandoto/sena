import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { mailActions } from "../../_actions";
import { HighlightOff } from "@material-ui/icons";
import { MenuItem, FormControl, Select, TextareaAutosize, TextField } from "@material-ui/core";

function Modal(props) {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        notification: props.emailData ? props.emailData.notification : "",
        mails: props.emailData ? props.emailData.mails : "",
        name: props.emailData ? props.emailData.name : "",
        message: props.emailData ? props.emailData.message : "",
        subject: props.emailData ? props.emailData.subject : "",
    });

    const closeModal = (_) => {
        dispatch(mailActions.closeAllModals());
    };

    const resetState = (_) => {
        setState({
            notification: "",
            mails: "",
            name: "",
            message: "",
            subject: "",
        });
    };

    const createMail = (_) => {
        const mailData = {
            notification: state.notification,
            name: state.name,
            mails: state.mails,
            subject: state.subject,
            message: state.message,
        };
        resetState();
        dispatch(mailActions.createMail(mailData));
    };

    const updateMail = (_) => {
        const mailData = {
            mailID: props.emailData._id,
            notification: state.notification,
            name: state.name,
            mails: state.mails,
            subject: state.subject,
            message: state.message,
        };
        dispatch(mailActions.updateMail(mailData));
    };

    const { getMailPermits } = props;

    return (
        <div className="center_container overlay_black">
            <div className="container_white_edit custom_container_details">
                <div className="close_modal" onClick={() => closeModal()}>
                    <HighlightOff />
                </div>

                <h3 className="title">{props.modalTitle}</h3>
                <p className="subtitle">{props.modalSubtitle}</p>

                {/* Notification */}
                <div className="form_group">
                    <FormControl>
                        <Select
                            value={state.notification}
                            onChange={(value) =>
                                setState({
                                    ...state,
                                    notification: value.target.value,
                                })
                            }
                            displayEmpty
                            required
                        >
                            <MenuItem value="">Notificación</MenuItem>
                            {getMailPermits.status &&
                                getMailPermits.types.posibleTypes.map((item) => (
                                    <MenuItem value={item.prefix} key={item.prefix}>
                                        {item.translation}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
                {/* Notification */}

                {/* Name */}
                <div className="form_group_material">
                    <TextField
                        label="Nombre"
                        multiline
                        fullWidth
                        required
                        value={state.name}
                        onChange={(value) =>
                            setState({
                                ...state,
                                name: value.target.value,
                            })
                        }
                        variant="outlined"
                    />
                </div>
                {/* Name */}

                {/* Subject */}
                <div className="form_group_material">
                    <TextField
                        label="Asunto"
                        multiline
                        fullWidth
                        required
                        value={state.subject}
                        onChange={(value) =>
                            setState({
                                ...state,
                                subject: value.target.value,
                            })
                        }
                        variant="outlined"
                    />
                </div>
                {/* Subject */}

                {/* Mails */}
                <div className="form_group">
                    <TextareaAutosize
                        className="text_area_custom"
                        rowsMin={3}
                        value={state.mails}
                        onChange={(value) =>
                            setState({
                                ...state,
                                mails: value.target.value,
                            })
                        }
                        placeholder="Emails"
                        required
                    />
                </div>
                {/* Mails */}

                {/* Message */}
                <div className="form_group">
                    <TextareaAutosize
                        className="text_area_custom"
                        rowsMin={3}
                        value={state.message}
                        onChange={(value) =>
                            setState({
                                ...state,
                                message: value.target.value,
                            })
                        }
                        placeholder="Mensaje"
                        required
                    />
                </div>
                {/* Message */}

                <button
                    className="btn btn_big btn_teal mt-5"
                    onClick={() => (props.emailData ? updateMail() : createMail())}
                >
                    {props.emailData ? "Guardar" : "Crear"}
                </button>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { getMailTypesReducer, getMailPermits, createMailReducer } = state;
    return { getMailTypesReducer, getMailPermits, createMailReducer };
}

const modalComponent = connect(mapStateToProps)(Modal);
export { modalComponent as Modal };
