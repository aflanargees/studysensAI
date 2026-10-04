/* =========================================
   STUDYSENSE PROJECTS
========================================= */


/* ================================
   THEME
================================ */

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


/* ================================
   NOTIFICATION
================================ */

document.getElementById("notificationBtn")
    .addEventListener("click", () => {

        alert("No new notifications.");

    });


/* ================================
   SCROLL TO PROJECTS
================================ */

function scrollToProjects() {

    const section =
        document.getElementById("recommendedProjects");

    section.scrollIntoView({
        behavior: "smooth"
    });

}


/* ================================
   START PROJECT
================================ */

function startProject(projectName) {

    alert(
        `${projectName}\n\nProject workspace will be available soon.`
    );

}


/* ================================
   VIEW ALL
================================ */

function showAllProjects() {

    alert(
        "More projects will be available here soon."
    );

}


/* ================================
   AI TUTOR
================================ */

function openAITutor() {

    window.location.href = "/ai-tutor";

}