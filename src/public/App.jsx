
import React from "react";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
        this.load();
    }

    load() {
        fetch('/recipedata', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ recipes: json });
            });
    }

    render() {
        return (
            <>
                <h1>Homepage</h1>
            </>
        );
    }
}

export default App;