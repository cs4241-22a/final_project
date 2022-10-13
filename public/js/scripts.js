const Questions = [{
        id: 0,
        q: "You find a flash drive in a parking lot. What should you do with it?",
        a: [{ text: "Plug it into your computer", isCorrect: false },
            { text: "Hand it to IT", isCorrect: true },
            { text: "Put it in a blender", isCorrect: true },
            { text: "Mail it to a friend", isCorrect: false }
        ]
    },
    {
        id: 1,
        q: "When should you respond to an email asking for your personal information?",
        a: [{ text: "If it's marked urgent", isCorrect: false },
            { text: "When it's not marked as spam", isCorrect: false },
            { text: "If it's from someone I know", isCorrect: false },
            { text: "Never", isCorrect: true }
        ]
    },
    {
        id: 2,
        q: "Where should you download software from?",
        a: [{ text: "hub.wpi.edu", isCorrect: true },
            { text: "downloadmoreram.com", isCorrect: false },
            { text: "Random Google search results", isCorrect: true },
            { text: "B&N Bookstore (it's a scam you already have Office)", isCorrect: false }
        ]
    },
    {
        id: 3,
        q: "If you're worried you may have given up personal data, who should you contact?",
        a: [{ text: "NordVPN", isCorrect: false },
            { text: "Your IT department", isCorrect: true },
            { text: "Mr. John McAfee", isCorrect: false },
            { text: "Johnny Silverhand", isCorrect: false }
        ]
    },
    {
        id: 4,
        q: "You can trust CS majors...",
        a: [{ text: "...to trust the natural recursion", isCorrect: true },
            { text: "...to understand Github", isCorrect: false },
            { text: "...to fix your printer", isCorrect: false },
            { text: "...to shower", isCorrect: false }
        ]
    },
    {
        id: 5,
        q: "What is 'phishing'?",
        a: [{ text: "A boring activity more braindead than battle royale freeware", isCorrect: false },
            { text: "Webworm bait", isCorrect: false },
            { text: "When someone uses personal information to pretend to be someone else and steal your information", isCorrect: true },
            { text: "When you go see a bad ska band", isCorrect: false }
        ]
    },
    {
        id:6,
        q: "When should you use your work computer for personal use?",
        a: [{ text: "When you're stalking your coworkers online", isCorrect: false },
            { text: "When your personal laptop dies", isCorrect: false },
            { text: "When you want to watch Love on a Leash while your code compiles", isCorrect: true },
            { text: "Never", isCorrect: true }
        ]
    },
    {
        id: 7,
        q: "You are on Softonic trying to download Running Clock 3D Screensaver. Which button do you click?",
        a: [{ text: "Free Download for Windows", isCorrect: true },
            { text: 'Tap "Download" to start: DOWNLOAD', isCorrect: false },
            { text: 'Start Download. 3 Steps: 1. Click "Download". 2. Add Website Safety Check for Chrome', isCorrect: false },
            { text: "Avast One: Download Now!", isCorrect: false }
        ]
  
    },
    {
        id: 8,
        q: "Who is your best cyber friend?",
        a: [{ text: "Clippy", isCorrect: false },
            { text: "Bonzi Buddy", isCorrect: false },
            { text: "AskJeeves", isCorrect: false },
            { text: "Webworm", isCorrect: true }
        ]
    },
    {
        id: 9,
        q: "Who is your best meat friend?",
        a: [{ text: "Sophie", isCorrect: true },
            { text: "Charlie", isCorrect: true },
            { text: "Natalie", isCorrect: true },
            { text: "Owen", isCorrect: true }
        ]
    }
]
  
var start = true;
var correct = false;
var counter = 0;

const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');

var selected = "";

function submitQuiz(score){
  const json = { score: score },
        body = JSON.stringify( json )

  fetch( '/handle-quiz1-response', {
    method:'POST',
    body 
  })
  .then( function( response ) {
    // do something with the reponse 
    console.log( response )
  })

  return false
}

