import { generatorConstants } from "../../_constants";

export const generateConstantReducer = (state = {}, action) => {
    switch (action.type) {
        case generatorConstants.GENERATORCITATION_REQUEST:
            return {
                loading: true,
            };
        case generatorConstants.REDIRECTTOCITATIONS:
            return {
                changeView: true,
            };
        case generatorConstants.GENERATORCITATION_SUCCESS:
            return {
                status: action.response.status,
                pdfLink: action.response.pdfLink,
                message: action.response.message,
            };
        case generatorConstants.GENERATORCITATION_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };

        case generatorConstants.GENERATORMINUTE_REQUEST:
            return {
                loading: true,
            };
        case generatorConstants.GENERATORMINUTE_SUCCESS:
            return {
                status: action.response.status,
                pdfLink: action.response.pdfLink,
                message: action.response.message,
            };
        case generatorConstants.GENERATORMINUTE_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        case generatorConstants.RESETACTION_MINUTE:
            return {};

        default:
            return state;
    }
};
