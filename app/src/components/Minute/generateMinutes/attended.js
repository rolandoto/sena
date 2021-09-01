import React, { Component } from "react";
import { connect } from "react-redux";
import exportFromJson from 'export-from-json';

class Attended extends Component {

    exportFromJSON(data) {
        const fileName = 'Listado de asistencia';
        const exportType = 'csv';
        exportFromJson({data , fileName , exportType});
    }

    render() {
        const { getAttendeesReducer } = this.props;
        const appretices = JSON.parse(getAttendeesReducer.appretices);
        return (
            <div className="center_container overlay_black">
                <div className="container_white_edit custom_container_details">
                    <h3 className="title">Listado de asistencia</h3>
                    <ul className="templates_list">
                        {getAttendeesReducer.status &&
                            appretices.map((appretice) => (
                                <li className="templates_item" key={appretice.appreticeID}>
                                    <div>{appretice.name + " " + appretice.lastName}</div>
                                </li>
                            ))}
                    </ul>

                    <div className="center_elements justify_right mt-2">
                        <button className="button_generate_citation center_elements">Guardar</button>
                        <button className="button_generate_citation center_elements" onClick={() => this.exportFromJSON(appretices)}>Exportar csv</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { getAttendeesReducer } = state;
    return { getAttendeesReducer };
}

const attendedComponent = connect(mapStateToProps)(Attended);
export { attendedComponent as Attended };
