const express = require('express')
const router = express.Router()
const Musica = require('../models/musica')


router.get('/', async (req, res) => {
    try {
        const musicas = await Musica.find()
        res.json(musicas)
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
})

router.post('/', async (req,res) => {
    const musica = new Musica({
        titulo : req.body.titulo,
        anoLancamento : req.body.anoLancamento,
        dataRegistro : req.body.dataRegistro,
        autor : req.body.autor,
        genero : req.body.genero,
        award : req.body.award
    })

    try {
        const novaMusica = await musica.save()
        res.status(201).json(novaMusica)
    } catch (error) {
        res.status(400).json({ message : error.message })
    }
})

router.get('/:id', getMusica, async (req, res) => {
    res.send(res.musica)
})

router.patch('/:id', getMusica, async (req, res) =>{
    try {
        Musica.findOneAndUpdate({_id:req.params.id}, req.body, { upsert : true, new : true}, (err,mm)=>{
            res.json(mm);
        });
    } catch (error) {
        res.status(400).json({ message : error.message })
    }
})

router.delete('/:id', getMusica, async (req, res) => {
    try {
        await res.musica.remove()
        res.json({ message: "Música deletada com sucesso."})
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
})

async function getMusica(req, res, next){
    let musica
    try {
        musica = await Musica.findById(req.params.id)
        if(musica == null){
            return res.status(404).json({ message : 'Música não encontrada.'})
        }
    } catch (error) {
        return res.status(500).json({ message : error.message })
    }

    res.musica = musica
    next()
}

module.exports = router