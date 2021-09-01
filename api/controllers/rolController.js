const rolMethods = {};
const Rol = require("../models/Rol");
const userRoles = require("../config/userRoles");

rolMethods.getAllRols = async (req, res) => {
    const roles = await Rol.find();
    if (roles) {
        return res.json({
            status: true,
            body: roles,
            message: "Roles found",
        });
    } else {
        return res.json({
            status: false,
            body: null,
            message: "No rols found",
        });
    }
};

rolMethods.getRolsCapacities = async (req, res) => {
    return res.json({
        status: true,
        capacities: userRoles,
    });
};

rolMethods.getRoleInfo = async (req, res) => {
    const rolID = req.params["id"];
    if (rolID) {
        const roleInfo = await Rol.findById(rolID);
        if (roleInfo) {
            return res.status(200).json({
                status: true,
                rolInfo: roleInfo,
            });
        } else {
            return res.status(400).json({
                status: false,
                rolInfo: "No rol found",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "El id es requerido",
        });
    }
};

rolMethods.addNewRol = async (req, res) => {
    const { name, capacity } = req.body;
    const addRol = new Rol({
        role_name: name,
        capacity,
    });
    if (addRol.save()) {
        return res.json({
            status: true,
            message: "El rol fue creado correctamente",
        });
    } else {
        return res.json({
            status: false,
            message: "Hubo un error al crear el rol",
        });
    }
};

rolMethods.updateRol = async (req, res) => {
    const { rolID, role_name, capacity } = req.body;
    if (rolID) {
        try {
            const rol = await Rol.findById(rolID);
            const updated = await rol.updateOne({
                $set: {
                    role_name,
                    capacity,
                },
            });

            if (updated) {
                return res.status(200).json({
                    status: true,
                    message: "El rol fue actualizado correctamente",
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

rolMethods.deleteRol = async (req, res) => {
    const { rolID } = req.body;
    if (rolID) {
        try {
            const removed = await Rol.findById(rolID);
            if (removed.remove()) {
                return res.status(200).json({
                    status: true,
                    show: true,
                    message: "El rol fue eliminado correctamente",
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
            show: false,
            message: "El id es requerido",
        });
    }
};

module.exports = rolMethods;
