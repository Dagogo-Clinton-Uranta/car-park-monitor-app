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

  /*const userLogin = useSelector(state => state.userLogin);
  const {userInfo } = userLogin*/
   
  let vendorName =/*userInfo && userInfo.isMerchant ? userInfo.name :*/ ''

  //THE LOGIC FOR CALCULATING THE TOTAL PRICE OF ITEMS THAT IS SPECIFIC TO EACH VENDOR
  /*const addDecimals = (num) => { return(Math.round(num*100)/100).toFixed(2) }
      
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item)=>acc +item.price*item.qty,0))*/

   

  useEffect( () => {
  /*if(userInfo){*/
  dispatch(listOrders()) /*console.log('orders nigga')*/
  /*}else{
   history.push('/login')
  }*/
    }
  ,[dispatch,history]) //successDelete was passed into useEffect because youu want the list of users to reload, showing the effective delete


    return (
       <>
        <h1>Previous Tickets</h1>
        {/*PUT THE LIST IN A ROW WITH TWO COLUMNS AND PUT BUTTONS IN THE OTHER COLUMN AND MAKE IT 3 TIMES SMALLER THAN THE ORDER/PARKLOG LIST*/}
         <p>Please Select the time period in  which you would like to know which trucks were in the park </p>
        
        {loading ? <Loader/>:error ? <Message variant='danger'>{error}</Message>:(

        <Table striped border hover responsive className ='table-sm'>
         <thead>
          <tr>
           <th>BOOKING NUMBER</th>
           <th>TRUCK NUMBER</th>
           <th>CONTAINER NUMBER</th>
           <th>TRUCK CATEGORY</th>
           <th>ENTRY DATE</th>
           <th>ENTRY TIME</th>
           <th>EXIT DATE</th>
           <th>EXIT TIME</th>
           {/*userInfo.isAdmin ?(<th>TOTAL</th>):(<th>TO RECEIVE:</th> )}{/*AS PER TOTAL PRICE*/}
           {/*<th>PAID</th>*/}
           
          
         </tr>
         </thead>
         <tbody>
          {orders.map(order => ( 
            <tr key={order._id} >
              <td>{order.bookingNumber}</td>
              <td>{order.truckNumber}</td>
              <td>{order.containerNumber}</td>
              <td>{order.truckCategory}</td>
              <td>{order.entryDate}</td>
              <td>{order.entryTime}</td>
              <td>{order.exitDate}</td>
              <td>{order.exitTime}</td>
              
              

              {/*<td>{order.isPaid ? (order.paidAt.substring(0,10)): there used to be curly braces around order.paidAt 
                (<i className='fas fa-times' style={{color:'red'}}></i>)}
              </td>*/}

              

              <td>
               <LinkContainer to={`/parklog/${order._id}`}>
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
