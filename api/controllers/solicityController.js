const solicityMethods = {};
const translateSolicity = require("../config/solicities");
const domain = require("../config/domain");
const User = require("../models/User");
const Rol = require("../models/Rol");
const Appretice = require("../models/Appretice");
const Solocity = require("../models/Solocity");
const MotivesOrProhibition = require("../models/MotivesOrProhibitions");
const mailController = require("../controllers/sendMails");

solicityMethods.getDrawSolicity = async (req, res) => {
    const getSolicityDraw = await Solocity.findOne({ userID: req.userID, draw: true });
    if (getSolicityDraw) {
        return res.json({
            status: true,
            solicity: getSolicityDraw,
        });
    } else {
        return res.json({
            status: false,
            message: "NO solicities found",
        });
    }
};

function getStatusDetail(value) {
    for (let i in translateSolicity) {
        if (i === value) {
            return translateSolicity[i];
        }
    }
}

solicityMethods.changeSolicityStatus = async (req, res) => {
    const { solicityID, status } = req.body;
    if (solicityID) {
        const getSolicity = await Solocity.findById(solicityID);
        const statusDetail = getStatusDetail(status);

        if (getSolicity) {
            const update = await getSolicity.updateOne({
                $set: {
                    status: status,
                    statusDetail: statusDetail,
                },
            });

            if (update) {
                mailController.solicityStatusChange(req.userID, statusDetail);
                return res.status(200).json({
                    status: true,
                    message: "Se ha actualizado",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Ha ocurrido un error",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "No se ha encontrado la solicitud",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

async function appreticesDetails(appretices = []) {
    const appreticesArray = JSON.parse(appretices);
    let totalAppretices = [];
    for (let x in appreticesArray) {
        const appreticeItem = await Appretice.findById(appreticesArray[x].appreticeID);
        const appreticeData = {
            appretice_id: appreticeItem._id,
            full_name:
                appreticeItem.nombre +
                " " +
                appreticeItem.primer_apellido +
                " " +
                appreticeItem.segundo_apellido,
            phone: appreticeItem.phone,
            email: appreticeItem.email,
            attemded: appreticesArray[x].attemded,
        };
        totalAppretices.push(appreticeData);
    }
    return totalAppretices;
}

solicityMethods.getSolicityDetails = async (req, res) => {
    const solicityID = req.params["id"];
    if (solicityID) {
        const solicity = await Solocity.findById(solicityID);
        if (solicity) {
            try {
                return res.status(200).json({
                    status: true,
                    solicity: {
                        instructor: await User.findById(solicity.userID),
                        appretices: await appreticesDetails(solicity.appretices),
                        motivesOrProhibition: await MotivesOrProhibition.findById(
                            solicity.motiveOrProhibition
                        ),
                        spokesman: solicity.spokeman,
                        statusDetail: solicity.statusDetail,
                        files: solicity.attachFiles,
                        fileDomail: domain + "Solicities/",
                    },
                    message: "Se ha encontrado la solicitud",
                });
            } catch (error) {
                return res.status(400).json({
                    status: false,
                    message: error,
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "No se encontro la solicitud",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

solicityMethods.getMotiverOrProhibitions = async (req, res) => {
    const motiverOrProhibitions = await MotivesOrProhibition.find();
    if (motiverOrProhibitions) {
        return res.json({
            status: true,
            motiverOrProhibions: motiverOrProhibitions,
        });
    } else {
        return res.json({
            status: false,
            message: "Motives or prohibitions not found",
        });
    }
};

solicityMethods.getMotiverOrProhibition = async (req, res) => {
    const motiveOrProhibitionID = req.params["id"];
    if (motiveOrProhibitionID) {
        try {
            const motiverOrProhibitions = await MotivesOrProhibition.findById(
                motiveOrProhibitionID
            );
            if (motiverOrProhibitions) {
                return res.json({
                    status: true,
                    motiverOrProhibion: motiverOrProhibitions,
                });
            } else {
                return res.json({
                    status: false,
                    message: "Motives or prohibitions not found",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error,
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

solicityMethods.saveMotiveOrProhibition = async (req, res) => {
    const { title, description } = req.body;
    const newMotiveOrProhibition = new MotivesOrProhibition({
        title,
        description,
    });

    if (await newMotiveOrProhibition.save()) {
        return res.json({
            status: true,
            message: "El motivo o prohibición ha sido guardado",
        });
    } else {
        return res.json({
            status: false,
            message: "Ha ocurrido un error",
        });
    }
};

solicityMethods.saveSolicity = async (req, res) => {
    const { solicityID, motiveOrProhibition, appretices, message, appreticeSpokeMan } = req.body;
    if (solicityID) {
        const solicity = await Solocity.findOne({ _id: solicityID });
        if (solicity) {
            const updateSolicity = await solicity.updateOne({
                $set: {
                    appretices: appretices,
                    motiveOrProhibition: motiveOrProhibition,
                    message: message,
                    otherIntegrants: [],
                    spokesman: appreticeSpokeMan,
                    draw: false,
                },
            });
            if (updateSolicity) {
                mailController.newSolicity(req.userID);
                return res.json({
                    status: true,
                    message: "Se ha guardado correctamente la solicitud",
                });
            } else {
                return res.json({
                    status: false,
                    message: "Ha ocurrido un error al guardar la solicitud",
                });
            }
        } else {
            return res.json({
                status: false,
                message: "No se ha encontrado la solicitud",
            });
        }
    } else {
        const solicity = new Solocity({
            userID: req.userID,
            appretices: appretices,
            motiveOrProhibition: motiveOrProhibition,
            message: message,
            otherIntegrants: [],
            attachFiles: [],
            spokesman: appreticeSpokeMan,
            draw: false,
        });

        if (await solicity.save()) {
            mailController.newSolicity(req.userID);
            return res.json({
                status: true,
                message: "Se ha generado correctamente la solicitud",
            });
        } else {
            return res.json({
                status: false,
                message: "Ha ocurrido un error al generar la solicitud",
            });
        }
    }
};

solicityMethods.getSolicities = async (req, res) => {
    const user = await User.findById(req.userID);
    const role = await Rol.findById(user.user_role);
    if (role.capacity == "admin" || role.capacity == "director") {
        const solicities = await Solocity.find({ draw: false });
        return res.json({
            status: true,
            solicities: solicities.reverse(),
            message: "Solicities found",
        });
    } else {
        if (role.capacity == "instructor") {
            const solicities = await Solocity.find({ userID: req.userID, draw: false });
            return res.json({
                status: true,
                solicities: solicities.reverse(),
                message: "Solicities found",
            });
        } else {
            return res.json({
                status: true,
                solicities: [],
                message: "Solicities found",
            });
        }
    }
};

solicityMethods.uploadSolicityFiles = async (req, res) => {
    if (req.files) {
        const solicityID = req.headers["solicityid"];
        if (!solicityID) {
            const newSolicity = new Solocity({
                userID: req.userID,
                attachFiles: req.files,
            });

            if (await newSolicity.save()) {
                return res.status(200).json({
                    status: true,
                    solicity: newSolicity,
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "There was an error",
                });
            }
        } else {
            const findB = { _id: solicityID };
            const getSolicity = await Solocity.findOne(findB);

            if (getSolicity) {
                let pushFiles = [];
                getSolicity.attachFiles.map((ele) => {
                    pushFiles.push(ele);
                });
                const newFiles = new Object(...req.files);
                pushFiles.push(newFiles);

                await getSolicity.update({ $set: { attachFiles: pushFiles } });
                const getSolicityUpdate = await Solocity.findOne(findB);
                return res.status(200).json({
                    status: true,
                    solicity: getSolicityUpdate,
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "The solicity not exist",
                });
            }
        }
    }
};

solicityMethods.updateMotiveOrProhibition = async (req, res) => {
    const { motiveOrProhibitionID, title, description } = req.body;
    if (motiveOrProhibitionID) {
        try {
            const motiveOrProhibition = await MotivesOrProhibition.findById(motiveOrProhibitionID);
            const updated = await motiveOrProhibition.updateOne({
                $set: {
                    title,
                    description,
                },
            });

            if (updated) {
                return res.status(200).json({
                    status: true,
                    message: "El motivo o prohibición fue actualizado correctamente",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "Ha ocurrido un error intentalo nuevamente",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error,
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

solicityMethods.deleteMotiveOrProhibition = async (req, res) => {
    const { motiveOrProhibitionID } = req.body;
    if (motiveOrProhibitionID) {
        try {
            const removed = await MotivesOrProhibition.findById(motiveOrProhibitionID);
            if (removed.remove()) {
                return res.status(200).json({
                    status: true,
                    show: true,
                    message: "El motivo o prohibición fue eliminado correctamente",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    show: true,
                    message: "Ha ocurrido un error intentalo nuevamente",
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                show: true,
                message: error,
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

module.exports = solicityMethods;
