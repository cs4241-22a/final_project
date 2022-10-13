import MongoManager from "../util/MongoManager";
import ClimbTypeUtils from "../util/ClimbTypeParser";
import Climb from "../main/app/route/Climb";
import GymMap from "../main/app/visuals/GymMap";

window.onload = function() {
    getTableData()
    const addButton = document.querySelector('#submitButton')
    addButton.onclick = addClimb

    const sectionSelect = document.querySelector('#section')
    for(let i=1; i<29; i++) {
        sectionSelect.options[sectionSelect.options.length] = new Option(i.toString(), i.toString())
    }

    new GymMap("gymMap")
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
    
    const grade = document.querySelector( '#grade' ),
        color = document.querySelector( '#color' ),
        section = document.querySelector( '#section' ),
        type = document.querySelector( '#type' )

    const gradeValue = grade.value.toUpperCase(),
        colorValue = color[color.selectedIndex].value,
        sectionValue = section[section.selectedIndex].value,
        typeValue = climbTypeUtils.getType(type)

    const newClimb = new Climb(null, gradeValue, colorValue, sectionValue, typeValue, isLead(type), isTopRope(type))

    if (isValidClimb(gradeValue, typeValue)) {
        mongoManager.addRoute(newClimb)
            .then(() => getTableData())
    } else {
        window.alert("Climb Grade and Type are not compatible.")
    }

}

const getTableData = function() {
    mongoManager.getAllRoutes()
        .then(response => initTable(response))
}

const initTable = function (json) {
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
    })

}

function handleDeleteClick(climb) {
    mongoManager.removeRoute(climb)
        .then(() => getTableData())
}

function isValidClimb(grade, type) {
    if(grade.includes("V") && (type === "boulder")) {
        return true;
    } else if(grade.includes("5.") && (type === "rope")) {
        return true;
    } else {
        return false
    }
}
