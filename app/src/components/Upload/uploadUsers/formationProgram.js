import React, { useState } from "react";

export function FormationProgram() {
    const [program, setProgram] = useState(JSON.stringify({}));

    const updateProgramData = (key, value) => {
        const getProgramInfo = JSON.parse(program);
        setProgram(JSON.stringify({ ...getProgramInfo, [key]: value }));
    };

    return (
        <React.Fragment>
            <input name="formationProgram" type="hidden" value={program} onChange={() => false} />
            <div className="form_group">
                <div className="rows">
                    <div className="col_6">
                        <input
                            type="text"
                            className="form_control"
                            placeholder="Código sede"
                            onChange={(e) =>
                                updateProgramData("codigo_sede", e.target.value)
                            }
                        />
                    </div>
                    <div className="col_6">
                        <input
                            type="text"
                            className="form_control"
                            placeholder="Sede"
                            onChange={(e) =>
                                updateProgramData("sede", e.target.value)
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
                            placeholder="Código regional"
                            onChange={(e) =>
                                updateProgramData(
                                    "codigo_regional",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="col_6">
                        <input
                            type="text"
                            className="form_control"
                            placeholder="Regional"
                            onChange={(e) =>
                                updateProgramData("regional", e.target.value)
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
                            placeholder="Ficha"
                            onChange={(e) =>
                                updateProgramData("ficha", e.target.value)
                            }
                        />
                    </div>
                    <div className="col_6">
                        <input
                            type="text"
                            className="form_control"
                            placeholder="Estado ficha"
                            onChange={(e) =>
                                updateProgramData(
                                    "estado_ficha",
                                    e.target.value
                                )
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
                            placeholder="Código programa"
                            onChange={(e) =>
                                updateProgramData(
                                    "codigo_programa",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="col_6">
                        <input
                            type="text"
                            className="form_control"
                            placeholder="Versión programa"
                            onChange={(e) =>
                                updateProgramData(
                                    "version_programa",
                                    e.target.value
                                )
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
                            placeholder="Programa"
                            onChange={(e) =>
                                updateProgramData("programa", e.target.value)
                            }
                        />
                    </div>
                    <div className="col_6">
                        <input
                            type="text"
                            className="form_control"
                            placeholder="Nivel de formación"
                            onChange={(e) =>
                                updateProgramData(
                                    "nivel_de_formacion",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
