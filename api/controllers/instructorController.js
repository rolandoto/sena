const instructorMethods = {};
const fs = require("fs");
const xml2js = require("xml2js");
const Instructor = require("../models/Instructor");
const Rol = require("../models/Rol");
const User = require("../models/User");
const userRoles = require("../config/userRoles");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const parser = new xml2js.Parser();

async function getInstructorRolID() {
    const rolCapacity = userRoles.filter((rol) => {
        return rol.rolCapacity == "instructor";
    });
    const rol = new Object(...rolCapacity);
    const getRoleID = await Rol.findOne({ role_name: rol.name });
    if (getRoleID) {
        return getRoleID._id;
    } else {
        const instructorRol = new Rol({
            role_name: rol.name,
            capacity: rol.rolCapacity,
        });
        const saveRol = await instructorRol.save();
        return saveRol._id;
    }
}

async function saveInstructors(arr) {
    var totalSaved = 0;
    var totalRefused = 0;
    for (i in arr) {
        const actualInstructor = arr[i];
        const instructor = {
            codigo_sede: actualInstructor.CODIGO_SEDE,
            sede: actualInstructor.SEDE,
            codigo_regional: actualInstructor.CODIGO_REGIONAL,
            regional: actualInstructor.REGIONAL,
            tipo_documento: actualInstructor.TIPO_DOCUMENTO,
            numero_documento: actualInstructor.NUMERO_DOCUMENTO,
            nombre: actualInstructor.NOMBRE,
            primer_apellido: actualInstructor.PRIMER_APELLIDO,
            segundo_apellido: actualInstructor.SEGUNDO_APELLIDO,
        };

        const savedInstructor = new Instructor(instructor);
        const findIfExistInstructor = await Instructor.findOne({
            numero_documento: instructor.numero_documento,
        });
        if (!findIfExistInstructor) {
            if (await savedInstructor.save()) {
                const newUser = new User({
                    username: savedInstructor.numero_documento,
                    password: savedInstructor.numero_documento,
                    email: savedInstructor.numero_documento + "@gmail.com",
                    first_name: savedInstructor.nombre,
                    last_name: savedInstructor.primer_apellido,
                    user_role: await getInstructorRolID(),
                });
                newUser.password = await newUser.encryptPassword(newUser.password);
                await newUser.save();
                totalSaved += 1;
            } else {
                totalRefused += 1;
            }
        } else {
            totalRefused += 1;
        }
    }

    return {
        Success: totalSaved,
        Failure: totalRefused,
    };
}

instructorMethods.uploadInstructors = async (req, res) => {
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
                        TIPO_DOCUMENTO: totalArray[i][4][0]._,
                        NUMERO_DOCUMENTO: totalArray[i][5][0]._,
                        NOMBRE: totalArray[i][6][0]._,
                        PRIMER_APELLIDO: totalArray[i][7][0]._,
                        SEGUNDO_APELLIDO: totalArray[i][8][0]._,
                    };
                    if (i != 0) {
                        AllRegisters.push(actualJSON);
                    }
                }
                const getData = await saveInstructors(AllRegisters);
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

async function searchByParams(param, typeParam) {
    let search = [];
    switch (typeParam) {
        case "document":
            return (search = await Instructor.find(
                { numero_documento: { $regex: param, $options: "i" } },
                { nombre: true, primer_apellido: true, numero_documento: true }
            ).limit(7));
        case "user":
            return (search = await Instructor.find(
                { nombre: { $regex: param, $options: "i" } },
                { nombre: true, primer_apellido: true, numero_documento: true }
            ).limit(7));
        default:
            return [];
    }
}

instructorMethods.searchInstructors = async (req, res) => {
    const { searchValue, type } = req.body;
    if (searchValue.length > 0) {
        const searchInstructors = await searchByParams(searchValue, type);
        if (searchInstructors) {
            return res.json({
                status: true,
                instructors: searchInstructors,
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

instructorMethods.searchInstructor = async (req, res) => {
    const { instructor } = req.body;
    if (instructor) {
        const getSearchedInstructor = await Instructor.findOne({ _id: instructor });
        if (getSearchedInstructor) {
            return res.json({
                status: true,
                instructor: getSearchedInstructor,
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

module.exports = instructorMethods;
