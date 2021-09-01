import { config } from "../config";
import cookie from "react-cookies";

export const appreticeService = {
    getAppreticeInfo,
    saveAppreticeInfo
};

async function getAppreticeInfo(appreticeID) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify({
            appreticeID: appreticeID,
        }),
    };

    const requestResponse = await fetch(config.serverRoute + "getAppreticeInfo", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}

async function saveAppreticeInfo(appretice) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(appretice),
    };

    const requestResponse = await fetch(config.serverRoute + "saveAppreticeInfo", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}
