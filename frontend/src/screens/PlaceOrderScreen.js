import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { Button, Row ,Col, Form , ListGroup, Image, Card, FormControl} from 'react-bootstrap'
//you may need to import form container, seeing as you have used a form
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'

import {createOrder} from '../actions/orderActions.js'
import {answerVerify} from '../actions/userActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js'



const PlaceOrderScreen =  ({history}) => {
   const dispatch = useDispatch()
   const cart = useSelector(state => state.cart)
   const userLogin = useSelector(state => state.userLogin)
   const {loading,error:error2,userInfo} = userLogin
   
  console.log(cart)

   const clientId = userInfo._id
   const userVerify = useSelector(state => state.userVerify)
   const {loading:loading1 , confirmedState} = userVerify

   const orderCreate = useSelector(state => state.orderCreate )
  const {order,success,error} = orderCreate /*come change this back to error later */
  
// confirmedStates.confirmedStates is initially empty and that breaks the whole thing -confirmedState that you just extracted, is an object mind you, so its confirmedState.confirmedState

  //STATE REGARDING USER CONFIRMATION
  const [consentQuestion, setConsentQuestion] =useState('hidden') 
  const [confirmQuestion ,setConfirmQuestion]=useState('')
  const [confirmedStates,setConfirmedStates] = useState('')
  const [personalIdAnswer, setpersonalIdAnswer] = useState('')
  const [confirmedMessage, setConfirmedMessage] = useState('')
  const [presentQuestion, setPresentQuestion] = useState('')
  const [personalIdQuery, setPersonalIdQuery] = useState('')
  const [proceed,setProceed] = useState('')
  /*THE FACE OF THE BUTTON UNDER THE CONFIRM SECTION 
  i have put this in the use effect, lets see if it works well*/

  let buttonLabel = 'Send'
  if(confirmedStates === 'true'){
   buttonLabel = 'PLACE ORDER'
  }else if(confirmedStates === 'false'){
     buttonLabel = 'TRY AGAIN'
  }else if(proceed === 'true'){
    buttonLabel = 'ORDER DETAILS'
 }
  else{buttonLabel='Send'}
    
  //CALCULATING THE PRICES
  const addDecimals = (num) => { return(Math.round(num*100)/100).toFixed(2) }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item)=>acc +item.price*item.qty,0))

    cart.deliveryCost = addDecimals(cart.itemsPrice > 10000 ? 0 : 500)

    /*cart.taxPrice = addDecimals(Number((0.10*cart.itemsPrice).toFixed(2)))*/

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.deliveryCost) /*+ Number(cart.taxPrice)*/).toFixed(2)
   //if your total price is looking funny, just unwrap addDecimals and wrap in .toFixed(2)

  
    
  useEffect(()=>{  
    if(!userInfo){
    history.push(`/login`)
    }
      
     
    if( confirmedState && confirmedState.confirmedState === 'true'){ 
    /*dispatch(createOrder({
      orderItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
       
      itemsPrice:cart.itemsPrice,
      deliveryCost:cart.deliveryCost,
      taxPrice:cart.taxPrice,
      totalPrice:cart.totalPrice
      
    }))*/
 
    setConfirmedStates('true')
    setConfirmedMessage('green banner')
    }
    else if( confirmedState && confirmedState.confirmedState === 'false'){
      setConfirmedStates('false')
      setConfirmedMessage('red banner')
    }
   
  

  },[confirmedState,confirmedStates,userInfo,dispatch,cart/*history,success,order._id*/])

  useEffect(()=>{
    if(order){
      setProceed('true')
      console.log(order)
    }
    else{
      console.log("ORDER IS STILL EMPTY!!")
    }
      
    /*window.history.pushState(null,'','/')*/
   },[order])

const showConsentHandler = () => {
  setConsentQuestion('visible')
}

const hideConsentHandler = () => {
  setConsentQuestion('hidden')
  setConfirmQuestion('hidden')
}

