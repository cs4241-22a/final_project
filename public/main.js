

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
    const status = form.elements['status'];


    const yAgeRange = form.elements['yAgeRange'];
    const oAgeRange = form.elements['oAgeRange'];
    const Distance = form.elements['Distance'];

    const input = {
        firstName: fName.value,
        lastName: lName.value,
        address: addr.value,
        email: email.value,
        age: age.value,
        hobbies: hobbies.value,
        firstProject: fProject.value,
        currentProject: currProject.value,
        status: status.value,
        youngest: yAgeRange.value,
        oldest: oAgeRange.value,
        distance: Distance.value,

    }

    const body = JSON.stringify(input);
    fetch( '/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    })
        .then(response => {
            window.location.href = "/profile.html";
        })

    form.reset();

    console.log(input);

}







