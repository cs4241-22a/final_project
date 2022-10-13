import React from "react";
import ReactDOM from "react-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import Header from './header';

// title of recipe from URL
let URLtitle = ""

class EditRecipe extends React.Component {

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
        URLtitle = url.searchParams.get("title");
        let query = {
            title: URLtitle
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
                let the_username = "unknown";
                if (data.username != undefined) {
                    the_username = data.username;
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
                        <Form.Control type="text" placeholder={this.state.recipe.title + " by " + this.state.recipe.username} disabled={true}
                            title="You cannot change the name of a recipe." />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="preptime">
                            <Form.Label>Prep Time (minutes)</Form.Label>
                            <Form.Control type="text" defaultValue={this.state.recipe.prepTime} />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="numpeople">
                            <Form.Label>Number of Servings</Form.Label>
                            <Form.Control type="text" defaultValue={this.state.recipe.numPeople} />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="ingredients">
                        <Form.Label>Ingredients (Comma Separated)</Form.Label>
                        <Form.Control as="textarea" rows={2} defaultValue={this.state.recipe.ingredients} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="directions">
                        <Form.Label>Directions</Form.Label>
                        <Form.Control as="textarea" rows={5} defaultValue={this.state.recipe.directions} />
                    </Form.Group>
                    <Row className="mb-3">
                        <Button as={Col} variant="primary" onClick={back}>
                            Back
                        </Button>
                        <Button as={Col} variant="primary" onClick={modifyRecipe}>
                            Edit Recipe
                        </Button>
                        <Button as={Col} variant="primary" onClick={deleteRecipe}>
                            Delete Recipe
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

const modifyRecipe = function () {
    //send all the fields, since any could be changed besides title, and title is used for search purposes
    const inputs = {
        ingredients: document.getElementById('ingredients'),
        directions: document.getElementById('directions'),
        prepTime: document.getElementById('preptime'),
        numPeople: document.getElementById('numpeople')
    };

    const body = {
        title: URLtitle,
        ingredients: inputs.ingredients.value,
        directions: inputs.directions.value,
        prepTime: inputs.prepTime.value,
        numPeople: inputs.numPeople.value
    };

    fetch('/update', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => window.location.replace(response.url));

    return false;
}

const deleteRecipe = function () {
    //only title needed
    const body = {
        title: URLtitle
    };

    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => window.location.replace(response.url));

    return false;
}

var mountNode = document.getElementById("page");
ReactDOM.render(<EditRecipe />, mountNode)