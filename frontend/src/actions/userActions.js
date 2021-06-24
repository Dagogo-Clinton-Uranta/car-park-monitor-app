 import axios from 'axios'
 import {
         USER_LOGIN_REQUEST,
         USER_LOGIN_SUCCESS,
         USER_LOGIN_FAILURE,
         USER_LOGOUT,
         RELEASE_DRIVER_REQUEST,
         RELEASE_DRIVER_SUCCESS,
         RELEASE_DRIVER_FAILURE,
         USER_SEND_REQUEST,
         USER_PARK_ENTER_REQUEST,
         USER_PARK_ENTER_SUCCESS,
         USER_PARK_ENTER_FAILURE,
         USER_SEND_SUCCESS,
         USER_SEND_FAILURE,
         ADMIN_SEND_REQUEST,
         ADMIN_SEND_SUCCESS,
         ADMIN_SEND_FAILURE,
         USER_VERIFY_REQUEST,
         USER_VERIFY_SUCCESS,
         USER_VERIFY_FAILURE,
         USER_REGISTER_REQUEST,
         USER_REGISTER_SUCCESS,
         USER_REGISTER_FAILURE,
         
         USER_DETAILS_REQUEST,
         USER_DETAILS_SUCCESS,
         USER_DETAILS_FAILURE,
         USER_DETAILS_RESET,
         //USER_UPDATE_PROFILE_RESET,
         USER_UPDATE_PROFILE_REQUEST,
         USER_UPDATE_PROFILE_SUCCESS,
         USER_UPDATE_PROFILE_FAILURE,
         USER_LIST_REQUEST,
         USER_LIST_SUCCESS,
         USER_LIST_FAILURE,
         USER_LIST_RESET,
         USER_DELETE_REQUEST,
         USER_DELETE_SUCCESS,
         USER_DELETE_FAILURE,
         USER_UPDATE_REQUEST,
         USER_UPDATE_SUCCESS,
         USER_UPDATE_FAILURE
       } from '../constants/UserConstants.js'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants.js'

export const login = () => async(dispatch) =>{
   //redux thunk was used just now in the form of async (dispatch) above
  try {
    dispatch({type: USER_LOGIN_REQUEST})

    //we do config cus we wanna send the headers a content type of application/json
    /*const config = {
      headers:{ 
        'Content-Type':'application/json'
      }
    }*/
    const {data} = await axios.get('/api/users/login/'/*,{email},config*/)
    /*does axios return more than one variable, this one that we're destructuring, and takin data?*/

    dispatch({
              type: USER_LOGIN_SUCCESS,
              payload:data})

    /*localStorage.setItem('userInfo',JSON.stringify(data))*/

  }
   catch(error){
     dispatch({type:USER_LOGIN_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}



export const driverDetails = () => async(dispatch) =>{
  //redux thunk was used just now in the form of async (dispatch) above
 try {
   dispatch({type: RELEASE_DRIVER_REQUEST})

   //we do config cus we wanna send the headers a content type of application/json
   /*const config = {
     headers:{ 
       'Content-Type':'application/json'
     }
   }*/
   const {data} = await axios.get('/api/users/populateexit'/*,{email},config*/)
   /*does axios return more than one variable, this one that we're destructuring, and takin data?*/

   dispatch({
             type: RELEASE_DRIVER_SUCCESS,
             payload:data})

   /*localStorage.setItem('userInfo',JSON.stringify(data))*/

 }
  catch(error){
    dispatch({type:RELEASE_DRIVER_FAILURE,
              payload: error.response && error.response.data.message?
               error.response.data.message:error.message })
  }
}



export const clientSaid = (clientMessage, clientId,clientName) => async(dispatch) => {
    try{
      dispatch({type: USER_SEND_REQUEST})
      
      const config = {
        headers:{
          'Content-Type':'application/json'
        }
      }

      const {data} = await axios.patch('api/users/clientMessage',{clientMessage,clientId,clientName},config)
      
      dispatch({type:USER_SEND_SUCCESS,
      payload:data})

    }
   catch(error){
      dispatch({type:USER_SEND_FAILURE,
       payload:error.response && error.response.data.message?
      error.response.data.message:error.message})
   }
}

export const adminSaid = (bossMessage, clientId,clientEmail,clientName) => async(dispatch) => {
  try{
    dispatch({type: ADMIN_SEND_REQUEST}) /* WHY DO WE EVEN HAVE this reducer, when we dont call it from store */
    
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    
    const {data} = await axios.patch('/admin/user/:id/api/users/adminMessage',{bossMessage, clientId,clientEmail,clientName},config)
    
    dispatch({type:ADMIN_SEND_SUCCESS,
    payload:data})

  }
 catch(error){
    dispatch({type:ADMIN_SEND_FAILURE,
     payload:error.response && error.response.data.message?
    error.response.data.message:error.message})
 }
}

export const answerVerify = (clientId, personalIdQuery,personalIdAnswer) => async(dispatch) => {
  try{
    dispatch({type: USER_VERIFY_REQUEST})
    
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }

    const {data} = await axios.post('api/users/verify',{clientId,personalIdQuery,personalIdAnswer},config)
      
    /*can you send stuff in the second argument of your get request? - no, thats not the agreed upon convention */
    dispatch({type:USER_VERIFY_SUCCESS,
    payload:data})

  }
 catch(error){
    dispatch({type:USER_VERIFY_FAILURE,
     payload:error.response && error.response.data.message?
    error.response.data.message:error.message})
 }
}







export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})    //HE IS DOING THIS IN THE LOGOUT FILE BECAUSE, HE WANTS TO CLEAR OUT USER DETAILS AND ORDER LIST OF ANY PREVIOUSLY LOGGED IN USER, ALL IN ONE FELL SWOOP
    dispatch({type:ORDER_LIST_MY_RESET})
      dispatch({type:USER_LIST_RESET})
}
 

