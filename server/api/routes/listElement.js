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

router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    if (id === 'admin'){
        res.status(200).json({
            message:"You are admin",
            ID:id
        });
    } else {
        res.status(200).json({
            message:"You are current user",
            ID:id
    });
    }
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