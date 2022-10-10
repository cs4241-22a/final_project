import React from "react";
import { Button, Container, InputGroup, FormControl, Row, Col, Dropdown } from "react-bootstrap";
  
class SearchAndSort extends React.Component {
    constructor(props) {
      super(props);
      this.state = { sortBy: '' };
    }

    sortBy(criterion) {
        console.log(criterion);
        this.setState(state => { //Store the current sorting criterion (not technically necessary, but might be in the future)
            return { sortBy: criterion };
        });
        //TODO: Set the state of the table by sorting all the recipes by the specified criterion
    }

    render() {
        return (
            <Container style={{ padding: '10px' }}>
                <Row>
                    <Col>
                        <InputGroup>
                            <FormControl placeholder="Search" aria-label="Search" />
                            <Button variant="outline-secondary" id="search-button">Search</Button>
                        </InputGroup>
                    </Col>
                    <Col>
                        <Container>
                            <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="sort-by-dropdown">
                                Sort By: TODO
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>No Sort</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{this.sortBy('recent')}}>Recent</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{this.sortBy('rating')}}>Rating</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{this.sortBy('alphabetical')}}>Alphabetical</Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default SearchAndSort;