import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import { CardComponent } from "./cardComponent";
import { userActions } from "../_actions";

class Home extends Component {
    showComponent(rols = []) {
        const userRol = this.props.getRolInfoReducer.rolInfo.capacity;
        const searhRol = rols.indexOf(userRol);
        if (searhRol === -1) {
            return false;
        }

        return true;
    }

    render() {
        const { getRolInfoReducer } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="custom_background_apps">
                        <ul className="apps_items_list">
                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Usuarios"
                                    subtitle="Una forma sencilla de agregar nuevos usuarios."
                                    redirect="addUser"
                                    image="icon_edit_user.png"
                                    alt="Add new user"
                                />
                            )}
                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Editar usuarios"
                                    subtitle="Esta herramienta te permite buscar usuarios y editar sus atributos."
                                    redirect="editUsers"
                                    image="edit_users.png"
                                    alt="Edit user"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Editar roles"
                                    subtitle="Con esta herramienta podrás editar los roles de los usuarios y agregar nuevos."
                                    redirect="roles"
                                    image="icon_user_rol.png"
                                    alt="Manage roles"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Subir aprendizes"
                                    subtitle="Con esta herramienta podrás subir masivamente todos los aprendices desde un archivo XML."
                                    redirect="uploadApprentices"
                                    image="upload_students.png"
                                    alt="Upload appretices"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Subir instructores"
                                    subtitle="Con esta herramienta podrás subir masivamente todos los instructores desde un archivo XML."
                                    redirect="uploadInstructors"
                                    image="upload_teacher.png"
                                    alt="Upload teachers"
                                />
                            )}

                            {getRolInfoReducer.status &&
                                this.showComponent(["admin", "instructor"]) && (
                                    <CardComponent
                                        title="Buscar aprendiz"
                                        subtitle="Una forma fácil y sencilla de buscar la información de cualquier aprendiz."
                                        redirect="searchAppretices"
                                        image="search_user.png"
                                        alt="Search appretices"
                                    />
                                )}

                            {getRolInfoReducer.status &&
                                this.showComponent(["admin", "director"]) && (
                                    <CardComponent
                                        title="Buscar instructor"
                                        subtitle="Una forma fácil y sencilla de buscar la información de cualquier instructor."
                                        redirect="searchInstructors"
                                        image="search_intructor.png"
                                        alt="Search instructors"
                                    />
                                )}

                            {getRolInfoReducer.status &&
                                this.showComponent(["admin", "director", "instructor"]) && (
                                    <CardComponent
                                        title="Solicitudes"
                                        subtitle="Encuentra todas las solicitudes generadas hasta la fecha, si eres instructor solo te saldrán tus solicitudes."
                                        redirect="solicities"
                                        image="icon_add_citation.png"
                                        alt="Solicities"
                                    />
                                )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Citaciones"
                                    subtitle="Con esta herramienta podrás administrar todas las citaciones, enviarlas y cambiar su estado."
                                    redirect="citations"
                                    image="icon_add_file.png"
                                    alt="Citations"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["instructor" , "director"]) && (
                                <CardComponent
                                    title="Crear solicitud"
                                    subtitle="Con esta herramienta podrás crear solicitudes en cuestion de segundos de una forma fácil y sencilla."
                                    redirect="createSolicitiy"
                                    image="icon_add_citation.png"
                                    alt="Add citations"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Emails"
                                    subtitle="Gestiona los envios de emails para cada uno de los estados del sistema."
                                    redirect="mails"
                                    image="email_icon.png"
                                    alt="Emails"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Motivos o prohibiciones"
                                    subtitle="Gestiona todos los motivos o prohibiciones que van a estar en las solicitudes de los instructores."
                                    redirect="motivesAndProhibitions"
                                    image="motivesAndProhibitions.png"
                                    alt="Motives or prohibitions"
                                />
                            )}

                            {getRolInfoReducer.status && this.showComponent(["admin"]) && (
                                <CardComponent
                                    title="Plantillas"
                                    subtitle="Crear plantillas de manera dinámica para maquetar tus archivos PDF."
                                    redirect="templates"
                                    image="template_icon.png"
                                    alt="Templates"
                                />
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authReducer, getRolInfoReducer } = state;
    return { authReducer, getRolInfoReducer };
}

const actionCreator = {
    getRoleInfo: userActions.getRoleInfo,
};

const homeComponent = connect(mapStateToProps, actionCreator)(Home);
export { homeComponent as Home };
