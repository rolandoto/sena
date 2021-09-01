const generatePDF = {};
const pdf = require("html-pdf");
const doc = require("html-docx-js");
const fs = require("fs");
const Appretice = require("../models/Appretice");
const Citations = require("../models/Citations");
const Solicity = require("../models/Solocity");
const Template = require("../models/Template");
const MotivesOrProhibitions = require("../models/MotivesOrProhibitions");
const User = require("../models/User");
const domain = require("../config/domain");
const mailController = require("../controllers/sendMails");

function generateRamdomPDF(n) {
    let ramdomCode = "";
    const posibleCharacters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i <= n; i++) {
        const generate = Math.random() * (1, posibleCharacters.length) + 1;
        ramdomCode += posibleCharacters.charAt(generate);
    }
    ramdomCode += ".pdf";
    return ramdomCode;
}

async function generatePDFLayout(
    appreticesSelected,
    leader,
    date,
    hour,
    meetingLink,
    template,
    motive
) {
    const appretices = appreticesSelected;

    const dateSelected = new Date(date);
    const hourSelected = new Date(hour);
    const convertedHour =
        hourSelected.getHours() +
        ":" +
        (hourSelected.getMinutes() < 10
            ? "0" + hourSelected.getMinutes()
            : hourSelected.getMinutes()) +
        (hourSelected.getHours() <= 12 ? " AM" : " PM");

    var month = "";
    switch (dateSelected.getMonth() + 1) {
        case 1:
            month = "Enero";
            break;
        case 2:
            month = "Febrero";
            break;
        case 3:
            month = "Marzo";
            break;
        case 4:
            month = "Abril";
            break;
        case 5:
            month = "Mayo";
            break;
        case 6:
            month = "Junio";
            break;
        case 7:
            month = "Julio";
            break;
        case 8:
            month = "Agosto";
            break;
        case 9:
            month = "Septiembre";
            break;
        case 10:
            month = "Octubre";
            break;
        case 11:
            month = "Noviembre";
            break;
        case 12:
            month = "Diciembre";
            break;
    }

    const fichas = appretices.map((f) => {
        return f.ficha;
    });
    const uniqFichas = new Set(fichas);

    const sedes = appretices.map((f) => {
        return f.sede;
    });
    const uniqSedes = new Set(sedes);

    let appreticesHtml = "<ul style='list-style: none; margin:0; padding:0'>";
    appretices.map((appretice) => {
        appreticesHtml += "<li style='margin: 10px 0'>";
        appreticesHtml += "<div>" + appretice.name + "</div>";
        appreticesHtml += "<div>" + appretice.document + "</div>";
        appreticesHtml += "<div>" + appretice.email + "</div>";
        appreticesHtml += "<div>" + appretice.phone + "</div>";
        if ([...uniqFichas].length > 1) {
            appreticesHtml += "<div>Ficha: " + appretice.ficha + "</div>";
        }

        if ([...uniqSedes].length > 1) {
            appreticesHtml += "<div>Sede: " + appretice.sede + "</div>";
        }
        appreticesHtml += "</li>";
    });

    if ([...uniqFichas].length == 1) {
        appreticesHtml += "<li>Ficha: " + [...uniqFichas][0] + "</li>";
    }

    if ([...uniqSedes].length == 1) {
        appreticesHtml += "<li>Sede: " + [...uniqSedes][0] + "</li>";
    }
    appreticesHtml += "<ul>";

    appreticesHtml += "<br>";

    const leaderName = leader.first_name + " " + leader.last_name;
    const meetingDate =
        dateSelected.getDate() +
        " de " +
        month +
        " de " +
        dateSelected.getFullYear() +
        " a las " +
        convertedHour;
    const getTemplate = await Template.findById(template);

    const htmlGet = getTemplate.template
        .replace("%{appreticesHtml}", appreticesHtml)
        .replace("%{meetingLink}", meetingLink)
        .replace("%{leader}", leaderName)
        .replace("%{motivo_o_prohibicion}", motive.description)
        .replace("%{date}", meetingDate);

    return htmlGet;
}

function getFormationPrograms(programs) {
    let programData = {
        ficha: "",
        sede: "",
    };
    programs.map((pro, i) => {
        programData.ficha += pro.ficha + (i != 1 ? " - " : "");
        programData.sede += pro.sede + (i != 1 ? " - " : "");
    });
    return programData;
}

async function getInfoByAppretice(ID) {
    const userGet = await Appretice.findOne({ _id: ID });
    const getProgramInfo = getFormationPrograms(userGet.programas_formacion);
    const userProgramInfo = {
        name: userGet.nombre + " " + userGet.primer_apellido,
        document: userGet.numero_documento,
        ficha: getProgramInfo.ficha,
        sede: getProgramInfo.sede,
        email: userGet.email,
        phone: userGet.phone,
    };

    return userProgramInfo;
}

