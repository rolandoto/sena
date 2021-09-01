const appreticeMethods = {};
const Appretice = require("../models/Appretice");
const fs = require("fs");
const xml2js = require("xml2js");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const parser = new xml2js.Parser();

appreticeMethods.getAppreticeInfo = async (req, res) => {
    const { appreticeID } = req.body;
    if (appreticeID) {
        const appreticeCred = { _id: appreticeID };
        const getAppretice = await Appretice.findOne(appreticeCred);
        if (getAppretice) {
            return res.json({
                status: true,
                appretice: getAppretice,
            });
        } else {
            return res.json({
                status: false,
                message: "No info found",
            });
        }
    } else {
        return res.json({
            status: false,
            message: "No appretice id sent",
        });
    }
};

appreticeMethods.saveAppreticeInfo = async (req, res) => {
    const { appreticeID, email, phone } = req.body;
    const getAppretice = await Appretice.findOne({ _id: appreticeID });
    if (getAppretice) {
        const saveAppretice = await getAppretice.updateOne({
            $set: {
                email: email,
                phone: phone,
            },
        });

        if (saveAppretice) {
            return res.json({
                status: true,
                message: "Aprendiz actualizado",
            });
        } else {
            return res.json({
                status: false,
                message: "Ha ocurrido un error",
            });
        }
    } else {
        return res.json({
            status: false,
            message: "Ha ocurrido un error",
        });
    }
};

async function searchByParams(param, typeParam) {
    let search = [];
    switch (typeParam) {
        case "document":
            return (search = await Appretice.find(
                { numero_documento: { $regex: param, $options: "i" } },
                { nombre: true, primer_apellido: true, numero_documento: true }
            ).limit(7));
        case "user":
            return (search = await Appretice.find(
                { nombre: { $regex: param, $options: "i" } },
                { nombre: true, primer_apellido: true, numero_documento: true }
            ).limit(7));
        default:
            return [];
    }
}

appreticeMethods.searchAppretices = async (req, res) => {
    const { searchValue, type } = req.body;
    if (searchValue.length > 0) {
        const searchAppretices = await searchByParams(searchValue, type);
        if (searchAppretices) {
            return res.json({
                status: true,
                appretices: searchAppretices,
                message: "Se han encontrado",
            });
        } else {
            return res.json({
                status: false,
                message: "No se han encontrado",
            });
        }
    } else {
        return res.json({
            status: false,
            message: "Búsqueda vacia",
        });
    }
};

appreticeMethods.searchAppretice = async (req, res) => {
    const { appretice } = req.body;
    if (appretice) {
        const getSearchedAppretice = await Appretice.findOne({
            _id: appretice,
        });
        if (getSearchedAppretice) {
            return res.json({
                status: true,
                appretice: getSearchedAppretice,
                message: "Success",
            });
        } else {
            return res.json({
                status: false,
                message: "No found",
            });
        }
    } else {
        return res.json({
            status: false,
            message: "No found",
        });
    }
};

async function saveAppretices(arr) {
    var totalSaved = 0;
    var totalRefused = 0;
    for (i in arr) {
        const actualAppretice = arr[i];
        const appreticeProgram = {
            codigo_sede: actualAppretice.CODIGO_SEDE,
            sede: actualAppretice.SEDE,
            codigo_regional: actualAppretice.CODIGO_REGIONAL,
            regional: actualAppretice.REGIONAL,
            ficha: actualAppretice.FICHA,
            estado_ficha: actualAppretice.ESTADO_FICHA,
            codigo_programa: actualAppretice.CODIGO_PROGRAMA,
            version_prograna: actualAppretice.VERSION_PROGRANA,
            programa: actualAppretice.PROGRAMA,
            nivel_de_formacion: actualAppretice.NIVEL_DE_FORMACION,
        };

        const searchIfAppreticeExist = await Appretice.findOne({
            numero_documento: actualAppretice.NUMERO_DOCUMENTO,
        });
        if (searchIfAppreticeExist) {
            let userActualPrograms = searchIfAppreticeExist.programas_formacion;
            let addProgram = true;
            userActualPrograms.map((program) => {
                if (program.ficha == appreticeProgram.ficha) {
                    addProgram = false;
                }
            });

            if (addProgram) {
                userActualPrograms.push(appreticeProgram);
                const saveAppretice = await searchIfAppreticeExist.updateOne({
                    programas_formacion: userActualPrograms,
                });
                if (saveAppretice) {
                    totalSaved += 1;
                } else {
                    totalRefused += 1;
                }
            } else {
                totalRefused += 1;
            }
        } else {
            const programAppretice = [appreticeProgram];
            const appretice = new Appretice({
                programas_formacion: programAppretice,
                tipo_documento: actualAppretice.TIPO_DOCUMENTO,
                numero_documento: actualAppretice.NUMERO_DOCUMENTO,
                nombre: actualAppretice.NOMBRE,
                primer_apellido: actualAppretice.PRIMER_APELLIDO,
                segundo_apellido: actualAppretice.SEGUNDO_APELLIDO,
                estado_aprendiz: actualAppretice.ESTADO_APRENDIZ,
            });
            const savedAppretice = await appretice.save();
            if (savedAppretice) {
                totalSaved += 1;
            } else {
                totalRefused += 1;
            }
        }
    }

    return {
        Success: totalSaved,
        Failure: totalRefused,
    };
}

