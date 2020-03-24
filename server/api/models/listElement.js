const mongoose= require('mongoose');

const listElementSchema = mongoose. Schema({
    text:String,
    editMode:Boolean
});

const listElementModel = mongoose.model('listElement', listElementSchema)

module.exports = listElementModel;