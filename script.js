let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let currentTopic = "";
let timer;
let timeLeft = 30;

// Example quiz data
// Example quiz data with 5 questions per category
const quizData = {
  Sports: [
    { question: "How many Premier League trophies did Sir Alex Ferguson win?", options: ["11", "13", "20", "22"], answer: "13" },
    { question: "Which country won the 2018 FIFA World Cup?", options: ["Brazil", "Germany", "France", "Argentina"], answer: "France" },
    { question: "In tennis, what piece of fruit is found at the top of the men’s Wimbledon trophy?", options: ["Pineapple", "Apple", "Pear", "Banana"], answer: "Pineapple" },
    { question: "How many players are there in a rugby union team?", options: ["11", "13", "15", "17"], answer: "15" },
    { question: "Which sport is known as the 'king of sports'?", options: ["Basketball", "Cricket", "Football (Soccer)", "Tennis"], answer: "Football (Soccer)" }
  ],
  Science: [
    { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], answer: "H2O" },
    { question: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Venus", "Saturn"], answer: "Mars" },
    { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
    { question: "What is the speed of light?", options: ["3 x 10^8 m/s", "1.5 x 10^6 m/s", "3000 m/s", "1 x 10^5 m/s"], answer: "3 x 10^8 m/s" },
    { question: "Which part of the cell contains genetic material?", options: ["Nucleus", "Cytoplasm", "Mitochondria", "Ribosome"], answer: "Nucleus" }
  ],
  History: [
    { question: "Who was the first President of the USA?", options: ["George Washington", "Abraham Lincoln", "John Adams", "Thomas Jefferson"], answer: "George Washington" },
    { question: "In which year did World War II end?", options: ["1942", "1945", "1948", "1950"], answer: "1945" },
    { question: "Which empire built the Colosseum in Rome?", options: ["Greek Empire", "Roman Empire", "Ottoman Empire", "Byzantine Empire"], answer: "Roman Empire" },
    { question: "Who was known as the Iron Lady?", options: ["Indira Gandhi", "Golda Meir", "Margaret Thatcher", "Angela Merkel"], answer: "Margaret Thatcher" },
    { question: "The Great Wall of China was built to protect against which group?", options: ["Mongols", "Romans", "Huns", "Persians"], answer: "Mongols" }
  ],
  Computers: [
    { question: "Who is known as the father of computers?", options: ["Alan Turing", "Charles Babbage", "John von Neumann", "Bill Gates"], answer: "Charles Babbage" },
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Multi Language", "Hyperlinks and Text Markup Language"], answer: "HyperText Markup Language" },
    { question: "In binary, what is the value of 1010?", options: ["8", "9", "10", "12"], answer: "10" },
    { question: "Which company developed the Windows operating system?", options: ["Apple", "IBM", "Microsoft", "Google"], answer: "Microsoft" },
    { question: "Which programming language is known as the language of the web?", options: ["Python", "C++", "JavaScript", "Java"], answer: "JavaScript" }
  ],
  GeneralKnowledge: [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
    { question: "Which currency is used in Japan?", options: ["Dollar", "Yen", "Won", "Euro"], answer: "Yen" },
    { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Pablo Picasso", "Michelangelo", "Vincent Van Gogh"], answer: "Leonardo da Vinci" }
  ]
};


function startQuiz() {
  const categorySelect = document.getElementById("category");
  const difficultySelect = document.getElementById("difficulty");

  currentTopic = categorySelect.value;
  const difficulty = difficultySelect.value;

  currentQuestion = 0;
  score = 0;
  userAnswers = [];

  // Hide start screen
  document.getElementById("settings").classList.add("hide");

  // Show quiz screen
  document.getElementById("quiz-box").classList.remove("hide");

  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById("feedback").textContent = "";

  const questionData = quizData[currentTopic][currentQuestion];
  document.getElementById("question-number").textContent = 
    `Question ${currentQuestion + 1} of ${quizData[currentTopic].length}`;
  document.getElementById("question").textContent = questionData.question;

  const optionsEl = document.getElementById("options");
  optionsEl.innerHTML = "";

  questionData.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.classList.add("option");
    li.onclick = () => checkAnswer(option, questionData.answer, li);
    optionsEl.appendChild(li);
  });

  startTimer();
}

function checkAnswer(selected, correct, li) {
  const options = document.querySelectorAll(".option");
  options.forEach(btn => btn.style.pointerEvents = "none");

  if (selected === correct) {
    score++;
    document.getElementById("feedback").textContent = "✅ Correct!";
    document.getElementById("feedback").style.color = "green";
    li.classList.add("correct");
  } else {
    document.getElementById("feedback").textContent = "❌ Wrong!";
    document.getElementById("feedback").style.color = "red";
    li.classList.add("wrong");
  }

  userAnswers.push({ 
    question: quizData[currentTopic][currentQuestion].question, 
    selected, 
    correct 
  });

  clearInterval(timer);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData[currentTopic].length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timer = setInterval(() => {
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function endQuiz() {
  document.getElementById("quiz-box").classList.add("hide");
  document.getElementById("result-box").classList.remove("hide");

  document.getElementById("score").textContent = 
    `Your Score: ${score}/${quizData[currentTopic].length}`;

  const reviewEl = document.getElementById("review");
  reviewEl.innerHTML = "";

  userAnswers.forEach((ans, i) => {
    const div = document.createElement("div");
    div.classList.add("review-item");
    div.innerHTML = `
      <p><strong>Q${i+1}:</strong> ${ans.question}</p>
      <p>Your Answer: ${ans.selected}</p>
      <p>Correct Answer: ${ans.correct}</p>
      <hr>
    `;
    reviewEl.appendChild(div);
  });
}
