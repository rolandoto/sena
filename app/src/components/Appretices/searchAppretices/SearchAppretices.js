import React, { Component } from "react";
import { connect } from "react-redux";
import { searchActions } from "../../../_actions";
import "./SearchAppretices.css";
import { HighlightOff } from "@material-ui/icons";

class SearchAppretices extends Component {
    constructor(props) {
        super(props);

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
        const getSearch = this.eHandleTypeSearch(this.searchAppretice.value);
        this.props.searchAppretice(getSearch);
        this.setState({
            showModalInfoAppretice: true,
        });
    };

    showAppreticeSelect = (appreticeID) => {
        this.props.searchOneAppretice(appreticeID);
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
        const { searchReducer, apreticeSearchedReducer } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit no_over_hidden min_height_search">
                            <div className="title">Buscar aprendices</div>
                            <div className="subtitle">
                                Para buscar un aprendiz puedes filtrar por nombre o documento de
                                identidad, para búsquedas mas rápidas utiliza el documento de
                                identidad.
                            </div>
                            <form autoComplete="off" className="form_full_width">
                                <div className="form_group_search">
                                    <input
                                        type="text"
                                        name="searchAppretice"
                                        ref={(input) => (this.searchAppretice = input)}
                                        onChange={this.eHandleSearch}
                                        placeholder="Usuario, Documento o correo electrónico"
                                        className="form_control"
                                    />
                                    {this.state.startSearch.status && (
                                        <div className="search_criter_input">
                                            {this.state.startSearch.value}
                                        </div>
                                    )}
                                </div>
                            </form>

                            {searchReducer.status && this.state.showAppreticesSearch && (
                                <div className="search_container">
                                    <ul className="search_list">
                                        {searchReducer.appretices.map((appretice) => (
                                            <li
                                                className="search_list_item"
                                                key={appretice._id}
                                                onClick={() =>
                                                    this.showAppreticeSelect(appretice._id)
                                                }
                                            >
                                                <div className="two_colums_search">
                                                    <div className="search_info_user">
                                                        <div className="title_search">
                                                            {appretice.nombre +
                                                                " " +
                                                                appretice.primer_apellido}
                                                        </div>
                                                        <div className="subtitle">
                                                            {appretice.numero_documento}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {apreticeSearchedReducer.status && (
                                <div className="modal_overlay_role height_auto">
                                    <div className="close_modal" onClick={this.eHandleHideModal}>
                                        <HighlightOff />
                                    </div>

                                    <div className="form_desing_edit">
                                        <div className="title">Datos del aprendiz</div>

                                        <div className="form_group_info">
                                            <div className="subtitle">Nombre</div>
                                            <div>
                                                {apreticeSearchedReducer.appretice.nombre +
                                                    " " +
                                                    apreticeSearchedReducer.appretice
                                                        .primer_apellido +
                                                    " " +
                                                    apreticeSearchedReducer.appretice
                                                        .segundo_apellido}
                                            </div>
                                        </div>

                                        <div className="form_group_info">
                                            <div className="subtitle">Documento</div>
                                            <div>
                                                {apreticeSearchedReducer.appretice.tipo_documento +
                                                    " - " +
                                                    apreticeSearchedReducer.appretice
                                                        .numero_documento}
                                            </div>
                                        </div>

                                        <div className="form_group_info">
                                            <div className="subtitle">Estado del aprendiz</div>
                                            <div>
                                                {apreticeSearchedReducer.appretice.estado_aprendiz}
                                            </div>
                                        </div>

                                        <div className="title_search">Programas de formación</div>

                                        {apreticeSearchedReducer.appretice.programas_formacion.map(
                                            (program) => (
                                                <div key={program.codigo_programa}>
                                                    <div className="form_group_info">
                                                        <div>
                                                            Programa:{" "}
                                                            <span className="subtitle">
                                                                {program.programa}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            Nivel de formación:{" "}
                                                            <span className="subtitle">
                                                                {program.nivel_de_formacion}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            Sede:{" "}
                                                            <span className="subtitle">
                                                                {program.sede}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            ficha:{" "}
                                                            <span className="subtitle">
                                                                {program.ficha}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
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
    const { authReducer, searchReducer, apreticeSearchedReducer } = state;
    return { authReducer, searchReducer, apreticeSearchedReducer };
}

const actionCreator = {
    searchAppretice: searchActions.searchAppretices,
    searchOneAppretice: searchActions.searchAppretice,
    hideModal: searchActions.hideModalSearched,
};

const searchAppreticesComponent = connect(mapStateToProps, actionCreator)(SearchAppretices);
export { searchAppreticesComponent as SearchAppretices };
