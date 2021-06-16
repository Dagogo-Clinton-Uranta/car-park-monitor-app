import React from 'react'
import {Container ,Row , Col} from 'react-bootstrap'

const FormContainer = ({children}) => {
    return (
      <div>

       <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
           {children} {/*so the form that we create is gonna go in here as the children prop*/}
          </Col>
        </Row>
       </Container>

      </div>
    )

}



export default FormContainer