export const register = (zoneArea,zoneCounter,change) => async(dispatch)=> {
   //redux thunk was used just now in the form of async (dispatch) above
  try {
    dispatch({type: USER_REGISTER_REQUEST})

    //we do config cus we wanna send the headers a content type of application/json
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    const {data} = await axios.post('/api/users',{zoneArea,zoneCounter,change},config)
    //i'm gonna take a stab here and say that the third argument for axios is for setting header property

    dispatch({
              type: USER_REGISTER_SUCCESS,
              payload:data})

//cuz we also want to log the user in upon registration we dispatch user-login-success as well
    dispatch({
              type: USER_LOGIN_SUCCESS,
              payload:data})

    localStorage.setItem('userInfo',JSON.stringify(data))

  }
   catch(error){
     dispatch({type:USER_REGISTER_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}


export const createTicket = (object) => async(dispatch)=> {
  //redux thunk was used just now in the form of async (dispatch) above
 try {
   dispatch({type: USER_PARK_ENTER_REQUEST})

   //we do config cus we wanna send the headers a content type of application/json
   const config = {
     headers:{
       'Content-Type':'application/json'
     }
   }
   const {data} = await axios.post('/api/users/parkenter',object,config)
   //i'm gonna take a stab here and say that the third argument for axios is for setting header property

   dispatch({
             type: USER_PARK_ENTER_SUCCESS,
             payload:data})



 }
  catch(error){
    dispatch({type:USER_PARK_ENTER_FAILURE,
              payload: error.response && error.response.data.message?
               error.response.data.message:error.message })
  }
}


export const getUserDetails = (id) => async (dispatch,getState) => {
   
  try {
    dispatch({type: USER_DETAILS_REQUEST})

  const {userLogin:{userInfo}} = getState()
    //we do config cus we wanna send he headers a content type of application/json
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/users/${id}`,config)
    

    dispatch({
              type: USER_DETAILS_SUCCESS,
              payload:data})

  }
   catch(error){
     dispatch({type:USER_DETAILS_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}
export const updateUserProfile  = (user /*the entire user object*/) => async(dispatch,getState) => {
   //redux thunk was used just now in the form of async (dispatch) above
  try {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST})

     const {userLogin:{userInfo}} = getState()
    //we do config cus we wanna send the headers a content type of application/json
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.put(`/api/users/profile`,user,config)
    //i'm gonna take a stab here and say that the third argument for axios is for setting header property

    dispatch({
              type: USER_UPDATE_PROFILE_SUCCESS,
              payload:data})

  }
   catch(error){
     dispatch({type:USER_UPDATE_PROFILE_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}



export const listUsers  = () => async (dispatch,getState)=> {
   //redux thunk was used just now in the form of async (dispatch) above
  try {
    dispatch({type: USER_LIST_REQUEST})

     const {userLogin:{userInfo}} = getState()
    //we do config cus we wanna send he headers a content type of application/json
    const config = {
      headers:{

        Authorization:`Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.get(`/api/users`,config)
    //i'm gonna take a stab here and say that the third argument for axios is for setting header property

    dispatch({
              type: USER_LIST_SUCCESS,
              payload:data})

  }
   catch(error){
     dispatch({type:USER_LIST_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}


export const deleteUser  = (id) => async (dispatch,getState)=> {
   //redux thunk was used just now in the form of async (dispatch) above
  try {
    dispatch({type: USER_DELETE_REQUEST})

     const {userLogin:{userInfo}} = getState()
    //we do config cus we wanna send he headers a content type of application/json
    const config = {
      headers:{

        Authorization:`Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`/api/users/${id}`,config)
    //i'm gonna take a stab here and say that the third argument for axios is for setting header property

    dispatch({
              type: USER_DELETE_SUCCESS})

  }
   catch(error){
     dispatch({type:USER_DELETE_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}


export const updateUser  = (user) => async (dispatch,getState)=> {
   //redux thunk was used just now in the form of async (dispatch) above
  try {
    dispatch({type: USER_UPDATE_REQUEST})

     const {userLogin:{userInfo}} = getState()
    //we do config cus we wanna send he headers a content type of application/json
    const config = {
      headers:{
     'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    const{data} = await axios.put(`/api/users/${user._id}`, user,config)
    //i'm gonna take a stab here and say that the third argument for axios is for setting header property

    dispatch({  type: USER_UPDATE_SUCCESS})

    dispatch({  type: USER_DETAILS_SUCCESS , payload:data})

  }
   catch(error){
     dispatch({type:USER_UPDATE_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}
