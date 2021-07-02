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
import {createOrder, sendRecords} from '../actions/orderActions.js'

const ExitPrintScreen = ({history,match}) => {
      /*cuz we need a single product from the array of products,and we gotta do it PER PAGE, we use.find method
      TO FILTER IT OUT FROM THE ARRAY*/
   const [qty ,setQty] = useState('')
   const [rating ,setRating] = useState(0)
   const [comment ,setComment] = useState('')
   const [buttonVis ,setButtonVis] = useState(true)
   const [allowPrint, setAllowPrint] = useState(true)

  const dispatch = useDispatch()
  
  const productDetails = useSelector(state => state.productDetails)
  const {product,loading, error} = productDetails

  const updateRecords = useSelector(state => state.updateRecords)
  const {order,loading:loadingRecords, error:errorRecords} = updateRecords
  

  const releaseDriver = useSelector(state => state.releaseDriver)
  const {driverInfo} = releaseDriver
  
  console.log(driverInfo)

  const change = -1
  let zoneArea
  let zoneCounter  
  let freeSpace

 useEffect(()=>{
  /*dispatch(login())*/
  dispatch(driverDetails()) 
  dispatch(listProductDetails())
  
  if(driverInfo && driverInfo.truckCategory === "EXPORT" && product  && product[5].occupiedSpaces < 52 ){  zoneCounter = product[5].currentFreeSpace}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].occupiedSpaces === 52 && product[6].occupiedSpaces < 50 ){ zoneCounter =product[6].currentFreeSpace}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[6].occupiedSpaces === 50 && product[8].occupiedSpaces < 95 ){ zoneCounter =product[8].currentFreeSpace}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5]&& product[5].occupiedSpaces === 0 && product[6] && product[6].occupiedSpaces === 0  && product[8].occupiedSpaces && product[8].occupiedSpaces === 0 ){zoneCounter= freeSpace = 0}
  else if(driverInfo && driverInfo.truckCategory === 'EXCEPTION' && product && product[7].occupiedSpaces < 51){ zoneCounter =product[7].currentFreeSpace}
  else if(driverInfo && driverInfo.truckCategory === 'EXCEPTION' && product &&  product[7].occupiedSpaces && product[7].occupiedSpaces === 0 ){zoneCounter= freeSpace = 0}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].occupiedSpaces < 37 ){ zoneCounter =product[0].currentFreeSpace}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].occupiedSpaces === 37 && product[1].occupiedSpaces < 46 ){ zoneCounter =product[1].currentFreeSpace}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product && product[0].occupiedSpaces && product[0].occupiedSpaces === 0 && product[1].occupiedSpaces && product[1].occupiedSpaces === 0 ){zoneCounter= freeSpace = 0}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].occupiedSpaces < 78 ){ zoneCounter =product[2].currentFreeSpace}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].occupiedSpaces === 78 && product[3].occupiedSpaces < 30 ){ zoneCounter =product[3].currentFreeSpace}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[3].occupiedSpaces === 30 && product[4].occupiedSpaces < 71 ){ zoneCounter =product[4].currentFreeSpace}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product && product[2].occupiedSpaces && product[2].occupiedSpaces === 0 && product[3].occupiedSpaces && product[3].occupiedSpaces === 0 && product[4].occupiedSpaces && product[4].occupiedSpaces === 0){zoneCounter= freeSpace = 0}
  else{zoneCounter = 0 }



   
 },[dispatch])



const updateAndPrintHandler = () => {
 /*dispatch(register(zoneArea,zoneCounter,change))*/
  
 if(!driverInfo){window.alert('NO DETAILS TO PRINT,PLEASE REFRESH THE SCREEN')}
  else if(freeSpace === 0){
    window.alert('ALL SPACES ARE EMPTY FOR THIS TRUCK CATEGORY, THIS TICKET CANNOT BE PRINTED.')
}
else{
  dispatch(sendRecords({
    bookingNumber:driverInfo.bookingNumber,
    truckCategory:driverInfo.truckCategory,
    containerNumber:driverInfo.containerNumber,
    truckNumber:driverInfo.truckNumber,
    entryTime:driverInfo.entryTime,
    entryDate:driverInfo.entryDate,
    exitTime:driverInfo.exitTime, // i removed the template literals
    exitDate:driverInfo.exitDate, // i removed the template literals
    parkZone:driverInfo.parkZone,
    tagNumber:driverInfo.tagNumber
    
  }))
  window.print()
  /*window.location.reload()*/
}
  }

const previousPageHandler = () => {
  
  window.history.back()
}


