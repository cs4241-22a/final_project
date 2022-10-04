let score = 0;

let lunchCost = 15;
let hayCost = 30;
let mashCost = 200;
let textbookCost = 250;
let grassCost = 1000;
let officehoursCost = 1500;
let studyCost = 12500;
let meditateCost = 25000;
let dunkinCost = 137500;
let reviewCost = 500000;
let passiveDamage = 0;
let clickDamage = 1;

function addToScore() {
    score = score + clickDamage;
    document.getElementById('score').innerHTML = score;

}

function buyLunch() {
    if (score >= lunchCost) {
        score = score - lunchCost;
        clickDamage+=1;
        lunchCost = Math.round(lunchCost * 1.10)

        document.getElementById('score').innerHTML = score;
        document.getElementById('lunch-cost').innerHTML = lunchCost;
        document.getElementById('click-damage').innerHTML = clickDamage;
    }
}

function buyHay() {
    if (score >= hayCost) {
        score = score - hayCost;
        passiveDamage+=1;
        hayCost = Math.round(hayCost * 1.30)

        document.getElementById('score').innerHTML = score;
        document.getElementById('hay-cost').innerHTML = hayCost;
        document.getElementById('passive-damage').innerHTML =  passiveDamage;
    }
}

function buyMash() {
    if (score >= mashCost) {
        score = score - mashCost;
        clickDamage+=25;
        mashCost = Math.round(mashCost * 1.75)

        document.getElementById('score').innerHTML = score;
        document.getElementById('mash-cost').innerHTML = mashCost;
        document.getElementById('click-damage').innerHTML =  clickDamage;
    }
}

function buyTextbook() {
    if (score >= textbookCost) {
        score = score - textbookCost;
        passiveDamage+=10;
        textbookCost = Math.round(textbookCost * 2.00)

        document.getElementById('score').innerHTML = score;
        document.getElementById('textbook-cost').innerHTML = textbookCost;
        document.getElementById('passive-damage').innerHTML =  passiveDamage;
    }
}

function buyGrass() {
    if (score >= grassCost) {
        score = score - grassCost;
        clickDamage+=75;
        grassCost = Math.round(grassCost * 2.25)

        document.getElementById('score').innerHTML = score;
        document.getElementById('grass-cost').innerHTML = grassCost;
        document.getElementById('click-damage').innerHTML =  clickDamage;
    }
}

function buyOfficeHours() {
    if (score >= officehoursCost) {
        score = score - officehoursCost;
        passiveDamage+=35;
        officehoursCost = Math.round(officehoursCost * 2.50)

        document.getElementById('score').innerHTML = score;
        document.getElementById('office-hours-cost').innerHTML =officehoursCost;
        document.getElementById('passive-damage').innerHTML =  passiveDamage;
    }
}

function buyStudy() {
    if (score >= studyCost) {
        score = score - studyCost;
        clickDamage+=500;
        studyCost = Math.round(studyCost * 4.00)

        document.getElementById('score').innerHTML = score;
        document.getElementById('study-cost').innerHTML = studyCost;
        document.getElementById('click-damage').innerHTML =  clickDamage;
    }
}

function buyMeditate() {
    if (score >= meditateCost) {
        score = score - meditateCost;
        passiveDamage+=300;
        meditateCost = Math.round(meditateCost * 5.00)

        document.getElementById('score').innerHTML = score;
        document.getElementById('meditate-cost').innerHTML = meditateCost;
        document.getElementById('passive-damage').innerHTML =  passiveDamage;
    }
}

function buyDunkin() {
    if (score >= dunkinCost) {
        score = score - dunkinCost;
        clickDamage+=15000;
        dunkinCost= Math.round(dunkinCost * 10.0)

        document.getElementById('score').innerHTML = score;
        document.getElementById('dunkin-cost').innerHTML = dunkinCost;
        document.getElementById('click-damage').innerHTML =  clickDamage;
    }
}

function buyReview() {
    if (score >= reviewCost) {
        score = score - reviewCost;
        passiveDamage+=10000;
        reviewCost = Math.round(reviewCost * 10.0)

        document.getElementById('score').innerHTML = score;
        document.getElementById('review-cost').innerHTML = reviewCost;
        document.getElementById('passive-damage').innerHTML =  passiveDamage;
    }
}


setInterval(function() {
    score = score + passiveDamage;
    document.getElementById('score').innerHTML = score;
}, 500) // half second