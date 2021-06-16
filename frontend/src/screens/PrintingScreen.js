import React ,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import truckImage from '../components/truck.jpeg'
import barcode from '../components/barcode.jpeg'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userActions.js'
import {listProductDetails,createProductReview} from '../actions/productActions.js'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants.js'
import {register} from '../actions/userActions.js'

const PrintingScreen = ({history,match}) => {
      /*cuz we need a single product from the array of products,and we gotta do it PER PAGE, we use.find method
      TO FILTER IT OUT FROM THE ARRAY*/
   const [qty ,setQty] = useState('')
   const [rating ,setRating] = useState(0)
   const [comment ,setComment] = useState('')
   const [buttonVis ,setButtonVis] = useState(true)

  const dispatch = useDispatch()
  
  const productDetails = useSelector(state => state.productDetails)
  const {product,loading, error} = productDetails

  const productCreateReview = useSelector(state => state.productCreateReview)
  const {success:successProductReview, error:errorProductReview} = productCreateReview
  

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  
 useEffect(()=>{
  dispatch(login(match.params.id))
  dispatch(listProductDetails())
  
   
 },[dispatch,match])


const updateAndPrintHandler = () => {
  dispatch(register(zoneArea,zoneCounter))
  
  window.print()
}
  
const previousPageHandler = () => {
  
  window.history.back()
}



  console.log(productDetails)
 
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
  
  let zoneArea
  let zoneCounter  
  if(userInfo && userInfo.truckCategory === "EXPORT" && product  && product.tagCounterF < 52 ){ zoneArea = 'F'}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product.tagCounterF === 52 && product.tagCounterG < 50 ){zoneArea = 'G'}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product.tagCounterG === 50 && product.tagCounterH < 51 ){zoneArea = 'H'}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product.tagCounterH === 51 && product.tagCounterR < 95 ){zoneArea = 'R'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED ENL" && product  && product.tagCounterA < 37 ){zoneArea = 'A'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED ENL" && product  && product.tagCounterA === 37 && product.tagCounterB < 46 ){zoneArea = 'B'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product.tagCounterC < 78 ){zoneArea = 'C'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product.tagCounterC === 78 && product.tagCounterD < 30 ){zoneArea = 'D'}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product.tagCounterD === 30 && product.tagCounterE < 71 ){zoneArea = 'E' }
  else{ zoneArea ='-'}

  if(userInfo && userInfo.truckCategory === "EXPORT" && product  && product.tagCounterF < 52 ){  zoneCounter = product.tagCounterF}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product.tagCounterF === 52 && product.tagCounterG < 50 ){ zoneCounter =product.tagCounterG}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product.tagCounterG === 50 && product.tagCounterH < 51 ){ zoneCounter =product.tagCounterH}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && product && product.tagCounterH === 51 && product.tagCounterR < 95 ){ zoneCounter =product.tagCounterR}
  else if(userInfo && userInfo.truckCategory === "FLAT BED ENL" && product  && product.tagCounterA < 37 ){ zoneCounter =product.tagCounterA}
  else if(userInfo && userInfo.truckCategory === "FLAT BED ENL" && product  && product.tagCounterA === 37 && product.tagCounterB < 46 ){ zoneCounter =product.tagCounterB}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product.tagCounterC < 78 ){ zoneCounter =product.tagCounterC}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product.tagCounterC === 78 && product.tagCounterD < 30 ){ zoneCounter =product.tagCounterD}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && product  && product.tagCounterD === 30 && product.tagCounterE < 71 ){ zoneCounter =product.tagCounterE}
  else{zoneCounter = 0 }


  console.log(zoneArea,zoneCounter)

      return(
        <>
       
        {/*loading ? <Loader/>:error ?<Message variant='danger'>{error}</Message>:*/(
          <>
          <Meta title={"FLACS PARKING SYSTEM"}/>
          <Row className= "ticketBorder" >
            <Col>
          <Row><p className='apapa'>LILYPOND PARK</p></Row> 
          
          <Row className ="ticketIntro">
          <p className='driversEntryPermit'>DRIVERS ENTRY PERMIT</p>
            </Row>

            <Row className="ticketIntro">

            <Col>
            <Row>
           <Image className="truckImage" src={truckImage} alt={"truck image"} fluid>
           </Image>
           </Row>
            </Col> 
            
            <Col>
            <p className="centreAttempt">TRUCK CATEGORY:</p><p className="centreAttempt slightlyLesserAppFont">{userInfo?userInfo.truckCategory:'N/A'}</p> 
            </Col> 
            </Row>
            </Col>
          
          
         
            
           <Row>
           <Col md={6}>
             
            <Row className= "numberBorder">
              <Card>
              <ListGroup variant='flush'>
              <ListGroup.Item>
              <Row>
                   <Col className="slightlyLesserAppFont"> PARK ZONE</Col>
                   
                 </Row>
               </ListGroup.Item>

               <ListGroup.Item>
                <center>
                <p className="bigNumber" >
                 {zoneArea}
                 </p>
                 </center>
               </ListGroup.Item>

               <ListGroup.Item>
                 <Row>
                   <Col className="slightlyBiggerAppFont">No</Col>
                   <Col>
                    <strong className="slightlyBiggerAppFont"> {zoneCounter + 1} </strong>
                   </Col>
                 </Row>
               </ListGroup.Item>

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
              <ListGroup variant='flush'  className='borderless'>
              <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col>BOOKING NUMBER:</Col>
                   <Col>
                   <h2>{userInfo?userInfo.bookingNumber:'N/A'}</h2>
                   </Col>
                 </Row>
               </ListGroup.Item>
              
              
              
              <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col>TRUCK NUMBER:</Col>
                   <Col>
                   <h2>{userInfo?userInfo.truckNumber:'N/A'}</h2>
                   </Col>
                 </Row>
               </ListGroup.Item>
              
               <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col>CONTAINER NUMBER:</Col>
                   <Col>
                   <h2>{userInfo?userInfo.containerNumber:'N/A'} </h2>
                   </Col>
                 </Row>
               </ListGroup.Item>


               <ListGroup.Item className='borderless centerAttempt entryHeader'>
                 <Row className="headerFont ">
                   <Col >ENTRY DETAILS</Col> 
                   
                 </Row>
               </ListGroup.Item>


               <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col> TIME:</Col>
                   <Col>
                    <strong>{showTime()}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>

               <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col> DATE:</Col>
                   <Col>
                    {/*<strong>{product.countInStock > 4 ?'In Stock':product.countInStock <= 3 ?'Few Left !!':product.countInStock === 0 ? 'Out of Stock':'Currently being restocked' //this currenty being restocked is not the right thing, you just put it there as filler, till the need comes to fix it }</strong>*/}
                     <strong>{date.toLocaleDateString()}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>
             {/*product.countInStock > 0 &&*/ (
               <ListGroup.Item className='borderless centerAttempt'>
                  <Row className="appFont">
                    
                    
                    <Image className="truckImage" src={barcode} alt={"truck image"} fluid>
           </Image>
                    
                  </Row>
                </ListGroup.Item>
             )}

               <ListGroup.Item>
                 
               </ListGroup.Item>

              </ListGroup>
             </Card>
            </Col>
           
           <Col className="displayNone">
            <Row>
           <Image className="truckImage" src={truckImage} alt={"truck image"} fluid>
           </Image>
           </Row>
           
           
           </Col>
           </Row>

          </Row>
             { buttonVis && <center>
          <Button onClick={updateAndPrintHandler} className='btn-block printFont printButton' type='button' >
                 <i className='fas fa-print'></i> Print
                 </Button>
                 </center> }

                 

               { buttonVis &&   <center>
                 <Link to={`/`}>
          <Button  className='btn-block printFont printButton' type='button' >
                 <i className='fas fa-home'></i> home screen
                 </Button>
                 </Link>
                 </center> }
          </>
        )}

        </>
      )

}

export default PrintingScreen
