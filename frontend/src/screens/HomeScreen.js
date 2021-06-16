import React ,{ useEffect} from 'react';
//import products from '../products';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import ProductComponent from '../components/productComponent'
import ProductCarousel from '../components/ProductCarousel'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions.js'
//import {Helmet} from 'react-helmet'
import Meta from '../components/Meta'
/*dont forget to npm install axios*/

 const HomeScreen = ({match}) => {
   const keyword = match.params.keyword

   const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {products,loading,error,page,pages} = productList

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo } = userLogin

  

  let vendorName =  userInfo !== null && userInfo.isMerchant ? userInfo.name:'' 

useEffect(()=>{ //we can't make the useEffect function async
 


dispatch(listProducts(keyword,pageNumber,vendorName)) //please note that this dispatch is not actually dispatch, it's use dispatch, which is making use of the useDispatch connector  and that is calling the productList action, which does stuff like fetching data and dispatching action objects to the reducer. hats why they make action creators separately, so we can see them sending things to he reducer

}, [dispatch,keyword,pageNumber,vendorName,userInfo])  // you can't use a function in useEffect, without passing it as a dependency?


   return (
     <>
     <Meta/>
    {/* meta component replaces this! <Helmet >//you can slap this on any screen/component you want, after importing it
      <title>Welcome to Proshop|Home</title>
      <meta name='description' content='we sell the best products for cheap' />
      <meta name='keywords' content='electronics, tech,apple, cheap gadgets' />
    </Helmet>*/}
     {!keyword ? <ProductCarousel/>: <Link to='/' className='btn btn-light'>Go Back</Link>}

      <h1>Latest Products</h1>
      {loading ?(<Loader/>):error ?(<Message variant='danger'>{error}</Message>):
      (  <>
        <Row>
       {products.map((product)=>{
         return(<Col key={product.id} sm={11} md={6} lg={4} xl={3}>
         <ProductComponent product={product} />
         </Col>)
       })}
      </Row>

      <Paginate pages={pages} page={page} keyword={keyword ? keyword:''}/>
    </>)
    }

     </>
   )
 };




export default HomeScreen;