const confirmHandler = () => {
  setConfirmQuestion('visible')
  
  //RANDOM QUESTION CODE
  const randomNumber = Math.floor((Math.random()*5))
  const questionsArray = ['What is your mother\'s first name ?','What is your shoe size?','What is the name of your closest friend ?','What is the name of the street you lived on as a child ?','What is the name of the first place you worked at (employment) ?']
   const propertyArray = ['momFirstName','shoeSize','closestFriend','childhoodStreet','firstEmployment'] 
   
   const presentQuestion = questionsArray[randomNumber] 
   setPresentQuestion(presentQuestion) /*i did a little function scope here */

   const personalIdQuery = propertyArray[randomNumber]
   setPersonalIdQuery(personalIdQuery) /*i did a little function scope here (same principle)*/
}


   
   
   
/*maybe place this bit of code in a better position 
 if(confirmedState === 'true'){
  setConfirmedMessage('green banner')

dispatch(createOrder({
  orderItems:cart.cartItems,
  shippingAddress:cart.shippingAddress,
  paymentMethod:cart.paymentMethod,
  itemsPrice:cart.itemsPrice,
  shippingPrice:cart.shippingPrice,
  taxPrice:cart.taxPrice,
  totalPrice:cart.totalPrice

}))
}
else if(confirmedState === 'false'){
setConfirmedMessage('red banner')
}
 */

