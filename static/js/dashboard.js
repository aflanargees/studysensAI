console.log("Dashboard JS Loaded!");
// =====================================
// Greeting
// =====================================

const heroTitle = document.querySelector(".hero h1");

const hour = new Date().getHours();

let greeting = "Welcome Back";

if(hour < 12){

    greeting = "Good Morning";

}
else if(hour < 17){

    greeting = "Good Afternoon";

}
else{

    greeting = "Good Evening";

}

heroTitle.innerHTML = `${greeting}, username! 👋`;
// =====================================
// Animated Counter
// =====================================

const counters = document.querySelectorAll(".stat-card h3");

const speed = 30;

counters.forEach(counter=>{

    const target = Number(counter.innerText);

    let count = 0;

    const update = ()=>{

        count += Math.ceil(target/speed);

        if(count >= target){

            counter.innerText = target;

        }else{

            counter.innerText = count;

            requestAnimationFrame(update);

        }

    }

    update();

});
// ======================
// Theme Toggle
// ======================

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }

});
// =====================================
// Button Hover Animation
// =====================================

document.querySelectorAll(".primary-btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="scale(1.05)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="scale(1)";

    });

});
// =====================================
// Scroll Animation
// =====================================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

});

cards.forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(40px)";
    card.style.transition=".6s";

    observer.observe(card);

});