import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {PayPalButton} from 'react-paypal-button-v2'
import { Button, Row ,Col ,Form, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
//import {getUserDetails, updateUserProfile} from '../actions/userActions.js'
import {getOrderDetails,payOrder,deliverOrder,merchantApproveOrder/*,merchantLockOrder*/} from '../actions/orderActions.js'
import Loader from '../components/Loader.js'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants.js'  //HE MADE AN EXCEPTION HERE DISPATCHING STRAIGHT FROM CONSTANTS WITHOUT CALLING ACTIONS, TO MAKE THINGS FASTER


const OrderScreen =  ({match,history}) => {
     const [sdkReady,setSdkReady] = useState('false') // this is our piece of local state for when the SDK is ready



   const orderId = match.params.id
   const dispatch = useDispatch()
  //const cart = useSelector(state => state.cart) come back and check why you commented this out

 const [merchantProductsArray,setMerchantProductsArray] = useState('') /*i never actually change the state of this */
 const [promisedQtyArray,setPromisedQtyArray] = useState('')
 const [committedValue, setCommittedValue] = useState('')
 const [productId,setProductId] = useState('')
 const [highlight,setHighlight] = useState('13px')
 const [colour, setColour] = useState('black')
  const orderDetails = useSelector((state) => state.orderDetails )
  const {order,loading,error} = orderDetails
   /*console.log(order)*/
  
 

   

   const userLogin = useSelector((state) => state.userLogin )
  const {userInfo} = userLogin

  const orderPay = useSelector((state) => state.orderPay )
  const {loading:loadingPay, success:successPay} = orderPay //this is renaming what you destructured, not making a new object

  const orderDeliver = useSelector((state) => state.orderDeliver )
  const {loading:loadingDeliver, success:successDeliver} = orderDeliver

if(!loading){
  //calculating the prices for orders
 const addDecimals = (num) => { return(Math.round(num*100)/100).toFixed(2) }

 order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item)=>acc +item.price*item.qty,0))
 order.promisedQtyArray = promisedQtyArray
 order.merchantProductsArray = merchantProductsArray
 /*order.initalState = order.orderItems.filter((item) => (item.vendor === userInfo.name)).map((item) => (item.promisedQty))*/
}

 const initialState = function(order,item){
  const vendorArray = order.orderItems.filter((item) => (item.vendor === userInfo.name))
  setMerchantProductsArray(vendorArray)
  const promisedArray =  order.orderItems.filter((item) => (item.vendor === userInfo.name)).map((item) => (promisedQtyArray[vendorArray.indexOf(item)]))
  setPromisedQtyArray(promisedArray)
  console.log(typeof(promisedQtyArray),promisedQtyArray)
 }



 const liveUpdate =function(e,item){
   /*const vendorArray = order.orderItems.filter((item) => (item.vendor === userInfo.name))
    setMerchantProductsArray(vendorArray)*/
/*const copyArray =  order.orderItems.filter((item) => (item.vendor === userInfo.name)).map((item) => (item.promisedQty)) /*i need to call this ONCE,not everytime the function is called so bring it out of this function */
             const copyArray = promisedQtyArray         
         copyArray[merchantProductsArray.indexOf(item)] = Number(e.target.value)
    
                     setPromisedQtyArray(copyArray)
                     /*console.log(promisedQtyArray,merchantProductsArray)*/
                     console.log(copyArray,promisedQtyArray)
                    }

//AN ARRAY TO CORRESPOND WITH THE LENGTH THE VENDORS ITEMS THAT ARE DISPLAYED ON SCREEN, SO WE CAN EASILY CHANGE ITEM AMOUNTS ON SCREEN
/*let promisedQtyArray = order.orderItems.filter((item) => (item.vendor === userInfo.name)).map((item, index) =>(
  0
))*/

//AN ARRAY TO FILTER ORDER ITEMS THAT HAVE A PARTICULAR VENDOR, TO HELP US PICK promisedQtyArray element, in the order items  
/*const merchantProductsArray =  order.orderItems.filter((item) => (item.vendor === userInfo.name))*/

/*useEffect(()=>{
  if(!order){promisedArray = []}
  else{ promisedArray =  order.orderItems.filter((item) => (item.vendor === userInfo.name)).map((item) => (item.promisedQty))
setPromisedQtyArray(promisedArray)}

  if(!order){vendorArray =[]}
  else{vendorArray=order.orderItems.filter((item) => (item.vendor === userInfo.name))}
  setMerchantProductsArray(vendorArray)
  

},[order,promisedArray,vendorArray])*/





