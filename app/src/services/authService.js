import cookie from "react-cookies";
import { config } from "../config";

export const authService = {
    userLogin,
    validateToken,
    profileUpdate,
};

async function userLogin(credentials) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
    };

    const sendRequest = await fetch(config.serverRoute + "login", configuration);
    const responseJson = sendRequest.json();
    return responseJson;
}

async function validateToken(token) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": token,
        },
    };

    const sendRequest = await fetch(config.serverRoute + "validateToken", configuration);
    const responseJson = sendRequest.json();
    return responseJson;
}

async function profileUpdate() {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
    };

    const sendRequest = await fetch(config.serverRoute + "profileUpdated", configuration);
    const responseJson = sendRequest.json();
    return responseJson;
}
