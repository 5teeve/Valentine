document.addEventListener('DOMContentLoaded', function() {
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
    const quoteContainer = document.getElementById('quote-container');
    const quoteElement = quoteContainer.querySelector('.quote');
    const quoteBtn = document.getElementById('quote-btn');
    
    let noClickCount = 0;
    let isMoving = false;
    let startTime = Date.now();
    let timerInterval;
    let usedQuotes = [];
    let currentQuoteIndex = -1;
    
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
        "If kisses were snowflakes, I'd send you a blizzard",
        "Are you a parking ticket? Because you've got 'fine' written all over you"
    ];
    
    // Démarrer le chronomètre
    function startTimer() {
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            timer.textContent = elapsed + 's';
        }, 1000);
    }
    
    startTimer();
    
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
