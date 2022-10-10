import MongoManager from "../util/MongoManager";
import ClimbTypeUtils from "../util/ClimbTypeParser";
import Climb from "../main/app/route/Climb";

window.onload = function() {
    getTableData()
    const addButton = document.querySelector('#submitButton')
    addButton.onclick = addClimb

}

const mongoManager = new MongoManager();
const climbTypeUtils = new ClimbTypeUtils();


function isLead(type) {
    return type.value === "lead" || type.value === "leadtoprope";
}

function isTopRope(type) {
    return type.value === "toprope" || type.value === "leadtoprope";
}

const addClimb = function(e) {
    e.preventDefault()
    console.log("calling addclimb")
    const grade = document.querySelector( '#grade' ),
        color = document.querySelector( '#color' ),
        section = document.querySelector( '#section' ),
        type = document.querySelector( '#type' )

    const gradeValue = grade.value.toUpperCase(),
        colorValue = color[color.selectedIndex].value,
        sectionValue = section[section.selectedIndex].value

    const newClimb = new Climb(null, gradeValue, colorValue, sectionValue, getType(type), isLead(type), isTopRope(type))


    mongoManager.addRoute(newClimb)
        .then(() => getTableData())

}

const getTableData = function() {
    mongoManager.getAllRoutes()
        .then(response => initTable(response))
}

const initTable = function (json) {
    console.log("Initializing table with " + JSON.stringify(json))

    // Find a <table> element with id="myTable":
    const table = document.getElementById("dataTable");

    const rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    json.forEach(function(x) {
        // Create an empty <tr> element and add it to the 1st position of the table:
        const row = table.insertRow(-1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        const newIdCell = row.insertCell(0);
        const newGradeCell = row.insertCell(1);
        const newColorCell = row.insertCell(2);
        const newSectionCell = row.insertCell(3);
        const newTypeCell = row.insertCell(4);
        const newDeleteCell = row.insertCell(5);

        const deleteButton = document.createElement('input');
        deleteButton.type = "button";
        deleteButton.id = "deleteButton";
        deleteButton.value = "Delete";
        deleteButton.onclick = function() {handleDeleteClick(x)};
        newDeleteCell.appendChild(deleteButton);


// Add some text to the new cells:
        newIdCell.innerHTML = x._id;
        newGradeCell.innerHTML = x.grade;
        newColorCell.innerHTML = x.color;
        newColorCell.style.background = x.color;
        if (x.color === "Black") {
            newColorCell.style.color = "White";
        }
        newSectionCell.innerHTML = x.section;
        newTypeCell.innerHTML = climbTypeUtils.parseClimbType(x);
        console.log(x)
    })

}

function handleDeleteClick(climb) {
    console.log("handleDeleteClick called")
    mongoManager.removeRoute(climb)
        .then(() => getTableData())
}

function getType(type) {
    console.log()
    if (type[type.selectedIndex].value === "boulder") {
        return "boulder";
    } else if (type[type.selectedIndex].value === "lead" || type[type.selectedIndex].value === "leadtoprope" || type[type.selectedIndex].value === "toprope") {
        return "rope"
    }
}