appreticeMethods.uploadAppretices = async (req, res) => {
    if (req.file) {
        const uri = __dirname + "/../assets/XML/" + req.file.filename;
        fs.readFile(uri, (err, data) => {
            parser.parseString(data, async (err, result) => {
                const readJxML = result.Workbook.Worksheet[0].Table[0].Row;
                const totalFiles = [];
                readJxML.map((ele) => {
                    totalFiles.push(ele.Cell);
                });
                const totalArray = [];
                totalFiles.map((file, i) => {
                    const actualArray = [];
                    file.map((t) => {
                        actualArray.push(t.Data);
                    });
                    totalArray.push(actualArray);
                });

                const AllRegisters = [];
                for (i in totalArray) {
                    const actualJSON = {
                        CODIGO_SEDE: totalArray[i][0][0]._,
                        SEDE: totalArray[i][1][0]._,
                        CODIGO_REGIONAL: totalArray[i][2][0]._,
                        REGIONAL: totalArray[i][3][0]._,
                        FICHA: totalArray[i][4][0]._,
                        ESTADO_FICHA: totalArray[i][5][0]._,
                        CODIGO_PROGRAMA: totalArray[i][6][0]._,
                        VERSION_PROGRANA: totalArray[i][7][0]._,
                        PROGRAMA: totalArray[i][8][0]._,
                        NIVEL_DE_FORMACION: totalArray[i][9][0]._,
                        TIPO_DOCUMENTO: totalArray[i][10][0]._,
                        NUMERO_DOCUMENTO: totalArray[i][11][0]._,
                        NOMBRE: totalArray[i][12][0]._,
                        PRIMER_APELLIDO: totalArray[i][13][0]._,
                        SEGUNDO_APELLIDO: totalArray[i][14][0]._,
                        ESTADO_APRENDIZ: totalArray[i][15][0]._,
                    };
                    if (actualJSON.ESTADO_FICHA == "En ejecucion") {
                        AllRegisters.push(actualJSON);
                    }
                }

                const getData = await saveAppretices(AllRegisters);
                await unlinkAsync(req.file.path);
                return res.json({
                    status: true,
                    total: getData,
                    message: "Se ha terminado la operación",
                });
            });
        });
    }
};

appreticeMethods.uploadSingleAppretice = async (req, res) => {
    const {
        firstName,
        first_lastName,
        second_lastName,
        email,
        phone,
        document,
        document_number,
        formationProgram,
    } = req.body;
    if (
        firstName &&
        first_lastName &&
        second_lastName &&
        email &&
        phone &&
        document &&
        document_number
    ) {
        const findAppretice = await Appretice.findOne({
            numero_documento: document_number,
        });
        if (!findAppretice) {
            const appretice = new Appretice({
                nombre: firstName,
                primer_apellido: first_lastName,
                segundo_apellido: second_lastName,
                email,
                phone,
                tipo_documento: document,
                numero_documento: document_number,
            });
            if (formationProgram) {
                if (Array.isArray(formationProgram)) {
                    let programs = [];
                    formationProgram.forEach((input) => {
                        programs.push(JSON.parse(input));
                    });
                    appretice.programas_formacion = programs;
                } else {
                    appretice.programas_formacion = JSON.parse(
                        formationProgram
                    );
                }
            }
            if (await appretice.save()) {
                return res.status(200).json({
                    status: true,
                    message: "El aprendiz ha sido registrado correctamente.",
                });
            } else {
                return res.status(200).json({
                    status: false,
                    message: "Ha ocurrido un error intentalo nuevamente.",
                });
            }
        } else {
            return res.status(200).json({
                status: false,
                message: "Ya hay un aprendiz con este numero de documento.",
            });
        }
    } else {
        return res.status(200).json({
            status: false,
            message: "Debes llenar todos los campos requeridos.",
        });
    }
};

module.exports = appreticeMethods;
