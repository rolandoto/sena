import cookie from "react-cookies";
import { config } from "../config";

export const roleService = {
    getAllRoles,
    addNewRol,
    getCapacities,
    getUserRole,
    updateRol,
    deleteRol
};

async function getAllRoles() {
    const configuration = {
        method: "GET",
        headers: {
            "x-access-token": cookie.load("userToken"),
        },
    };

    const requestResponse = await fetch(config.serverRoute + "getAllRols", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}

async function addNewRol(rol) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(rol),
    };

    const requestResponse = await fetch(config.serverRoute + "addRol", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}

async function getCapacities() {
    const configuration = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
    };

    const requestResponse = await fetch(config.serverRoute + "getRolCapacities", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}

async function getUserRole(roleID) {
    const configuration = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify({
            rol: roleID,
        }),
    };

    const sendRequest = await fetch(config.serverRoute + "getRoleInfo", configuration);
    const converJson = await sendRequest.json();
    return converJson;
}

async function updateRol(data) {
    const configuration = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(data.rolID),
    };
    
    const requestResponse = await fetch(config.serverRoute + "updateRol", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}

async function deleteRol(data) {
    const configuration = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "x-access-token": cookie.load("userToken"),
        },
        body: JSON.stringify(data),
    };

    const requestResponse = await fetch(config.serverRoute + "deleteRol", configuration);
    const responseJson = await requestResponse.json();
    return responseJson;
}
