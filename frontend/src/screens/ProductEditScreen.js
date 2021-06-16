import axios from 'axios'
import React ,{useState ,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {listProductDetails, updateProduct} from '../actions/productActions.js'
import FormContainer from '../components/FormContainer.js'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants.js'




const ProductEditScreen= ({match, history}) => { //he is taking location & history out of the props, normally it is props.location
    const productId = match.params.id

  const [name,setName] = useState('')
  //const [email,setEmail] = useState('')
  const [price,setPrice] = useState(0)  //component level state right here, not application level state
  const [image,setImage] = useState('')
  const [brand,setBrand] = useState('')
  const [category,setCategory] = useState('')
  const [countInStock,setCountInStock] = useState('')
  const [description,setDescription] = useState('')
  const [uploading,setUploading] = useState(false)

  
  const dispatch = useDispatch() //dont forget that real dispatches only take place in action creators, you are only calling useDispatch here

  const productDetails = useSelector(state => state.productDetails);
  const {loading, error,product} = productDetails

  const productUpdate = useSelector(state => state.productUpdate);
  const {loading:loadingUpdate, error:errorUpdate,success:successUpdate } = productUpdate

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo } = userLogin

  useEffect(()=> { 
    if(!userInfo){
      history.push('/login')}
    },[userInfo,history])

  useEffect( () => {
    if(successUpdate){
      dispatch({type:PRODUCT_UPDATE_RESET})
      history.push('/admin/productlist')
    } 
    else{
      if(!product.name ||product.id !== productId){ //we are just checking any aspect of the user here to see if user object exists
        dispatch(listProductDetails(productId))
      }else {
        setName(product.name)
        //setEmail(product.email)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }

},[dispatch,productId,history,successUpdate,product]) /*i deleted user as a useEffect dependency */

const uploadFileHandler =async (e)=>{
  const file = e.target.files[0] //we get access to this as an array, because you have the ability to upload multiple files
  const formData = new FormData()
  formData.append('image',file)
  setUploading(true)

   try{
     const config ={
     headers:{ 
       'Content-Type':'multipart/form-data'
     }
    }
     const {data} =await axios.post('/api/upload', formData ,config)
     setImage(data)
     setUploading(false)
   }
   catch(error){
      console.log(error)
     setUploading(false)
   }
}

  const submitHandler = (e) => {
          e.preventDefault()
  dispatch(updateProduct({
    _id:productId,
    name,
    price,
    brand,
    category,
    image,
    description,
    countInStock
  }))

  }

    return (
        <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>Go back</Link>

    <FormContainer>
    <h1> Create / Edit Product</h1>
   {loadingUpdate &&<Loader/>}
    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

    {loading? <Loader/>:error?<Message variant='danger'>{error}</Message>:(
      <Form onSubmit={submitHandler}>
 {/*1*/}      <Form.Group controlId='name'>

       <Form.Label>  Name</Form.Label>
       <Form.Control type='name' placeholder="enter name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
      </Form.Group>

 {/*2*/}        <Form.Group controlId='price'>

        <Form.Label>  Price </Form.Label>
        <Form.Control type='number' placeholder="enter price" value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
         {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
       </Form.Group>

 {/*3*/}      <Form.Group controlId='image'>

        <Form.Label>  Image </Form.Label>
        <Form.Control type='text' placeholder="Enter image url" value={price} onChange={(e)=>setImage(e.target.value)}></Form.Control>
        {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
         <Form.File id="image-file" label="choose file" custom onChange={uploadFileHandler}>
           {uploading &&<Loader/>}
         </Form.File>
       </Form.Group>


  {/*4*/}      <Form.Group controlId='brand'>

              <Form.Label>  Brand </Form.Label>
              <Form.Control type='text' placeholder="Enter brand" value={brand} onChange={(e)=>setBrand(e.target.value)}></Form.Control>
               {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
             </Form.Group>


 {/*5*/}        <Form.Group controlId='countInStock'>

                <Form.Label>  Count in Stock </Form.Label>
                <Form.Control type='number' placeholder="Enter count in stock" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
                     {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
             </Form.Group>

 {/*6*/}        <Form.Group controlId='category'>

                <Form.Label>  Category </Form.Label>
                <Form.Control type='text' placeholder="Enter category" value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                                 {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
               </Form.Group>

{/*7*/}       <Form.Group controlId='description'>

                  <Form.Label>  Description</Form.Label>
                  <Form.Control type='text' placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                                               {/*the value of form control is form control from the state. You need to read about form group from react bootstrap*/}
                 </Form.Group>



        <Button type='submit' variant='primary'>Update</Button>
      </Form>
    )}

     {/*{message && <Message variant='danger'>{message}</Message>}
     {error && <Message variant='danger'>{error}</Message>}
     {loading && <Loader/>}*/}




    </FormContainer>
        </>



    )

}

export default ProductEditScreen
