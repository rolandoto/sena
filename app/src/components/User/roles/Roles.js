import React, { Component } from "react";
import { connect } from "react-redux";
import { Add, HighlightOff, EditOutlined, DeleteOutlined } from "@material-ui/icons";
import { rolActions } from "../../../_actions";
import "./Roles.css";

class Roles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalRoleNew: false,
            selectedRol: "",
            allRoles: [],
        };
    }

    async componentDidMount() {
        this.props.getRoles();
        this.props.getCapacities();
    }

    addNewRoleModal = (_) => {
        this.setState({
            showModalRoleNew: true,
        });
    };

    closeNewRoleModal = (_) => {
        this.setState({
            showModalRoleNew: false,
        });
    };

    addSelectedRol = (rol) => {
        this.setState({
            selectedRol: rol,
        });
    };

    addNewRolTrigger = (e) => {
        e.preventDefault();
        const newRol = {
            name: this.rolName.value,
            capacity: this.props.selectedRolReducer.selected,
        };
        this.props.addRol(newRol);
        e.target.reset();
        this.setState({
            selectedRol: "",
        });
    };

    getRole = (key) => {
        this.props.getRol(key, true);
    };

    setNewRole = (role) => {
        this.props.setRole(role);
    };

    editRole = (e) => {
        e.preventDefault();
        const rol = {
            rolID: e.target.role_id.value,
            role_name: e.target.rolName.value,
            capacity: this.props.selectedRolReducer.selected,
        };

        this.props.updateRol({ rolID: rol });
    };

    deleteRole = (key) => {
        const verify = window.confirm("Estas seguro de eliminar el rol?");
        if (!verify) {
            return false;
        }

        this.props.deleteRol({ rolID: key });
    };

    render() {
        const {
            roleReducer,
            addRoleReducer,
            getRoleCapacitiesReducer,
            getRolReducer,
            selectedRolReducer,
            updateRoleReducer,
            deleteRolReducer,
        } = this.props;

        return (
            <div className="background_login">
                <div className="custom_background_sidebar">
                    <div className="center_container">
                        <div className="container_white_edit min_height min_height_mobile show_overflow">
                            <div className="role_container">
                                <div className="roleList">
                                    <div style={{ textAlign: "left" }}>
                                        <div className="title">Roles</div>
                                        <div className="subtitle">
                                            Aqui podrás encontrar, editar y eliminar los roles de
                                            usuario.
                                        </div>

                                        {deleteRolReducer.show && (
                                            <div className="mt-5">
                                                <span
                                                    className={
                                                        deleteRolReducer.status
                                                            ? "text_success"
                                                            : "text_failure"
                                                    }
                                                >
                                                    {deleteRolReducer.message}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <ul className="roles_list">
                                        {roleReducer.status &&
                                            roleReducer.roles.map((element) => (
                                                <li className="roles_list_item" key={element._id}>
                                                    <div className="role_name">
                                                        {element.role_name}
                                                    </div>
                                                    <div className="role_actions">
                                                        <div
                                                            className="edit_trigger"
                                                            onClick={() =>
                                                                this.getRole(element._id)
                                                            }
                                                        >
                                                            <EditOutlined />
                                                        </div>
                                                        <div
                                                            className="delete_trigger"
                                                            onClick={() =>
                                                                this.deleteRole(element._id)
                                                            }
                                                        >
                                                            <DeleteOutlined />
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <div className="role_actions">
                                    <div
                                        className="add_new_role"
                                        onClick={() => this.addNewRoleModal()}
                                    >
                                        <Add />
                                        <div>Añadir nuevo</div>
                                    </div>
                                </div>
                            </div>

                            {this.state.showModalRoleNew && (
                                <div className="modal_overlay_role">
                                    <div className="close_modal" onClick={this.closeNewRoleModal}>
                                        <HighlightOff />
                                    </div>

                                    <div className="form_desing_rol">
                                        <form method="POST" onSubmit={this.addNewRolTrigger}>
                                            <div className="form_group">
                                                <div className="title leftMargin bottomMargin2">
                                                    Añadir rol
                                                </div>
                                                <input
                                                    type="text"
                                                    name="rolName"
                                                    ref={(input) => (this.rolName = input)}
                                                    className="form_control"
                                                    placeholder="Nombre del rol"
                                                    required={true}
                                                />
                                            </div>
                                            <div className="form_group">
                                                <div className="subTitleLow leftMargin">
                                                    Capacidades
                                                </div>
                                                <div className="subtitle leftMargin">
                                                    Selecciona las capacidades de este rol
                                                </div>

                                                <div className="custom_role_container">
                                                    {getRoleCapacitiesReducer.status &&
                                                        getRoleCapacitiesReducer.capacities.map(
                                                            (capacity) => (
                                                                <div
                                                                    key={capacity.rolCapacity}
                                                                    className={
                                                                        selectedRolReducer.selected ===
                                                                        capacity.rolCapacity
                                                                            ? "capacitySelect selectedCapacity"
                                                                            : "capacitySelect"
                                                                    }
                                                                    onClick={() =>
                                                                        this.setNewRole(
                                                                            capacity.rolCapacity
                                                                        )
                                                                    }
                                                                >
                                                                    {capacity.name}
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>

                                            <button className="btn btn_big btn_teal">Añadir</button>

                                            {addRoleReducer.status && (
                                                <div className="leftMargin edit_trigger">
                                                    {addRoleReducer.message}
                                                </div>
                                            )}

                                            {!addRoleReducer.status && (
                                                <div className="leftMargin delete_trigger">
                                                    {addRoleReducer.message}
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            )}

                            {getRolReducer.status && (
                                <div className="modal_overlay_role">
                                    <div
                                        className="close_modal"
                                        onClick={() => this.props.closeUpdate()}
                                    >
                                        <HighlightOff />
                                    </div>

                                    <div className="form_desing_rol">
                                        <form method="POST" onSubmit={this.editRole}>
                                            <div className="form_group">
                                                <div className="title leftMargin bottomMargin2">
                                                    Editar rol
                                                </div>
                                                <input
                                                    type="hidden"
                                                    name="role_id"
                                                    defaultValue={getRolReducer.rol._id}
                                                    ref={(input) => (this.rolID = input)}
                                                />
                                                <input
                                                    type="text"
                                                    name="rolName"
                                                    defaultValue={getRolReducer.rol.role_name}
                                                    ref={(input) => (this.rolNameEdit = input)}
                                                    className="form_control"
                                                    placeholder="Nombre del rol"
                                                    required={true}
                                                />
                                            </div>
                                            <div className="form_group">
                                                <div className="subTitleLow leftMargin">
                                                    Capacidades
                                                </div>
                                                <div className="subtitle leftMargin">
                                                    Selecciona las capacidades de este rol
                                                </div>

                                                <div className="custom_role_container">
                                                    {getRoleCapacitiesReducer.status &&
                                                        getRoleCapacitiesReducer.capacities.map(
                                                            (capacity) => (
                                                                <div
                                                                    key={capacity.rolCapacity}
                                                                    className={
                                                                        selectedRolReducer.selected ===
                                                                        capacity.rolCapacity
                                                                            ? "capacitySelect selectedCapacity"
                                                                            : "capacitySelect"
                                                                    }
                                                                    onClick={() =>
                                                                        this.setNewRole(
                                                                            capacity.rolCapacity
                                                                        )
                                                                    }
                                                                >
                                                                    {capacity.name}
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>

                                            <button className="btn btn_big btn_teal">Editar</button>

                                            {updateRoleReducer.status && (
                                                <div className="leftMargin edit_trigger">
                                                    {updateRoleReducer.message}
                                                </div>
                                            )}

                                            {!updateRoleReducer.status && (
                                                <div className="leftMargin delete_trigger">
                                                    {updateRoleReducer.message}
                                                </div>
                                            )}
                                        </form>
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
    const {
        authReducer,
        roleReducer,
        addRoleReducer,
        getRoleCapacitiesReducer,
        getRolReducer,
        selectedRolReducer,
        updateRoleReducer,
        deleteRolReducer,
    } = state;
    return {
        authReducer,
        roleReducer,
        addRoleReducer,
        getRoleCapacitiesReducer,
        getRolReducer,
        updateRoleReducer,
        selectedRolReducer,
        deleteRolReducer,
    };
}

const actionCreator = {
    getRoles: rolActions.getAllRoles,
    getRol: rolActions.getRoleInfo,
    addRol: rolActions.addRol,
    getCapacities: rolActions.getCapacities,
    setRole: rolActions.selectedRol,
    updateRol: rolActions.updateRol,
    closeUpdate: rolActions.closeUpdate,
    deleteRol: rolActions.deleteRol,
};

const rolesComponent = connect(mapStateToProps, actionCreator)(Roles);
export { rolesComponent as Roles };
