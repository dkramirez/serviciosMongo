const {Schema,  model}= require('mongoose');

const CandidatoSchema = Schema({


    nombre: {
        type: String,
        require: true
    },

    apellido: {
        type: String,
        require: true
    },
    fechaNacimiento: {
        type: String,
        require: true
    },
    empleoActual: {
        type: String,
        require: true
    },
    expectativaSalarial: {
        type: Number,
        require: true
    },
    observaciones: {
        type: String,
    },
    identificacion: {
        type: String,
        require: true,
        unique:true
    }
});


module.exports = model('Candidato', CandidatoSchema);