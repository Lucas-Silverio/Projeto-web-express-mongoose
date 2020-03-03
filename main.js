require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false  })
const db = mongoose.connection
db.on('error',(error) => console.log(error))
db.once('open', () => console.log('Conectado ao banco de dados.'))

app.use(express.json())

const musicaRota = require('./rotas/musicaRouter')
app.use('/musicas', musicaRota)

app.listen(process.env.PORT, () => console.log("Server iniciado."))