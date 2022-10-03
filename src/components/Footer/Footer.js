
import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
  
const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="https://github.com/cs4241-22a/final_project">Assignment</FooterLink>
            <FooterLink href="#">Goal</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Samara Holmes</FooterLink>
            <FooterLink href="#">Trang Pham</FooterLink>
            <FooterLink href="#">Eri Kim</FooterLink>
            <FooterLink href="#">Vishnu Priya Dendukuri</FooterLink>
            <FooterLink href="#">Arman Saduakas</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://github.com/IeKimI/final_project">
              <i className="fa fa-github">
                <span style={{ marginLeft: "10px" }}>
                  GitHub
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;