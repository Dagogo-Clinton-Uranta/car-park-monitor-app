import React ,{ useEffect } from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Message.js'
import {listOrders} from '../actions/orderActions.js'





const OrderListScreen = ({history}) => { //he is taking location & history out of the props, normally it is props.location
  /*const [name,setName] = useState('')
  const [email,setEmail] = useState('')  //component level state right here, not application level state
  const [password,setPassword] = useState('')
  const [confirmpassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState(null)*/
  const dispatch = useDispatch() //dont forget that real dispatches only take place in action creators, you are only calling useDispatch here

  const orderList = useSelector(state => state.orderList);
  const {loading, error,orders } = orderList
  console.log(orders)

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo } = userLogin
   
  let vendorName =userInfo && userInfo.isMerchant ? userInfo.name : ''

  //THE LOGIC FOR CALCULATING THE TOTAL PRICE OF ITEMS THAT IS SPECIFIC TO EACH VENDOR
  /*const addDecimals = (num) => { return(Math.round(num*100)/100).toFixed(2) }
      
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item)=>acc +item.price*item.qty,0))*/

   

  useEffect( () => {
  if(userInfo){
  dispatch(listOrders(vendorName)) /*console.log('orders nigga')*/
  }else{
   history.push('/login')
  }
    }
  ,[dispatch,history,userInfo,vendorName]) //successDelete was passed into useEffect because youu want the list of users to reload, showing the effective delete


    return (
       <>
        <h1>Orders</h1>
      
        {userInfo.isMerchant && <p>Orders in green are newly placed orders from customers, please attend to them </p>}
        {userInfo.isAdmin && <h5> The colour codes below indicate
           the status of the order. They will change based on merchant/administrator actions </h5>}
        {userInfo.isAdmin && <p  style={{backgroundColor:'rgba(0, 255, 0, 0.2)', width:'50%'}}> Green - New orders, not checked by respective merchants </p>}
        {userInfo.isAdmin && <p style={{backgroundColor:'rgba(233, 212, 96, 0.4)',width:'50%'}}> Yellow - Some Merchants have viewed and committed to delivering their items, the order may still be put forth for delivery, but customers should to be informed on missing items </p>}
        {userInfo.isAdmin && <p style={{backgroundColor:'rgba(0, 0, 255, 0.2)',width:'50%'}}> Blue - All Merchants have committed to delivering their items </p>}
        {userInfo.isAdmin && <p > No Colour - Order has been dealt with and delivered, it may be deleted now </p>}
        {userInfo.isAdmin && <p style={{backgroundColor:'rgba(255, 0, 0, 0.2)',width:'50%'}}> Red - Administrator has not sent a dispatch rider before the expected date </p>}
        {loading ? <Loader/>:error ? <Message variant='danger'>{error}</Message>:(

        <Table striped border hover responsive className ='table-sm'>
         <thead>
          <tr>
           <th>ID</th>
           <th>USER</th>
           <th>DATE</th>
           {userInfo.isAdmin ?(<th>TOTAL</th>):(<th>TO RECEIVE:</th> )}{/*AS PER TOTAL PRICE*/}
           {/*<th>PAID</th>*/}
           <th>DELIVERED</th>
           <th></th>
         </tr>
         </thead>
         <tbody>
          {orders.map(order => ( 
            <tr key={order._id} style={{backgroundColor: userInfo.isMerchant && !(order.orderItems.filter((item) => (item.vendor === userInfo.name)).every((item) => (item.promisedQty !== 0))) && order.orderItems.filter((item) => (item.vendor === userInfo.name)).some((item) => (item.promisedQty !== 0))?'rgba(233, 212, 96, 0.4)':(order.orderItems.every((item) => (item.promisedQty === 0))? 'rgba(0, 255, 0, 0.2)':(userInfo.isAdmin && order.orderItems.some((item) => (item.promisedQty === 0))?'rgba(233, 212, 96, 0.4)':((userInfo.isAdmin && order.orderItems.every((item) => (item.promisedQty === item.qty)) && 'rgba(0, 0, 255, 0.2)'))))}}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0,10)}</td>
              <td>₦ {userInfo.isAdmin ? (order.totalPrice) : ((order.orderItems.filter((item) => (item.vendor === userInfo.name)).reduce((acc, item)=>acc +(item.price*item.qty),0)).toFixed(2))}</td>

              {/*<td>{order.isPaid ? (order.paidAt.substring(0,10)): there used to be curly braces around order.paidAt 
                (<i className='fas fa-times' style={{color:'red'}}></i>)}
              </td>*/}

              <td>
                {order.isDelivered ? (order.deliveredAt.substring(0,10)): /*there used to be curly braces around order.deliveredAt */
                (<i className='fas fa-times' style={{color:'red'}}></i>)}
              </td>

              <td>
               <LinkContainer to={`/order/${order._id}`}>
                <Button variant='light' className='btn-sm'>
                   Details
                </Button>
               </LinkContainer>

              </td>
            </tr>
          ))}
         </tbody>
        </Table>
        )}





       </>

    )

}

export default OrderListScreen
