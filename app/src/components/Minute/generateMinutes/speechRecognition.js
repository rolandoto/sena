import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { MicNoneOutlined, MicOffOutlined } from "@material-ui/icons";
import JoditEditor from "jodit-react";

const Dictaphone = () => {
    const { transcript } = useSpeechRecognition();
    const [selectedButton, setSelectedButton] = useState("stop");
    const [content, setContent] = useState("");

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    const buttonClass = "button_generate_citation center_elements";

    return (
        <div>
            <div className="center_elements space_between mb-4 mt-30">
                <h5 className="title_search mb-4 m0">Desarrollo de la reunion</h5>
                <div className="center_elements">
                    <div
                        className={
                            selectedButton === "start"
                                ? buttonClass + " selected_print_color"
                                : buttonClass
                        }
                        onClick={() => {
                            SpeechRecognition.startListening({
                                language: "es-CO",
                                continuous: true,
                            });
                            setSelectedButton("start");
                        }}
                    >
                        Empezar grabación
                        <MicNoneOutlined />
                    </div>
                    <div
                        className={
                            selectedButton === "stop"
                                ? buttonClass + " selected_print_color"
                                : buttonClass
                        }
                        onClick={() => {
                            SpeechRecognition.stopListening();
                            setSelectedButton("stop");
                        }}
                    >
                        Parar grabación
                        <MicOffOutlined />
                    </div>
                </div>
            </div>

            <JoditEditor value={transcript} onChange={(value) => setContent(value)} />
            <textarea
                style={{display: "none"}}
                name="meeting_content"
                value={content}
                onChange={(value) => {
                    setContent(value);
                }}
            ></textarea>
        </div>
    );
};
export default Dictaphone;
