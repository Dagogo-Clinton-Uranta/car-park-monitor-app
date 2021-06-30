import React ,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {login,createExitTicket} from '../actions/userActions.js'
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails,createProductReview} from '../actions/productActions.js'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants.js'


const ExitScreen = ({history,match}) => {
      /*cuz we need a single product from the array of products,and we gotta do it PER PAGE, we use.find method
      TO FILTER IT OUT FROM THE ARRAY*/
   

  const dispatch = useDispatch()
  
  const productDetails = useSelector(state => state.productDetails)
  const {product,loading, error} = productDetails

  const userExitDirection = useSelector(state => state.userExitDirection)
  const {exitTicketInfo ,loading:loadingexit,error:errorexit} = userExitDirection
  console.log(userExitDirection)

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
    
  
  const [email, setEmail] = useState({bookingNo:''})
  const [bookingNo,setBookingNo] = useState('')
/*const [truckNumber,setTruckNumber] = useState('')*/
  let zoneCounter
  let zoneArea
  
  console.log(email.bookingNo)
  
  
 useEffect(()=>{
  dispatch(listProductDetails())
    setBookingNo(email.bookingNo)

  setEmail({...email,
  truckNumber:userInfo?userInfo.truckNumber:'N/A',
  containerNumber:userInfo?userInfo.containerNumber:'N/A',
  entryTime:userInfo?showTime():'N/A',
  entryDate:userInfo?date.toLocaleDateString():'N/A',
  truckCategory:userInfo?userInfo.truckCategory:'N/A',
})

   
  /*if(successProductReview){
    alert("Thank you for your review!")
    setRating(0)
    setComment('')
    dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
  }*/

   
 },[dispatch,userInfo])

 
 const createExitTicketHandler = (e) => {
  
  /*dispatch(login(bookingNo))*/
   dispatch(createExitTicket({bookingNumber:email.bookingNo}))

}




/*const addToCartHandler = () => {
  if(!userInfo){
    window.alert('Please sign in to purchase')
  }
  else if(userInfo && (userInfo.isAdmin||userInfo.isMerchant)){
    window.alert('Only customers may make purchases, please register as a customer')
  }
    else{history.push(`/cart/${match.params.id}?qty=${qty}`)} //there was a blank set of curly braces here, you just put quantity in 
}*/
  
const previousPageHandler = () => {
  
  window.history.back()
}

 

 
 
  let date = new Date()

  function showTime(){
    let time = new Date()
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let am_pm="AM"

    if(hour>12){
      hour -= 12;
      am_pm="PM"
    }

    if(hour==0){
      hour = 12;
      am_pm="AM"
    }
     hour = hour < 10 ? "0" + hour :hour;
     min = min < 10 ? "0" + min :min;
     sec = sec < 10 ? "0" + sec :sec;

     let currentTime = hour +":" + min + " " + am_pm
     return currentTime
  }
  
  if(userInfo && userInfo.truckCategory === "EXPORT" && product  && product[5].number < 52 ){ zoneArea = 'F'}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product[5].number === 52 && product[6].number < 50 ){zoneArea = 'G'}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product[6].number === 50 && product[7].number < 51 ){zoneArea = 'H'}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product[7].number === 51 && product[8].number < 95 ){zoneArea = 'R'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].number < 37 ){zoneArea = 'A'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].number === 37 && product[1].number < 46 ){zoneArea = 'B'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product[2].number < 78 ){zoneArea = 'C'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product[2].number === 78 && product[3].number < 30 ){zoneArea = 'D'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product[3].number === 30 && product[4].number < 71 ){zoneArea = 'E' }
  else{ zoneArea ='-'}

  if(userInfo && userInfo.truckCategory === "EXPORT" && product  && product[5].number < 52 ){  zoneCounter = product[5].number}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product[5].number === 52 && product[6].number < 50 ){ zoneCounter =product[6].number}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product[6].number === 50 && product[7].number < 51 ){ zoneCounter =product[7].number}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product[7].number === 51 && product[8].number < 95 ){ zoneCounter =product[8].number}
  else if(userInfo && userInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].number < 37 ){ zoneCounter =product[0].number}
  else if(userInfo && userInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].number === 37 && product[1].number < 46 ){ zoneCounter =product[1].number}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product[2].number < 78 ){ zoneCounter =product[2].number}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product[2].number === 78 && product[3].number < 30 ){ zoneCounter =product[3].number}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product[3].number === 30 && product[4].number < 71 ){ zoneCounter =product[4].number}
  else{zoneCounter = 0 }

