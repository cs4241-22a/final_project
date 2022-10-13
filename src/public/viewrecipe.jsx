import React from "react";
import ReactDOM from "react-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import Header from './header';

class ViewRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                title: '',
                ingredients: [],
                directions: '',
                prepTime: '',
                numPeople: '',
                username: ''
            }
        };
        this.load();
    }

    load() {
        //parse the recipe from the URL
        const urlString = window.location.href;
        let url = new URL(urlString);
        let query = {
            title: url.searchParams.get("title")
        };
        //get that recipe from the DB
        fetch('/view', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
            .then(response => response.json())
            .then(data => {
                let the_username = "unknown"
                if (data.username != undefined) {
                    the_username = data.username
                }
                this.setState({
                    recipe: {
                        title: data.title,
                        ingredients: data.ingredients,
                        directions: data.directions,
                        prepTime: data.prepTime,
                        numPeople: data.numPeople,
                        username: the_username
                    }
                });
            });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="center">
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder={this.state.recipe.title + " by " + this.state.recipe.username} disabled={true} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="preptime">
                            <Form.Label>Prep Time(mins)</Form.Label>
                            <Form.Control type="text" defaultValue={this.state.recipe.prepTime} disabled={true} />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="numpeople">
                            <Form.Label>Number of Servings</Form.Label>
                            <Form.Control type="text" defaultValue={this.state.recipe.numPeople} disabled={true} />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="ingredients">
                        <Form.Label>Ingredients (Comma Separated)</Form.Label>
                        <Form.Control as="textarea" rows={2} defaultValue={this.state.recipe.ingredients} disabled={true} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="directions">
                        <Form.Label>Directions</Form.Label>
                        <Form.Control as="textarea" rows={5} defaultValue={this.state.recipe.directions} disabled={true} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Button variant="primary" onClick={back}>
                            Back to All Recipes
                        </Button>
                    </Row>
                </div>
            </div>
        );
    }
}

function back() {
    fetch('/home', {
        method: 'GET',
    })
        .then(response => window.location.replace(response.url));
}

var mountNode = document.getElementById("page");
ReactDOM.render(<ViewRecipe />, mountNode);