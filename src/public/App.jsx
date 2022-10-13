
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './header';
import SearchAndSort from './searchAndSort';
import Table from './table';

class App extends React.Component {
    getUser = async () => {
        const user = await fetch('/getUser', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(data => {
            this.state.user = data.result;
        });
        return user;
    }

    sortRecipes(recipes){
        var sort = (new URL(location.href).searchParams.get('sort') || '').toLowerCase();
        switch(sort){
            case 'recent':
                return recipes; //Assume sorted by most recent already due to the mongodb find() function
            case 'preptime':
                return recipes.sort((recipe1, recipe2)=>( +recipe1.prepTime - +recipe2.prepTime ));
            case 'servings':
                return recipes.sort((recipe1, recipe2)=>( +recipe1.numPeople - +recipe2.numPeople ));
            case 'alphabetical':
                return recipes.sort((recipe1, recipe2)=>( recipe1.title.localeCompare(recipe2.title) ));
            default:
                return recipes; //No sorting, but should be the same as recent
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            user: this.getUser()
        };
    }

    componentDidMount() {
        fetch('/recipedata?' + new URLSearchParams({
            search: new URL(location.href).searchParams.get('search')
        }), {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(res => {
            console.log(res);
            this.setState({ ...this.state, recipes: this.sortRecipes([...this.state.recipes, ...res]) });
        });
    }

    render() {
        return (
            <div className="App">
                <Header accountButtons={true} loggedIn={this.state.user != false} />
                <SearchAndSort />
                <body id='basic'>
                    <Table items={this.state.recipes} />
                </body>
            </div>
        );
    }
}

export default App;