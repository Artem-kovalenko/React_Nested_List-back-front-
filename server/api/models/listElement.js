const mongoose= require('mongoose');

const listElementSchema = mongoose. Schema({
    item:String,
    editMode:Boolean,
    serialNumber:Number,
    childs:Array
});

const listElementModel = mongoose.model('listElement', listElementSchema)

module.exports = listElementModel;