import cookie from "react-cookies";
import { config } from "../config";

export const userService = {
    registerUser,
    searchUsers,
    searchedUser,
    editUser,
    getMyCitations,
    getSelectedCitation,
    uploadNewCitationStatus,
    updatePassword,
};

async function registerUser(user) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(user),
    };

    const sendRequest = await fetch(config.serverRoute + "register", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function searchUsers(search) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(search),
    };

    const sendRequest = await fetch(config.serverRoute + "searchUsers", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function searchedUser(userID) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify({
            userSearchID: userID,
        }),
    };

    const sendRequest = await fetch(config.serverRoute + "searchUser", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function editUser(user) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(user),
    };

    const sendRequest = await fetch(config.serverRoute + "editUser", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function getMyCitations() {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
    };

    const sendRequest = await fetch(config.serverRoute + "getCitations", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function getSelectedCitation(citationID) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify({
            citation: citationID,
        }),
    };

    const sendRequest = await fetch(config.serverRoute + "getSelectedCitation", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function uploadNewCitationStatus(citationID, formData) {
    const configuration = {
        method: "POST",
        headers: {
            "x-access-token": cookie.load("userToken"),
            citationID: citationID,
        },
        body: formData,
    };

    const sendRequest = await fetch(config.serverRoute + "uploadNewCitationStatus", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function updatePassword(data) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(data),
    };

    const sendRequest = await fetch(config.serverRoute + "updatePassword", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}
