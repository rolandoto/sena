import React, { useState } from "react";
import Timer from "react-compound-timer";
import { PlayArrow, Stop } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import moment from "moment";

const TimerComponent = (_) => {
    const [startDate] = useState(moment().format("YYYY-MM-DDTkk:mm"));
    const [finishDate, setFinishDate] = useState(moment().format("YYYY-MM-DDTkk:mm"));

    function updateActualTime(time) {
        setFinishDate(
            moment(startDate)
                .set({ seconds: time / 1000 })
                .format("YYYY-MM-DDTkk:mm")
        );
    }

    return (
        <div className="rows center_elements mb-4">
            <div className="text_fields_dates">
                <TextField
                    label="Inicio de la reunión"
                    type="datetime-local"
                    defaultValue={startDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="start_date"
                />
                <Timer initialTime={0} startImmediately={false}>
                    {({ start, stop, getTime }) => (
                        <React.Fragment>
                            <div className="timer_container">
                                <div className="timer">
                                    <Timer.Days /> : <Timer.Hours /> : <Timer.Minutes /> :{" "}
                                    <Timer.Seconds />
                                </div>
                                <div className="timer_actions">
                                    <div onClick={start}>
                                        <PlayArrow />
                                    </div>
                                    <div onClick={() => [stop(), updateActualTime(getTime())]}>
                                        <Stop />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </Timer>
                <TextField
                    label="Fin de la reunión"
                    type="datetime-local"
                    value={finishDate}
                    InputProps={{
                        readOnly: true,
                    }}
                    name="end_date"
                />
            </div>
        </div>
    );
};

export default TimerComponent;
