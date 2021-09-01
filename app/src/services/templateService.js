import cookie from "react-cookies";
import { config } from "../config";

export const templateService = {
    getCustomFields,
    createTemplate,
    getTemplates,
    getTemplate,
    updateTemplate,
    deleteTemplate,
};

async function getCustomFields(type) {
    const configuration = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
    };

    const sendRequest = await fetch(config.serverRoute + "getFields/" + type, configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function getTemplates() {
    const configuration = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
    };

    const sendRequest = await fetch(config.serverRoute + "getTemplates", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function getTemplate(templateID) {
    const configuration = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
    };

    const sendRequest = await fetch(
        config.serverRoute + "getTemplate/" + templateID,
        configuration
    );
    const converJson = await sendRequest.json();
    return converJson;
}

async function createTemplate(data) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(data),
    };

    const sendRequest = await fetch(config.serverRoute + "createTemplate", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function updateTemplate(data) {
    const configuration = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(data),
    };

    const sendRequest = await fetch(config.serverRoute + "updateTemplate", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function deleteTemplate(data) {
    const configuration = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(data),
    };

    const sendRequest = await fetch(config.serverRoute + "deleteTemplate", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}
