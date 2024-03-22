import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const countersAnimation = () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // counters
    const number = document.querySelectorAll('.mil-counter');

    number.forEach((element) => {
        const count = element,
              zero = { val: 0 },
              num = +count.dataset.number, // Ensure num is a number by using unary plus operator
              split = num.toString().split("."), // Handle decimals
              decimals = split.length > 1 ? split[1].length : 0;

        gsap.to(zero, {
            val: num,
            duration: 2,
            scrollTrigger: {
                trigger: count,
                toggleActions: 'play none none reverse',
            },
            onUpdate: function () {
                // Ensure zero.val is treated as a number by converting it
                const numericVal = Number(zero.val);
                count.innerHTML = numericVal.toFixed(decimals);
            }
        });
    });

    // progressbar type 1
    const progGo = document.querySelectorAll(".mil-circular-progress");

    progGo.forEach((section) => {
        const value = section.dataset.value;
        gsap.fromTo(section, {
            "--p": '0%',
            ease: 'sine',
        }, {
            "--p": value + "%",
            duration: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    // progressbars type 2
    const width = document.querySelectorAll(".mil-bar");

    width.forEach((section) => {
        const value = section.dataset.value;
        gsap.fromTo(section, {
            width: 0,
            ease: 'sine',
        }, {
            width: value + "%",
            duration: 5, // Assuming you want the duration in seconds, not milliseconds
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });
};
