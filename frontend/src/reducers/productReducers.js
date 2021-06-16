 import {PRODUCT_LIST_REQUEST,
         PRODUCT_LIST_SUCCESS,
         PRODUCT_LIST_FAILURE,
         PRODUCT_LIST_BY_MERCHANT_REQUEST,
         PRODUCT_LIST_BY_MERCHANT_SUCCESS,
         PRODUCT_LIST_BY_MERCHANT_FAILURE,
         PRODUCT_DETAILS_REQUEST,
         PRODUCT_DETAILS_SUCCESS,
         PRODUCT_DETAILS_FAILURE,
         PRODUCT_DELETE_REQUEST,
         PRODUCT_DELETE_SUCCESS,
         PRODUCT_DELETE_FAILURE,
         PRODUCT_CREATE_REQUEST,
         PRODUCT_CREATE_SUCCESS,
         PRODUCT_CREATE_FAILURE,
         PRODUCT_CREATE_RESET,
         PRODUCT_UPDATE_REQUEST,
         PRODUCT_UPDATE_SUCCESS,
         PRODUCT_UPDATE_FAILURE,
         PRODUCT_UPDATE_RESET,
         PRODUCT_CREATE_REVIEW_REQUEST,
         PRODUCT_CREATE_REVIEW_SUCCESS,
         PRODUCT_CREATE_REVIEW_FAILURE,
         PRODUCT_CREATE_REVIEW_RESET,
         PRODUCT_TOP_REQUEST,
         PRODUCT_TOP_SUCCESS,
         PRODUCT_TOP_FAILURE} from '../constants/productConstants.js'


export const  productListReducer = (state={products:[]},action) => {
  switch(action.type){
    case PRODUCT_LIST_REQUEST : return {loading:true,products:[]}

    case PRODUCT_LIST_SUCCESS: return{ loading:false, products:action.payload.products, pages:action.payload.pages ,page:action.payload.page} //action.payload.pages used to be in an array but i removed it cus i saw brad remove it, if you have a problem, consider putting it back

    case PRODUCT_LIST_FAILURE: return{ loading:false, error:action.payload}

    default: return state

  }
}

 export const productListByMerchantReducer = (state = {products:[]},action) => {
   
   switch(action.type){
      case PRODUCT_LIST_BY_MERCHANT_REQUEST:return { loading: true , products:[]}
      case PRODUCT_LIST_BY_MERCHANT_SUCCESS:return {loading:false , products: action.payload.products, pages:action.payload.pages, page:action.payload.page}
      case PRODUCT_LIST_BY_MERCHANT_FAILURE:return {loading:false, error:action.payload}

      default: return state
   }

} 

export const  productDeleteReducer = (state={ },action) => {
  switch(action.type){
    case PRODUCT_DELETE_REQUEST : return {loading:true,...state}

    case PRODUCT_DELETE_SUCCESS: return{ loading:false, success:true}

    case PRODUCT_DELETE_FAILURE: return{ loading:false, error:action.payload}

    default: return state

  }
}



export const  productCreateReducer = (state={ },action) => {
  switch(action.type){
    case PRODUCT_CREATE_REQUEST : return {loading:true,...state}

    case PRODUCT_CREATE_SUCCESS: return{ loading:false, success:true, product:action.payload}

    case PRODUCT_CREATE_FAILURE: return{ loading:false, error:action.payload}

    case PRODUCT_CREATE_RESET: return{ }

    default: return state

  }
}




export const  productUpdateReducer = (state={ product:{}},action) => {
  switch(action.type){
    case PRODUCT_UPDATE_REQUEST : return {loading:true,...state}

    case PRODUCT_UPDATE_SUCCESS: return{ loading:false, success:true, product:action.payload}

    case PRODUCT_UPDATE_FAILURE: return{ loading:false, error:action.payload}

    case PRODUCT_UPDATE_RESET: return{product:{} }

    default: return state

  }
}


export const  productCreateReviewReducer = (state={},action) => {
  switch(action.type){
    case PRODUCT_CREATE_REVIEW_REQUEST : return {loading:true,...state}

    case PRODUCT_CREATE_REVIEW_SUCCESS: return{ loading:false, success:true }

    case PRODUCT_CREATE_REVIEW_FAILURE: return{ loading:false, error:action.payload}

    case PRODUCT_CREATE_REVIEW_RESET: return{ }

    default: return state

  }
}


export const  productTopRatedReducer = (state={products:[]},action) => {
  switch(action.type){
    case PRODUCT_TOP_REQUEST : return {loading:true, products:[]}

    case PRODUCT_TOP_SUCCESS: return{ loading:false, products:action.payload}

    case PRODUCT_TOP_FAILURE: return{ loading:false, error:action.payload}

    default: return state

  }
}

export const  productDetailsReducer = (state={product:{reviews: [] } },action) => {
  switch(action.type){
    case PRODUCT_DETAILS_REQUEST : return {loading:true, ...state}

    case PRODUCT_DETAILS_SUCCESS: return{ loading:false, product:action.payload}

    case PRODUCT_DETAILS_FAILURE: return{ loading:false, error:action.payload}

    default: return state

  }
}