console.log(driverInfo)

 
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

  



  

    /*in the code below, you gotta MAKE parkedTrucks.filter((e)=>{e !=={}}).length  INTO A SIMPLE VARIABLE */


    
  
    /*if(driverInfo && driverInfo.truckCategory === "EXPORT" && product  && product[5].occupiedSpaces < 52 ){  zoneCounter = product[5].currentFreeSpace}
    else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].occupiedSpaces === 52 && product[6].occupiedSpaces < 50 ){ zoneCounter =product[6].currentFreeSpace}
    else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[6].occupiedSpaces === 50 && product[8].occupiedSpaces < 95 ){ zoneCounter =product[8].currentFreeSpace}
    else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product &&  product[5].occupiedSpaces === 0 && product[6].occupiedSpaces === 0  && product[8].occupiedSpaces === 0 ){zoneCounter= freeSpace = 0}
    else if(driverInfo && driverInfo.truckCategory === 'EXCEPTION' && product && product[7].occupiedSpaces < 51){ zoneCounter =product[7].currentFreeSpace}
    else if(driverInfo && driverInfo.truckCategory === 'EXCEPTION' && product && product[7].occupiedSpaces === 0 ){zoneCounter= freeSpace = 0}
    else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].occupiedSpaces < 37 ){ zoneCounter =product[0].currentFreeSpace}
    else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].occupiedSpaces === 37 && product[1].occupiedSpaces < 46 ){ zoneCounter =product[1].currentFreeSpace}
    else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product && product[0].occupiedSpaces === 0 && product[1].occupiedSpaces === 0 ){zoneCounter= freeSpace = 0}
    else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].occupiedSpaces < 78 ){ zoneCounter =product[2].currentFreeSpace}
    else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].occupiedSpaces === 78 && product[3].occupiedSpaces < 30 ){ zoneCounter =product[3].currentFreeSpace}
    else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[3].occupiedSpaces === 30 && product[4].occupiedSpaces < 71 ){ zoneCounter =product[4].currentFreeSpace}
    else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product && product[2].occupiedSpaces === 0 && product[3].occupiedSpaces === 0 && product[4].occupiedSpaces === 0){zoneCounter= freeSpace = 0}
    else{zoneCounter = 0 }*/

    


      return(
        <>
       
        
          <>
          <Meta title={"FLACS PARKING SYSTEM"}/>

          {freeSpace===0 &&<center className='messageSpacing'> <p className='driversEntryPermit ' >ALL PARKING SLOTS FOR {driverInfo.truckCategory} ARE EMPTY, PLEASE WAIT UNTIL SOMEONE ENTERS AND IS READY TO LEAVE. </p></center>}
          {!driverInfo &&<center className='messageSpacing'> <p className='driversEntryPermit ' >NO DETAILS, PLEASE REFRESH THE SCREEN </p></center>}
          <Row className= "ticketBorder" >
            <Col>
          <Row><p className='apapa'>LILYPOND</p></Row> 
          
          <Row className ="ticketIntro">
          <p className='driversEntryPermit'>DRIVERS EXIT SLIP</p>
            </Row>

            <Row className="ticketIntro">

            <Col>
            <Row>
           <Image className="truckImage" src={driverInfo && driverInfo.truckCategory === "FLAT BED APMT"?flatbedAPMTImage:(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO"?flatbedENLImage:(driverInfo && driverInfo.truckCategory === "EXPORT"?exportImage:(driverInfo && driverInfo.truckCategory === "EXCEPTION"?exportImage:(invalidTicket))))} alt={"truck image"} fluid>
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
                  
                 {driverInfo?driverInfo.parkZone:'-'}
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
                   <Col>JOURNEY CODE:</Col>
                   <Col>
                   <h2 className="appFont">{driverInfo?driverInfo.bookingNumber:'N/A'}</h2>
                   </Col>
                 </Row>
               </ListGroup.Item>
              
              
              
              <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col>PLATE NUMBER:</Col>
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
                 <Row className="entryDetailsFont ">
                   <Col >EXIT DETAILS</Col> 
                   
                 </Row>
               </ListGroup.Item>


               <ListGroup.Item className='borderless'>
                 <Row className="headerFont ">
                   <Col> TIME:</Col>
                   <Col className="tightMargin ">
                    <strong className="headerFont ">{freeSpace=== 0 ?'--':(driverInfo && driverInfo.exitTime)}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>

               <ListGroup.Item className='borderless'>
                 <Row className="headerFont ">
                   <Col> DATE:</Col>
                   <Col >
                    {/*<strong>{product.countInStock > 4 ?'In Stock':product.countInStock <= 3 ?'Few Left !!':product.countInStock === 0 ? 'Out of Stock':'Currently being restocked' //this currenty being restocked is not the right thing, you just put it there as filler, till the need comes to fix it }</strong>*/}
                     <strong className="headerFont ">{freeSpace=== 0 ?'--':(driverInfo && driverInfo.exitDate)}</strong>
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
             { freeSpace !== 0 && <center>
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
       {order && <Message variant='danger'>{order.instruction}</Message>}

        </>
      )

}

export default ExitPrintScreen
