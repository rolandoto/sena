const templateMethods = {};
const Template = require("../models/Template");
const fields = require("../config/fieldPerTemplate");

templateMethods.getFields = async (req, res) => {
    try {
        const type = req.params["type"];
        if (type) {
            return res.status(200).json({
                status: true,
                fields: Object.fromEntries(Object.entries(fields[type])),
                message: "Fields encounter",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Type is required",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error,
        });
    }
};

templateMethods.getTemplates = async (req, res) => {
    try {
        const templates = await Template.find();
        return res.status(200).json({
            status: true,
            templates: templates,
            message: "Fields encounter",
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error,
        });
    }
};

templateMethods.getTemplate = async (req, res) => {
    const templateID = req.params["id"];
    if (templateID) {
        try {
            const template = await Template.findById(templateID);
            return res.status(200).json({
                status: true,
                template: template,
                message: "Fields encounter",
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
            message: "El id es requerido",
        });
    }
};

templateMethods.createTemplate = async (req, res) => {
    const { templateName, template } = req.body;
    const createTemplate = new Template({
        templateName,
        template,
    });

    if (await createTemplate.save()) {
        return res.status(200).json({
            status: true,
            message: "Se ha creado la plantilla",
        });
    } else {
        return res.status(400).json({
            status: false,
            message: "Ha ocurrido un error",
        });
    }
};

templateMethods.updateTemplate = async (req, res) => {
    const { templateID, templateName, template } = req.body;
    if (templateID) {
        try {
            const getTemplate = await Template.findById(templateID);
            const updated = await getTemplate.updateOne({
                $set: {
                    templateName,
                    template,
                },
            });

            if (updated) {
                return res.status(200).json({
                    status: true,
                    message: "La plantilla fue actualizada correctamente",
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

templateMethods.deleteTemplate = async (req, res) => {
    const { templateID } = req.body;
    if (templateID) {
        try {
            const removed = await Template.findById(templateID);
            if (removed.remove()) {
                return res.status(200).json({
                    status: true,
                    message: "La plantilla fue eliminada correctamente",
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

module.exports = templateMethods;
