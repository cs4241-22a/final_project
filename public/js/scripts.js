let score = 0;

let hayCost = 15;
let lunchCost = 30;
let passiveDamage = 0;
let clickDamage = 1;

function addToScore() {
    score = score + clickDamage;

    document.getElementById('score').innerHTML = score;


}

function buyHay() {
    if (score >= hayCost) {
        score = score - hayCost;
        passiveDamage+=1;
        hayCost = Math.round(hayCost * 1.15)

        document.getElementById('score').innerHTML = score;
        document.getElementById('hay-cost').innerHTML = hayCost;
        document.getElementById('hay').innerHTML =  passiveDamage;
    }
}

function buyLunch() {
    if (score >= lunchCost) {
        score = score - lunchCost;
        clickDamage+=1;
        lunchCost = Math.round(lunchCost * 1.15)

        document.getElementById('score').innerHTML = score;
        document.getElementById('lunch-cost').innerHTML = lunchCost;
        document.getElementById('lunch').innerHTML = clickDamage;
    }
}

setInterval(function() {
    score = score + passiveDamage;
    document.getElementById('score').innerHTML = score;
}, 1000) // 1 second