import cookie from "react-cookies";
import { config } from "../config";

export const minuteService = {
    getAttendess,
};

async function getAttendess(key) {
    const configuration = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
    };

    const requestResponse = await fetch(config.serverRoute + "getAttendees/" + key, configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}
