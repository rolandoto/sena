import cookie from "react-cookies";
import { config } from "../config";

export const citationService = {
    sendCitation,
};

async function sendCitation(data) {
    const configuration = {
        method: "POST",
        headers: {
            "x-access-token": cookie.load("userToken"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    const requestJson = await fetch(config.serverRoute + "sendCitation", configuration);
    const convertJson = await requestJson.json();
    return convertJson;
}