useEffect(()=> { 
       if(!userInfo){
         history.push('/login')
       }
      
       /*setPromisedQtyArray(order.orderItems.filter((item) => (item.vendor === userInfo.name)).map((item, index) =>(
        0
      ))) 
       setMerchantProductsArray(order.orderItems.filter((item) => (item.vendor === userInfo.name)))*/

  const addPayPalScript = async () => {
    const {data:clientId} = await axios.get('/api/config/paypal')
    const script = document.createElement('script') //this script being created will not be in the source code, cuz it comes to life AFTER the source code loads
    script.type ='text/javascript'
    document.body.appendChild(script)
    script.async=true
    script.onload =()=> {  
        setSdkReady(true)
    }
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}` //this is the software development kit that paypal gives us
    
  }


  if(!order||successPay||successDeliver){
    dispatch({type:ORDER_PAY_RESET})
    dispatch({type:ORDER_DELIVER_RESET})  //AGAIN HE MADE AN EXCEPTION HERE AND DISPATCHED STRAIGHT FROM CONSTANTS SO HE CAN KEEP IT SHORT

    dispatch(getOrderDetails(orderId))}

  else if(!order.isPaid){
    if(!window.paypal){
      addPayPalScript()
    }
    else{ setSdkReady(true) }
  }
},[dispatch,orderId,successPay,successDeliver,order,history,userInfo])

const successPaymentHandler = (paymentResult) => {
   console.log(paymentResult)
  dispatch(payOrder(orderId, paymentResult))

}

const deliverHandler = ()=> {
  dispatch(deliverOrder(order))
}

const submitHandler = (e) => {
    e.preventDefault()
    if( promisedQtyArray==='' ){window.alert('please select a value before committing!')}
    else if(typeof((promisedQtyArray.reduce((acc, item)=>acc +item,0)))!=='number'){window.alert('You cannot commit zero,please contact admin if you are out of stock')}
    else{dispatch(merchantApproveOrder(order._id, productId, committedValue))}
}
 /*is there a factor of 18/19 to consider for, --yes */
/*const merchantTotal = order.orderItems.filter((item) => (item.vendor === userInfo.name)).reduce((acc, item)=>acc +(item.price*item.qty),0)*/

        return loading ?( <Loader/> ):error ?( <Message variant='danger'>{error} </Message>):
(<>

    <h1>Order ID: {order._id}</h1>
    <Row>
     <Col md={8}>

      <ListGroup variant="flush">
       <ListGroup.Item>
         <h2>Delivery</h2>
        <p> {userInfo.isMerchant||userInfo.isAdmin?(<strong>Order placed by:</strong>):(<strong>Name:</strong>) }{'   '}{order.user.name}</p>

       { !userInfo.isMerchant &&
       <>
       <p> <strong>Email:</strong>{' '} <a href= {`mailto:${order.user.email}`}>{order.user.email}</a> </p>
          <p>
         <strong>Address:</strong>
         {order.shippingAddress.address},{order.shippingAddress.city}{' '},
         {order.shippingAddress.postalCode}{' '},{order.shippingAddress.country}
         </p>
         
      </> }

         {order.isDelivered ?<Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                        <Message variant='danger'> Not delivered</Message> }

          </ListGroup.Item>

          {/*<ListGroup.Item>
           <h2>Payment Method</h2>

            <p>
            <strong>Method:</strong>
            {order.paymentMethod}
            </p>
       {order.isPaid ?<Message variant='success'>Paid on {order.paidAt}</Message> :
                      <Message variant='danger'> Not paid</Message> }
           </ListGroup.Item>*/}

           <ListGroup.Item>
           <ListGroup>
             <ListGroupItem>
            <h2>Order Items</h2>
          <Row>
          {!userInfo.isMerchant && <Col md={2}>S/N</Col>}
          <Col md={2}>Item</Col>
          <Col md={2}>Vendor</Col>
          {userInfo.isMerchant?(<Col md={4}>How many can you fulfill?</Col>):(userInfo.isAdmin && <Col md={2}>Merchant's promised amount)</Col>)}
          {userInfo.isMerchant && <Col md={2}>Item Total</Col>}
          
          {!userInfo.isMerchant && <Col md={2}>Total</Col>}
          
          </Row>
          </ListGroupItem>
          </ListGroup>
          { order.orderItems.length === 0 ? ( <Message>Order is empty </Message>):(userInfo.isMerchant ?
            (<>
               
            <ListGroup variant="flush">
              { 
                /*merchantItems = order.orderItems.filter((item) => (item.vendor === userInfo.vendor))*/
                order.orderItems.filter((item) => (item.vendor === userInfo.name)).map((item, index) =>(
                   
                <ListGroup.Item key ={index}>
                <Row>
                {/*<Col md={2}>{index + 1}</Col>*/}
                 <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded/>
                  <Link to={`product/${item.product}`/*remember product property is the id in the cart*/}>
                   {item.name}
                  </Link>
                  </Col>
                  <Col md={2}>
                   {item.vendor}
                   </Col>
                   
                   <Col md={4}>
                 <Form className="form-inline" onSubmit={submitHandler}>
                   
                   <Form.Group>
                   <Form.Row>
                   <Col md={2}>
                   <Form.Control as='select' defaultValue={0} onMouseEnter ={(e)=>{initialState(order,item)}} onChange ={(e)=>{   
                                                                   liveUpdate(e,item) 
                                                                   setCommittedValue(Number(e.target.value))
                                                                   setProductId(item.product)
                                                                                
                                                                                }}>
          {[...Array(item.qty+1).keys()].map((x) =>(
            <option key={x} value={x} disabled={item.merchantPromise} >
             {x}
            </option>
             
          ))}
               
        </Form.Control>
        
                  </Col>
                   
                  </Form.Row>
                  </Form.Group>
                    
                   <Form.Group>
                   <Form.Row>
                   
                   <Col md={{span:2,offset:2}}>
                   
                      <Button type='submit' variant='primary' className='btn-sm' onMouseDown={(e)=>{ /*setHighlight('16px') setColour('green')*/}} onMouseUp={(e)=>{/*setHighlight('13px') setColour('black')*/}}>
                       COMMIT
                    
                       </Button>
                   </Col>
                   </Form.Row>
                   </Form.Group>
              </Form>
              </Col>
                   <Col md={3} style={{fontSize:highlight, color:colour}}>
                   {promisedQtyArray===''?(item.promisedQty):(typeof(promisedQtyArray[merchantProductsArray.indexOf(item)])!=='number'? 0:promisedQtyArray[merchantProductsArray.indexOf(item)])} x ₦ {item.price} = ₦ {(promisedQtyArray===''?(item.promisedQty):(typeof(promisedQtyArray[merchantProductsArray.indexOf(item)])!=='number'? 0:promisedQtyArray[merchantProductsArray.indexOf(item)]))*item.price}
                   </Col>

                  </Row>

                </ListGroup.Item>
              ))}
              </ListGroup>
          </>):
            (
            <ListGroup variant="flush">
              {order.orderItems.map((item, index) =>(

                <ListGroup.Item key ={index}>
                <Row>
                <Col md={2}>{index + 1}</Col>
                 <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded/>
                  <Link to={`product/${item.product}`/*remember product property is the id in the cart*/}>
                   {item.name}
                  </Link>
                  </Col>
                  <Col md={2}>
                   {item.vendor}
                   </Col>
                   
                   {userInfo.isAdmin && <Col md={4}>
                   {item.promisedQty}
                   </Col>}

                   <Col md={3}>
                   {item.qty} x ₦ {item.price} = ₦ {item.qty*item.price}
                   </Col>

                  </Row>

                </ListGroup.Item>
                )
              )}
            </ListGroup>
           ))
               } 
               
               </ListGroup.Item>
      </ListGroup>
     </Col>

     <Col md={4}>
      {(!userInfo.isAdmin && !userInfo.isMerchant) && <Card>
          <ListGroup variant='flush'>
           <ListGroup.Item>
            <h2>Order Summary</h2>
           </ListGroup.Item>

           <ListGroup.Item>
            <Row>

             <Col> Items </Col>
             <Col>₦ {order.itemsPrice} </Col>
               
            </Row>
           </ListGroup.Item>

           

            <ListGroup.Item>
            <Row>

             <Col>Delivery Cost </Col>
             <Col>₦ {order.deliveryCost} </Col>

            </Row>
           </ListGroup.Item>

            

           <ListGroup.Item>
            <Row>

             <Col>Total </Col>
             <Col>₦ {order.totalPrice} </Col>

            </Row>
           </ListGroup.Item>

          {/*!order.isPaid && (
            <ListGroup.Item>
             {loadingPay && <Loader/>}
             {!sdkReady ?<Loader/> :(<PayPalButton amount ={order.totalPrice} onSuccess={successPaymentHandler}/>)  }
            </ListGroup.Item>
          )*/}


         </ListGroup>
       </Card> }
         
         
       { userInfo.isMerchant && <Card>
          <ListGroup variant='flush'>
           <ListGroup.Item>
            <h2>Order Summary</h2>
           </ListGroup.Item>

           <ListGroup.Item>
            <Row>

             <Col>Expected total: </Col>
             <Col>₦ {(order.orderItems.filter((item) => (item.vendor === userInfo.name)).reduce((acc, item)=>acc +(item.price*item.qty),0)).toFixed(2)} </Col> 
               
            </Row>
           </ListGroup.Item>

           <ListGroup.Item>   
            <Row>

             <Col> Total Fulfillable: </Col>
             <Col>₦ {order.itemsPrice} </Col> {/*gotta come change this, and effect the price in the total as well */}
               
            </Row>
           </ListGroup.Item>

            <ListGroup.Item>
            <Row>

             <Col>Delivery Cost: </Col>
             <Col>₦ {order.deliveryCost} </Col>

            </Row>
           </ListGroup.Item>

            

           <ListGroup.Item>
            <Row>

             <Col>Total </Col>
             <Col>₦ {(Number(order.deliveryCost) + Number(order.orderItems.filter((item) => (item.vendor === userInfo.name)).reduce((acc, item)=>acc +(item.price*item.qty),0))).toFixed(2)} </Col>

            </Row>
           </ListGroup.Item>

          {/*!order.isPaid && (
            <ListGroup.Item>
             {loadingPay && <Loader/>}
             {!sdkReady ?<Loader/> :(<PayPalButton amount ={order.totalPrice} onSuccess={successPaymentHandler}/>)  }
            </ListGroup.Item>
          )*/}


         </ListGroup>
       </Card> }



       {userInfo.isAdmin && <Card>
          <ListGroup variant='flush'>
           <ListGroup.Item>
            <h2>Teller Transactions</h2>
           </ListGroup.Item>

           <ListGroup.Item>
            <p>Please, ONLY perform these transactions when
            the respective merchants have confirmed that they can deliver the goods. </p>
           </ListGroup.Item>


           <ListGroup.Item>
            <Row>

             <Col>TO BridgeWay Co-operative Account: </Col>
             <Col>₦ {(order.itemsPrice * (1/19) ).toFixed(2)} </Col>

            </Row>
           </ListGroup.Item>
      {order.orderItems.map((item, index) =>(
            <ListGroup.Item  key ={index}>
            <Row>

             <Col> {index + 1}. TO {item.vendor} account:  </Col>
             <Col>₦ {((18/19) * item.price).toFixed(2) * item.qty } </Col>

            </Row>
           </ListGroup.Item>
           ))}
      
      <ListGroup.Item>
            <Row>

             <Col>To dispatch rider account: </Col>
             <Col>₦ {(Number(order.deliveryCost)).toFixed(2)} </Col>

            </Row>
           </ListGroup.Item>

        <ListGroup.Item>
            <Row>

             <Col>Total: </Col>
             <Col>₦ {(order.totalPrice).toFixed(2)} </Col>

            </Row>
           </ListGroup.Item>
      
           
          {/*!order.isPaid && (
            <ListGroup.Item>
             {loadingPay && <Loader/>}
             {!sdkReady ?<Loader/> :(<PayPalButton amount ={order.totalPrice} onSuccess={successPaymentHandler}/>)  }
            </ListGroup.Item>
          )*/}

       {loadingDeliver && <Loader/>}
      {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
        <ListGroup.Item>
        <Button type='button' className='btn btn-block' onClick={deliverHandler}> Mark As Delivered</Button>
        </ListGroup.Item>
      )}

         </ListGroup>
       </Card>}
     </Col>
    </Row>
   
   

</>)
}


export default OrderScreen;
