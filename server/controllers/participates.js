const ParticipatesServices = require("../services/participates")

const getParticipate = (req, res, next) => {
    return ParticipatesServices.getParticipate(req.params.transactionId, req.params.participantId)
        .then((participates) => {
            res.json(participates)
        })
        .catch(error => next(error))
}

const createParticipant = async (req, res) => {
    let transactionId = req.body.transactionId;
    let participantId = req.body.participantId;
    let participantTotal = req.body.participantTotal;
    const participant = {transactionId, participantId, participantTotal};
    try {
        const createParticipant = ParticipatesServices.createParticipant(participant)
        res.json(createParticipant)
        console.log("participant added")
    }
    catch (err) {
        console.log("controller error: " + error)
    }
}

module.exports = {
    createParticipant,
    getParticipate
}