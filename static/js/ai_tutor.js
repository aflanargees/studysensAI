/* =========================================================
   STUDYSENSE AI - AI TUTOR
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const themeToggle = document.getElementById("themeToggle");


/* =========================================================
   SEND MESSAGE
   ========================================================= */

function sendMessage() {

    if (!userInput || !chatMessages) {
        return;
    }

    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    addUserMessage(message);

    userInput.value = "";

    autoResizeInput();

    showTyping();

    setTimeout(() => {

        removeTyping();

        generateDemoResponse(message);

    }, 900);

}


/* =========================================================
   ADD USER MESSAGE
   ========================================================= */

function addUserMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className = "message user-message";

    messageElement.innerHTML = `

        <div class="message-content">

            <div class="message-bubble">

                ${escapeHTML(message)}

            </div>

            <span class="message-time">
                Just now
            </span>

        </div>

    `;

    chatMessages.appendChild(messageElement);

    scrollToBottom();

}


/* =========================================================
   ADD AI MESSAGE
   ========================================================= */

function addAIMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className = "message ai-message";

    messageElement.innerHTML = `

        <div class="message-avatar">

            <i class="fa-solid fa-robot"></i>

        </div>


        <div class="message-content">

            <div class="message-name">
                AI Tutor
            </div>


            <div class="message-bubble">

                ${message}

            </div>


            <span class="message-time">
                Just now
            </span>

        </div>

    `;

    chatMessages.appendChild(messageElement);

    scrollToBottom();

}


/* =========================================================
   TYPING INDICATOR
   ========================================================= */

function showTyping() {

    removeTyping();

    const typingElement = document.createElement("div");

    typingElement.className = "message ai-message";

    typingElement.id = "typingIndicator";

    typingElement.innerHTML = `

        <div class="message-avatar">

            <i class="fa-solid fa-robot"></i>

        </div>


        <div class="message-content">

            <div class="message-name">
                AI Tutor
            </div>


            <div class="message-bubble">

                <div class="typing-indicator">

                    <span></span>
                    <span></span>
                    <span></span>

                </div>

            </div>

        </div>

    `;

    chatMessages.appendChild(typingElement);

    scrollToBottom();

}


/* =========================================================
   REMOVE TYPING
   ========================================================= */

function removeTyping() {

    const typing = document.getElementById("typingIndicator");

    if (typing) {

        typing.remove();

    }

}


/* =========================================================
   DEMO AI RESPONSE
   ========================================================= */

function generateDemoResponse(message) {

    const text = message.toLowerCase();

    let response;


    /* PYTHON LOOP */

    if (
        text.includes("loop") ||
        text.includes("loops")
    ) {

        response = `

            <strong>Python loops</strong> allow you to
            repeat a block of code multiple times.

            <br><br>

            For example:

            <pre><code>for i in range(5):
    print(i)</code></pre>

            This prints the numbers from 0 to 4.

            <br><br>

            💡 Think of a loop as telling Python:

            <em>
                "Repeat this task until the condition is finished."
            </em>

        `;

    }


    /* FUNCTIONS */

    else if (
        text.includes("function") ||
        text.includes("functions")
    ) {

        response = `

            A <strong>function</strong> is a reusable block
            of code that performs a specific task.

            <br><br>

            Example:

            <pre><code>def greet(name):
    return "Hello " + name</code></pre>

            You can then call it using:

            <pre><code>greet("Afa")</code></pre>

            Functions help make your programs
            more organized and reusable.

        `;

    }


    /* DEBUG */

    else if (
        text.includes("debug") ||
        text.includes("error") ||
        text.includes("bug")
    ) {

        response = `

            🐛 <strong>I'd be happy to help you debug your code!</strong>

            <br><br>

            Paste your code here and I'll help you identify:

            <br><br>

            • What the error means<br>
            • Where the problem is<br>
            • Why it happens<br>
            • How to fix it

        `;

    }


    /* QUIZ */

    else if (
        text.includes("quiz") ||
        text.includes("question")
    ) {

        response = `

            🧠 <strong>Quick Python Question!</strong>

            <br><br>

            What will this code print?

            <pre><code>x = 5
y = 2
print(x + y)</code></pre>

            A) 7<br>
            B) 10<br>
            C) 3<br>
            D) 52

            <br><br>

            💡 Think about it before answering!

        `;

    }


    /* PRACTICE */

    else if (
        text.includes("practice")
    ) {

        response = `

            💻 <strong>Practice Challenge</strong>

            <br><br>

            Write a Python program that takes a number
            from the user and checks whether it is even or odd.

            <br><br>

            Try writing it yourself first.

            <br><br>

            When you're done, send your code here
            and I'll check it for you. 🚀

        `;

    }


    /* GENERAL */

    else {

        response = `

            That's a great question! 🤖

            <br><br>

            I'm your <strong>StudySense AI Tutor</strong>.

            I can help you understand programming concepts,
            debug code, practice problems, and prepare for quizzes.

            <br><br>

            Try asking me:

            <br><br>

            <strong>"Explain Python loops"</strong>

            <br>

            <strong>"What is a function?"</strong>

            <br>

            <strong>"Help me debug my code"</strong>

            <br>

            <strong>"Give me a Python practice question"</strong>

        `;

    }


    addAIMessage(response);

}


