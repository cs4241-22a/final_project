let x
// if the key value pair exists, we set x equal to the stored value
// else, set x to 0
if (localStorage.getItem("count")){
    x = parseInt(localStorage.getItem("count"))
} else{
    x = 0
}
document.getElementById('cookie-clicker3').addEventListener("click", iterate3)
document.getElementById('cookie-clicker3-down').addEventListener("click", iterate3Down)
document.getElementById("cookie-counter3").innerHTML = x

function iterate3(){
    x += 1
    localStorage.setItem("count", x)
    console.log(x)
    document.getElementById("cookie-counter3").innerHTML = x
}

function iterate3Down(){
    x -= 1
    localStorage.setItem("count", x)
    console.log(x)
    document.getElementById("cookie-counter3").innerHTML = x
}




let x2
// if the key value pair exists, we set x equal to the stored value
// else, set x to 0
if (localStorage.getItem("count2")){
    x2 = parseInt(localStorage.getItem("count2"))
} else{
    x2 = 0
}
document.getElementById('cookie-clicker2').addEventListener("click", iterate2)
document.getElementById('cookie-clicker2-down').addEventListener("click", iterate2Down)
document.getElementById("cookie-counter2").innerHTML = x2

function iterate2(){
    x2 += 1
    localStorage.setItem("count2", x2)
    console.log(x2)
    document.getElementById("cookie-counter2").innerHTML = x2
}

function iterate2Down(){
    x2 -= 1
    localStorage.setItem("count2", x2)
    console.log(x2)
    document.getElementById("cookie-counter2").innerHTML = x2
}



    

let x1
// if the key value pair exists, we set x equal to the stored value
// else, set x to 0
if (localStorage.getItem("count3")){
    x1 = parseInt(localStorage.getItem("count3"))
} else{
    x1 = 0
}
document.getElementById('cookie-clicker1').addEventListener("click", iterate1)
document.getElementById('cookie-clicker1-down').addEventListener("click", iterate1Down)
document.getElementById("cookie-counter1").innerHTML = x1

function iterate1(){
    x1 += 1
    localStorage.setItem("count3", x1)
    console.log(x1)
    document.getElementById("cookie-counter1").innerHTML = x1
}

function iterate1Down(){
    x1 -= 1
    localStorage.setItem("count3", x1)
    console.log(x1)
    document.getElementById("cookie-counter1").innerHTML = x1
}
let value
function scoreboard(){
    if (x1 > x2){
      localStorage.setItem("x1 is better", value)
      console.log(value)
      document.getElementById("header").innerHTML = value 
    }
    else {
        localStorage.setItem("x2 is better", value)
        console.log(value)
        document.getElementById("header").innerHTML = value
    }
    
      

}
