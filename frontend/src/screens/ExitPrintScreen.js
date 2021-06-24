import React ,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import invalidTicket from '../components/invalid.jpeg'
import exportImage from '../components/EXPORT.jpeg'
import flatbedENLImage from '../components/flatbedENL.png'
import flatbedAPMTImage from '../components/flatbedAPMT.jpeg'
import barcode from '../components/barcode.jpeg'
import {useDispatch, useSelector} from 'react-redux'
import {login,driverDetails} from '../actions/userActions.js'
import {listProductDetails,createProductReview} from '../actions/productActions.js'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants.js'
import {register} from '../actions/userActions.js'
import {createOrder} from '../actions/orderActions.js'

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
  

  

  const releaseDriver = useSelector(state => state.releaseDriver)
  const {driverInfo} = releaseDriver
  
 useEffect(()=>{
  /*dispatch(login())*/
  dispatch(driverDetails()) 
  dispatch(listProductDetails())
  
   
 },[dispatch,match])



const updateAndPrintHandler = () => {
  dispatch(register(zoneArea,zoneCounter,change))
  /*dispatch(unregister(zoneArea,zoneCounter))*/
  /*dispatch(createOrder({
    bookingNumber:driverInfo.bookingNumber,
    truckCategory:driverInfo.truckCategory,
    containerNumber:driverInfo.containerNumber,
    truckNumber:driverInfo.truckNumber,
    entryTime:`${showTime()}`,
    entryDate:`${date.toLocaleDateString()}`,
    parkZone:zoneArea,
    tagNumber:`${zoneCounter}`
    
  }))*/
  window.print()
}
  
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

  



  const change = -1
  let zoneArea
  let zoneCounter  
  let occupiedSpace

   if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].number === 0 && product[6].number === 0 && product[7].number === 0 && product[8].number === 0 ){zoneArea = 'X'}
  else if(driverInfo && driverInfo.truckCategory === "EXPORT" && product  && product[5].number < 52 ){ zoneArea = 'F'}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].number === 52 && product[6].number < 50 ){zoneArea = 'G'}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[6].number === 50 && product[7].number < 51 ){zoneArea = 'H'}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[7].number === 51 && product[8].number < 95 ){zoneArea = 'R'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product && product[0].number === 0 && product[1].number === 0 ){zoneArea = 'X'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].number < 37 ){zoneArea = 'A'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].number === 37 && product[1].number < 46 ){zoneArea = 'B'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product && product[2].number === 0 && product[3].number === 0 && product[4].number === 0){zoneArea = 'X'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].number < 78 ){zoneArea = 'C'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].number === 78 && product[3].number < 30 ){zoneArea = 'D'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[3].number === 30 && product[4].number < 71 ){zoneArea = 'E' }
  else{ zoneArea ='-'}

  if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].number === 0 && product[6].number === 0 && product[7].number === 0 && product[8].number === 0 ){zoneCounter = occupiedSpace  = -1}
  if(driverInfo && driverInfo.truckCategory === "EXPORT" && product  && product[5].number < 52 ){  zoneCounter = product[5].number}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].number === 52 && product[6].number < 50 ){ zoneCounter =product[6].number}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[6].number === 50 && product[7].number < 51 ){ zoneCounter =product[7].number}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[7].number === 51 && product[8].number < 95 ){ zoneCounter =product[8].number}
  
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product && product[0].number === 0 && product[1].number === 0 ){zoneCounter= occupiedSpace = -1}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].number < 37 ){ zoneCounter =product[0].number}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].number === 37 && product[1].number < 46 ){ zoneCounter =product[1].number}
  
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product && product[2].number === 0 && product[3].number === 0 && product[4].number === 0){zoneCounter= occupiedSpace = -1}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].number < 78 ){ zoneCounter =product[2].number}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].number === 78 && product[3].number < 30 ){ zoneCounter =product[3].number}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[3].number === 30 && product[4].number < 71 ){ zoneCounter =product[4].number}
  else{zoneCounter = 0 }



      return(
        <>
       
        {/*loading ? <Loader/>:error ?<Message variant='danger'>{error}</Message>:*/(
          <>
          <Meta title={"FLACS PARKING SYSTEM"}/>

          {occupiedSpace===-1 &&<center className='messageSpacing'> <p className='driversEntryPermit ' >ALL PARKING SLOTS FOR {driverInfo.truckCategory} ARE EMPTY, PLEASE WAIT UNTIL SOMEONE ENTERS AND IS READY TO LEAVE. </p></center>}
          <Row className= "ticketBorder" >
            <Col>
          <Row><p className='apapa'>LILYPOND</p></Row> 
          
          <Row className ="ticketIntro">
          <p className='driversEntryPermit'>DRIVERS EXIT SLIP</p>
            </Row>

            <Row className="ticketIntro">

            <Col>
            <Row>
           <Image className="truckImage" src={driverInfo && driverInfo.truckCategory === "FLAT BED APMT"?flatbedAPMTImage:(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO"?flatbedENLImage:(driverInfo && driverInfo.truckCategory === "EXPORT"?exportImage:(invalidTicket)))} alt={"truck image"} fluid>
           </Image>
           </Row>
            </Col> 
            
            <Col>
            <p className="centreAttempt">TRUCK CATEGORY:</p><p className="centreAttempt slightlyLesserAppFont">{driverInfo?driverInfo.truckCategory:'N/A'}</p> 
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
                   <Col className="slightlyLesserAppFont"> EXITING FROM ZONE</Col>
                   
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
                   <Col className="slightlyBiggerAppFont">Thank you for coming!</Col>
                   {/*<Col>
                    <strong className="mildlyBiggerAppFont"> {zoneCounter + 1} </strong>
                   </Col>*/}
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
                   <h2 className="appFont">{driverInfo?driverInfo.bookingNumber:'N/A'}</h2>
                   </Col>
                 </Row>
               </ListGroup.Item>
              
              
              
              <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col>TRUCK NUMBER:</Col>
                   <Col>
                   <h2 className="appFont">{driverInfo?driverInfo.truckNumber:'N/A'}</h2>
                   </Col>
                 </Row>
               </ListGroup.Item>
              
               <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col>CONTAINER NUMBER:</Col>
                   <Col>
                   <h2 className="appFont">{driverInfo?driverInfo.containerNumber:'N/A'} </h2>
                   </Col>
                 </Row>
               </ListGroup.Item>


               <ListGroup.Item className='borderless centerAttempt entryHeader'>
                 <Row className="headerFont ">
                   <Col >EXIT DETAILS</Col> 
                   
                 </Row>
               </ListGroup.Item>


               <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col> TIME:</Col>
                   <Col>
                    <strong className="appFont">{occupiedSpace=== -1 ?'--':showTime()}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>

               <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col> DATE:</Col>
                   <Col>
                    {/*<strong>{product.countInStock > 4 ?'In Stock':product.countInStock <= 3 ?'Few Left !!':product.countInStock === 0 ? 'Out of Stock':'Currently being restocked' //this currenty being restocked is not the right thing, you just put it there as filler, till the need comes to fix it }</strong>*/}
                     <strong className="appFont">{occupiedSpace=== -1 ?'--':date.toLocaleDateString()}</strong>
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
           <Image className="truckImage" src={invalidTicket} alt={"truck image"} fluid>
           </Image>
           </Row>
           
           
           </Col>
           </Row>

          </Row>
             { occupiedSpace !== -1 && <center>
          <Button onClick={updateAndPrintHandler} className='btn-block printFont printButtonTop' type='button' >
                 <i className='fas fa-print'></i> Print
                 </Button>
                 </center> }

                 

               { /*   <center>
                 
          <Button  onClick={previousPageHandler} className='btn-block printFont printButton' type='button' >
                 <i className='fas fa-arrow-left'></i> Go Back
                 </Button>
                 
               </center> */}
          </>
        )}

        </>
      )

}

export default PrintingScreen
