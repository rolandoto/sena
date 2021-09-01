import { combineReducers } from "redux";
import { userConstants } from "../_constants";

import {
    citationSelectedReducer,
    citationsReducer,
    generateConstantReducer,
    sendCitationReducer,
} from "./Citations";
import {
    addRoleReducer,
    getRolInfoReducer,
    getRoleCapacitiesReducer,
    roleReducer,
    getRolReducer,
    selectedRolReducer,
    updateRoleReducer,
    deleteRolReducer,
} from "./Role";
import {
    uploadNewStatusCitation,
    uploadReducer,
    uploadSolicityFilesReducer,
    uploadSingleAppreticeReducer,
} from "./Upload";
import { registerUserReducer, authReducer } from "./Auth";
import {
    chagePasswordReducer,
    editProfileReducer,
    editUserSearchReducer,
} from "./Edit";
import { getAppreticeInfoReducer, saveAppreticeInfoReducer } from "./Appretice";
import { getAttendeesReducer } from "./Minute";
import {
    getMailReducer,
    getMailsReducer,
    getMailPermits,
    updateMailReducer,
    deleteMailReducer,
    createMailReducer,
    mailModalReducer,
} from "./Mail";
import {
    getCustomFieldsReducer,
    templateModalReducer,
    createTemplateReducer,
    templatesReducer,
    getTemplateReducer,
    updateTemplateReducer,
} from "./Template";
import {
    searchReducer,
    searchUsersReducer,
    searchedUserReducer,
    apreticeSearchedReducer,
    searchInstructors,
    instructorSearchedReducer,
} from "./Search";
import {
    getMotivesOrProhibitionsReducer,
    saveMotiveOrProhibitionReducer,
    saveSolicityReducer,
    getSolicitiesReducer,
    updateSolicityStatusReducer,
    getSolicityReducer,
    getSolicityDrawReducer,
    getMotiveOrProhibitionReducer,
    updateMotiveOrProhibitionReducer,
    deleteMotiveOrProhibitionReducer,
} from "./Solicity";

const rootReducer = combineReducers({
    authReducer,
    editProfileReducer,
    roleReducer,
    addRoleReducer,
    registerUserReducer,
    getRolInfoReducer,
    searchUsersReducer,
    searchedUserReducer,
    editUserSearchReducer,
    uploadReducer,
    searchReducer,
    apreticeSearchedReducer,
    generateConstantReducer,
    citationsReducer,
    citationSelectedReducer,
    uploadNewStatusCitation,
    chagePasswordReducer,
    getRoleCapacitiesReducer,
    uploadSolicityFilesReducer,
    getSolicityDrawReducer,
    getAppreticeInfoReducer,
    saveAppreticeInfoReducer,
    getMotivesOrProhibitionsReducer,
    saveMotiveOrProhibitionReducer,
    saveSolicityReducer,
    getSolicitiesReducer,
    updateSolicityStatusReducer,
    getSolicityReducer,
    getCustomFieldsReducer,
    templateModalReducer,
    createTemplateReducer,
    templatesReducer,
    getAttendeesReducer,
    getMailReducer,
    getMailsReducer,
    getMailPermits,
    updateMailReducer,
    deleteMailReducer,
    createMailReducer,
    mailModalReducer,
    sendCitationReducer,
    getRolReducer,
    selectedRolReducer,
    updateRoleReducer,
    deleteRolReducer,
    searchInstructors,
    instructorSearchedReducer,
    getMotiveOrProhibitionReducer,
    updateMotiveOrProhibitionReducer,
    deleteMotiveOrProhibitionReducer,
    getTemplateReducer,
    updateTemplateReducer,
    uploadSingleAppreticeReducer,
});

export default (state, action) =>
    rootReducer(
        action.type === userConstants.USER_LOGOUT ? undefined : state,
        action
    );
