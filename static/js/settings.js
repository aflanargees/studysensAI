/* =========================================
   STUDYSENSE SETTINGS
========================================= */


/* ================================
   ELEMENTS
================================ */

const themeToggle =
    document.getElementById("themeToggle");

const darkModeToggle =
    document.getElementById("darkModeToggle");

const appearanceTheme =
    localStorage.getItem("studySenseTheme");


/* ================================
   APPLY THEME
================================ */

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        darkModeToggle.checked = true;

    } else {

        document.body.classList.remove("dark-mode");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        darkModeToggle.checked = false;
    }
}


applyTheme(appearanceTheme || "light");


/* ================================
   TOP THEME BUTTON
================================ */

themeToggle.addEventListener("click", () => {

    const isDark =
        document.body.classList.toggle("dark-mode");

    const theme =
        isDark ? "dark" : "light";

    localStorage.setItem(
        "studySenseTheme",
        theme
    );

    applyTheme(theme);

});


/* ================================
   DARK MODE SETTING
================================ */

darkModeToggle.addEventListener("change", function () {

    const theme =
        this.checked ? "dark" : "light";

    localStorage.setItem(
        "studySenseTheme",
        theme
    );

    applyTheme(theme);

    showMessage(
        this.checked
            ? "Dark mode enabled."
            : "Light mode enabled."
    );

});


/* ================================
   NOTIFICATIONS
================================ */

const notificationSettings = [
    {
        id: "learningReminder",
        name: "Learning reminders"
    },
    {
        id: "quizNotification",
        name: "Quiz notifications"
    },
    {
        id: "projectNotification",
        name: "Project notifications"
    }
];


notificationSettings.forEach(setting => {

    const element =
        document.getElementById(setting.id);

    const saved =
        localStorage.getItem(setting.id);

    if (saved !== null) {
        element.checked = saved === "true";
    }


    element.addEventListener("change", function () {

        localStorage.setItem(
            setting.id,
            this.checked
        );

        showMessage(
            `${setting.name} ${
                this.checked
                    ? "enabled."
                    : "disabled."
            }`
        );

    });

});


/* ================================
   LANGUAGE
================================ */

const languageSelect =
    document.getElementById("languageSelect");

const savedLanguage =
    localStorage.getItem("preferredLanguage");


if (savedLanguage) {
    languageSelect.value = savedLanguage;
}


languageSelect.addEventListener("change", function () {

    localStorage.setItem(
        "preferredLanguage",
        this.value
    );

    showMessage(
        `Preferred language set to ${this.options[this.selectedIndex].text}.`
    );

});


/* ================================
   DIFFICULTY
================================ */

const difficultySelect =
    document.getElementById("difficultySelect");

const savedDifficulty =
    localStorage.getItem("preferredDifficulty");


if (savedDifficulty) {
    difficultySelect.value = savedDifficulty;
}


difficultySelect.addEventListener("change", function () {

    localStorage.setItem(
        "preferredDifficulty",
        this.value
    );

    showMessage(
        `Difficulty set to ${this.options[this.selectedIndex].text}.`
    );

});


/* ================================
   AI RESPONSE STYLE
================================ */

const responseStyle =
    document.getElementById("responseStyle");

const savedResponseStyle =
    localStorage.getItem("responseStyle");


if (savedResponseStyle) {
    responseStyle.value = savedResponseStyle;
}


responseStyle.addEventListener("change", function () {

    localStorage.setItem(
        "responseStyle",
        this.value
    );

    showMessage(
        `AI response style set to ${this.options[this.selectedIndex].text}.`
    );

});


/* ================================
   SIMPLE CODE
================================ */

const simpleCode =
    document.getElementById("simpleCode");

const savedSimpleCode =
    localStorage.getItem("simpleCode");


if (savedSimpleCode !== null) {
    simpleCode.checked = savedSimpleCode === "true";
}


simpleCode.addEventListener("change", function () {

    localStorage.setItem(
        "simpleCode",
        this.checked
    );

    showMessage(
        this.checked
            ? "Simple code explanations enabled."
            : "Simple code explanations disabled."
    );

});


/* ================================
   NOTIFICATION BUTTON
================================ */

document.getElementById("notificationBtn")
    .addEventListener("click", () => {

        showMessage("No new notifications.");

    });


/* ================================
   DELETE ACCOUNT
================================ */

document.getElementById("deleteAccountBtn")
    .addEventListener("click", () => {

        const confirmed =
            confirm(
                "Are you sure you want to delete your account?"
            );

        if (confirmed) {

            showMessage(
                "Account deletion will be available after backend integration."
            );

        }

    });


/* ================================
   MESSAGE
================================ */

function showMessage(message) {

    const oldMessage =
        document.querySelector(".settings-message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const messageBox =
        document.createElement("div");

    messageBox.className =
        "settings-message";

    messageBox.textContent =
        message;


    document.body.appendChild(messageBox);


    setTimeout(() => {

        messageBox.classList.add("show");

    }, 10);


    setTimeout(() => {

        messageBox.classList.remove("show");

        setTimeout(() => {

            messageBox.remove();

        }, 300);

    }, 2500);

}