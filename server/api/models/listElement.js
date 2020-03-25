const mongoose= require('mongoose');

const listElementSchema = mongoose. Schema({
    item:String,
    editMode:Boolean
});

const listElementModel = mongoose.model('listElement', listElementSchema)

module.exports = listElementModel;