
import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import PrintingScreen from './screens/PrintingScreen.js'
import TruckParkDetailsScreen from './screens/TruckParkDetailsScreen.js'
import ExitScreen from './screens/ExitScreen.js'
import ExitPrintScreen from './screens/ExitPrintScreen.js'
import CartScreen from './screens/CartScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import OrderScreen from './screens/OrderScreen.js'
import OrderListScreen from './screens/OrderListScreen.js'
import CommunicationScreen from './screens/CommunicationScreen.js'
import AdminComScreen from './screens/AdminComScreen.js'
import UserListScreen from './screens/UserListScreen.js'
import UserEditScreen from './screens/UserEditScreen.js'
import ProductListScreen from './screens/ProductListScreen.js'
import ProductEditScreen from './screens/ProductEditScreen.js'

const App = () => {

    return (
      
      
  <Router> 
      <Header/>
      <main className ='py-3'>
       <Container>
       {/*< Route path='/order/:id' component={OrderScreen}/>
       < Route path='/shipping' component={ShippingScreen}/>
       < Route path='/payment' component={PaymentScreen}/>
       < Route path='/placeorder' component={PlaceOrderScreen}/>
       < Route path='/login' component={LoginScreen}/>
       < Route path='/register' component={RegisterScreen}/>
       < Route path='/profile' component={ProfileScreen}/>
    < Route path= '/communications' component={CommunicationScreen} />*/}
       
        < Route path='/'exact component={ProductScreen}/> 
        < Route path='/printenter' component={PrintingScreen}/> 
        < Route path='/parklogs' exact component={OrderListScreen}/>
        < Route path='/parklog/:id' component={TruckParkDetailsScreen}/>
        < Route path='/exit'exact component={ExitScreen}/> 
        < Route path='/printexit' component={ExitPrintScreen}/> 
        {/*< Route path='/cart/:id?' component={CartScreen}/>
        < Route path='/admin/userlist' component={UserListScreen}/>
        < Route path='/admin/user/:id/communications' component={AdminComScreen}/>
        < Route path='/admin/user/:id/edit' component={UserEditScreen}/>
        < Route path='/admin/productlist'  exact component={ProductListScreen}/>
        < Route path='/admin/productlist/:pageNumber'  exact component={ProductListScreen}/>
        < Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
       
        < Route path='/search/:keyword' component={HomeScreen} exact/>
        < Route path='/page/:pageNumber'exact component={HomeScreen}/>
        < Route path='/search/:keyword/page/:pageNumber'  exact component={HomeScreen}/>
        < Route path='/'exact component={HomeScreen}/>*/}

       
       </Container>
      </main>
      <Footer/>
  </Router> 
  
    )
}

export default App
