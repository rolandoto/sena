import cookie from "react-cookies";
import { config } from "../config";

export const editProfileService = {
    editProfile,
};

async function editProfile(form) {
    const configuration = {
        method: "POST",
        headers: {
            "x-access-token": cookie.load("userToken"),
        },
        body: form,
    };

    const requestJson = await fetch(config.serverRoute + "editProfile", configuration);
    const convertJson = await requestJson.json();
    return convertJson;
}
