const mongoose = require('mongoose')

const musicasSchema = new mongoose.Schema({
    titulo : {
        type: String,
        required: true
    },
    anoLancamento : {
        type: Number,
        min : 0,
        max : 9999,
        default: new Date().getFullYear()
    },
    dataRegistro : {
        type: Date,
        default: Date.now
    },
    autor: {
        type: String,
        required: true
    },
    genero: {
        type: [String],
        required: false
    },
    award: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Musica',musicasSchema)