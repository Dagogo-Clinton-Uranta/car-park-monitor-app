import React, {useState,useEffect} from 'react'

import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
//import {getUserDetails, updateUserProfile} from '../actions/userActions.js'
import {saveShippingAddress} from '../actions/cartActions.js'
//savePaymentMethod,


const ShippingScreen = ({history}) => {
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart



      const[address, setAddress] =useState(shippingAddress.address) //the useState values were all in quotation marks previously
      const[city, setCity] =useState(shippingAddress.city)
      const[postalCode,setPostalCode] =useState(shippingAddress.postalCode)
      const[country,setCountry] =useState(shippingAddress.country)


  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    window.history.pushState(null,'','/')
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    history.push('/placeorder')  //once again , this is to redirect the url to the next page
  }

  const userLogin = useSelector(state => state.userLogin)
  const {loading,error,userInfo} = userLogin

  useEffect(()=>{  
    if(!userInfo){
    history.push(`/login`)
    }

    
  })


      return(
        <FormContainer>
         <CheckoutSteps step1 step2/>
         <h1>Shipping</h1>

         <Form onSubmit={submitHandler}>
         <Form.Group controlId='address'>
{/*1*/}
                <Form.Label>  Address</Form.Label>
                <Form.Control type='text' placeholder="Enter address" value={address} required onChange={(e)=>setAddress(e.target.value)}></Form.Control>

         </Form.Group>

         <Form.Group controlId='city'>
{/*2*/}           <Form.Label>  City</Form.Label>
                <Form.Control type='text' placeholder="enter city" value={city} required onChange={(e)=>setCity(e.target.value)}></Form.Control>

        </Form.Group>


        <Form.Group controlId='postalCode'>

{/*3*/}          <Form.Label> Postal Code</Form.Label>
               <Form.Control type='text' placeholder="Enter postal code" value={postalCode} required onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>

        </Form.Group>

        <Form.Group controlId='country'>

{/*4*/}          <Form.Label>  Country</Form.Label>
               <Form.Control type='text' placeholder="enter country" value={country} required onChange={(e)=>setCountry(e.target.value)}></Form.Control>

        <Button type='submit' variant='primary'>Continue</Button>
      </Form.Group>



         </Form>


        </FormContainer>
      )


}

export default ShippingScreen
