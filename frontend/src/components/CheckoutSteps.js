import React from 'react'
import {Nav, NavLink,NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckoutSteps = ({step1,step2 ,step3 /*, step4*/}) => {

     return (
       <>
     <Nav className =" justify-content-center mb-4" >

{/*1*/}       <NavItem>
       {step1 ? (
         <LinkContainer to='/login'>
          <NavLink> Sign In</NavLink>
         </LinkContainer>
       ):  <NavLink disabled> Sign In</NavLink>}
         </NavItem>

{/*2*/}       <NavItem>
          {step2 ? (
          
          <LinkContainer to='/shipping'>  
           <NavLink>{/*<i class="fa fa-arrow-right" aria-hidden="true"></i>*/}  Shipping</NavLink>
           </LinkContainer>
           
          ):  <NavLink disabled> Shipping</NavLink>}
            </NavItem>
     


{/*3       <NavItem>
        {step3 ? (
           
          <LinkContainer to='/payment'> 
           <NavLink>Payment</NavLink>
          </LinkContainer>
        
        ):  <NavLink disabled> Payment</NavLink>}
            </NavItem> */}

  {/*3*/}       <NavItem>
           {step3 ? (
            
            <LinkContainer to='/placeorder'>
            <NavLink>{/*<i class="fa fa-arrow-right" aria-hidden="true"></i>*/} Place Order</NavLink>
            </LinkContainer>
            
         ):  <NavLink disabled>Place Order</NavLink>}
            </NavItem>
      
            </Nav>

        </>
     )
}

export default CheckoutSteps
