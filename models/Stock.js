const mongoose = require('mongoose')

const Stockschema = mongoose.Schema({
    name : {
        type : String , 
        required : [true,'please enter the biryani name'],
        
    },
    quantity : {
        type : Number,
        required : [true , 'please enter the amount of this type available']
    }

})

module.exports = mongoose.model("Stock",Stockschema);