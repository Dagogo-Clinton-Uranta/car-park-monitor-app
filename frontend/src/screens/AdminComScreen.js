import React, {useState ,useEffect} from 'react'
/*import {Link} from 'react-router-dom'*/
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Message.js'
import {adminSaid,getUserDetails} from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'





const AdminComScreen = ({location, match,history}) => { //he is taking location & history out of the props, normally it is props.location
  const userId = match.params.id
  const [bossMessage,setBossMessage] = useState('')  
  
  const dispatch = useDispatch() 
  const userLogin = useSelector(state => state.userLogin);
  const {loading,error,userInfo} = userLogin /*if youre having problems reaching this  screen, come and delete this line, and the userInfo useEffect */

  /*the genius thing i'm going to do here is collect
   information for a particular user,not using userlogin i guess,
   but where to collect userInfo of a particular user that was clicked,
    i need to create a new global state for this cuz i need to fetch info
  from backend based on the user id i will send  - FIND THIS IN USER DETAILS- userDetails*/
  
  const userDetails = useSelector((state) => state.userDetails);
  const {loading:loadingDetails, error:errorDetails,user } = userDetails
     console.log(userDetails)

      /*consider renaming these from clientId, clientEmail,clientName , cuz youre updating adminMessage even though it's in the client's data */
     const clientId = user._id
     const clientEmail = user.email
     const clientName = user.name

  /* const {loading, error,userInfo } = userLogin */
   /*at least i think it's this -youre right, it is this */

  const redirect = location.search ? location.search.split('=')[1]:'/'
//location .search has the url query string, study it a bit

//because we dont want to able to come into the login screen ONCE WE ARE ALREADY LOGGED IN, effect this in the useEffect below



  useEffect(()=>{  
    if(!userInfo){
    history.push(`/login`)
    }
  })


  useEffect( () => {
      
    dispatch(getUserDetails(userId))
   
    /*if(userInfo){ 
       history.push(redirect)
    } I WANT TO PUT IN THE CUSTOMER SERVICE MESSAGE HERE,SO IT CAN REFRESH UPON CUSTOMER SENDING A MESSAGE*/
      
  },[dispatch, userId /*, clientEmail, clientName*/]) /*why client id an client name */



  const submitHandler = (e) => {
          e.preventDefault()
          //this is where we want to to call our action to dispatch login
          dispatch(adminSaid(bossMessage, clientId,clientEmail,clientName)) 
          window.alert('Message Sent!') 
          setBossMessage('')
        
         
         /*yes we still need clientId 
         cuz that's how we'll know who we're going to update in the database*/
  }

    return (
       <FormContainer>
        <h1>Send A Message  ...</h1>
        {errorDetails && <Message variant='danger'>{errorDetails}</Message>}
        {loadingDetails && <Loader/>}
        
         <Form onSubmit={submitHandler}>

             {/*okay so if the user is an admin, i want to show a name and email, otherwise
    i want to to hide the name and email stuff, actually i changed my mind, admins
     will have a different screen and a different route. CONSIDER CALLING GET USER PROFILE ROUTE
     AFTER SENDING THE ID - FIND AN EXAMPLE OF THIS*/}

        
           <>
        <Form.Group controlId='name'>

            <Form.Label> Name: </Form.Label>
            <Form.Control plaintext readOnly defaultValue ={user.name}></Form.Control>
                {/* local state used to be here i don't wish to change the state here, for name and password, so maybe i will eliminate local state */}
          </Form.Group>


         <Form.Group controlId='email'>

          <Form.Label>  Email Address: </Form.Label>
          <Form.Control plaintext readOnly defaultValue={user.email}></Form.Control>
        
         </Form.Group> 
         </>

         <Form.Group controlId='reply-message'>

          <Form.Label> Client/Merchant Message: </Form.Label>
          <Form.Control as ="textarea" rows={6} plaintext readOnly value={user.userMessage} defaultValue={`No message from client ${user.name} , ID - ${user._id}`}></Form.Control>

         </Form.Group>
         
        


          <Form.Group controlId='reply-message'>

          <Form.Label>  Send Your Message Below: </Form.Label>
          <Form.Control as ="textarea" rows={6} placeholder='type message here' value={bossMessage} onChange={(e)=>{setBossMessage(e.target.value)}}></Form.Control>

         </Form.Group>

         
         <Button type='submit' variant='primary'>Send</Button>
         

        </Form>
       
        
        
        <br/>
        <Row className='py-3'>
         <Col>                       
           You can also message Clients/Merchants using: customerservice@bridgeway.com 
         </Col>  
         </Row>

         <Row className='py-3'>
         <Col>                       
           Remember to copy and send the Client/Merchant Message into the email body, and use an appropriate subject, for easy follow up from clients
         </Col>                     
        </Row>              

       </FormContainer>

    )

}

export default AdminComScreen
