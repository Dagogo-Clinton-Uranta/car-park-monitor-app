import React ,{ useEffect } from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Message.js'
import {listUsers, deleteUser} from '../actions/userActions.js'





const UserListScreen = ({history}) => { //he is taking location & history out of the props, normally it is props.location
  /*const [name,setName] = useState('')
  const [email,setEmail] = useState('')  //component level state right here, not application level state
  const [password,setPassword] = useState('')
  const [confirmpassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState(null)*/
  const dispatch = useDispatch() 

  const userList = useSelector(state => state.userList);
  const {loading, error,users } = userList


  const userLogin = useSelector(state => state.userLogin); 
  const {userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete);
  const {success: successDelete} = userDelete



 
//location .search has the url query string, study it a bit


  useEffect( () => {
  if(userInfo && userInfo.isAdmin ){
  dispatch(listUsers()) /*console.log('user nigga')*/
  }else if(userInfo && userInfo.isMerchant){
   history.push('/')
  }
  else{
    history.push('login')
  }


    }
  ,[dispatch,history,successDelete,userInfo]) 



 const deleteHandler = (id) => {
if(window.confirm('Are you sure you want to delete this item ?')){ 
  dispatch(deleteUser(id))
}


  }

    return (
       <>
        <h1>Users</h1>
        <p> NOTE: The rows in green mean that users have sent new messages. </p>
         <br/>
         
        {loading ? <Loader/>:error ? <Message variant='danger'>{error}</Message>:(
        
        
         
        <Table striped bordered hover responsive className ='table-sm'>
         <thead>
          <tr>
           <th>ID</th>
           <th>NAME</th>
           <th>EMAIL</th>
           <th>ADMIN</th>
           <th></th>
         </tr>
         </thead>
         <tbody>
          {users.map(user => (
            <tr key={user._id}  /*style={{backgroundColor: user.messageNotification && 'rgba(0, 255, 0, 0.2)'}}*/>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>{user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>):
                (<i className='fas fa-times' style={{color:'red'}}></i>)}
                </td>

              <td>
               <LinkContainer to={`/admin/user/${user._id}/edit`}>
                <Button variant='light' className='btn-sm'>
                   <i className='fas fa-edit'></i> Edit
                </Button>
               </LinkContainer>

               <LinkContainer to={`/admin/user/${user._id}/communications`}>
                <Button variant='light' className='btn-sm'>
                   <i className='fas fa-paper-plane'></i> Chat
                </Button>
               </LinkContainer>

               <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                 <i className='fas fa-trash'></i> Delete
               </Button>
             </td>

             
            </tr>
          ))}
         </tbody>
        </Table>
        )}





       </>

    )

}

export default UserListScreen