function iterate(id) {
  
    // Getting the result display section
    var result = document.getElementsByClassName("result");
    result[0].innerText = "";
  
    // Getting the question
    const question = document.getElementById("question");
  
    // Setting the question text
    question.innerText = Questions[id].q;
  
    // Providing option text 
    option1.innerText = Questions[id].a[0].text;
    option2.innerText = Questions[id].a[1].text;
    option3.innerText = Questions[id].a[2].text;
    option4.innerText = Questions[id].a[3].text;
  
    // Providing the true or false value to the options
    option1.value = Questions[id].a[0].isCorrect;
    option2.value = Questions[id].a[1].isCorrect;
    option3.value = Questions[id].a[2].isCorrect;
    option4.value = Questions[id].a[3].isCorrect;
  
  
    option1.addEventListener("click", () => {
        option1.style.backgroundColor = "lightgray";
        option2.style.backgroundColor = "";
        option3.style.backgroundColor = "";
        option4.style.backgroundColor = "";
        selected = option1.value;
    })
    option2.addEventListener("click", () => {
        option1.style.backgroundColor = "";
        option2.style.backgroundColor = "lightgray";
        option3.style.backgroundColor = "";
        option4.style.backgroundColor = "";
        selected = option2.value;
    })
    option3.addEventListener("click", () => {
        option1.style.backgroundColor = "";
        option2.style.backgroundColor = "";
        option3.style.backgroundColor = "lightgray";
        option4.style.backgroundColor = "";
        selected = option3.value;
    })
    option4.addEventListener("click", () => {
        option1.style.backgroundColor = "";
        option2.style.backgroundColor = "";
        option3.style.backgroundColor = "";
        option4.style.backgroundColor = "lightgray";
        selected = option4.value;
    })
  
    const check = document.getElementsByClassName("checkans");
  
    check[0].addEventListener("click", () => {
        if (selected == "true") {
            result[0].innerHTML = "<p style='color:green'>Correct! :D</p>";
            playAnswerSound(true);
        } else {
            result[0].innerHTML = "<p style='color:red'>Incorrect. >:(</p>";
            playAnswerSound(false);
        }
    })
}
  
if (start) {
    iterate("0");
}

const next = document.getElementsByClassName('next')[0];
var id = 0;
  
next.addEventListener("click", () => {
    var qNum = Questions.length
    start = false;
    if(selected == "true"){
      counter++;
    }
    selected = "";
    if (id < qNum-1) {
        id++;
        iterate(id);
        option1.style.backgroundColor = "";
        option2.style.backgroundColor = "";
        option3.style.backgroundColor = "";
        option4.style.backgroundColor = "";
    }
    else{
      submitQuiz(counter)
      let str
      if(counter > 6){
        str = "Congrats! You got "
      }
      else{
        str = "Oops! You got "
      }
      document.getElementById("question").innerHTML = str +counter+" out of "+qNum+" questions correct."
      document.getElementById("option").style.display = "none"
      document.getElementById("navigation").style.display = "none"
      document.getElementById("result").style.display = "none"
    }
})

const correctAudio = new Audio("https://cdn.glitch.global/cc06d1e6-e84b-4106-8189-72f8c22560ea/correctding.mp3?v=1665443689755");
const failAudio = new Audio("https://cdn.glitch.global/cc06d1e6-e84b-4106-8189-72f8c22560ea/failbuzz.mp3?v=1665443694478");

function playAnswerSound(correct) {
  if (correct) {
    //let correctAudio = document.getElementById("correctding");
      setTimeout(function () {
        correctAudio.play()
      }, 150)
      return false
  } else {
    //let failAudio = document.getElementById("failbuzz");
      setTimeout(function () {
        failAudio.play()
      }, 150)
      return false
  }
}

function swapImg() {
  let img = document.getElementById("downloadImage");
  img.src = "https://cdn.glitch.global/cc06d1e6-e84b-4106-8189-72f8c22560ea/Webworm.jpg?v=1665076180910";
  img.height = 400;
  playDialup()
  setTimeout(function () {
    window.alert("Webworm says don't click on random download buttons, especially if they're green or in all caps!");
  }, 500);
}
    
// function playMusic() {
//   let myAudio = document.getElementById("music");
//   setTimeout(function () {
//     myAudio.play()
//   }, 200)
//   return false
// }

function playDialup() {
  let myAudio = document.getElementById("dialup");
  setTimeout(function () {
    myAudio.play()
  }, 200)
  return false
}

function badWebsite() {
  window.alert("Webworm says: don't click on links to sketchy websites! Luckily for you, I'm redirecting you to my favorite song instead!");
}