const submitHandler = (e) => {
  e.preventDefault()

  /*I WANT THIS BUTTON TO SERVE MULTIPLE FUNCTIONS, FIRST OF WHICH IS TO CHECK IF THE PERSONS ANSWER MATCHES UP, VIA THE DISPATCH BELOW */
  if(confirmedStates === ''){dispatch(answerVerify(clientId,personalIdQuery, personalIdAnswer))
  
  }else if(confirmedStates === 'true'){
    dispatch(createOrder({
      orderItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
       /* i removed paymentMethod:cart.paymentMethod */
      itemsPrice:cart.itemsPrice,
      deliveryCost:cart.deliveryCost,
      taxPrice:cart.taxPrice,
      totalPrice:cart.totalPrice
      
    }))
      
      
   }
  else if(confirmedStates === 'false'){
   
     /*buttonLabel ='SEND'*/
    const randomNumber = Math.floor((Math.random()*5))
  const questionsArray = ['What is your mother\'s first name ?','What is your shoe size?','What is the name of your closest friend ?','What is the name of the street you lived on as a child ?','What is the name of the first place you worked at (employment) ?']
   const propertyArray = ['momFirstName','shoeSize','closestFriend','childhoodStreet','firstEmployment'] 
   
   const presentQuestion = questionsArray[randomNumber] 
   setPresentQuestion(presentQuestion) 

   const personalIdQuery = propertyArray[randomNumber]
   setPersonalIdQuery(personalIdQuery) 

   confirmedState.confirmedState = '' /*you gotta dispatch something here that'll make confirmedState.confirmedState === '' */
  setConfirmedMessage('')
  setConfirmedStates('')
  }

  /*if(proceed==='true'){
    history.push(`/order/${order._id}`)
  }*/
  
}
 

        return(
         <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
         <Col md={8}>

          <ListGroup variant="flush">
           <ListGroup.Item>
             <h2>Delivery</h2>
             <p>
             <strong>Address:</strong>
             {cart.shippingAddress.address},{cart.shippingAddress.city}{' '},
             {cart.shippingAddress.postalCode}{' '},{cart.shippingAddress.country}
             </p>
            </ListGroup.Item>

             {/* <ListGroup.Item>
               <h2>Payment Method</h2>
                <strong>Method:</strong>
                {cart.paymentMethod /*this item doesnt exist anymore }
             </ListGroup.Item> */}

             <ListGroup.Item>
              <h2>Order Items</h2>

               {cart.cartItems.length === 0 ? <Message>Your cart is empty </Message>:(
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) =>(

                    <ListGroup.Item key ={index}>
                    <Row>
                     <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                      <Link to={`product/${item.product}`/*remember product property is the id in the cart*/}>
                       {item.name}
                      </Link>
                      </Col>
                       <Col md={4}>
                       {item.qty} x ₦{item.price} = {item.qty*item.price}
                       </Col>

                      </Row>

                    </ListGroup.Item>

                  ))}
                </ListGroup>
               ) }
            </ListGroup.Item>
          </ListGroup>
         </Col>

         <Col md={4}>
           <Card>
              <ListGroup>
               <ListGroup.Item>
                <h2>Order Summary</h2>
               </ListGroup.Item>

               <ListGroup.Item>
                <Row>

                 <Col>Items </Col>
                 <Col>₦ {cart.itemsPrice} </Col>

                </Row>
               </ListGroup.Item>

               <ListGroup.Item>
                <Row>

                 <Col>Delivery Cost </Col>
                 <Col>₦ {cart.deliveryCost} </Col>

                </Row>
               </ListGroup.Item>

               {/*<ListGroup.Item>
                <Row>

                 <Col>Tax </Col>
                 <Col>₦ {cart.taxPrice} </Col>

                </Row>
               </ListGroup.Item> */}

               <ListGroup.Item>
                <Row>

                 <Col>Total </Col>
                 <Col>₦ {cart.totalPrice} </Col>

                </Row>
               </ListGroup.Item>
                {/*place error here*/}
                <ListGroup.Item>
                 {error&&<Message variant='danger'>{error} </Message>}
                </ListGroup.Item>

               <ListGroup.Item> <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0 || confirmedStates === 'true'} onClick={showConsentHandler}>
               Proceed to Place Order
               </Button>
               </ListGroup.Item>

             </ListGroup>
           </Card>
         
           {/*okay so I want this card to be activated when the place order button has been clicked*/
           /*there should be a consent radio button, that confirms for the user's permission, or hides*/
           /*the card if the user says no */}  
             { consentQuestion === 'visible' &&
               <>
             <Card>
               <ListGroup>
             <ListGroup.Item>
                <Row>

                 <Col>Do you agree to having ₦ {cart.totalPrice} taken from your account ?</Col>
                </Row>
          
               </ListGroup.Item>

               <ListGroup.Item>
                <Row>
                  <Col></Col>
                Yes{' '}
                  <Col>
                  <input type="radio"  id="yes" value="yes" onChange={confirmHandler}/>
                  </Col>
                 
                  No{' '}
                  <Col>
                  <input type="radio" id="no" value="no"  onChange={hideConsentHandler} />
                  </Col>
                  
                </Row>
          
               </ListGroup.Item>
               </ListGroup>
             </Card>
             </>}
             { confirmQuestion === 'visible' &&
               <>
             <Card>

             <ListGroup>
             <ListGroup.Item>
                <Row>

                 <Col><strong>Just so we know it's you:</strong></Col>
                </Row>
                {/*<br/>*/}
               </ListGroup.Item>
               </ListGroup>

               <ListGroup>
             <ListGroup.Item>
                <Row>

                 {/*<Col>{presentQuestion}</Col>*/}
                </Row>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='reply-message'>

           <Form.Label>{presentQuestion} </Form.Label>
            {
           confirmedMessage=== 'green banner'?
            (<Message variant='success'>Verified!</Message>):
            (proceed==='true'?(<Message variant='success'>Order Placed!</Message>):(confirmedMessage === 'red banner'?
            (<Message variant='danger'>Not verified. </Message>):
   (<Form.Control as ="textarea" variant='danger' rows={1} plaintext value = {personalIdAnswer} onChange ={(e)=>{setpersonalIdAnswer(e.target.value)}}></Form.Control>)))
            }
            {proceed==='true' &&(<Message variant='success'>Order Placed!</Message>)}
              
              
               {/*i hope to change the text-area to a message component,
                regardless of what comes back, if it's positive, it should close the whole
                thing, just like the no option does, but this time
                , disabling the place order button. if its negative, consider a fail message 
                saying "payment confirmation failed" where the payment confirmed would have been,
                maybe also close the whole thing */}
           <br/>
          {proceed==='' &&<Button type='submit' variant='primary'>{buttonLabel}</Button>}
           {'  '}
          {proceed==='true' && <LinkContainer to="/">
          <Button  variant='primary'>GO HOME</Button>
          </LinkContainer>}
          {'  '}
          {proceed==='true' && <LinkContainer to={`/order/${order._id}`}>
          <Button  variant='primary'>ORDER DETAILS</Button>
          </LinkContainer>}
          
         </Form.Group>
      </Form>
                <Row>
                  
                </Row>
               </ListGroup.Item>
               </ListGroup>
             </Card>
             </> }
         </Col>
        </Row>
         </>

        )
}


export default PlaceOrderScreen;
