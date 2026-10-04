/* =========================================
   STUDYSENSE QUIZ
========================================= */

const quizHome = document.getElementById("quizHome");
const subjectSection = document.getElementById("subjectSection");
const difficultySection = document.getElementById("difficultySection");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

let quizType = "";
let selectedSubject = "";
let selectedDifficulty = "";


/* =========================================
   SUBJECT DATA
========================================= */

const subjects = {

    mcq: [
        {
            name: "HTML",
            icon: "fa-brands fa-html5",
            description: "Structure and fundamentals"
        },
        {
            name: "CSS",
            icon: "fa-brands fa-css3-alt",
            description: "Styling and layouts"
        },
        {
            name: "JavaScript",
            icon: "fa-brands fa-js",
            description: "Web programming"
        },
        {
            name: "Python",
            icon: "fa-brands fa-python",
            description: "Programming fundamentals"
        },
        {
            name: "SQL",
            icon: "fa-solid fa-database",
            description: "Database and queries"
        },
        {
            name: "Flutter",
            icon: "fa-solid fa-mobile-screen-button",
            description: "App development"
        },
        {
            name: "C",
            icon: "fa-solid fa-c",
            description: "Programming fundamentals"
        },
        {
            name: "Java",
            icon: "fa-brands fa-java",
            description: "Object-oriented programming"
        }
    ],

    coding: [
        {
            name: "Python",
            icon: "fa-brands fa-python",
            description: "Practice Python problems"
        },
        {
            name: "JavaScript",
            icon: "fa-brands fa-js",
            description: "Practice JS problems"
        },
        {
            name: "Java",
            icon: "fa-brands fa-java",
            description: "Practice Java problems"
        },
        {
            name: "C",
            icon: "fa-solid fa-c",
            description: "Practice C problems"
        },
        {
            name: "SQL",
            icon: "fa-solid fa-database",
            description: "Solve SQL challenges"
        },
        {
            name: "HTML & CSS",
            icon: "fa-brands fa-html5",
            description: "Build web solutions"
        }
    ]

};


/* =========================================
   OPEN QUIZ TYPE
========================================= */

function openQuizType(type) {

    quizType = type;

    quizHome.classList.add("hidden");
    difficultySection.classList.add("hidden");
    quizScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");

    subjectSection.classList.remove("hidden");

    const grid = document.getElementById("subjectsGrid");

    grid.innerHTML = "";

    subjects[type].forEach(subject => {

        const card = document.createElement("div");

        card.className = "subject-card";

        card.innerHTML = `

            <div class="subject-icon">
                <i class="${subject.icon}"></i>
            </div>

            <h3>${subject.name}</h3>

            <p>
                ${subject.description}
            </p>

            <div class="subject-arrow">
                Choose subject
                <i class="fa-solid fa-arrow-right"></i>
            </div>

        `;

        card.addEventListener("click", () => {

            selectSubject(subject.name);

        });

        grid.appendChild(card);

    });


    const title = document.getElementById("selectionTitle");
    const subtitle = document.getElementById("selectionSubtitle");
    const icon = document.getElementById("selectionIcon");

    if (type === "mcq") {

        title.textContent = "Choose a Subject";
        subtitle.textContent =
            "Select a topic you want to test";

        icon.className =
            "fa-solid fa-list-check";

    } else {

        title.textContent = "Choose a Language";
        subtitle.textContent =
            "Select what you want to practice";

        icon.className =
            "fa-solid fa-code";

    }

}


/* =========================================
   SELECT SUBJECT
========================================= */

function selectSubject(subject) {

    selectedSubject = subject;

    subjectSection.classList.add("hidden");
    difficultySection.classList.remove("hidden");

    document.getElementById("difficultyTitle").textContent =
        `${subject} ${quizType === "mcq" ? "MCQ" : "Coding"} Quiz`;

    updateDifficultyCards();

}


