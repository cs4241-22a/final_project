import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Messages = () => {
return (
	
        <Row style={{textAlign: 'center', margin: '1rem', padding: '1rem'}}>
          <Col>
            <h1>Contact Us</h1>
            <p>Samara Holmes</p>
            <p>Trang Pham</p>
            <p>Eri Kim</p>
            <p>Vishnu Priya Dendukuri</p>
            <p>Arman Saduakas</p>
          </Col>
          <Col>
            <h1>Github</h1>
            <a href="https://github.com/IeKimI/final_project">
              <i className="fa fa-github">
                <span style={{ marginLeft: "10px" }}>
                  GitHub
                </span>
              </i>
            </a>
          </Col>
        </Row>
);
};

export default Messages;
