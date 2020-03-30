const express = require('express');
const router = express.Router();
const listElementModel = require('../models/listElement');

router.get('/', (req,res,next) => {     //  найти все элементы
    listElementModel.find({})
        .then(listElement =>{
            res.send(listElement)
        })
})

router.post('/', (req,res,next) => {    //ОБ создать новый элемент
    listElementModel.create(req.body)
        .then(listElement => {
            res.send(listElement)
        })
})

router.patch('/:id', (req,res,next) => {    //НОБ найти элемент по id и обновить
    listElementModel.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            listElementModel.findOne({_id: req.params.id})
                .then(listElement => {
                    res.send(listElement);
                })
        })
})

router.delete('/:id', (req,res,next) => {    //ОБ удалить элемент по id 
    listElementModel.deleteOne({_id: req.params.id})
        .then(listElement => {
            res.send(listElement)
        })
})

module.exports = router;