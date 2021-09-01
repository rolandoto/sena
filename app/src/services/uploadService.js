import cookie from "react-cookies";
import { config } from "../config";

export const uploadService = {
    uploadAppretices,
    uploadInstructors,
    uploadNewFileSolicity,
    uploadSingleAppretice,
};

async function uploadAppretices(form) {
    const configuration = {
        method: "POST",
        headers: {
            "x-access-token": cookie.load("userToken"),
        },
        body: form,
    };

    const sendRequest = await fetch(
        config.serverRoute + "uploadAppretices",
        configuration
    );
    const convertRequest = await sendRequest.json();
    return convertRequest;
}

async function uploadSingleAppretice(form) {
    const configuration = {
        method: "POST",
        headers: {
            "x-access-token": cookie.load("userToken"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    };

    const sendRequest = await fetch(
        config.serverRoute + "uploadSingleAppretice",
        configuration
    );
    const convertRequest = await sendRequest.json();
    return convertRequest;
}

async function uploadInstructors(form) {
    const configuration = {
        method: "POST",
        headers: {
            "x-access-token": cookie.load("userToken"),
        },
        body: form,
    };

    const sendRequest = await fetch(
        config.serverRoute + "uploadInstructors",
        configuration
    );
    const convertRequest = await sendRequest.json();
    return convertRequest;
}

async function uploadNewFileSolicity(form, solicityID) {
    const configuration = {
        method: "POST",
        headers: {
            "x-access-token": cookie.load("userToken"),
            solicityID: solicityID,
        },
        body: form,
    };

    const sendRequest = await fetch(
        config.serverRoute + "uploadNewFileSolicity",
        configuration
    );
    const convertRequest = await sendRequest.json();
    return convertRequest;
}
