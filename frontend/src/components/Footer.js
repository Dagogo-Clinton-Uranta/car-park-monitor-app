import React from 'react';
import {Container, Row ,Col} from 'react-bootstrap';

  const Footer = () => {

    return(
      <footer>
       <Container>
         <Row>
          <Col className='text-center py-3'>
           Copyright &copy; FLACS SYSTEMS 2021 {/* &copy is the HTML entity for the copyright sign*/}
          </Col>
         </Row>
       </Container>
      </footer>
    )
}

export default Footer;
