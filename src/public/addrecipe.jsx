import React from "react";
import ReactDOM from "react-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import Header from './header';


const addARecipe = function() {

    const inputs = {
        title: document.getElementById('title'),
        ingredients: document.getElementById('ingredients'),
        directions: document.getElementById('directions'),
        prepTime: document.getElementById('preptime'),
        numPeople: document.getElementById('numpeople')
    }

    const body = {
        title: inputs.title.value,
        ingredients: inputs.ingredients.value,
        directions: inputs.directions.value,
        prepTime: inputs.prepTime.value,
        numPeople: inputs.numPeople.value
    }

    fetch( '/add', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( body )
    })
        .then( response => response.json() )

    return false
}

class AddRecipe extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="center">
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="title" autoComplete="off" />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="preptime">
                            <Form.Label>Prep Time</Form.Label>
                            <Form.Control type="text" placeholder="Prep Time" autoComplete="off" />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="numpeople">
                            <Form.Label>Number of Servings</Form.Label>
                            <Form.Control type="text" placeholder="Number of Servings" autoComplete="off" />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="ingredients">
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control as="textarea" placeholder="Ingredients (Comma Seperated)" rows={2} autoComplete="off" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="directions">
                        <Form.Label>Directions</Form.Label>
                        <Form.Control as="textarea" placeholder="Directions" rows={5} autoComplete="off" />
                    </Form.Group>

                    <Button variant="primary" onClick= { addARecipe }>
                        Add Recipe
                    </Button>
                </div>
            </div>

        );
    }
}

var mountNode = document.getElementById("page");
ReactDOM.render(<AddRecipe />, mountNode);