

const form = document.forms[0];
form.onsubmit = function(event) {

    event.preventDefault();

    const fName = form.elements['fName'];
    const lName = form.elements['lName'];
    const addr = form.elements['addr'];
    const email = form.elements['email'];
    const age = form.elements["Age"];


    const hobbies = form.elements['hobbies'];
    const fProject = form.elements['fProject'];
    const currProject = form.elements['currProject'];
    const Mingle = form.elements['Mingle'];
    const Date = form.elements["Date"];


    const yAgeRange = form.elements['yAgeRange'];
    const oAgeRange = form.elements['oAgeRange'];
    const Distance = form.elements['Distance'];
    const sexualOrientation = form.elements['sexualOrientation'];

    const input = {
        firstName: fName.value,
        lastName: lName.value,
        address: addr.value,
        email: email.value,
        age: age.value,
        hobbies: hobbies.value,
        firstProject: fProject.value,
        currentProject: currProject.value,
        mingle: Mingle.value,
        date: Date.value,
        youngest: yAgeRange.value,
        oldest: oAgeRange.value,
        distance: Distance.value,
        orientation: sexualOrientation.value

    }

    const body = JSON.stringify(input);
    fetch( '/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    })
        .then(response => response.json())
        .then( console.log)

    form.reset();

    console.log(input);

}