async function getAppreticesInfo(appretices) {
    let allUserData = [];
    for (i in appretices) {
        const getInfo = await getInfoByAppretice(appretices[i].appreticeID);
        allUserData.push(getInfo);
    }
    return allUserData;
}

generatePDF.generateCitation = async (req, res) => {
    const {
        solicityID,
        citationDate,
        citationHour,
        citationLink,
        template,
        description,
    } = req.body;
    if (solicityID) {
        const solicity = await Solicity.findById(solicityID);
        if (solicity) {
            const getAppretices = await getAppreticesInfo(
                JSON.parse(solicity.appretices)
            );
            const motive = await MotivesOrProhibitions.findById(
                solicity.motiveOrProhibition
            );
            const leader = await User.findById(solicity.userID);
            const html = await generatePDFLayout(
                getAppretices,
                leader,
                citationDate,
                citationHour,
                citationLink,
                template,
                motive
            );
            const pdfNameRamdom = generateRamdomPDF(40);
            // const docGenerated = doc.asBlob(html);
            // fs.writeFile("assets/Citations/" + pdfNameRamdom, docGenerated, async (err) => {
            //     if (err) {
            //         return res.json({
            //             status: false,
            //             message: "PDF error",
            //         });
            //     } else {
            //         const saveCitation = new Citations({
            //             userID: req.userID,
            //             pdfLink: pdfNameRamdom,
            //             description: description,
            //             solicity: solicityID,
            //         });

            //         await solicity.updateOne({ citation: saveCitation._id });

            //         saveCitation.lastChange = saveCitation._id;
            //         saveCitation.parentID = saveCitation._id;

            //         if (saveCitation.save()) {
            //             mailController.createCitation(
            //                 domain + "Citations/" + pdfNameRamdom,
            //                 pdfNameRamdom
            //             );
            //             return res.json({
            //                 status: true,
            //                 pdfLink: domain + "Citations/" + pdfNameRamdom,
            //                 message: "PDF Generated",
            //             });
            //         } else {
            //             return res.json({
            //                 status: false,
            //                 message: "PDF error",
            //             });
            //         }
            //     }
            // });
            pdf.create(html, { timeout: "100000" }).toFile(
                "assets/Citations/" + pdfNameRamdom,
                async (err, resoponse) => {
                    if (err) {
                        return res.json({
                            status: false,
                            message: "PDF error",
                        });
                    } else {
                        const saveCitation = new Citations({
                            userID: req.userID,
                            pdfLink: pdfNameRamdom,
                            description: description,
                            solicity: solicityID,
                        });

                        await solicity.updateOne({ citation: saveCitation._id });

                        saveCitation.lastChange = saveCitation._id;
                        saveCitation.parentID = saveCitation._id;

                        if (saveCitation.save()) {
                            mailController.createCitation(
                                domain + "Citations/" + pdfNameRamdom,
                                pdfNameRamdom
                            );
                            return res.json({
                                status: true,
                                pdfLink: domain + "Citations/" + pdfNameRamdom,
                                message: "PDF Generated",
                            });
                        } else {
                            return res.json({
                                status: false,
                                message: "PDF error",
                            });
                        }
                    }
                }
            );
        } else {
            return res.json({
                status: false,
                message: "Ha ocurrido un error",
            });
        }
    } else {
        return res.json({
            status: false,
            message: "El id es requerido",
        });
    }
};

generatePDF.generateMinute = async (req, res) => {
    const {
        content,
        objectives,
        topics,
        template,
        end_date,
        start_date,
        place,
        direction,
        city_and_date,
        comite_name,
        solicityID,
    } = req.body;
    const html = await Template.findById(template);
    const pdfNameRamdom = generateRamdomPDF(40);
    const citation = Citations.findOne({ solicity: solicityID });
    const replaceHTML = html.template
        .replace("%{meeting_content}", content)
        .replace("%{meeting_objects}", objectives)
        .replace("%{minute_subjects}", topics)
        .replace("%{start_date}", start_date)
        .replace("%{end_date}", end_date)
        .replace("%{city_and_date}", city_and_date)
        .replace("%{meeting_place}", place)
        .replace("%{minute_subject_name}", comite_name)
        .replace("%{place_direction}", direction);

    pdf.create(replaceHTML).toFile(
        "assets/Minutes/" + pdfNameRamdom,
        async (err, resoponse) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "PDF error",
                });
            } else {
                if (citation) {
                    await citation.update({
                        minute: domain + "Minutes/" + pdfNameRamdom,
                    });
                }
                mailController.createMinutes(
                    domain + "Minutes/" + pdfNameRamdom,
                    pdfNameRamdom
                );
                return res.json({
                    status: true,
                    pdfLink: domain + "Minutes/" + pdfNameRamdom,
                    message: "PDF Generated",
                });
            }
        }
    );
};

module.exports = generatePDF;
