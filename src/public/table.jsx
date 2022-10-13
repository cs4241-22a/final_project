import React from "react";
import { Button, Container, Row, Card } from "react-bootstrap";

class Table extends React.Component {

    getUser = async () => {
        let the_user = undefined;
        const user = await fetch('/getUser', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                 the_user = data.result;
            })
        return the_user;
    }

    constructor(props) {
        super(props);
    }

    render() {
        var noResults = this.props.items.length == 0 ? (<span>No matching recipes found.</span>) : '';
        return (
            <Container>
                { noResults }
                <Row xs={1} md={4}>
                    {
                        this.props.items.map((item, index) => (
                            <Card style={{ width: '18rem', padding: '10px', margin: '15px' }}>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {<ul>
                                            <li><b>Prep Time: {item.prepTime} minutes</b></li>
                                            <li><b>Serves: {item.numPeople}</b></li>
                                        </ul>}
                                        <p class="directions">{item.directions}</p>
                                    </Card.Text>
                                    <Button variant="primary" onClick={ () => this.viewOrEdit(item.username, item.title) }>
                                        View Full Recipe
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </Row>
            </Container>
        );
    }

    viewOrEdit = async function(user, title) {
        // if the recipe user is the same as the session user send to the edit page
        // otherwise send to the view recipe page
        const sessionuser = await this.getUser();
        const recipeuser = user;
        const params = new URLSearchParams({ title: title });
        if(sessionuser == recipeuser) {
            // send to edit
            window.location.href = window.location.href.split(/[?#]/)[0] + "editrecipe?" + params.toString();
        } else {
            // send to view
            window.location.href = window.location.href.split(/[?#]/)[0] + "viewrecipe?" + params.toString();
        }
    }
};

export default Table;