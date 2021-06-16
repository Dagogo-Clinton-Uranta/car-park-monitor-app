import React, {useState ,useEffect} from 'react'
/*import {Link} from 'react-router-dom'*/
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Message.js'
import {clientSaid} from '../actions/userActions.js'
/*import {bossSaid} from '../actions/userActions.js'*/
import FormContainer from '../components/FormContainer.js'





const CommunicationScreen = ({location, history}) => { //he is taking location & history out of the props, normally it is props.location
  const [clientMessage,setClientMessage] = useState('')  //component level state right here, not application level state
  
  const dispatch = useDispatch() //dont forget that real dispatches only take place in action creators, you are only calling useDispatch here
  const userLogin = useSelector(state => state.userLogin);
  const {loading, error,userInfo } = userLogin
  
  const clientId = userInfo._id /*at least i think it's this -youre right, it is this */
  const clientName = userInfo.name
  const redirect = location.search ? location.search.split('=')[1]:'/'
//location .search has the url query string, study it a bit


  useEffect(()=>{  
    if(!userInfo){
    history.push(`/login`)
    }
  })


  useEffect( () => {
    /*if(userInfo){ 
       history.push(redirect)
    } I WANT TO PUT IN THE CUSTOMER SERVICE MESSAGE HERE,SO IT CAN REFRESH UPON CUSTOMER SENDING A MESSAGE*/
     
  },[/*redirect,history,userInfo*/])



  const submitHandler = (e) => {
          e.preventDefault()
          //this is where we want to to call our action to dispatch login
          setClientMessage('')
          window.alert('Message Sent!')
        //dispatch(/*login(email,password)*/)
         dispatch(clientSaid(clientMessage, clientId ,clientName))
  }

    return (
       <FormContainer>
        <h1>Send A Message ...</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        
         <Form onSubmit={submitHandler}>

         <Form.Group controlId='reply-message'>

          <Form.Label> Customer Service: </Form.Label>
          <Form.Control as ="textarea" rows={6} plaintext readOnly value={userInfo.adminMessage} defaultValue={`Good day user ${userInfo.name},how may we help you?`}></Form.Control>

         </Form.Group>
         
        

          <Form.Group controlId='reply-message'>

          <Form.Label>  Send Your Message Below: </Form.Label>
          <Form.Control as ="textarea" rows={6} placeholder='type message here' value={clientMessage} onChange={(e)=>{setClientMessage(e.target.value)}}></Form.Control>

         </Form.Group>

         
         <Button type='submit' variant='primary'>Send</Button>
         

        </Form>
       
        
        <br/>
        <br/>
        <Row className='py-3'>
         <Col>                       
           Want to communicate in another way? send us a message at: <a href={`mailto:customerservice@bridgeway.com?subject=Correspondence from `}> customerservice@bridgeway.com  </a>
         </Col>  
                      
        </Row>  
   
        <Row>
         <Col>
         Alternatively, call us at: <strong> 08183763331</strong>  
         </Col>  
        </Row>          

       </FormContainer>

    )

}

export default CommunicationScreen
