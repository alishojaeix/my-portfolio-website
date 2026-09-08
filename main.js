/* =====================================================
   PORTFOLIO MAIN JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
    ================================================= */

    const body = document.body;

    const menuToggle =
        document.getElementById("menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const themeToggle =
        document.getElementById("theme-toggle");

    const themeIcon =
        themeToggle?.querySelector("i");



    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                navMenu.classList.toggle("open");

                const icon =
                    menuToggle.querySelector("i");

                if (
                    navMenu.classList.contains("open")
                ) {

                    icon.className =
                        "bx bx-x";

                } else {

                    icon.className =
                        "bx bx-menu";

                }

            }
        );

    }



    /* =================================================
       CLOSE MOBILE MENU
    ================================================= */

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                navMenu?.classList.remove("open");

                const icon =
                    menuToggle?.querySelector("i");

                if (icon) {

                    icon.className =
                        "bx bx-menu";

                }

            }
        );

    });



    /* =================================================
       DARK MODE
    ================================================= */

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "dark") {

        body.classList.add("dark");

        if (themeIcon) {

            themeIcon.className =
                "bx bx-sun";

        }

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle("dark");

                const isDark =
                    body.classList.contains("dark");


                localStorage.setItem(
                    "portfolio-theme",
                    isDark
                        ? "dark"
                        : "light"
                );


                if (themeIcon) {

                    themeIcon.className =
                        isDark
                            ? "bx bx-sun"
                            : "bx bx-moon";

                }

            }
        );

    }



    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll("section[id]");


    const updateActiveNav =
        () => {

            const scrollPosition =
                window.scrollY + 150;


            sections.forEach((section) => {

                const top =
                    section.offsetTop;

                const height =
                    section.offsetHeight;

                const id =
                    section.getAttribute("id");


                if (
                    scrollPosition >= top &&
                    scrollPosition < top + height
                ) {

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                    });


                    const activeLink =
                        document.querySelector(
                            `.nav-link[href="#${id}"]`
                        );


                    activeLink?.classList.add(
                        "active"
                    );

                }

            });

        };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );


    updateActiveNav();



    /* =================================================
       REVEAL ANIMATIONS
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });



    /* =================================================
       CUSTOM CURSOR
    ================================================= */

    const cursor =
        document.querySelector(".cursor");

    const follower =
        document.querySelector(".cursor-follower");


    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;


    if (cursor && follower) {

        window.addEventListener(
            "mousemove",
            (event) => {

                mouseX = event.clientX;

                mouseY = event.clientY;


                cursor.style.left =
                    `${mouseX}px`;

                cursor.style.top =
                    `${mouseY}px`;

            }
        );


        const animateCursor =
            () => {

                followerX +=
                    (mouseX - followerX) * 0.15;

                followerY +=
                    (mouseY - followerY) * 0.15;


                follower.style.left =
                    `${followerX}px`;

                follower.style.top =
                    `${followerY}px`;


                requestAnimationFrame(
                    animateCursor
                );

            };


        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .skill-row, .project-visual"
            );


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );

    }



    /* =================================================
       HERO PARALLAX
    ================================================= */

    const hero =
        document.querySelector(".hero");

    const portrait =
        document.querySelector(".portrait");

    const heroTitle =
        document.querySelector(".hero-title");


    if (
        hero &&
        portrait &&
        heroTitle &&
        window.innerWidth > 800
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left)
                    / rect.width
                    - 0.5;


                const y =
                    (event.clientY - rect.top)
                    / rect.height
                    - 0.5;


                portrait.style.transform =
                    `translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )`;


                heroTitle.style.transform =
                    `translate(
                        ${x * -5}px,
                        ${y * -5}px
                    )`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                portrait.style.transform =
                    "translate(0,0)";


                heroTitle.style.transform =
                    "translate(0,0)";

            }
        );

    }



    /* =================================================
       PROJECT 3D TILT
    ================================================= */

    const projectVisuals =
        document.querySelectorAll(
            ".project-visual"
        );


    projectVisuals.forEach(
        (visual) => {

            const dashboard =
                visual.querySelector(
                    ".ai-dashboard, .api-dashboard, .saas-window"
                );


            if (!dashboard) return;


            visual.addEventListener(
                "mousemove",
                (event) => {

                    if (window.innerWidth < 900)
                        return;


                    const rect =
                        visual.getBoundingClientRect();


                    const x =
                        (event.clientX - rect.left)
                        / rect.width
                        - 0.5;


                    const y =
                        (event.clientY - rect.top)
                        / rect.height
                        - 0.5;


                    const rotateY =
                        x * 5;


                    const rotateX =
                        y * -5;


                    dashboard.style.transform =
                        `perspective(1200px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-6px)`;

                }
            );


            visual.addEventListener(
                "mouseleave",
                () => {

                    dashboard.style.transform =
                        "";

                }
            );

        }
    );



    /* =================================================
       SKILL ROW MICRO INTERACTION
    ================================================= */

    const skillRows =
        document.querySelectorAll(
            ".skill-row"
        );


    skillRows.forEach(
        (row) => {

            row.addEventListener(
                "mouseenter",
                () => {

                    const arrow =
                        row.querySelector("i");


                    if (arrow) {

                        arrow.style.transform =
                            "translateX(8px)";

                    }

                }
            );


            row.addEventListener(
                "mouseleave",
                () => {

                    const arrow =
                        row.querySelector("i");


                    if (arrow) {

                        arrow.style.transform =
                            "translateX(0)";

                    }

                }
            );

        }
    );



    /* =================================================
       SMOOTH ANCHOR SCROLL
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    const headerOffset =
                        80;


                    const targetPosition =
                        target.offsetTop -
                        headerOffset;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });



    /* =================================================
       PROJECT VISUAL MOUSE GLOW
    ================================================= */

    projectVisuals.forEach(
        (visual) => {

            visual.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        visual.getBoundingClientRect();


                    const x =
                        ((event.clientX - rect.left)
                        / rect.width) * 100;


                    const y =
                        ((event.clientY - rect.top)
                        / rect.height) * 100;


                    visual.style.backgroundPosition =
                        `${x}% ${y}%`;

                }
            );

        }
    );



    /* =================================================
       PREVENT EMPTY FORM / DEMO LINKS
    ================================================= */

    document
        .querySelectorAll('a[href="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                }
            );

        });


});