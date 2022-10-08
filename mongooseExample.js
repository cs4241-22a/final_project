// Not used anywhere, just a quick example of making 2 users and 2 recipes with Mongoose schemas

async function config() {

    const user1 = new User({
        username: "test",
        password: "pswd",
    });
    const user2 = new User({
        username: "test2",
        password: "pswd",
    });

    const recipe1 = new Recipe({
        title: "Iced Coffee",
        ingredients: [
            "coffee beans",
            "ice",
            "milk",
            "sugar"
        ],
        directions: "Grind 1/4 pound of coffee beans, make hot coffee, then pour over ice and add milk and sugar to taste.",
        prepTime: 20,
        numPeople: 4,
        user: user1 // need to declare the users before the recipes, since the recipes cross-reference the users
    });

    const recipe2 = new Recipe({
        title: "Hot Coffee",
        ingredients: [
            "coffee beans",
            "milk",
            "sugar"
        ],
        directions: "Grind the coffee beans, make hot coffee, then and add milk and sugar to taste.",
        prepTime: 15,
        numPeople: 4,
        user: user2
    });

    await user1.save();
    await user2.save();
    await recipe1.save();
    await recipe2.save();
    
    // then check on results
    let tempRecipes = Recipe.find({});
    console.log(tempRecipes);
    let tempUsers = User.find({});
    console.log(tempUsers);
}