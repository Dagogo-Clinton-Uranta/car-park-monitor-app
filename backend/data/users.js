import bcrypt from 'bcryptjs'
//const bcrypt = require('bcryptjs')
const dummyPassword = '123456'
const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync(dummyPassword,salt)

const users = [
  {
    bookingNumber:'1000',
    truckNumber:'KC 254 EKT',
    containerNumber:'MMO48573',
    truckCategory:'EXPORT'
    /*isMerchant:false,
    userMessage:'hi',
    adminMessage:'hi',
    momFirstName:'Amelia',
    shoeSize:'44',
    closestFriend:'Jamil',
    childhoodStreet:'Eti-Osa Way',
    firstEmployment:'Niger Insurance'*/
  },

  {
    bookingNumber:'2000',
    truckNumber:'KS 569 APC',
    containerNumber:'FHC5948',
    truckCategory:'FLAT BED ENL'
    /*isMerchant:false,
    userMessage:'hi',
    adminMessage:'hi',
    momFirstName:'Amelia',
    shoeSize:'44',
    closestFriend:'Jamil',
    childhoodStreet:'Eti-Osa Way',
    firstEmployment:'Niger Insurance'*/
  },

  {
    bookingNumber:'3000',
    truckNumber:'JQ 733 PDP',
    containerNumber:'DJG5933',
    truckCategory:'FLAT BED APMT'
    /*isMerchant:false,
    userMessage:'hi',
    adminMessage:'hi',
    momFirstName:'Amelia',
    shoeSize:'44',
    closestFriend:'Jamil',
    childhoodStreet:'Eti-Osa Way',
    firstEmployment:'Niger Insurance'*/
  }
]

//exports.users =users;
export default users