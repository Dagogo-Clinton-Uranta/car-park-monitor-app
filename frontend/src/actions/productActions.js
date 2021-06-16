import {PRODUCT_LIST_REQUEST,
        PRODUCT_LIST_SUCCESS,
        PRODUCT_LIST_FAILURE,
       // PRODUCT_LIST_BY_MERCHANT_REQUEST,
       // PRODUCT_LIST_BY_MERCHANT_SUCCESS,
       // PRODUCT_LIST_BY_MERCHANT_FAILURE,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAILURE,
        PRODUCT_DELETE_REQUEST,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_FAILURE,
        PRODUCT_CREATE_REQUEST,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_FAILURE,
        PRODUCT_UPDATE_REQUEST,
        PRODUCT_UPDATE_SUCCESS,
        PRODUCT_UPDATE_FAILURE,
        PRODUCT_CREATE_REVIEW_REQUEST,
        PRODUCT_CREATE_REVIEW_SUCCESS,
        PRODUCT_CREATE_REVIEW_FAILURE,
        //PRODUCT_CREATE_REVIEW_RESET,
        PRODUCT_TOP_REQUEST,
        PRODUCT_TOP_SUCCESS,
        PRODUCT_TOP_FAILURE

         } from '../constants/productConstants.js'

import axios from 'axios'


export const listProducts =(keyword='',pageNumber='', vendorName='') =>async(dispatch) => { /*this is an action creator, the object that is created is the action */
  /*redux-thunk middleware allows me to have a function within a function, as below*/
      
        try{
          dispatch({type:PRODUCT_LIST_REQUEST}/*try changing the route based on whether the user is merchant or is admin*/)

           const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&vendorName=${vendorName}`)

           dispatch({type:PRODUCT_LIST_SUCCESS,
                     payload:data
                   })

        }
        catch(error){
            dispatch({type:PRODUCT_LIST_FAILURE,
                      payload: error.response && error.response.data.message?
                       error.response.data.message:error.message })
        }
      }





export const listProductDetails =() => async (dispatch) =>{ /*this is an action creator, the object that is created is the action */
  /*redux-thunk middleware allows me to have a function withina function, as below*/
       
        try{
          dispatch({type:PRODUCT_DETAILS_REQUEST}/*THIS IS THE ACTION NOW*/)

           const {data} = await axios.get(`/api/products/tagcounter`)

           dispatch({type:PRODUCT_DETAILS_SUCCESS,
                     payload:data
                   })

        }
        catch(error){
            dispatch({type:PRODUCT_DETAILS_FAILURE,
                      payload: error.response && error.response.data.message?
                       error.response.data.message:error.message })
        }
      }




export const deleteProduct  = (id) => async(dispatch,getState) =>{

  try {
    dispatch({type: PRODUCT_DELETE_REQUEST})

     const {userLogin:{userInfo}} = getState()
    //we do config cus we wanna send he headers a content type of application/json
    const config = {
      headers:{

        Authorization:`Bearer ${userInfo.token}`
      }
    }
   await axios.delete(`/api/products/${id}`,config)
    //i'm gonna take a stab here and say that the third argument for axios is for setting header property

    dispatch({
              type: PRODUCT_DELETE_SUCCESS
            })
               /*this data variable is file specific*/
 


  }
   catch(error){
     dispatch({type:PRODUCT_DELETE_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}


export const createProduct  = () => async(dispatch,getState)=> {

  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST

    })

     const {userLogin:{userInfo}} = getState()
    //we do config cus we wanna send he headers a content type of application/json
    const config = {
      headers:{

        Authorization:`Bearer ${userInfo.token}`
      }
    }
   const{data} = await axios.post(`/api/products`,{},config) //we passed in a post request but we're not sending any data here, hence the empty object in the place of no data
    //i'm gonna take a stab here and say that the third argument for axios is for setting header property

    dispatch({
              type: PRODUCT_CREATE_SUCCESS,
              payload:data
            })
               /*this data variable is file specific*/



  }
   catch(error){
     dispatch({type:PRODUCT_CREATE_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}


export const updateProduct  = (product) => async (dispatch,getState)=> {

  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST

    })

     const {userLogin:{userInfo}} = getState()
    //we do config cus we wanna send he headers a content type of application/json
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }
   const{data} = await axios.put(`/api/products/${product.id}`,product,config) //we passed in a post request but we're not sending any data here, hence the empty object in the place of no data
    //i'm gonna take a stab here and say that the third argument for axios is for setting header property

    dispatch({
              type: PRODUCT_UPDATE_SUCCESS,
              payload:data
            })
               /*this data variable is file specific*/



  }
   catch(error){
     dispatch({type:PRODUCT_UPDATE_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}


export const createProductReview  = (productId,review) => async (dispatch,getState) =>{

  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST

    })

     const {userLogin:{userInfo}} = getState()
    //we do config cus we wanna send he headers a content type of application/json
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    await axios.post(`/api/products/${productId}/reviews`,review,config) //we passed in a post request but we're not sending any data here, hence the empty object in the place of no data
    //i'm gonna take a stab here and say that the third argument for axios is for setting header property

    dispatch({
              type: PRODUCT_CREATE_REVIEW_SUCCESS
            })
               


  }
   catch(error){
     dispatch({type:PRODUCT_CREATE_REVIEW_FAILURE,
               payload: error.response && error.response.data.message?
                error.response.data.message:error.message })
   }
}

export const listTopProducts =() => async(dispatch) =>{ 
       
        try{
          dispatch({type:PRODUCT_TOP_REQUEST}/*THIS IS THE ACTION NOW*/)

           const {data} = await axios.get(`/api/products/top`)

           dispatch({type:PRODUCT_TOP_SUCCESS,
                     payload:data
                   })

        }
        catch(error){
            dispatch({type:PRODUCT_TOP_FAILURE,
                      payload: error.response && error.response.data.message?
                       error.response.data.message:error.message })
        }
      }

