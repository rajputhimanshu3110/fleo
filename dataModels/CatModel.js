const mongoose = require('mongoose')
const { Schema } = mongoose;

const catSchema = new Schema({
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'parent',
        default:"No Parent"
    },
    categoryName:{
        type:String,

    },
    level:{
        type:Number,
    },
    targetSale:{
        type:Number,
    },
    currentSale:{
        type:Number,
    },
    progress:{
        type:Number,
    },
    color:{
        type:String,
    },
    progressLabel:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('category', catSchema);