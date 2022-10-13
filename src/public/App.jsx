
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './header';

class Table extends React.Component {

    getUser = async () => {
        let the_user = undefined
        const user = await fetch('/getUser', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                 the_user = data.result
            })
        return the_user
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row xs={1} md={4}>
                    {
                        this.props.items.map((item, index) => (
                            <Card style={{ width: '18rem', padding: '10px', margin: '15px' }}>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {<ul>
                                            <li><b>Prep Time: {item.prepTime}</b></li>
                                            <li><b>Serves: {item.numPeople}</b></li>
                                        </ul>}
                                        <p>{item.directions}</p>
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
        //if the recipe user is the same as the session user send to the edit page
        //otherwise send to the view recipe page
        const sessionuser = await this.getUser()
        const recipeuser = user
        const params = new URLSearchParams({ title: title });
        if(sessionuser == recipeuser) {
            //send to edit
            window.location.replace(window.location.href + "editrecipe?" + params.toString() )
        } else {
            //send to view
            window.location.replace(window.location.href + "viewrecipe?" + params.toString() )
        }

    }
}

class App extends React.Component {
    getUser = async () => {
        const user = await fetch('/getUser', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.state.user = data.result; })
        return user;
    }

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            user: this.getUser()
        };
        console.log("State:");
        console.log(this.state);
    }

    componentDidMount() {
        fetch('/recipedata', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(res => {
            console.log(res);
            this.setState({ ...this.state, recipes: [...this.state.recipes, ...res] });
            console.log("Current state");
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="App">
                <Header accountButtons={true} loggedIn={this.state.user != false} />
                <body id='basic'>
                    <Table items={this.state.recipes} />
                </body>
            </div>
        );
    }
}

export default App;