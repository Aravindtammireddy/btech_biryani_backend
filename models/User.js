const mongoose = require('mongoose')

const Userschema = mongoose.Schema({
    name : {
        type : String , 
        required : [true,'please enter your name'],
        
    },
    hostel :
    {type : String,
     required:[true,'please enter your hostel name']},
    
    phonenumber : {
        type : String,
        required:[true,'please entee a valid phone number']
    },
    slot : {
        type : String ,
        required : [true ,'please enter the amount you paid']
    },
    progress:{
        type:Boolean,
        default:false
    },

    transactionID : {
        type : String,
        required : [true,'please enter the transaction id of your payment']
    } ,
    items : {
        type : Array,
        required : [true, 'cart data required']
    }

})

module.exports = mongoose.model("User",Userschema);