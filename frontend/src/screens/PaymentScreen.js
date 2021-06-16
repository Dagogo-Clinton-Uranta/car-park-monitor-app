import React ,{useState} from 'react'

import {Form, Button,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
//import {getUserDetails, updateUserProfile} from '../actions/userActions.js'
import {savePaymentMethod} from '../actions/cartActions.js'



const PaymentScreen = ({history}) => {
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  if(!shippingAddress){
    history.push('/shipping')
  }

const[paymentMethod, setPaymentMethod] =useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')  //once again , this is to redirect the url to the next page
  }

      return(
        <FormContainer>
         <CheckoutSteps step1 step2 step3/>
         <h1>Payment Method</h1>

   <Form  onSubmit={submitHandler}>

    <Form.Group>
     <Form.Label as='legend'>
      Select Method
     </Form.Label>

     <Col>
    <Form.Check type='radio' label='Paypal or Credit Card' id='PayPal' name='paymentMethod' value='Paypal' checked onChange={(e)=>setPaymentMethod(e.target.value)} >

    </Form.Check>
     </Col>
   </Form.Group>
    {/* <Form.Group>    IF YOU WANT TO ADD OTHER PAYMENT METHODS, THIS IS HOW YOU WOULD DO IT the checked property of form.check is missing cus we start with paypal as the default checked one, not this one
      <Form.Label as='legend'>
       Select Method
      </Form.Label>
     </Form.Group>
      <Col>
     <Form.Check type='radio' label='Paypal or Credit Card' id='Stripe' name='paymentmethod' value='stripe'  onChange={(e)=>setPaymentMethod(e.target.value)} >
       
     </Form.Check>
    </Col> */}

<Button type='submit' variant='primary'>Continue</Button>

  </Form>


        </FormContainer>
      )


}

export default PaymentScreen
