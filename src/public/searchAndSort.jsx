import React from "react";
import { Button, Container, InputGroup, FormControl, Row, Col, Dropdown } from "react-bootstrap";
  
class SearchAndSort extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount(){
        //Don't make this persistent with React, just set it once on load
        document.getElementById('search-bar').value = new URL(location.href).searchParams.get('search')||'';
    }

    capitalize(string){
        if(string && string.length >= 1){
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            return string;
        }
    }

    sortBy(criterion) {
        const url = new URL(location.href);
        url.searchParams.set('sort', criterion);
        location.assign(url.search);
    }

    search() {
        var search = document.getElementById('search-bar').value;
        const url = new URL(location.href);
        url.searchParams.set('search', search);
        if(search == ''){
            url.searchParams.delete('search');
        }
        location.assign(url.search || '?');
    }

    render() {
        return (
            <Container style={{ padding: '10px' }}>
                <Row>
                    <Col>
                        <InputGroup>
                            <FormControl placeholder="Search" aria-label="Search" id="search-bar" onClick={(e)=>e.target.select()} onKeyPress={(e)=>{if(e.key == 'Enter'){this.search();}}} />
                            <Button variant="outline-secondary" id="search-button" onClick={()=>{this.search();}}>Search</Button>
                        </InputGroup>
                    </Col>
                    <Col>
                        <Container>
                            <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="sort-by-dropdown">
                                Sort By: {this.capitalize(new URL(location.href).searchParams.get('sort'))||'Recent'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>{this.sortBy('recent')}}>Recent</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{this.sortBy('preptime')}}>Prep. Time</Dropdown.Item>
                                <Dropdown.Item onClick={()=>{this.sortBy('servings')}}>Servings</Dropdown.Item>
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