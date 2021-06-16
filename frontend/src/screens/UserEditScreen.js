import React, {useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Message.js'
import {getUserDetails,updateUser} from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'
import {USER_UPDATE_RESET} from '../constants/UserConstants.js' //dispatching straight from constants




const UserEditScreen = ({match, history}) => { //he is taking location & history out of the props, normally it is props.location
    const userId = match.params.id

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')  //component level state right here, not application level state
  const [isAdmin,setIsAdmin] = useState(false)
  const [isMerchant, setIsMerchant] = useState(false)


  const dispatch = useDispatch() //dont forget that real dispatches only take place in action creators, you are only calling useDispatch here

  const userDetails = useSelector((state) => state.userDetails);
  const {loading, error,user } = userDetails
     console.log(userDetails)
  
     const userUpdate = useSelector((state) => state.userUpdate);
  const {loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate





  useEffect( () => {
    if(successUpdate){
    dispatch({type:USER_UPDATE_RESET})
    history.push('/admin/userlist')
  }else{
    if(!user.name ||user.id !== userId){ //we are just checking any aspect of the user here to see if user object exists
      dispatch(getUserDetails(userId))
    }else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
      setIsMerchant(user.isMerchant)
    }

  }


},[dispatch,user,userId,history,successUpdate])


  const submitHandler = (e) => {
          e.preventDefault()
  dispatch(updateUser({_id:userId ,name , email, isAdmin, /* isMerchant*/}))

  }

    return (
        <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>Go back</Link>

    <FormContainer>
    <h1>Edit User</h1>
    {loadingUpdate &&<Loader/> }
    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
    {loading? <Loader/>:error?<Message variant='danger'>{error}</Message>:(
      <Form onSubmit={submitHandler}>
 {/*1*/}      <Form.Group controlId='name'>

       <Form.Label>  Name</Form.Label>
       <Form.Control type='name' placeholder="enter name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
      </Form.Group>

 {/*2*/}        <Form.Group controlId='email'>

        <Form.Label>  Email Address </Form.Label>
        <Form.Control type='email' placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
         {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
       </Form.Group>

 {/*3*/}      <Form.Group controlId='isadmin'>


        <Form.Check type='checkbox' label="Is Admin" checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}></Form.Check>

       </Form.Group>

{/*4*/}      <Form.Group controlId='ismerchant'>


<Form.Check type='checkbox' label="Is Merchant" checked={isMerchant} onChange={(e)=>setIsMerchant(e.target.checked)}></Form.Check>

</Form.Group>


        <Button type='submit' variant='primary'>Update</Button>
      </Form>
    )}

     
    </FormContainer>
        </>



    )

}

export default UserEditScreen
