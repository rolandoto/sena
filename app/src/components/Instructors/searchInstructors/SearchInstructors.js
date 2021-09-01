import React, { Component } from "react";
import { connect } from "react-redux";
import { searchActions } from "../../../_actions";
import "./searchInstructors.css";
import { HighlightOff } from "@material-ui/icons";

class SearchInstructors extends Component {
    constructor(props) {
        super();

        this.state = {
            startSearch: {
                status: false,
                value: "",
            },
            showAppreticesSearch: true,
            showModalInfoAppretice: false,
        };
    }

    eHandleTypeSearch(search) {
        let credentials = {
            searchValue: search,
        };
        const validateIfIsDocument = search.match(/^([0-9])*$/);
        if (validateIfIsDocument) {
            credentials.type = "document";
            this.setState({
                startSearch: {
                    status: true,
                    value: "Documento",
                },
            });
        } else {
            credentials.type = "user";
            this.setState({
                startSearch: {
                    status: true,
                    value: "Nombre",
                },
            });
        }

        return credentials;
    }

    eHandleSearch = (e) => {
        e.preventDefault();
        const getSearch = this.eHandleTypeSearch(this.searchInstructor.value);
        // Reutilice appretice search action
        this.props.searchAppretice(getSearch , true);
        this.setState({
            showModalInfoAppretice: true,
        });
    };

    showInstructorSelect = (instructorID) => {
        this.props.searchOneAppretice(instructorID , true);
        this.setState({
            showAppreticesSearch: false,
        });
    };

    eHandleHideModal = (_) => {
        this.props.hideModal();
        this.setState({
            showAppreticesSearch: true,
        });
    };

    render() {
        const { searchInstructors, instructorSearchedReducer } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit no_over_hidden min_height_search">
                            <div style={{width: "90%"}}>
                                <div className="title">Buscar instructores</div>
                                <div className="subtitle">
                                    Busca la informacion de los instructores de una manera rapida y
                                    sencilla.
                                </div>
                            </div>
                            <form autoComplete="off" className="form_full_width">
                                <div className="form_group_search">
                                    <input
                                        type="text"
                                        name="searchAppretice"
                                        ref={(input) => (this.searchInstructor = input)}
                                        onChange={this.eHandleSearch}
                                        placeholder="Usuario o Documento"
                                        className="form_control"
                                    />
                                    {this.state.startSearch.status && (
                                        <div className="search_criter_input">
                                            {this.state.startSearch.value}
                                        </div>
                                    )}
                                </div>
                            </form>

                            {searchInstructors.status && this.state.showAppreticesSearch && (
                                <div className="search_container">
                                    <ul className="search_list">
                                        {searchInstructors.instructors.map((instructor) => (
                                            <li
                                                className="search_list_item"
                                                key={instructor._id}
                                                onClick={() =>
                                                    this.showInstructorSelect(instructor._id)
                                                }
                                            >
                                                <div className="two_colums_search">
                                                    <div className="search_info_user">
                                                        <div className="title_search">
                                                            {instructor.nombre +
                                                                " " +
                                                                instructor.primer_apellido}
                                                        </div>
                                                        <div className="subtitle">
                                                            {instructor.numero_documento}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {instructorSearchedReducer.status && (
                                <div className="modal_overlay_role height_auto">
                                    <div className="close_modal" onClick={this.eHandleHideModal}>
                                        <HighlightOff />
                                    </div>

                                    <div className="form_desing_edit">
                                        <div className="title">Datos del instructor</div>

                                        <div className="form_group_info">
                                            <div className="subtitle">Nombre</div>
                                            <div>
                                                {instructorSearchedReducer.instructor.nombre +
                                                    " " +
                                                    instructorSearchedReducer.instructor
                                                        .primer_apellido +
                                                    " " +
                                                    instructorSearchedReducer.instructor
                                                        .segundo_apellido}
                                            </div>
                                        </div>

                                        <div className="form_group_info">
                                            <div className="subtitle">Documento</div>
                                            <div>
                                                {instructorSearchedReducer.instructor.tipo_documento +
                                                    " - " +
                                                    instructorSearchedReducer.instructor
                                                        .numero_documento}
                                            </div>
                                        </div>

                                        <div className="form_group_info">
                                            <div className="subtitle">SEDE</div>
                                            <div>
                                                {instructorSearchedReducer.instructor.sede}
                                            </div>
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
    const { authReducer, searchInstructors, instructorSearchedReducer } = state;
    return { authReducer, searchInstructors, instructorSearchedReducer };
}

const actionCreator = {
    searchAppretice: searchActions.searchAppretices,
    searchOneAppretice: searchActions.searchAppretice,
    hideModal: searchActions.hideModalSearched,
};

const searchInstructorsComponent = connect(mapStateToProps, actionCreator)(SearchInstructors);
export { searchInstructorsComponent as SearchInstructors };
