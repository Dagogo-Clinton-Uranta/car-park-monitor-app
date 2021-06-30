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

const PrintingScreen = ({history,match}) => {
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
 useEffect(()=>{
  /*dispatch(login())*/
  dispatch(driverDetails()) 
  dispatch(listProductDetails())
  
   
 },[dispatch,match])



const updateAndPrintHandler = () => {
 /*dispatch(register(zoneArea,zoneCounter,change))*/
  
  dispatch(sendRecords({
    bookingNumber:driverInfo.bookingNumber,
    truckCategory:driverInfo.truckCategory,
    containerNumber:driverInfo.containerNumber,
    truckNumber:driverInfo.truckNumber,
    entryTime:driverInfo.entryTime,
    entryDate:driverInfo.entryDate,
    exitTime:showTime(), // i removed the template literals
    exitDate:date.toLocaleDateString(), // i removed the template literals
    parkZone:driverInfo.parkZone,
    tagNumber:driverInfo.tagNumber
    
  }))
  window.print()
  /*window.location.reload()*/
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

  



  const change = -1
  let zoneArea
  let zoneCounter  
  let occupiedSpace

    /*in the code below, you gotta MAKE parkedTrucks.filter((e)=>{e !=={}}).length  INTO A SIMPLE VARIABLE */


  /* if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[6].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[7].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[8].parkedTrucks.filter((e)=>{e !=={}}).length === 0 ){zoneArea = 'X'}
  else if(driverInfo && driverInfo.truckCategory === "EXPORT" && product  && product[5].parkedTrucks.filter((e)=>{e !=={}}).length < 52 ){ zoneArea = 'F'}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].parkedTrucks.filter((e)=>{e !=={}}).length === 52 && product[6].parkedTrucks.filter((e)=>{e !=={}}).length < 50 ){zoneArea = 'G'}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[6].parkedTrucks.filter((e)=>{e !=={}}).length === 50 && product[7].parkedTrucks.filter((e)=>{e !=={}}).length < 51 ){zoneArea = 'H'}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[7].parkedTrucks.filter((e)=>{e !=={}}).length === 51 && product[8].parkedTrucks.filter((e)=>{e !=={}}).length < 95 ){zoneArea = 'R'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product && product[0].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[1].parkedTrucks.filter((e)=>{e !=={}}).length === 0 ){zoneArea = 'X'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].parkedTrucks.filter((e)=>{e !=={}}).length < 37 ){zoneArea = 'A'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].parkedTrucks.filter((e)=>{e !=={}}).length === 37 && product[1].parkedTrucks.filter((e)=>{e !=={}}).length < 46 ){zoneArea = 'B'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product && product[2].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[3].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[4].parkedTrucks.filter((e)=>{e !=={}}).length === 0){zoneArea = 'X'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].parkedTrucks.filter((e)=>{e !=={}}).length < 78 ){zoneArea = 'C'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].parkedTrucks.filter((e)=>{e !=={}}).length === 78 && product[3].parkedTrucks.filter((e)=>{e !=={}}).length < 30 ){zoneArea = 'D'}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[3].parkedTrucks.filter((e)=>{e !=={}}).length === 30 && product[4].parkedTrucks.filter((e)=>{e !=={}}).length < 71 ){zoneArea = 'E' }
  else{ zoneArea ='-'}

  if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[6].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[7].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[8].parkedTrucks.filter((e)=>{e !=={}}).length === 0 ){zoneCounter = occupiedSpace  = -1}
  if(driverInfo && driverInfo.truckCategory === "EXPORT" && product  && product[5].parkedTrucks.filter((e)=>{e !=={}}).length < 52 ){  zoneCounter = product[5].parkedTrucks.filter((e)=>{e !=={}}).length}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[5].parkedTrucks.filter((e)=>{e !=={}}).length === 52 && product[6].parkedTrucks.filter((e)=>{e !=={}}).length < 50 ){ zoneCounter =product[6].parkedTrucks.filter((e)=>{e !=={}}).length}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[6].parkedTrucks.filter((e)=>{e !=={}}).length === 50 && product[7].parkedTrucks.filter((e)=>{e !=={}}).length < 51 ){ zoneCounter =product[7].parkedTrucks.filter((e)=>{e !=={}}).length}
  else if(driverInfo && driverInfo.truckCategory === 'EXPORT' && product && product[7].parkedTrucks.filter((e)=>{e !=={}}).length === 51 && product[8].parkedTrucks.filter((e)=>{e !=={}}).length < 95 ){ zoneCounter =product[8].parkedTrucks.filter((e)=>{e !=={}}).length}
  
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product && product[0].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[1].parkedTrucks.filter((e)=>{e !=={}}).length === 0 ){zoneCounter= occupiedSpace = -1}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].parkedTrucks.filter((e)=>{e !=={}}).length < 37 ){ zoneCounter =product[0].parkedTrucks.filter((e)=>{e !=={}}).length}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED ENL/EKO" && product  && product[0].parkedTrucks.filter((e)=>{e !=={}}).length === 37 && product[1].parkedTrucks.filter((e)=>{e !=={}}).length < 46 ){ zoneCounter =product[1].parkedTrucks.filter((e)=>{e !=={}}).length}
  
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product && product[2].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[3].parkedTrucks.filter((e)=>{e !=={}}).length === 0 && product[4].parkedTrucks.filter((e)=>{e !=={}}).length === 0){zoneCounter= occupiedSpace = -1}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].parkedTrucks.filter((e)=>{e !=={}}).length < 78 ){ zoneCounter =product[2].parkedTrucks.filter((e)=>{e !=={}}).length}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[2].parkedTrucks.filter((e)=>{e !=={}}).length === 78 && product[3].parkedTrucks.filter((e)=>{e !=={}}).length < 30 ){ zoneCounter =product[3].parkedTrucks.filter((e)=>{e !=={}}).length}
  else if(driverInfo && driverInfo.truckCategory === "FLAT BED APMT" && product  && product[3].parkedTrucks.filter((e)=>{e !=={}}).length === 30 && product[4].parkedTrucks.filter((e)=>{e !=={}}).length < 71 ){ zoneCounter =product[4].parkedTrucks.filter((e)=>{e !=={}}).length}
  else{zoneCounter = 0 }*/



      return(
        <>
       
        
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
                   <Col>
                    <strong className="headerFont ">{occupiedSpace=== -1 ?'--':showTime()}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>

               <ListGroup.Item className='borderless'>
                 <Row className="headerFont ">
                   <Col> DATE:</Col>
                   <Col>
                    {/*<strong>{product.countInStock > 4 ?'In Stock':product.countInStock <= 3 ?'Few Left !!':product.countInStock === 0 ? 'Out of Stock':'Currently being restocked' //this currenty being restocked is not the right thing, you just put it there as filler, till the need comes to fix it }</strong>*/}
                     <strong className="headerFont ">{occupiedSpace=== -1 ?'--':date.toLocaleDateString()}</strong>
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
       {order && <Message variant='danger'>{order.instruction}</Message>}

        </>
      )

}

export default PrintingScreen
