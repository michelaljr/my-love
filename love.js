document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.getElementById("startButton");
    let quizContainer = document.getElementById("quiz");
    let welcomeContainer = document.getElementById("welcome");
    let loginContainer = document.getElementById("login");
    let letterContainer = document.getElementById("letter");
    let questionElement = document.getElementById("question");
    let optionsElement = document.getElementById("options");

    let questions = [
        {
            question: "Onde não fomos no nosso primeiro encontro?",
            options: ["Praia", "Lagoa", "Cinema", "Pizzaria"],
            answer: "Cinema"
        },
        {
            question: "Quem é mais possessivo comigo?",
            options: ["Voce", "Jade", "Pai", "Zeca"],
            answer: "Voce"
        },
        {
            question: "Onde nos foi na primeira férias juntos?",
            options: ["Buzios", "Arraial do cabo", "Buenos Aires", "Ilha Grande"],
            answer: "Buzios"
        },
        {
            question: "Que parte do corpo tem a ver com a cantada que eu viz com voce no Tinder?",
            options: ["Cabeça", "Mamilos", "Lingua", "Bunda"],
            answer: "Lingua"
        },
        {
            question: "Voce me ama?",
            options: ["Sim", "Não"],
            answer: "Sim"
        }
    ];

    let currentQuestionIndex = 0;
    let correctUsername = "diadosnamorados";
    let correctPassword = "th4y3m1k3";
   
    addFloatingImages();

    startButton.addEventListener("click", startQuiz);

    function startQuiz() {
        welcomeContainer.style.display = "none";
        quizContainer.style.display = "block";
        showQuestion();
    }

    function showQuestion() {
        let currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";
        
        currentQuestion.options.forEach(option => {
            let button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option-button");
            button.addEventListener("click", () => selectOption(option));
            optionsElement.appendChild(button);
            if (option === "Não"){
                button.id = "naoOption";
            }
        });
        if (currentQuestionIndex === questions.length - 1){
            let naoButton = document.getElementById("naoOption");
            if (naoButton) {
                naoButton.addEventListener("click", () => moveNaoOption(naoButton));
            }
        }
    }

    function selectOption(selectedOption) {
        let currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.answer) {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showLogin();
            }
        } else if (selectedOption !== "Não") {
            alert("Errou! Tenta mais uma vez.");
            currentQuestionIndex = 0;
            showQuestion();
        }
    }

    function moveNaoOption(button) {
        let posX = Math.random() * (window.innerWidth - button.offsetWidth);
        let posY = Math.random() * (window.innerHeight - button.offsetHeight);
        button.style.position = "absolute";
        button.style.left = posX + "px";
        button.style.top = posY + "px";
    }


    function showLogin() {
        quizContainer.style.display = "none";
        loginContainer.style.display = "block";
    }

    let loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", handleLogin);

    function handleLogin() {
        let enteredUsername = document.getElementById("username").value;
        let enteredPassword = document.getElementById("password").value;

        if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
            localStorage.setItem("username", enteredUsername);
            localStorage.setItem("password", enteredPassword);
            showLetter();
        } else {
            alert("Incorrect username or password. Please try again.");
        }
    }

    function checkStoredCredentials() {
        let storedUsername = localStorage.getItem("username");
        let storedPassword = localStorage.getItem("password");

        if (storedUsername === correctUsername && storedPassword === correctPassword) {
        }
    }

    function showLetter() {
        loginContainer.style.display = "none";
        letterContainer.style.display = "block";
    }

    function addFloatingImages() {
        let floatingImagesContainer = document.getElementById("floatingImages");

        let images = [
            "images/elevator 4.jpg", "images/alergic to rides.jpg", "images/animals.jpg", "images/beach.jpg", "images/best pic.jpg", 
            "images/dos irmaos e salmao.jpg", "images/buzios.jpg", "images/elevator 3.jpg", "images/face.jpg", "images/elevator.jpg", 
            "images/family.jpg", "images/gamer girl.jpg", "images/heart u.jpg", "images/kiss irmaos.jpg", "images/kiss on the ocean.jpg", 
            "images/kiss the moon.jpg", "images/me and u sky.jpg", "images/me u jade.jpg", "images/ouuu.jpg", "images/purple sky.jpg", 
            "images/ride.jpg", "images/scrunch.jpg", "images/sexy .jpg", "images/sunrise heart.jpg", "images/us with view.jpg", 
            "images/zoo me and u.jpg", "images/beach point.jpg", "images/buzios heart.jpg", "images/thats my hat.jpg", "images/jade me u.jpg", "images/photo of phot.jpg", "images/lake.jpg"]; // Add paths to your images here

        images.forEach((src) => {
            let img = document.createElement("img");
            img.src = src;
            img.classList.add("floatingImage");
            floatingImagesContainer.appendChild(img);

            animateImage(img);
        });

    function animateImage(img) {
        let posX = Math.random() * (window.innerWidth * 0.9);
        let posY = Math.random() * (window.innerHeight * 0.9);
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;

        function move() {
            posX += speedX;
            posY += speedY;

            if (posX <= 0 || posX >= window.innerWidth - img.width) {
                speedX = -speedX;
            }
            if (posY <= 0 || posY >= window.innerHeight - img.height) {
                speedY = -speedY;
            }

            img.style.left = posX + 'px';
            img.style.top = posY + 'px';

            requestAnimationFrame(move);
        }

        move();
    }

    // Check stored credentials when the page loads
    checkStoredCredentials();
    }
});
