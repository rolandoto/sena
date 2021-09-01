const minuteMethods = {};
const Solicity = require("../models/Solocity");

minuteMethods.getAttendees = async (req, res) => {
    const solicityID = req.params["id"];
    if (solicityID) {
        const solicity = await Solicity.findById(solicityID);
        if (solicity) {
            return res.status(200).json({
                status: true,
                solicityID: solicity._id,
                appretices: solicity.appretices,
                message: "All done",
            });
        } else {
            return res.status(401).json({
                status: false,
                message: "Ha ocurrido un error",
            });
        }
    } else {
        return res.status(401).json({
            status: false,
            message: "El id de la solicitud es requreido",
        });
    }
};

module.exports = minuteMethods;
