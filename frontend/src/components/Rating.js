import React from 'react'
import PropTypes from 'prop-types'
/*this PropTypes thing is like mongoose schema, checks what you put in*/

const Rating = (props) => {

  Rating.defaultProps = {
    /*So asides from passing props from other components, you can set the props yourself on the recipient component, i.e the current one. Rating.defaultProps will not be in the return statement btw*/
    color:'#f8e825'
  }

   Rating.propTypes ={
     value:PropTypes.number.isRequired,
     text: PropTypes.string.isRequired,
     color:PropTypes.string  /*all these stuff will show error on the console if they are violated ,but will still show on the webpage*/  
   }


    return(
      <div className='rating'>
      {/*STAR 1*/}
       <span >
        <i style={{color: props.color}} className={props.value >= 1? 'fas fa-star': props.value>=0.5?'fa-star-half-alt':'far fa-star'}></i>
       </span>

      {/*STAR 2*/}
       <span>
         <i  style={{color: props.color}}className={props.value >= 2? 'fas fa-star': props.value>=1.5?'fa-star-half-alt':'far fa-star'}></i>
       </span>

      {/*STAR 3*/}
        <span>
          <i style={{color: props.color}} className={props.value >= 3? 'fas fa-star': props.value>=2.5?'fa-star-half-alt':'far fa-star'}></i>
        </span>

        {/*STAR 4*/}
        <span>
          <i style={{color: props.color}} className={props.value >= 4? 'fas fa-star': props.value>=3.5?'fa-star-half-alt':'far fa-star'}></i>
        </span>

        {/*STAR 5*/}
        <span>
          <i style={{color: props.color}} className={props.value === 5? 'fas fa-star': props.value>=4.5?'fa-star-half-alt':'far fa-star'}></i>
        </span>

        <span>{props.text && props.text}</span>
        
      </div>

    )

   

}

export default Rating
