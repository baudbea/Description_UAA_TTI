// Chargement
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("code-loader");

    const mediaElements = [...document.images, ...document.querySelectorAll("video")];
    let loadedCount = 0;

    const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === mediaElements.length) {
            loader.classList.add("hidden"); // Applique le fade-out
            setTimeout(() => {
                loader.style.display = "none"; // Cache complètement après l'animation
            }, 250); // 1s = durée de l'animation CSS
        }
    };

    mediaElements.forEach((element) => {
        if (element.tagName === "IMG") {
            if (element.complete) {
                checkAllLoaded();
            } else {
                element.addEventListener("load", checkAllLoaded);
                element.addEventListener("error", checkAllLoaded);
            }
        } else if (element.tagName === "VIDEO") {
            element.addEventListener("loadeddata", checkAllLoaded);
            element.addEventListener("error", checkAllLoaded);
        }
    });

    if (mediaElements.length === 0) {
        loader.classList.add("hidden");
        setTimeout(() => {
            loader.style.display = "none";
        }, 250);
    }
});

// Barre de progression
document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".step");
    const contents = document.querySelectorAll(".content");
    const progressBar = document.getElementById("progressBar");
    let activeIndex = -1;

    steps.forEach((step, index) => {
        step.addEventListener("click", function () {
            if (activeIndex === index) {
                contents[index].classList.remove("active");
                activeIndex = -1;
                progressBar.style.height = "0%";
            } else {
                if (activeIndex !== -1) {
                    contents[activeIndex].classList.remove("active");
                }
                contents[index].classList.add("active");
                activeIndex = index;
                progressBar.style.height = ((index + 1) / steps.length) * 100 + "%";
            }
        });
    });
});

// Mode jour nuit
const toggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
});

// Pour changer entre langage et algo sur Progra 5 & 6
document.addEventListener("DOMContentLoaded", function () {
    const butAlgo = document.getElementById("ButAlgo");
    const butLangage = document.getElementById("ButLangage");
    const contentAlgo = document.getElementById("ContentAlgo");
    const contentLangage = document.getElementById("ContentLangage");

    function updateDisplay(activeButton) {
        const fadeOut = activeButton === "algo" ? contentLangage : contentAlgo;
        const fadeIn = activeButton === "algo" ? contentAlgo : contentLangage;

        // Étape 1 : Fade-out progressif de l'ancien contenu
        fadeOut.classList.remove("show");
        fadeOut.classList.add("fade");

        setTimeout(() => {
            fadeOut.classList.add("hidden"); // Cache l'ancien contenu après la transition

            // Étape 2 : Préparer l'affichage du nouveau contenu
            fadeIn.classList.remove("hidden"); // Rend visible avant de faire le fade-in
            fadeIn.classList.add("fade"); // Assure que le fade-in fonctionne

            setTimeout(() => {
                fadeIn.classList.add("show"); // Active le fade-in
            }, 10); // Petit délai pour que l'effet s'applique correctement
        }, 400); // Durée du fade-out avant de lancer le fade-in

        // Mise à jour des boutons actifs
        if (activeButton === "algo") {
            butAlgo.classList.add("butACTIF");
            butLangage.classList.remove("butACTIF");
        } else {
            butAlgo.classList.remove("butACTIF");
            butLangage.classList.add("butACTIF");
        }
    }

    // Ajout des événements aux boutons
    butAlgo.addEventListener("click", function () {
        updateDisplay("algo");
    });

    butLangage.addEventListener("click", function () {
        updateDisplay("langage");
    });

    // Initialisation : active "Partie algorithme" par défaut
    contentAlgo.classList.add("show");
    contentLangage.classList.add("hidden");
});