/* =========================================
   DIFFICULTY COUNTS
========================================= */

function updateDifficultyCards() {

    const easyCount = document.getElementById("easyCount");
    const mediumCount = document.getElementById("mediumCount");
    const toughCount = document.getElementById("toughCount");
    const toughText = document.getElementById("toughText");

    if (quizType === "mcq") {

        easyCount.textContent = "10";
        mediumCount.textContent = "20";
        toughCount.textContent = "30";

        toughText.textContent = "Questions";

    } else {

        easyCount.textContent = "5";
        mediumCount.textContent = "3";
        toughCount.textContent = "1";

        toughText.textContent = "Challenge";

    }

}


/* =========================================
   START QUIZ
========================================= */

function startQuiz(difficulty) {

    selectedDifficulty = difficulty;

    difficultySection.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    const questionCount = getQuestionCount(difficulty);

    document.getElementById("totalQuestions").textContent =
        `/ ${questionCount}`;

    document.getElementById("currentQuestion").textContent =
        "Question 1";

    document.getElementById("questionTopic").textContent =
        selectedSubject;

    document.getElementById("questionText").textContent =
        "Your questions will appear here when the quiz backend is connected.";

    document.getElementById("progressFill").style.width =
        "0%";

    document.getElementById("answersContainer").innerHTML = `

        <div class="answer-option selected">
            Frontend quiz interface ready
        </div>

        <div class="answer-option">
            Questions will be loaded from the backend
        </div>

        <div class="answer-option">
            Difficulty: ${capitalize(difficulty)}
        </div>

        <div class="answer-option">
            Subject: ${selectedSubject}
        </div>

    `;

    startTimer();

}


/* =========================================
   QUESTION COUNT
========================================= */

function getQuestionCount(difficulty) {

    if (quizType === "mcq") {

        const counts = {
            easy: 10,
            medium: 20,
            tough: 30
        };

        return counts[difficulty];

    }

    const counts = {
        easy: 5,
        medium: 3,
        tough: 1
    };

    return counts[difficulty];

}


/* =========================================
   TIMER
========================================= */

let timerInterval;
let elapsedSeconds = 0;

function startTimer() {

    clearInterval(timerInterval);

    elapsedSeconds = 0;

    timerInterval = setInterval(() => {

        elapsedSeconds++;

        const minutes =
            Math.floor(elapsedSeconds / 60)
                .toString()
                .padStart(2, "0");

        const seconds =
            (elapsedSeconds % 60)
                .toString()
                .padStart(2, "0");

        document.getElementById("timer").textContent =
            `${minutes}:${seconds}`;

    }, 1000);

}


/* =========================================
   BACK TO HOME
========================================= */

function goHome() {

    clearInterval(timerInterval);

    subjectSection.classList.add("hidden");
    difficultySection.classList.add("hidden");
    quizScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");

    quizHome.classList.remove("hidden");

}


/* =========================================
   BACK TO SUBJECTS
========================================= */

function backToSubjects() {

    difficultySection.classList.add("hidden");
    subjectSection.classList.remove("hidden");

}


/* =========================================
   BACK TO DIFFICULTY
========================================= */

function backToDifficulty() {

    clearInterval(timerInterval);

    quizScreen.classList.add("hidden");
    difficultySection.classList.remove("hidden");

}


/* =========================================
   RETRY
========================================= */

function retryQuiz() {

    startQuiz(selectedDifficulty);

}


/* =========================================
   HELPER
========================================= */

function capitalize(text) {

    return text.charAt(0).toUpperCase() + text.slice(1);

}


/* =========================================
   THEME
========================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("studySenseTheme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    localStorage.setItem(
        "studySenseTheme",
        isLight ? "light" : "dark"
    );

    themeToggle.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

});


/* =========================================
   NOTIFICATION
========================================= */

document.getElementById("notificationBtn")
    .addEventListener("click", () => {

        alert("No new notifications.");

    });