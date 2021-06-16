import React, {useState ,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Form, Button, Row, Col, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Message.js'
import {getUserDetails, updateUserProfile} from '../actions/userActions.js'
import {listMyOrders} from '../actions/orderActions.js'





const ProfileScreen = ({location, history}) => { //he is taking location & history out of the props, normally it is props.location
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')  //component level state right here, not application level state
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState(null)
  const dispatch = useDispatch() //dont forget that real dispatches only take place in action creators, you are only calling useDispatch here

  const userDetails = useSelector((state) => state.userDetails);
  const {loading, error,user} = userDetails
   
  console.log(userDetails)
  
   const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const {success} = userProfileUpdate
 
  const orderListMy  = useSelector((state) => state.orderListMy);
  const {loading: loadingOrders,error: errorOrders, orders} = orderListMy
//location .search has the url query string, study it a bit

//because we dont want to able to come into the login screen ONCE WE ARE ALREADY LOGGED IN, effect this in the useEffect below

  useEffect( () => {
    if(!userInfo){ //cuz user info exists only when you're logged in
       history.push('/login')
    }else{
      if(!user.name){ /*i changed user.name to userInfo.name,to test */
        dispatch(getUserDetails('profile')/*profile serves as the ID here, so that in the get userDetails route, it hits  /api/users/profile route, and not an actual id*/)
          dispatch(listMyOrders())
      }else{
     setName(user.name)
     setEmail(user.email)
      }
      //
    }

  },[dispatch,history,userInfo ,user])



  const submitHandler = (e) => {
          e.preventDefault()
       if(password !== confirmPassword){
         setMessage('Passwords do not Match')
       }else{
         //this is where we want to to call our action to dispatch login
      dispatch(updateUserProfile({id: user._id, name,email, password}))
       }

  }

    return (
      <>
     <Row>
      <Col md={3}>
      <h2>User Profile</h2>
      <Form onSubmit={submitHandler}>
{/*1*/}      <Form.Group controlId='name'>

       <Form.Label>  Name</Form.Label>
       <Form.Control type='name' placeholder="enter name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
       {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
      </Form.Group>

{/*2*/}       <Form.Group controlId='email'>

        <Form.Label>  Email Address </Form.Label>
        <Form.Control type='email' placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
       </Form.Group>

{/*3*/}      <Form.Group controlId='password'>

        <Form.Label>  Password  </Form.Label>
        <Form.Control type='password' placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>

       </Form.Group>

{/*4*/}     <Form.Group controlId='confirmPassword'>

               <Form.Label>  Confirm password  </Form.Label>
               <Form.Control type='password' placeholder="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>

              </Form.Group>

        <Button type='submit' variant='primary'> Update </Button>
      </Form>
       
       
       <br/>
       <br/>
       <br/>

       <ListGroup variant='flush'>
         <ListGroup.Item>
       {userInfo.adminMessage? (
       <>
       <Row>
        <i className='fas fa-circle' style={{color:'red', fontSize:'9px'}}></i> 
         New message! 
       </Row>
       <Row>
          (click chat to view)
       </Row>
       </>
       ):(<Row>
        Want to make an enquiry/complaint ? click chat below
        </Row>)}
        </ListGroup.Item>
        
        <br/>
        <ListGroup.Item >
        <Row>
      <LinkContainer to='/communications'>
      <Button type='submit' variant='primary'> Chat </Button>
      </LinkContainer>
        </Row>
        </ListGroup.Item>
        </ListGroup>

      </Col>

      <Col md={9}>
      <h2>My Orders</h2>
      {loadingOrders ? <Loader/>:errorOrders? <Message variant='danger'>{errorOrders}</Message>:(
        
        <Table striped bordered hover responsive className='table-sm'>
         <thead>
          <tr>
           <th>ID</th>
           <th>DATE</th>
           <th>TOTAL</th>
           <th>PAID</th>
           <th>DELIVERED</th>
           <th></th>
          </tr>
         </thead>
         <tbody>
          {orders.map(order =>(
            <tr key={order._id}>
             <td>{order._id}</td>
             <td>{order.createdAt.substring(0,10)}</td>
             <td>{order.totalPrice}</td>
             <td>{order.isPaid ? order.paidAt.substring(0,10):(<i className='fas fa-times'style={{color:'red'}}></i>)} </td>

             <td>{order.isDelivered ? order.deliveredAt.substring(0,10):(<i className='fas fa-times'style={{color:'red'}}></i>)} </td>
                 {/*QUICK REMINDER: IF SOMEHING IS NOT DEFINED IN YOUR CONSOLE, THEN YOU'VE CALLED IT AS A VARIABLE , WITHOUT DECLARING IT SOMEWHERE, IF IS NOT MEANT TO BE A VARIABLE CHECK IF YOU FORGOT TO MAKE IT A STRING*/}
             <td>
             <LinkContainer to={`/order/${order._id}`}>
              <Button variant='light' className='btn-sm'> Details </Button>
             </LinkContainer>
            </td>
            </tr>
          ))}
         </tbody>
        </Table>
        
      )}
      </Col>
      </Row>
        {/*<h1>User Profile</h1>*/}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader/>}
       
        </>
    )

}

export default ProfileScreen
