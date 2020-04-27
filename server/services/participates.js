const db = require('../models')

const getParticipate = async (transID, partID) => {
    const Participate = await db.Participates.findOne({
        where: {transactionID : transID, participantID: partID}
    });
    console.log(Participate + " found");
    return Participate;
}

const createParticipant = async (data) => {
    try {
        const newParticipant = await db.Participates.create({
            transactionID: data.transactionId,
            participantID: data.participantId,
            participantTotal: data.participantTotal,
            isPaid: false
        });
        console.log("service has added participant to transaction");
        return newParticipant;
    }
    catch(error) {
        return console.log(error)
    }
}

module.exports = {
    createParticipant,
    getParticipate
}