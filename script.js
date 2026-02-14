document.addEventListener('DOMContentLoaded', function() {
    // Éléments de l'écran d'accueil
    const welcomeScreen = document.getElementById('welcome-screen');
    const welcomeNameInput = document.getElementById('welcome-name-input');
    const welcomeBtn = document.getElementById('welcome-btn');
    const mainContent = document.getElementById('main-content');
    
    // Éléments du contenu principal
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const container = document.querySelector('.container');
    const buttonsContainer = document.querySelector('.buttons-container');
    const successMessage = document.getElementById('success-message');
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const attemptCount = document.getElementById('attempt-count');
    const timer = document.getElementById('timer');
    const finalTime = document.getElementById('final-time');
    const finalAttempts = document.getElementById('final-attempts');
    const nameInput = document.getElementById('name-input');
    const nameBtn = document.getElementById('name-btn');
    const customName = document.getElementById('custom-name');
    const shareBtn = document.getElementById('share-btn');
    const quotesBtn = document.getElementById('quotes-btn');
    const quoteContainer = document.getElementById('quote-container');
    const quoteElement = quoteContainer.querySelector('.quote');
    const quoteBtn = document.getElementById('quote-btn');
    
    let noClickCount = 0;
    let isMoving = false;
    let startTime = Date.now();
    let timerInterval;
    let usedQuotes = [];
    let currentQuoteIndex = -1;
    let gameStarted = false;
    
    // Gestion de l'écran d'accueil
    welcomeBtn.addEventListener('click', function() {
        const name = welcomeNameInput.value.trim();
        if (name.length < 2) {
            welcomeNameInput.style.borderColor = '#ff4444';
            welcomeNameInput.placeholder = 'Entre au moins 2 lettres...';
            setTimeout(() => {
                welcomeNameInput.style.borderColor = '#764ba2';
                welcomeNameInput.placeholder = 'Ton prénom...';
            }, 2000);
            return;
        }
        
        // Personnaliser avec le nom
        customName.textContent = name;
        
        // Transition vers le contenu principal
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('show');
        
        // Démarrer le jeu
        setTimeout(() => {
            startGame();
        }, 800);
    });
    
    welcomeNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            welcomeBtn.click();
        }
    });
    
    welcomeNameInput.addEventListener('input', function() {
        welcomeBtn.disabled = this.value.trim().length < 2;
    });
    
    // Désactiver le bouton au début
    welcomeBtn.disabled = true;
    
    function startGame() {
        gameStarted = true;
        startTimer();
    }
    
    // Citations humoristiques aléatoires
    const funnyQuotes = [
        "Roses are red, Madagascar people is poor, spread your leg and give me an hour",
        "Love is blind, but I'm not... I can see how beautiful you are",
        "Are you a magician? Because whenever I look at you, everyone else disappears",
        "Do you have a map? Because I keep getting lost in your eyes",
        "Are you French? Because Eiffel for you",
        "Is your name Google? Because you have everything I've been searching for",
        "Do you believe in love at first sight, or should I walk by again?",
        "Excuse me, I think you have something in your eye... oh wait, it's just a sparkle",
        "Are you a parking ticket? Because you've got 'fine' written all over you",
        "Life is short, so let's make it long... in bed",
        "Are you a volcano? Because I lava you and want to erupt together",
        "Is your name Wi-Fi? Because I'm feeling a strong connection",
        "Are you a camera? Every time I look at you, I smile",
        "Do you have a name, or can I call you mine tonight?",
        "Are you a light switch? Because you turn me on",
        "Is your dad a thief? Someone stole the stars and put them in your eyes",
        "Are you a broom? Because you swept me off my feet",
        "Do you like chocolate? Because you're sweet and I want to eat you",
        "Are you a cat? Because I want to pet you all night long",
        "Is your body a temple? Because I want to worship it",
        "Are you a firework? Because you're explosive and I want to light you up",
        "Do you sleep on your stomach? No? Can I?",
        "Are you a dictionary? Because you add meaning to my life",
        "Is your name Chapstick? Because you're da balm",
        "Are you a triangle? Because you're acute-y",
        "Do you have a Band-Aid? I just scraped my knee falling for you",
        "Are you a time traveler? Because I see you in my future",
        "Is your name Netflix? Because I could watch you for hours",
        "Are you a baker? Because you've got nice buns",
        "Do you like vegetables? Because I want to toss your salad",
        "Are you a pirate? Because I want your booty",
        "Is your name Google Maps? Because you've got everything I'm looking for",
        "Are you a candle? Because I want to blow you",
        "Do you work at Subway? Because you're giving me a footlong",
        "Are you a snowstorm? Because I'm expecting 8-10 inches tonight",
        "Is your name Cinderella? Because I can see those clothes disappearing at midnight",
        "Are you a blanket? Because I want to wrap you around me",
        "Do you have a mirror in your pocket? Because I can see myself in your pants",
        "Are you a plumber? Because you're making my pipe leak",
        "Is your name Easter? Because I want to hunt for your eggs",
        "Are you a mechanic? Because I want to check your oil",
        "Do you like yoga? Because I want to bend you like a pretzel",
        "Are you a star? Because you're lighting up my night",
        "Is your name Amazon? Because you deliver exactly what I want"
    ];
    
    // Démarrer le chronomètre
    function startTimer() {
        if (!gameStarted) return;
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            timer.textContent = elapsed + 's';
        }, 1000);
    }
    
    // Ne pas démarrer le timer automatiquement
    // startTimer();
    
    const funnyMessages = [
        "Sûre ? 😊",
        "Vraiment sûre ? 🥺",
        "Réfléchis bien... 💭",
        "Ne sois pas si dure avec moi 🥲",
        "Je sais que tu veux dire oui 💕",
        "Allez, fais-moi plaisir ! 🌹",
        "Je t'offrirai des chocolats 🍫",
        "Et des fleurs ! 🌷",
        "Je ferai la vaisselle pendant un mois ! 🧼",
        "S'il te plaît ? 🙏",
        "Tu me brises le cœur 💔",
        "Dernière chance ! ⏰"
    ];
    
    function moveButtonAway(e) {
        if (isMoving) return;
        
        const buttonRect = btnNo.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - buttonCenterX, 2) + 
            Math.pow(e.clientY - buttonCenterY, 2)
        );
        
        if (distance < 150) {
            isMoving = true;
            
            const containerRect = container.getBoundingClientRect();
            const maxX = containerRect.width - buttonRect.width - 40;
            const maxY = window.innerHeight - buttonRect.height - 100;
            
            let newX, newY;
            
            do {
                newX = Math.random() * maxX + 20;
                newY = Math.random() * maxY + 20;
            } while (
                Math.abs(newX - buttonRect.left) < 100 && 
                Math.abs(newY - buttonRect.top) < 100
            );
            
            btnNo.style.position = 'fixed';
            btnNo.style.left = newX + 'px';
            btnNo.style.top = newY + 'px';
            btnNo.style.zIndex = '1000';
            
            noClickCount++;
            attemptCount.textContent = noClickCount;
            
            // Animation du compteur
            attemptCount.style.transform = 'scale(1.5)';
            setTimeout(() => {
                attemptCount.style.transform = 'scale(1)';
            }, 200);
            
            if (noClickCount <= funnyMessages.length) {
                subtitle.textContent = funnyMessages[noClickCount - 1];
                subtitle.style.animation = 'none';
                setTimeout(() => {
                    subtitle.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            }
            
            if (noClickCount > 5) {
                btnNo.style.fontSize = Math.max(0.8, 1.2 - (noClickCount * 0.1)) + 'rem';
                btnNo.style.padding = Math.max(10, 15 - (noClickCount)) + 'px ' + Math.max(20, 40 - (noClickCount * 3)) + 'px';
            }
            
            if (noClickCount > 8) {
                btnYes.style.transform = `scale(${1 + (noClickCount * 0.1)})`;
                btnYes.style.padding = `${15 + (noClickCount * 2)}px ${40 + (noClickCount * 5)}px`;
            }
            
            setTimeout(() => {
                isMoving = false;
            }, 200);
        }
    }
    
    btnNo.addEventListener('mouseenter', moveButtonAway);
    document.addEventListener('mousemove', function(e) {
        if (isMoving) return;
        moveButtonAway(e);
    });
    
    btnNo.addEventListener('click', function(e) {
        e.preventDefault();
        moveButtonAway(e);
    });
    
    btnYes.addEventListener('click', function() {
        clearInterval(timerInterval);
        
        const totalTime = Math.floor((Date.now() - startTime) / 1000);
        finalTime.textContent = totalTime;
        finalAttempts.textContent = noClickCount;
        
        buttonsContainer.style.display = 'none';
        title.style.display = 'none';
        subtitle.style.display = 'none';
        document.querySelector('.stats-container').style.display = 'none';
        document.querySelector('.name-input-container').style.display = 'none';
        successMessage.classList.remove('hidden');
        
        createConfetti();
        createFloatingHearts();
        createCustomParticles();
        showRandomQuote();
        
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)';
        }, 500);
    });
    
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.zIndex = '9999';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                let posY = -10;
                let posX = parseFloat(confetti.style.left);
                let velocityY = Math.random() * 3 + 2;
                let velocityX = (Math.random() - 0.5) * 2;
                let rotation = 0;
                let rotationSpeed = (Math.random() - 0.5) * 10;
                
                const fall = setInterval(() => {
                    posY += velocityY;
                    posX += velocityX;
                    velocityY += 0.1;
                    rotation += rotationSpeed;
                    
                    confetti.style.top = posY + 'px';
                    confetti.style.left = posX + 'px';
                    confetti.style.transform = `rotate(${rotation}deg)`;
                    
                    if (posY > window.innerHeight) {
                        clearInterval(fall);
                        confetti.remove();
                    }
                }, 20);
            }, i * 50);
        }
    }
    
    function createFloatingHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.fontSize = Math.random() * 20 + 20 + 'px';
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.bottom = '-50px';
                heart.style.zIndex = '9999';
                heart.style.pointerEvents = 'none';
                heart.style.animation = `float-up ${Math.random() * 3 + 4}s ease-out forwards`;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 7000);
            }, i * 200);
        }
    }
    
    // Personnalisation du nom
    nameBtn.addEventListener('click', function() {
        const name = nameInput.value.trim();
        if (name) {
            customName.textContent = name;
            nameInput.value = '';
            
            // Animation de confirmation
            customName.style.animation = 'none';
            setTimeout(() => {
                customName.style.animation = 'glow 2s ease-in-out infinite alternate';
            }, 10);
        }
    });
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            nameBtn.click();
        }
    });
    
    // Partage sur réseaux sociaux
    shareBtn.addEventListener('click', function() {
        const name = customName.textContent;
        const time = finalTime.textContent;
        const attempts = finalAttempts.textContent;
        const message = `🎉 ${name} a dit OUI à ma proposition de Saint-Valentine ! ⏱️ ${time} de réflexion, ${attempts} tentatives de refus... mais l'amour a gagné ! 💕❤️`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Elle a dit OUI ! 🎉',
                text: message,
                url: window.location.href
            });
        } else {
            // Fallback: copier dans le presse-papiers
            navigator.clipboard.writeText(message).then(() => {
                shareBtn.textContent = '✅ Copié !';
                setTimeout(() => {
                    shareBtn.textContent = '📱 Partager la bonne nouvelle';
                }, 2000);
            });
        }
    });
    
    // Accès aux citations spéciales
    quotesBtn.addEventListener('click', function() {
        window.location.href = 'quotes.html';
    });
    
    function showRandomQuote() {
        let availableQuotes = funnyQuotes.filter((quote, index) => !usedQuotes.includes(index));
        
        // Si toutes les citations ont été utilisées, réinitialiser
        if (availableQuotes.length === 0) {
            usedQuotes = [];
            availableQuotes = [...funnyQuotes];
        }
        
        const randomIndex = Math.floor(Math.random() * availableQuotes.length);
        const selectedQuoteIndex = funnyQuotes.indexOf(availableQuotes[randomIndex]);
        const selectedQuote = funnyQuotes[selectedQuoteIndex];
        
        usedQuotes.push(selectedQuoteIndex);
        currentQuoteIndex = selectedQuoteIndex;
        
        quoteElement.style.animation = 'none';
        quoteElement.style.opacity = '0';
        
        setTimeout(() => {
            quoteElement.textContent = `"${selectedQuote}"`;
            quoteElement.style.animation = 'fadeIn 1s ease forwards';
        }, 300);
    }
    
    // Écouteur pour le bouton de citation
    quoteBtn.addEventListener('click', showRandomQuote);
    
    function createCustomParticles() {
        const particles = ['❤️', '🌹', '💕', '✨', '🌟', '💖', '🎀', '🦋'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
                particle.style.position = 'fixed';
                particle.style.fontSize = Math.random() * 20 + 15 + 'px';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = Math.random() * window.innerHeight + 'px';
                particle.style.zIndex = '9999';
                particle.style.pointerEvents = 'none';
                particle.style.animation = `custom-float ${Math.random() * 3 + 4}s ease-out forwards`;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 7000);
            }, i * 100);
        }
    }
    
    // Ajouter l'animation personnalisée
    const style = document.createElement('style');
    style.textContent = `
        @keyframes custom-float {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            50% {
                transform: translateY(-50vh) rotate(180deg) scale(1.5);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.5);
                opacity: 0;
            }
        }
        
        .stat-value {
            transition: transform 0.2s ease;
        }
    `;
    document.head.appendChild(style);
});
