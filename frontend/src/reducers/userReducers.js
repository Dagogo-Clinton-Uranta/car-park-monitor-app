import {USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGIN_FAILURE,
        USER_LOGOUT,
        USER_SEND_REQUEST,
        USER_SEND_SUCCESS,
        USER_SEND_FAILURE,
        USER_VERIFY_REQUEST,
        USER_VERIFY_SUCCESS,
        USER_VERIFY_FAILURE,
        ADMIN_SEND_REQUEST,
        ADMIN_SEND_SUCCESS,
        ADMIN_SEND_FAILURE,
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAILURE,
        USER_DETAILS_REQUEST,
        USER_DETAILS_SUCCESS,
        USER_DETAILS_FAILURE,
        USER_DETAILS_RESET,
        USER_UPDATE_PROFILE_REQUEST,
        USER_UPDATE_PROFILE_SUCCESS,
        USER_UPDATE_PROFILE_FAILURE,
        USER_UPDATE_PROFILE_RESET,
        USER_LIST_REQUEST,
        USER_LIST_SUCCESS,
        USER_LIST_FAILURE,
        USER_LIST_RESET,
        USER_DELETE_REQUEST,
        USER_DELETE_SUCCESS,
        USER_DELETE_FAILURE,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
        USER_UPDATE_FAILURE,
        USER_UPDATE_RESET
      } from '../constants/UserConstants.js'


export const  userLoginReducer = (state={},action) => {
  switch(action.type){
    case USER_LOGIN_REQUEST : return {loading:true}

    case USER_LOGIN_SUCCESS: return{ loading:false, userInfo:action.payload}

    case USER_LOGIN_FAILURE: return{ loading:false, error:action.payload}

    case USER_LOGOUT: return{}
    default: return state

  }
}

//i am here , trying to create a reducer that'll handle when a user SENDS a message
export const userSendReducer = (state={},action)=> {
   switch(action.type){
     case USER_SEND_REQUEST: return { loading:true } 

     case USER_SEND_SUCCESS: return { loading:false, userMessage:action.payload }
       /*this user message, we never call it, cuz this reducers job was merely to update
     what was in the database for that user, we are just following convention,
     consider changing userMessage to success:true */
     case USER_SEND_FAILURE: return { loading:false, error:action.payload }
     
    default: return state
   }

}

export const adminSendReducer = (state={},action)=> {
  switch(action.type){
    case ADMIN_SEND_REQUEST: return { loading:true } 

    case ADMIN_SEND_SUCCESS: return { loading:false, adminMessage:action.payload }
     /*this admin message, we never call it, cuz this reducers job was merely to update
     what was in the database for that user, we are just following convention 
     consider changing admin message to success:true*/
    case ADMIN_SEND_FAILURE: return { loading:false, error:action.payload }
    
   default: return state
  }

}

export const userVerifyReducer = (state ={}, action) => {
   switch(action.type){
     case USER_VERIFY_REQUEST: return {loading:true, confirmedState:''}
     case USER_VERIFY_SUCCESS: return { loading:false, confirmedState:action.payload}
     case USER_VERIFY_FAILURE: return {loading:false, error:action.payload}
     default:return state
   }
}


export const  userRegisterReducer = (state={},action) => {
  switch(action.type){
    case USER_REGISTER_REQUEST : return {loading:true}

    case USER_REGISTER_SUCCESS: return{ loading:false, userInfo:action.payload}

    case USER_REGISTER_FAILURE: return{ loading:false, error:action.payload}


    default: return state

  }
}

export const  userDetailsReducer = (state={ user :{}},action) => {
  switch(action.type){
    case USER_DETAILS_REQUEST : return {...state, loading:true}

    case USER_DETAILS_SUCCESS: return{ loading:false, user:action.payload}

    case USER_DETAILS_FAILURE: return{ loading:false, error:action.payload}

    case USER_DETAILS_RESET: return{ user:{} }

    default: return state

  }
}
export const  userProfileUpdateReducer = (state={},action) => {
  switch(action.type){
    case USER_UPDATE_PROFILE_REQUEST : return {...state, loading:true}

    case USER_UPDATE_PROFILE_SUCCESS: return{ loading:false,success:true ,userInfo:action.payload}

    case USER_UPDATE_PROFILE_FAILURE: return{ loading:false, error:action.payload}

    case USER_UPDATE_PROFILE_RESET: return{ loading:false, error:action.payload}

    default: return state

  }
}

export const  userDeleteReducer = (state={ },action) => {
  switch(action.type){
    case USER_DELETE_REQUEST : return {...state, loading:true}

    case USER_DELETE_SUCCESS: return{ loading:false,success:true }

    case USER_DELETE_FAILURE: return{ loading:false, error:action.payload}



    default: return state

  }
}


export const  userUpdateReducer = (state={user:{} },action) => {
  switch(action.type){
    case USER_UPDATE_REQUEST : return {...state, loading:true}

    case USER_UPDATE_SUCCESS: return{ loading:false,success:true }

    case USER_UPDATE_FAILURE: return{ loading:false, error:action.payload}

    case USER_UPDATE_RESET: return{ user:{}}


    default: return state

  }
}

export const  userListReducer = (state={ users:[]},action) => {
  switch(action.type){
    case USER_LIST_REQUEST : return { loading:true}

    case USER_LIST_SUCCESS: return{ loading:false,users:action.payload}

    case USER_LIST_FAILURE: return{ loading:false, error:action.payload}

    case USER_LIST_RESET: return{ users:[]} 

    default: return state

  }
}

  
