/**
 * Proceess
 *
 * When an instructor creates a solicity, send to [all][directors]
 * When solicity change status, send to [instructor][all][director]
 * When generate a new citation, send to [radication]
 * When citation is send, send to [instructor][appretices][all]
 * When a minute is generate, send to [lawyer]
 */

const emails = {
    posibleTypes: [
        { prefix: "solicity", translation: "Enviar cuando un instructor crea una solicitud" },
        { prefix: "solicityStatus", translation: "Enviar cuando un director cambia el estado de una solicitud" },
        { prefix: "citation", translation: "Enviar cuando se crea una nueva citación para su radicación" },
        { prefix: "citationConfirm", translation: "Enviar cuando la citacion fue radicada, se enviara a los aprendices y al instructor inplicado." },
        { prefix: "lawyer", translation: "Enviar cuando se genera un acta para su radicación" },
    ]
};

module.exports = emails;
