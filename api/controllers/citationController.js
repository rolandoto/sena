const citationMethods = {};
const Citation = require("../models/Citations");
const Solicity = require("../models/Solocity");
const Appretice = require("../models/Appretice");
const User = require("../models/User");
const domain = require("../config/domain");
const sendEmail = require("./sendMails");

function getMonth(n) {
    switch (n + 1) {
        case 1:
            return "Enero";
        case 2:
            return "Febrero";
        case 3:
            return "Marzo";
        case 4:
            return "Abril";
        case 5:
            return "Mayo";
        case 6:
            return "Junio";
        case 7:
            return "Julio";
        case 8:
            return "Agosto";
        case 9:
            return "Septiembre";
        case 10:
            return "Octubre";
        case 11:
            return "Noviembre";
        case 12:
            return "Diciembre";
        default:
            return "Null";
    }
}

function convertToDate(data) {
    let allDates = [];
    data.map((d) => {
        const aD = new Date(d.createdAt);
        const dateFormat =
            aD.getDate() +
            " de " +
            getMonth(aD.getMonth()) +
            " del " +
            aD.getFullYear();
        if (d._id == d.parentID) {
            allDates.push({
                _id: d._id,
                date: dateFormat,
                description: d.description,
            });
        }
    });
    return allDates.reverse();
}

citationMethods.getCitations = async (req, res) => {
    const userID = req.userID;
    const getCitations = await Citation.find(
        { userID: userID },
        { createdAt: true, description: true, parentID: true }
    );
    if (getCitations) {
        return res.json({
            status: true,
            citations: convertToDate(getCitations),
        });
    } else {
        return res.json({
            status: false,
            message: "Error",
        });
    }
};

async function getCitationsChildrens(citationID) {
    const citationsSearched = await Citation.find({ parentID: citationID._id });
    citationsSearched.map((citation) => {
        citation.pdfLink = domain + "Citations/" + citation.pdfLink;
    });
    return citationsSearched;
}

citationMethods.getSelectedCitation = async (req, res) => {
    const { citation } = req.body;
    const citationSearch = await Citation.findOne({ _id: citation });
    if (citationSearch) {
        const citationsChildren = await getCitationsChildrens(citationSearch);
        return res.json({
            status: true,
            parent: citationSearch,
            citations: citationsChildren,
        });
    } else {
        return res.json({
            status: false,
            message: "Not found",
        });
    }
};

async function updateLastChange(citationID, newID) {
    const isUpdate = await Citation.findByIdAndUpdate(citationID, {
        $set: { lastChange: newID.toString() },
    });
    if (isUpdate) {
        return true;
    } else {
        return false;
    }
}

citationMethods.uploadNewCitationStatus = async (req, res) => {
    const citationID = req.headers["citationid"];
    if (citationID) {
        const getCitation = await Citation.findById(citationID);
        if (getCitation) {
            const saveCitation = new Citation({
                userID: req.userID,
                parentID: citationID,
                pdfLink: req.file.filename,
                lastChange: citationID,
                solicity: getCitation.solicity,
                description: "Is a change",
            });

            if (saveCitation.save()) {
                const isUpdate = await updateLastChange(
                    citationID,
                    saveCitation._id
                );
                if (isUpdate) {
                    return res.json({
                        status: true,
                        message: "Se ha publicado el nuevo cambio",
                    });
                } else {
                    saveCitation.remove();
                }
            } else {
                return res.json({
                    status: false,
                    message: "Citation ID not found",
                });
            }
        } else {
            return res.json({
                status: false,
                message: "Citation ID not found",
            });
        }
    } else {
        return res.json({
            status: false,
            message: "Citation ID not found",
        });
    }
};

async function getAppreticeInfo(appretices) {
    let appreticesEmail = "";
    for (let x in appretices) {
        const appretice = await Appretice.findById(appretices[x].appreticeID);
        appreticesEmail += appretice.email + ",";
    }
    appreticesEmail = appreticesEmail.slice(0, appreticesEmail.length - 1);
    return appreticesEmail;
}

async function getInstructorEmail(instructor) {
    const instructorEmail = await User.findById(instructor);
    return instructorEmail.email;
}

citationMethods.sendCitation = async (req, res) => {
    const { citationID } = req.body;
    if (citationID) {
        const citation = await Citation.findById(citationID);
        const lastChange = await Citation.findById(citation.lastChange);
        const solicity = await Solicity.findById(citation.solicity);
        const appreticesEmail = await getAppreticeInfo(
            JSON.parse(solicity.appretices)
        );
        const instructorEmail = await getInstructorEmail(solicity.userID);
        const emails = appreticesEmail + "," + instructorEmail;
        const email = await sendEmail.sendCitation(
            {
                name: lastChange.pdfLink,
                path: domain + "Citations/" + lastChange.pdfLink,
            },
            emails
        );

        if (email) {
            return res.status(200).json({
                status: true,
                message: "La citación fue enviada correctamente",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Ha ocurrido un error intentalo de nuevo",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

module.exports = citationMethods;
