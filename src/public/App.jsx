
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';


class Table extends React.Component {
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
                                <Button variant="primary">View Full Recipe</Button>
                            </Card.Body>
                        </Card>
                    ))
                }
                </Row>
            </Container>
        );
    }
}




class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [
                {
                    title: "Smoothie",
                    ingredients: [
                        "vanilla ice cream",
                        "frozen fruit of choice",
                        "1 banana"
                    ],
                    directions: "Dump everything in a blender and hope for the best. Add milk or ice cubes for lighter texture.",
                    prepTime: 10,
                    numPeople: 1,
                    user: 'test'
                },
                {
                    title: "Scrambled Eggs",
                    ingredients: [
                        "2 eggs",
                        "milk",
                        "shredded cheese of choice"
                    ],
                    directions: "Beat the eggs until fluffy with a fork; add a splash of milk if desired. Pour the eggs into a frying pan over low heat and let cook. Fold in shredded cheese, cook a minute longer, then serve.",
                    prepTime: 15,
                    numPeople: 1,
                    user: 'test2'
                },
                {
                    title: "Chili",
                    ingredients: [
                        "1 lb ground beef",
                        "1 can diced tomatoes",
                        "chili seasoning",
                        "1 whole onion, cubed"
                    ],
                    directions: "Sautee the onions in a medium pot over high heat until they take on an opaque color. Add the ground beef. Stir until the ground beef loses its raw color, then add the can of diced tomatoes and the chili seasoning. Stir well. Bring heat down to low and leave to simmer for 30-60 minutes, stirring occasionally to ensure that nothing sticks to the bottom of the pot.",
                    prepTime: 60,
                    numPeople: 3,
                    user: 'test'
                },
                {
                    title: "Fried Rice",
                    ingredients: [
                        "white rice",
                        "frozen vegetables",
                        "soy sauce, fish sauce, or some other seasoning of your choice",
                        "pre-cooked meat of your choice (optional)"
                    ],
                    directions: "Put 1 cup of rice and 1 2/3 cups water into a pot. (Optional: add 1/8 tablespoon butter). Bring to a boil, then let simmer for 20 minutes or until the rice is soft and the water has boiled off. Sautee the rice for a couple minutes, then add soy sauce or fish sauce (or other spices) to taste. Finally, add frozen vegetables and (optional) chopped meat of your choice. Cook until the vegetables are defrosted, then serve.",
                    prepTime: 30,
                    numPeople: 4,
                    user: 'test2'
                }
            ]
        };
        console.log("State:");
        console.log(this.state);
        //this.load();
    }

    load() {
        fetch('/recipedata', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(res => this.setState(prevState => ({ recipes: [...prevState.recipes, ...res] })));
        //     this.setState({ ...this.state, recipes: [...this.state.recipes, ...res] });
        //     console.log("Current state");
        //     console.log(this.state);
        // }

    }

    componentDidMount() {
        fetch('/recipedata', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(res => {
                console.log(res);
                this.setState({ ...this.state, recipes: [...this.state.recipes, ...res] });
                console.log("Current state");
                console.log(this.state);
            });
    }

    render() {
        return (
            <div className="App" id='basic'>
                <h1>Homepage</h1>
                <Table items={this.state.recipes} />
            </div>
        );
    }
}

export default App;