import React from 'react'

 import './bootstrap.min.css'
 import {Provider} from 'react-redux'
 import store from './store.js'
 import './index.css'
 import App from './App'

 const Final = () => {
  return(
    <Provider store={store}> 
    <App/>
   </Provider>
      )
 }

 export default Final