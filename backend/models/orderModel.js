import mongoose from 'mongoose'
//const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema =  mongoose.Schema({

        
        
       bookingNumber:{type: String,required:true },
       truckCategory:{type: String  },
       truckNumber:{type: String  },
       containerNumber:{type: String  },
       entryTime:{type: String  },
       entryDate:{type: String  },
       exitDate:{type: String },
       exitTime:{type: String },
       parkZone:{type: String  },
       tagNumber:{type: Number  }
       

},{timestamps:true /*you want a createdAt? you add timestamps:true*/})


const Order = mongoose.model('Order',orderSchema)

/*the this Order you export, you set a new instance
 of it anytime you want to save it to database
 N.B MongoDB uses mongoose ORM unlinke SQL databases cuz
 sql databases come with a structure that you put in through a GUI*/

//exports.Order = Order
export default Order