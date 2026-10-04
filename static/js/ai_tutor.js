/* =========================================
   STUDYSENSE AI TUTOR
========================================= */

const modeSelection = document.getElementById("modeSelection");
const tutorMode = document.getElementById("tutorMode");
const codingMode = document.getElementById("codingMode");

const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");
const chatMessages = document.getElementById("chatMessages");

const codeEditor = document.getElementById("codeEditor");
const lineNumbers = document.getElementById("lineNumbers");

const languageSelect = document.getElementById("languageSelect");
const fileName = document.getElementById("fileName");

const coachResponse = document.getElementById("coachResponse");
const codeOutput = document.getElementById("codeOutput");

const themeToggle = document.getElementById("themeToggle");


/* =========================================
   MODE SWITCHING
========================================= */

function openMode(mode) {

    modeSelection.classList.add("hidden");

    tutorMode.classList.add("hidden");
    codingMode.classList.add("hidden");

    if (mode === "tutor") {
        tutorMode.classList.remove("hidden");
    }

    if (mode === "coding") {
        codingMode.classList.remove("hidden");
        updateLineNumbers();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function goBack() {

    tutorMode.classList.add("hidden");
    codingMode.classList.add("hidden");

    modeSelection.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   AI CHAT
========================================= */

function sendChatMessage(message = null) {

    const text = message || chatInput.value.trim();

    if (!text) return;

    addUserMessage(text);

    chatInput.value = "";

    showTyping();

    setTimeout(() => {

        removeTyping();

        const response = generateDemoResponse(text);

        addAIMessage(response);

    }, 900);
}


function addUserMessage(text) {

    const message = document.createElement("div");

    message.className = "message user-message";

    message.innerHTML = `

        <div class="message-content">

            <span class="message-name">
                You
            </span>

            <div class="bubble">
                ${escapeHTML(text)}
            </div>

        </div>

        <div class="message-avatar">
            <i class="fa-solid fa-user"></i>
        </div>

    `;

    chatMessages.appendChild(message);

    scrollChat();
}


function addAIMessage(text) {

    const message = document.createElement("div");

    message.className = "message ai-message";

    message.innerHTML = `

        <div class="message-avatar">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="message-content">

            <span class="message-name">
                StudySense AI
            </span>

            <div class="bubble">
                ${text}
            </div>

        </div>

    `;

    chatMessages.appendChild(message);

    scrollChat();
}


function showTyping() {

    const typing = document.createElement("div");

    typing.id = "typingIndicator";

    typing.className = "message ai-message";

    typing.innerHTML = `

        <div class="message-avatar">
            <i class="fa-solid fa-robot"></i>
        </div>

        <div class="message-content">

            <span class="message-name">
                StudySense AI
            </span>

            <div class="bubble">
                <i class="fa-solid fa-ellipsis"></i>
                Thinking...
            </div>

        </div>

    `;

    chatMessages.appendChild(typing);

    scrollChat();
}


function removeTyping() {

    const typing = document.getElementById("typingIndicator");

    if (typing) {
        typing.remove();
    }
}


function scrollChat() {

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/* =========================================
   DEMO AI RESPONSE
========================================= */

function generateDemoResponse(question) {

    const q = question.toLowerCase();

    if (q.includes("loop")) {

        return `
            <p>
                A <strong>loop</strong> is used when you want to
                repeat a block of code.
            </p>

            <p>
                For example, instead of writing the same statement
                five times, you can use a loop:
            </p>

            <pre style="
                background:#0b1120;
                padding:12px;
                border-radius:10px;
                margin-top:10px;
                overflow:auto;
            ">for i in range(5):
    print(i)</pre>

            <p style="margin-top:10px;">
                💡 Think of a loop as telling the computer:
                <strong>"Repeat this for me."</strong>
            </p>
        `;
    }


    if (q.includes("function")) {

        return `
            <p>
                A function is a reusable block of code that
                performs a particular task.
            </p>

            <pre style="
                background:#0b1120;
                padding:12px;
                border-radius:10px;
                margin-top:10px;
            ">def greet(name):
    print("Hello", name)</pre>

            <p style="margin-top:10px;">
                You can call the function whenever you need it.
            </p>
        `;
    }


    if (q.includes("debug")) {

        return `
            <p>
                🐛 Debugging means finding and fixing problems
                in your program.
            </p>

            <p>
                A good approach is:
            </p>

            <p>
                <strong>1.</strong> Read the error message<br>
                <strong>2.</strong> Find the line causing it<br>
                <strong>3.</strong> Understand why it happened<br>
                <strong>4.</strong> Fix it<br>
                <strong>5.</strong> Run the program again
            </p>

            <p>
                Send me your code and I'll help you find the problem.
            </p>
        `;
    }


    return `
        <p>
            That's a great question! 🤖
        </p>

        <p>
            In the full version of StudySense AI, I'll analyze
            your question and provide a personalized explanation
            based on your current learning level.
        </p>

        <p>
            For now, try asking me something like:
            <strong>"Explain loops"</strong>,
            <strong>"What is a function?"</strong> or
            <strong>"Help me debug my code."</strong>
        </p>
    `;
}


/* =========================================
   QUICK QUESTIONS
========================================= */

function quickAsk(question) {
    sendChatMessage(question);
}


/* =========================================
   CLEAR CHAT
========================================= */

function clearChat() {

    chatMessages.innerHTML = `

        <div class="message ai-message">

            <div class="message-avatar">
                <i class="fa-solid fa-robot"></i>
            </div>

            <div class="message-content">

                <span class="message-name">
                    StudySense AI
                </span>

                <div class="bubble">

                    <p>
                        Chat cleared. 👋
                    </p>

                    <p>
                        What would you like to learn?
                    </p>

                </div>

            </div>

        </div>

    `;
}


/* =========================================
   CHAT EVENTS
========================================= */

sendMessage.addEventListener("click", () => {
    sendChatMessage();
});


chatInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendChatMessage();
    }

});


chatInput.addEventListener("input", () => {

    chatInput.style.height = "auto";

    chatInput.style.height =
        Math.min(chatInput.scrollHeight, 120) + "px";

});


/* =========================================
   CODE EDITOR
========================================= */

function updateLineNumbers() {

    const lines = codeEditor.value.split("\n").length;

    let numbers = "";

    for (let i = 1; i <= lines; i++) {
        numbers += i + "\n";
    }

    lineNumbers.textContent = numbers;
}


codeEditor.addEventListener("input", updateLineNumbers);


codeEditor.addEventListener("scroll", () => {
    lineNumbers.scrollTop = codeEditor.scrollTop;
});


/* =========================================
   TAB KEY
========================================= */

codeEditor.addEventListener("keydown", function(event) {

    if (event.key === "Tab") {

        event.preventDefault();

        const start = this.selectionStart;
        const end = this.selectionEnd;

        this.value =
            this.value.substring(0, start) +
            "    " +
            this.value.substring(end);

        this.selectionStart =
            this.selectionEnd = start + 4;

        updateLineNumbers();
    }

});


/* =========================================
   LANGUAGE
========================================= */

languageSelect.addEventListener("change", () => {

    const language = languageSelect.value;

    const extensions = {
        python: "py",
        javascript: "js",
        html: "html",
        css: "css",
        java: "java",
        c: "c"
    };

    fileName.textContent =
        "main." + extensions[language];

    loadStarterCode(language);

});


function loadStarterCode(language) {

    const examples = {

        python:
`# Write your Python code here

name = input("Enter your name: ")
print("Hello", name)`,

        javascript:
`// Write your JavaScript code here

let name = "Student";
console.log("Hello " + name);`,

        html:
`<!-- Write your HTML here -->

<!DOCTYPE html>
<html>
<body>

<h1>Hello StudySense!</h1>

</body>
</html>`,

        css:
`/* Write your CSS here */

body {
    font-family: Arial;
}

h1 {
    color: purple;
}`,

        java:
`// Write your Java code here

public class Main {

    public static void main(String[] args) {

        System.out.println("Hello StudySense!");

    }
}`,

        c:
`// Write your C code here

#include <stdio.h>

int main() {

    printf("Hello StudySense!");

    return 0;
}`
    };

    codeEditor.value = examples[language];

    updateLineNumbers();
}


/* =========================================
   RUN CODE - FRONTEND DEMO
========================================= */

document.getElementById("runCode").addEventListener("click", () => {

    const language = languageSelect.value;

    codeOutput.textContent =
        "Running " + language + " code...\n\n" +
        "✓ Code submitted successfully.\n" +
        "Real code execution will be connected in the backend.";

});


/* =========================================
   CHECK CODE
========================================= */

document.getElementById("checkCode").addEventListener("click", () => {

    const code = codeEditor.value.trim();

    if (!code) {

        showCoachResponse(
            "Please write some code first. Then I'll check it for you. 💡"
        );

        return;
    }

    showCoachResponse(`
        <strong>Code Check</strong>

        <p style="margin-top:8px;">
            Your code has been received successfully.
        </p>

        <p>
            In the AI-powered version, StudySense will analyze
            your syntax, logic, errors and coding style.
        </p>
    `);

});


/* =========================================
   SIMPLIFY CODE
========================================= */

document.getElementById("simplifyCode").addEventListener("click", () => {

    showCoachResponse(`
        <strong>✨ Simpler Way</strong>

        <p style="margin-top:8px;">
            StudySense will compare your solution with simpler
            approaches and explain <strong>why</strong> the simpler
            approach is better.
        </p>

        <p style="margin-top:8px;">
            The goal isn't just to change your code — it's to help
            you understand how to write cleaner and easier code.
        </p>
    `);

});


/* =========================================
   EXPLAIN CODE
========================================= */

document.getElementById("explainCode").addEventListener("click", () => {

    const code = codeEditor.value.trim();

    if (!code) {

        showCoachResponse(
            "Write some code first and I'll explain it line by line. 📚"
        );

        return;
    }

    showCoachResponse(`
        <strong>📚 Code Explanation</strong>

        <p style="margin-top:8px;">
            I'll break your code into small sections and explain
            what each part does in simple language.
        </p>

        <p>
            This is especially useful when you're learning a new
            programming concept.
        </p>
    `);

});


/* =========================================
   HINT
========================================= */

document.getElementById("getHint").addEventListener("click", () => {

    showCoachResponse(`
        <strong>💡 Here's a hint</strong>

        <p style="margin-top:8px;">
            Don't immediately look for the final answer.
            First identify what your program is supposed to do.
        </p>

        <p>
            Then break the problem into smaller steps.
        </p>
    `);

});


/* =========================================
   COACH RESPONSE
========================================= */

function showCoachResponse(content) {

    coachResponse.innerHTML = `
        <div style="
            color:#cbd5e1;
            font-size:11px;
            line-height:1.7;
        ">
            ${content}
        </div>
    `;

}


/* =========================================
   RESET CODE
========================================= */

document.getElementById("resetCode").addEventListener("click", () => {

    loadStarterCode(languageSelect.value);

    codeOutput.textContent =
        "Run your code to see the output here...";

    coachResponse.innerHTML = `
        <div class="response-placeholder">

            <i class="fa-solid fa-comments"></i>

            <p>
                Your AI feedback will appear here.
            </p>

        </div>
    `;

});


/* =========================================
   CLEAR OUTPUT
========================================= */

document.getElementById("clearOutput").addEventListener("click", () => {

    codeOutput.textContent =
        "Run your code to see the output here...";

});


/* =========================================
   CURSOR POSITION
========================================= */

codeEditor.addEventListener("keyup", updateCursorPosition);
codeEditor.addEventListener("click", updateCursorPosition);


function updateCursorPosition() {

    const position = codeEditor.selectionStart;

    const beforeCursor =
        codeEditor.value.substring(0, position);

    const lines = beforeCursor.split("\n");

    const line = lines.length;

    const column = lines[lines.length - 1].length + 1;

    document.getElementById("cursorPosition").textContent =
        `Ln ${line}, Col ${column}`;
}


/* =========================================
   THEME
========================================= */

const savedTheme = localStorage.getItem("studySenseTheme");

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


/* =========================================
   HTML ESCAPE
========================================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================================
   INITIALIZE
========================================= */

updateLineNumbers();
updateCursorPosition();