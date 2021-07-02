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
import {login} from '../actions/userActions.js'
import {listProductDetails,createProductReview} from '../actions/productActions.js'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants.js'
import {register} from '../actions/userActions.js'
import {createOrder} from '../actions/orderActions.js'

const PrintingScreen = ({history,match}) => {
      /*cuz we need a single product from the array of products,and we gotta do it PER PAGE, we use .find method
      TO FILTER IT OUT FROM THE ARRAY*/
   const [qty ,setQty] = useState('')
   /*const [zoneArea ,setZoneArea] = useState('-')*/
   
   const [exportZoneCounter ,setExportZoneCounter] = useState({zoneF:'',zoneG:'',zoneR:''})  
   const [exceptionZoneCounter ,setExceptionZoneCounter] = useState({zoneH:''})
   const [flatbedEnlZoneCounter ,setFlatbedEnlZoneCounter] = useState({zoneA:'',zoneB:''})
   const [flatbedApmtZoneCounter ,setFlatbedApmtZoneCounter] = useState({zoneC:'',zoneD:'',zoneE:''})
 /*CONSIDER MAKING EACH ZONE COUNTER HERE INTO AN OBJECT SO I CAN ASSIGN CERTAIN PARTS OF THE OBECT A CERTAIN VALUE, AND OTHER PARTS AN EMPTY STRING */



   const [exportFreeSpace ,setExportFreeSpace] = useState('still free')
   const [exceptionFreeSpace ,setExceptionFreeSpace] = useState('still free')
   const [flatbedEnlFreeSpace ,setFlatbedEnlFreeSpace] = useState('still free')
   const [flatbedApmtFreeSpace ,setFlatbedApmtFreeSpace] = useState('still free')
   

   const [allowPrint, setAllowPrint] = useState(true)
  
   const dispatch = useDispatch()
  
  const productDetails = useSelector(state => state.productDetails)
  const {product,loading, error} = productDetails

  const productCreateReview = useSelector(state => state.productCreateReview)
  const {success:successProductReview, error:errorProductReview} = productCreateReview
  
  const orderCreate = useSelector(state => state.orderCreate)
  const {order,loading:loadingorder,error:errororder} = orderCreate

  let userLogin = useSelector(state => state.userLogin)
  let {userInfo,loading:loadinguser,error:erroruser} = userLogin
   /*const userInfo = userInfoArray[0]*/

   let printPermission = true
   let zoneArea
  let zoneCounter
  /*let freeSpace 
  const change = 1 */

   useEffect(()=>{
    dispatch(listProductDetails())
    dispatch(login())




     if(order && order.instruction === 'Do not allow further printing'){
       setAllowPrint(false)
       printPermission = false
     }
   },[dispatch,window])




   
  





 /*console.log(`${showTime()}`)*/
 console.log(userInfo)
 console.log(product)

const updateAndPrintHandler = () => {
  /*consider updating user model in database with the parkzone entry date and entry time, so those will show, instead of a new assignment every time, and to allow for persistence in the case of printing - DONE THIS ALREADY */
  
   if(!userInfo){window.alert('NO DETAILS TO PRINT, PLEASE REFERSH THE SCREEN')}
  else if(exportFreeSpace===0 ||exceptionFreeSpace===0|| flatbedEnlFreeSpace===0||flatbedApmtFreeSpace===0){
    window.alert('ALL SPACES ARE FULL FOR THIS TRUCK CATEGORY, THIS TICKET CANNOT BE PRINTED.')
}
else{
  dispatch(createOrder({
  bookingNumber:userInfo.bookingNumber,
  truckCategory:userInfo.truckCategory,
  containerNumber:userInfo.containerNumber,
  truckNumber:userInfo.truckNumber,
  entryTime:`${showTime()}`,
  entryDate:`${date.toLocaleDateString()}`,
  parkZone:zoneArea,
  tagNumber:zoneCounter
  
}))

window.print()

window.location.reload()

  
} 
 }


/*const previousPageHandler = () => {
  
  window.history.back()
}*/




 
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

  useEffect(() =>{
  if(loading === false){
  if(  product && product[5].occupiedSpaces < 52 ){  /*zoneCounter = product[5].currentFreeSpace*/ setExportZoneCounter({zoneF:product[5].currentFreeSpace , zoneG:'' , zoneR:''})}
     else if(  product && product[5].occupiedSpaces === 52 && product[6].occupiedSpaces < 50 ){ /*zoneCounter =product[6].currentFreeSpace*/ setExportZoneCounter({zoneF:'' , zoneG:product[6].currentFreeSpace , zoneR:''})}
     else if( product && product[6].occupiedSpaces === 50 && product[8].occupiedSpaces < 95 ){ /*zoneCounter =product[8].currentFreeSpace*/ setExportZoneCounter({zoneF:'' , zoneG:'', zoneR:product[8].currentFreeSpace })}
     else if(  product && product[5].occupiedSpaces === 52 && product[6].occupiedSpaces === 50 && product[8].occupiedSpaces === 95 ){/*zoneCounter= freeSpace = 0*/ setExportFreeSpace(0) /*MAYBE CHANGE THIS TO SET FREE SPACE */}
     else{/*zoneCounter = 0*/ console.log("NO FREE SPACE IN EXPORT ZONES IS BEING SET") }

     if(  product && product[7].occupiedSpaces < 51){ /*zoneCounter =product[7].currentFreeSpace*/ setExceptionZoneCounter( {zoneH:product[7].currentFreeSpace})}
    else if( product && product[7].occupiedSpaces === 51 ){/*zoneCounter= freeSpace = 0*/ setExceptionFreeSpace(0)}
    else{/*zoneCounter = 0*/ console.log("NO FREE SPACE IN EXCEPTION ZONES IS BEING SET") }

      if( product  && product[0].occupiedSpaces < 37 ){ /*zoneCounter =product[0].currentFreeSpace*/ setFlatbedEnlZoneCounter({zoneA:product[0].currentFreeSpace,zoneB:''})}
     else if(product  && product[0].occupiedSpaces === 37 && product[1].occupiedSpaces < 46 ){ /*zoneCounter =product[1].currentFreeSpace*/ setFlatbedEnlZoneCounter( {zoneA:'',zoneB:product[1].currentFreeSpace})}
    else if(  product && product[0].occupiedSpaces === 37 && product[1].occupiedSpaces === 46 ){/*zoneCounter= freeSpace = 0*/  setFlatbedEnlFreeSpace(0)}
    else{/*zoneCounter = 0*/ console.log("NO FREE SPACE IN FlatbedENL/EKO ZONES IS BEING SET") }

      if(  product  && product[2].occupiedSpaces < 78 ){ /*zoneCounter =product[2].currentFreeSpace*/ setFlatbedApmtZoneCounter( {zoneC:product[2].currentFreeSpace,zoneD:'',zoneE:''} )}
     else if(  product  && product[2].occupiedSpaces === 78 && product[3].occupiedSpaces < 30 ){ /*zoneCounter =product[3].currentFreeSpace*/ setFlatbedApmtZoneCounter( {zoneC:'',zoneD:product[3].currentFreeSpace,zoneE:''} )}
    else if(  product  && product[3].occupiedSpaces === 30 && product[4].occupiedSpaces < 71 ){ /*zoneCounter =product[4].currentFreeSpace*/ setFlatbedApmtZoneCounter({zoneC:'',zoneD:'',zoneE:product[4].currentFreeSpace} )}
    else if(  product && product[2].occupiedSpaces === 78 && product[3].occupiedSpaces === 30 && product[4].occupiedSpaces === 71){/*zoneCounter= freeSpace = 0*/ setFlatbedApmtFreeSpace(0)}
    else{/*zoneCounter = 0*/ console.log("NO FREE SPACE IN FlatbedApmt ZONES IS BEING SET") }
  }
}
  ,[productDetails,loading])
  
 

 if(userInfo && userInfo.truckCategory === "EXPORT" && exportZoneCounter.zoneF !== ''  && exportZoneCounter.zoneG === '' && exportZoneCounter.zoneR === ''  ){ zoneArea = 'F' /*setZoneArea('F')*/}
 else if(userInfo && userInfo.truckCategory === 'EXPORT' && exportZoneCounter.zoneF == ''  && exportZoneCounter.zoneG !== '' && exportZoneCounter.zoneR === ''  ){zoneArea = 'G' /*setZoneArea('G')*/}
 else if(userInfo && userInfo.truckCategory === 'EXPORT' && exportZoneCounter.zoneF === ''  && exportZoneCounter.zoneG === '' && exportZoneCounter.zoneR !== ''  ){zoneArea = 'R' /*setZoneArea('R')*/}
  else if(userInfo && userInfo.truckCategory === 'EXPORT' && exportFreeSpace === 0 ){zoneArea = 'X' /*setZoneArea('X')*/}
  else if(userInfo && userInfo.truckCategory === 'EXCEPTION' && exceptionZoneCounter.zoneH !== ''  ){zoneArea = 'H' /*setZoneArea('H')*/}
 else if(userInfo && userInfo.truckCategory === 'EXCEPTION' && exceptionFreeSpace === 0 ){zoneArea = 'X' /*setZoneArea('X')*/}
 else if(userInfo && userInfo.truckCategory === "FLAT BED ENL/EKO" && flatbedEnlZoneCounter.zoneA !== ''  ){zoneArea = 'A' /*setZoneArea('A')*/}
 else if(userInfo && userInfo.truckCategory === "FLAT BED ENL/EKO" && flatbedEnlZoneCounter.zoneB !== ''  ){zoneArea = 'B' /*setZoneArea('A')*/}
else if(userInfo && userInfo.truckCategory === "FLAT BED ENL/EKO" && flatbedEnlFreeSpace === 0){zoneArea = 'X' /*setZoneArea('X')*/}
 else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" &&  flatbedApmtZoneCounter.zoneC !== '' ){zoneArea = 'C' /*setZoneArea('C')*/}
  else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && flatbedApmtZoneCounter.zoneD !== ''){zoneArea = 'D' /*setZoneArea('D')*/}
 else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && flatbedApmtZoneCounter.zoneE !== ''){zoneArea = 'E' /*setZoneArea('E')*/}
 else if(userInfo && userInfo.truckCategory === "FLAT BED APMT" && flatbedApmtFreeSpace === 0 ){zoneArea = 'X'/*setZoneArea('X')*/}
  else{ zoneArea ='-' /*setZoneArea('-')*/}

  

  if( exportZoneCounter.zoneF !== ''  ){ zoneCounter = exportZoneCounter.zoneF /*setZoneCounter('F')*/}
  else if( exportZoneCounter.zoneG !== ''  ){zoneCounter = exportZoneCounter.zoneG /*setZoneCounter('G')*/}
  else if( exportZoneCounter.zoneR !== ''  ){zoneCounter = exportZoneCounter.zoneR /*setZoneCounter('R')*/}
   else if(  exceptionZoneCounter.zoneH !== ''  ){zoneCounter = exportZoneCounter.zoneH /*setZoneCounter('H')*/}
  else if( flatbedEnlZoneCounter.zoneA !== ''  ){zoneCounter = exportZoneCounter.zoneA/*setZoneCounter('A')*/}
  else if( flatbedEnlZoneCounter.zoneB !== ''  ){zoneCounter = exportZoneCounter.zoneB /*setZoneCounter('A')*/}
  else if(  flatbedApmtZoneCounter.zoneC !== '' ){zoneCounter = exportZoneCounter.zoneC /*setZoneCounter('C')*/}
   else if(flatbedApmtZoneCounter.zoneD !== ''){zoneCounter = exportZoneCounter.zoneD /*setZoneCounter('D')*/}
  else if( flatbedApmtZoneCounter.zoneE !== ''){zoneCounter = exportZoneCounter.zoneE /*setZoneCounter('E')*/}
   else{ zoneCounter =0 /*setZoneCounter('-')*/}

  

 

      return(
        <>
        

        {(
          <>
          <Meta title={"FLACS PARKING SYSTEM"}/>
          {(!loading) && (exportFreeSpace===0 ||exceptionFreeSpace===0|| flatbedEnlFreeSpace===0||flatbedApmtFreeSpace===0) && <center className='messageSpacing'> <p className='driversEntryPermit ' >ALL PARKING SLOTS FOR {/*userInfo.truckCategory*/} ARE OCCUPIED, PLEASE WAIT UNTIL SOMEONE LEAVES. </p></center>}
          
          <Row className= "ticketBorder" >
            <Col>
          <Row><p className='apapa'>LILYPOND</p></Row> 
          
          <Row className ="ticketIntro">
          <p className='driversEntryPermit'>DRIVERS ENTRY PERMIT</p>
            </Row>

            <Row className="ticketIntro">

            <Col>
            <Row>
           <Image className="truckImage" src={userInfo && userInfo.truckCategory === "FLAT BED APMT"?flatbedAPMTImage:(userInfo && userInfo.truckCategory === "FLAT BED ENL/EKO"?flatbedENLImage:(userInfo && userInfo.truckCategory === "EXPORT"?exportImage:(userInfo && userInfo.truckCategory === "EXCEPTION"?exportImage:(invalidTicket))))} alt={"image of a trailer, based on it's category"} fluid>
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
                 {userInfo && userInfo.parkZone?userInfo.parkZone:zoneArea}
                 </p>
                 </center>
               </ListGroup.Item>

               <ListGroup.Item>
                 <Row>
                   <Col className="slightlyBiggerAppFont">No</Col>
                   <Col>
                    <strong className="mildlyBiggerAppFont"> {userInfo && userInfo.tagNumber !==0?userInfo.tagNumber:zoneCounter} </strong>
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
                   <Col>JOURNEY CODE:</Col>
                   <Col>
                   <h2 className="appFont">{userInfo?userInfo.bookingNumber:'N/A'}</h2>
                   </Col>
                 </Row>
               </ListGroup.Item>
              
              
              
              <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col>PLATE NUMBER:</Col>
                   <Col>
                   <h2 className="appFont">{userInfo?userInfo.truckNumber:'N/A'}</h2>
                   </Col>
                 </Row>
               </ListGroup.Item>
              
               <ListGroup.Item className='borderless'>
                 <Row className="appFont">
                   <Col>CONTAINER NUMBER:</Col>
                   <Col>
                   <h2 className="appFont">{userInfo?userInfo.containerNumber:'N/A'} </h2>
                   </Col>
                 </Row>
               </ListGroup.Item>


               <ListGroup.Item className='borderless centerAttempt entryHeader'>
                 <Row className="entryDetailsFont ">
                   <Col >ENTRY DETAILS</Col> 
                   
                 </Row>
               </ListGroup.Item>


               <ListGroup.Item className='borderless'>
                 <Row className="headerFont">
                   <Col> TIME:</Col>
                   <Col>
                    <strong className="headerFont">{userInfo /*&& userInfo.entryTime */?userInfo.entryTime:((exportFreeSpace===0 ||exceptionFreeSpace===0|| flatbedEnlFreeSpace===0||flatbedApmtFreeSpace===0)?'--':showTime())}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>

               <ListGroup.Item className='borderless'>
                 <Row className="headerFont">
                   <Col> DATE:</Col>
                   <Col>
                    
                     <strong className="headerFont">{userInfo/* && userInfo.entryTime*/?userInfo.entryDate:((exportFreeSpace===0 ||exceptionFreeSpace===0|| flatbedEnlFreeSpace===0||flatbedApmtFreeSpace===0)?'--': date.toLocaleDateString())}</strong>
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
             { /*freeSpace !== -1 ? <center>
          <Button onClick={updateAndPrintHandler} className='btn-block printFont printButtonTop' type='button' >
                 <i className='fas fa-print'></i> Print
                 </Button>
                 </center> :*/printPermission? 
                <center>
                <Button onClick={updateAndPrintHandler} className='btn-block printFont printButtonTop' type='button' >
                       <i className='fas fa-print'></i> Print
                       </Button>
                       </center> 
                 
                 :' '}

                 


               {/* buttonVis &&   <center>
                 <Link to={`/`}>
          <Button  className='btn-block printFont printButton' type='button' >
                 <i className='fas fa-home'></i> home screen
                 </Button>
                 </Link>
               </center> */}
          </>
        )}
      {order && <Message variant='danger'>{order.instruction}</Message>}
        </>
      )


 }

export default PrintingScreen