/*const submitHandler =(e) =>{
  e.preventDefault() //since submit handler is being called inside a form
  dispatch(createProductReview(match.params.id,{
    rating,
    comment //both rating and comment are coming from local/comment state
  }))
}*/

  

      return(
        <>
        <center><p className='apapa'>LILYPOND</p></center>
        <hr/>
        <center><p className='greenBackground'><h2> EXIT SLIP GENERATOR (FOR DEMO ONLY)</h2></p></center>
        <hr/>
        <center><p className='warningInstruction'><h6>PLEASE NOTE:</h6> Do not use this page at the entrance facility, it is used for EXIT only. Select 'entrance' from the menu if you wish to process trucks entering the park.</p></center>
        <hr/>
        {/*loading ? <Loader/>:error ?<Message variant='danger'>{error}</Message>:*/(
          <>
          <Meta title={"FLACS PARKING SYSTEM"}/>
          <Row >
            <Row>
              <center className="mb-4" >
          {/*exitTicketInfo && <h6>{exitTicketInfo.statusMessage}</h6>*/}
            {/*exitTicketInfo && <h2>{exitTicketInfo.URL}</h2>*/}
            {errorexit && <h2>{errorexit}</h2>}
            </center>
            </Row>
           <Col md={5}>
            
            <Row>
              <Card>
              <ListGroup variant='flush'>
              <ListGroup.Item>
              <Row>
                   <Col className="appFont">LEAVING FROM ZONE:</Col>
                   
                 </Row>
               </ListGroup.Item>

               <ListGroup.Item>
                <center>
                <p className="bigNumber" >
                {exitTicketInfo?exitTicketInfo.zone:'-'}
                 
                 </p>
                 </center>
               </ListGroup.Item>

               {/*<ListGroup.Item>
                 <Row>
                   <Col className="appFont">PARK ZONE:</Col>
                   <Col>
                    <strong className="appFont"> {zoneArea}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>*/}

               </ListGroup >
                
                
                
                
                {
                /*<Row><h1> TAG NO</h1></Row>
                <Row className="bigNumber" > {'tagCounter'}</Row>
                <Row>PARK ZONE</Row>
                <Row>{'zoneCounter'}</Row>*/}
              </Card>
            </Row>
           </Col>
           
            <Col md={6}>
             <Card>
              <ListGroup variant='flush'>
              <ListGroup.Item>
              {/*<Form onSubmit={submitHandler}>*/}
                 <Row className="appFont">
                   <Col>JOURNEY CODE:</Col>
                   <Col>
                   <Form.Control as='input' className='inputBorder' value={email.bookingNo} onChange={(e) =>{setEmail({bookingNo:e.target.value, truckNumber:'',containerNumber:'',entryTime:'',entryDate:'',truckCategory:''})}}   />
                   </Col>
                   <Col>
                   <Button type='submit' variant='primary' onClick={createExitTicketHandler}>Generate</Button>
                   </Col>
                 </Row>
                 {/*</Form>*/}
               </ListGroup.Item>
              
              
              
              <ListGroup.Item>
                 <Row >
                   <Col className="appFont">TICKET STATUS:</Col>
                   <Col>
                   {exitTicketInfo && exitTicketInfo.statusMessage}
                   </Col>
                 </Row>
               </ListGroup.Item>
              
               <ListGroup.Item>
                 <Row >
                   <Col className="appFont">URL:</Col>
                   <Col>
                   {exitTicketInfo && exitTicketInfo.URL}
                   </Col>
                 </Row>
               </ListGroup.Item>

               {/*<ListGroup.Item>
                 <Row className="appFont">
                   <Col>EXIT TIME:</Col>
                   <Col>
                    <strong>{userInfo?email.entryTime:''}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>*/}

               {/*<ListGroup.Item>
                 <Row className="appFont">
                   <Col>EXIT DATE:</Col>
                   <Col>
                   
                     <strong>{userInfo?email.entryDate:''}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>*/}
             {/*
               <ListGroup.Item>
                  <Row className="appFont">
                    <Col>TRUCK CATEGORY:</Col>
                    <Col>
                    {email.truckCategory}
                    </Col>
                  </Row>
                </ListGroup.Item>
             */}
                  {/*<Link to={`/exit/${bookingNo}`}></Link>*/}
              {/* <ListGroup.Item>
               
                 <Button  className='btn-block printFont' type='button' >
                 <i className='fas fa-print'></i> Generate PERMIT
                 </Button>
                 

               </ListGroup.Item>*/}

              </ListGroup>
             </Card>
            </Col>


          </Row>
          
          {/*<Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews </Message>}
              <ListGroup variant="flush">
               {product.reviews.map(review =>( 
                 <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                   <Rating value={review.rating} />
                   <p>{review.createdAt.substring(0,10)}</p>
                   <p>{review.comment}</p>
                 </ListGroup.Item>
               ) )}
               <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {errorProductReview && <Message variant='danger'>{errorProductReview} </Message>}

                {userInfo && (!userInfo.isAdmin || !userInfo.isMerchant)?(<Form onSubmit={submitHandler}>
                <Form.Group controlId='rating'>
                <Form.Label>Rating</Form.Label>
                 <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>

                  <option value=''>Select...</option>
                   <option value='1'>1-Poor</option>
                   <option value='2'>2-Fair</option>
                   <option value='3'>3-Good</option>
                   <option value='4'>4-Very Good</option>
                   <option value='5'>5-Excellent</option>

                 </Form.Control>
               </Form.Group>

               <Form.Group controlId='comment'>
                 <Form.Label>Comment</Form.Label>
                 <Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)}>
                 </Form.Control>
               </Form.Group>

              <Button type='submit' variant='primary'> Submit </Button>

                </Form>):
                  <Message> Please<Link to='/login'>sign in</Link> to write a review {' '} </Message>}
               </ListGroup.Item>
              </ListGroup>
            </Col>
                </Row> */}
          </>
        )}

        </>
      )

}

export default ExitScreen
