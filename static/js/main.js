const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 100;

            const update = () => {

                count += speed;

                if (count < target) {

                    if (target >= 1000) {
                        counter.innerText = Math.floor(count).toLocaleString();
                    } else {
                        counter.innerText = Math.floor(count);
                    }

                    requestAnimationFrame(update);

                } else {

                    if (target === 25000) {
                        counter.innerText = "25K+";
                    } else if (target === 98) {
                        counter.innerText = "98%";
                    } else {
                        counter.innerText = target + "+";
                    }

                }

            };

            update();

            observer.unobserve(counter);

        }

    });
});

counters.forEach(counter => observer.observe(counter));