/* =========================================================
   SUGGESTION BUTTON
   ========================================================= */

function askSuggestion(question) {

    if (!userInput) {
        return;
    }

    userInput.value = question;

    autoResizeInput();

    sendMessage();

}


/* =========================================================
   TOOL BUTTONS
   ========================================================= */

function selectTool(tool) {

    let message = "";


    if (tool === "Explain Concept") {

        message =
            "Explain a programming concept to me";

    }


    else if (tool === "Debug Code") {

        message =
            "Help me debug my code";

    }


    else if (tool === "Practice") {

        message =
            "Give me a programming question to practice";

    }


    else if (tool === "Quiz Me") {

        message =
            "Quiz me on Python";

    }


    userInput.value = message;

    userInput.focus();

    autoResizeInput();

}


/* =========================================================
   CLEAR CHAT
   ========================================================= */

function clearChat() {

    if (!chatMessages) {
        return;
    }

    chatMessages.innerHTML = `

        <div class="message ai-message">

            <div class="message-avatar">

                <i class="fa-solid fa-robot"></i>

            </div>


            <div class="message-content">

                <div class="message-name">
                    AI Tutor
                </div>


                <div class="message-bubble">

                    Hi! 👋 I'm your
                    <strong>StudySense AI Tutor.</strong>

                    <br><br>

                    What would you like to learn today?

                </div>


                <span class="message-time">
                    Just now
                </span>

            </div>

        </div>

    `;

}


/* =========================================================
   ENTER KEY
   ========================================================= */

if (userInput) {

    userInput.addEventListener("keydown", function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    });


    userInput.addEventListener("input", autoResizeInput);

}


/* =========================================================
   AUTO RESIZE TEXTAREA
   ========================================================= */

function autoResizeInput() {

    if (!userInput) {
        return;
    }

    userInput.style.height = "46px";

}


/* =========================================================
   SCROLL
   ========================================================= */

function scrollToBottom() {

    if (!chatMessages) {
        return;
    }

    chatMessages.scrollTo({

        top: chatMessages.scrollHeight,

        behavior: "smooth"

    });

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   DARK MODE
   ========================================================= */

function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }

    const isDark =
        document.body.classList.contains("dark-mode");


    themeToggle.innerHTML = isDark

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';

}


const savedTheme =
    localStorage.getItem("studysense-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");


        const isDark =
            document.body.classList.contains("dark-mode");


        localStorage.setItem(

            "studysense-theme",

            isDark ? "dark" : "light"

        );


        updateThemeIcon();

    });

}


/* =========================================================
   NOTIFICATION BUTTON
   ========================================================= */

const notificationBtn =
    document.getElementById("notificationBtn");


if (notificationBtn) {

    notificationBtn.addEventListener("click", function() {

        this.classList.add("notification-active");


        setTimeout(() => {

            this.classList.remove("notification-active");

        }, 500);

    });

}


/* =========================================================
   INITIAL SCROLL
   ========================================================= */

window.addEventListener("load", function() {

    scrollToBottom();

});