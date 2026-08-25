/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const input = button.previousElementSibling;
        const icon = button.querySelector("i");

        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {

            input.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    });

});


/* ==========================================
   PASSWORD STRENGTH
========================================== */

const password = document.getElementById("password");
const strengthFill = document.querySelector(".strength-fill");
const strengthText = document.querySelector(".strength-text");

password.addEventListener("input", () => {

    const value = password.value;

    let score = 0;

    if(value.length >= 8) score++;
    if(/[A-Z]/.test(value)) score++;
    if(/[0-9]/.test(value)) score++;
    if(/[!@#$%^&*]/.test(value)) score++;

    switch(score){

        case 0:
        case 1:
            strengthFill.style.width="25%";
            strengthFill.style.background="#ef4444";
            strengthText.innerHTML="Weak Password";
            break;

        case 2:
            strengthFill.style.width="50%";
            strengthFill.style.background="#f59e0b";
            strengthText.innerHTML="Medium Password";
            break;

        case 3:
            strengthFill.style.width="75%";
            strengthFill.style.background="#3b82f6";
            strengthText.innerHTML="Good Password";
            break;

        case 4:
            strengthFill.style.width="100%";
            strengthFill.style.background="#10b981";
            strengthText.innerHTML="Strong Password";
            break;

    }

});


/* ==========================================
   EMAIL VALIDATION
========================================== */

const email = document.getElementById("email");

email.addEventListener("blur",()=>{

    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!pattern.test(email.value)){

        email.style.borderColor="#ef4444";

    }else{

        email.style.borderColor="#10b981";

    }

});


/* ==========================================
   PASSWORD MATCH
========================================== */

const confirmPassword=document.getElementById("confirmPassword");

confirmPassword.addEventListener("input",()=>{

    if(confirmPassword.value===""){

        confirmPassword.style.borderColor="#e2e8f0";
        return;

    }

    if(password.value===confirmPassword.value){

        confirmPassword.style.borderColor="#10b981";

    }else{

        confirmPassword.style.borderColor="#ef4444";

    }

});


/* ==========================================
   FORM SUBMIT
========================================== */

const form=document.getElementById("signupForm");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(password.value!==confirmPassword.value){

        alert("Passwords do not match!");

        return;

    }

    if(password.value.length<8){

        alert("Password should contain at least 8 characters.");

        return;

    }

    const button=document.querySelector(".signup-btn");

    button.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

    button.disabled=true;

    setTimeout(()=>{

        alert("🎉 Account Created Successfully!");

        window.location.href="/login";

    },1800);

});