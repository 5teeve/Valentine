document.addEventListener('DOMContentLoaded', function() {
    const quoteText = document.getElementById('quote-text');
    const quoteNumber = document.getElementById('quote-number');
    const quoteCategory = document.getElementById('quote-category');
    const nextQuoteBtn = document.getElementById('next-quote');
    const randomCategoryBtn = document.getElementById('random-category');
    const backBtn = document.getElementById('back-main');
    const quotesViewed = document.getElementById('quotes-viewed');
    const favCategory = document.getElementById('fav-category');
    const categoryBtns = document.querySelectorAll('.cat-btn');
    
    let currentQuoteIndex = 0;
    let quotesSeen = 0;
    let currentCategory = 'romantic';
    let categoryCount = {};
    
    // Citations extrêmes par catégorie
    const quotes = {
        romantic: [
            "I want to be the reason you smile every morning and the reason you can't sleep at night",
            "Your body is a wonderland and I want to be the explorer",
            "I'd climb a thousand mountains just to taste your lips",
            "You're the only drug I want to be addicted to",
            "I want to write my name on every inch of your body",
            "Your curves are driving me crazy and I want to lose control",
            "I dream about the day I can wake up next to your naked body",
            "You're my favorite kind of trouble",
            "I want to memorize every freckle on your body",
            "Your scent is intoxicating and I want to breathe you in all night"
        ],
        dirty: [
            "I want to taste every inch of your body until you forget your own name",
            "Let's play doctor - I'll examine your body with my tongue",
            "I want to make you scream so loud the neighbors complain",
            "Your ass looks so good I want to bite it",
            "I want to tie you up and do things that would make the devil blush",
            "Let's skip dinner and go straight to dessert - you",
            "I want to feel your nails digging into my back while you ride me",
            "Your moans are the most beautiful music I've ever heard",
            "I want to mark you as mine in every way possible",
            "Let's make a mess and then lick it clean together"
        ],
        crazy: [
            "I want to have sex with you in every room of this house while our parents are home",
            "Let's join the mile high club on our next flight",
            "I want to fuck you in a church and ask for forgiveness after",
            "Let's make a sex tape and accidentally 'leak' it",
            "I want to roleplay as strangers who meet in a bar and take it too far",
            "Let's have sex in public where we might get caught",
            "I want to be your sugar daddy/baby and spoil you rotten",
            "Let's try every position in the Kama Sutra tonight",
            "I want to have a threesome with your best friend",
            "Let's go to a swingers club and see what happens"
        ],
        extreme: [
            "I want to breed you until you can't walk straight",
            "Let's do cocaine off your naked body",
            "I want to choke you until you pass out while I'm inside you",
            "Let's make a baby tonight and start our own cult",
            "I want to share you with my friends and watch them enjoy you",
            "Let's do it raw and risk everything",
            "I want to tie you up for days and use you as my personal toy",
            "Let's make porn together and become famous",
            "I want to ruin you for anyone else",
            "Let's push every boundary until there's nothing left to break"
        ]
    };
    
    // Initialiser les compteurs de catégories
    Object.keys(quotes).forEach(cat => {
        categoryCount[cat] = 0;
    });
    
    function getRandomQuote(category = null) {
        const targetCategory = category || currentCategory;
        const categoryQuotes = quotes[targetCategory];
        const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
        return {
            text: categoryQuotes[randomIndex],
            category: targetCategory,
            index: randomIndex
        };
    }
    
    function displayQuote(quote) {
        quoteText.style.animation = 'none';
        quoteText.style.opacity = '0';
        
        setTimeout(() => {
            quoteText.textContent = `"${quote.text}"`;
            quoteNumber.textContent = currentQuoteIndex + 1;
            
            // Mettre à jour la catégorie
            const categoryNames = {
                romantic: '💋 Romantic',
                dirty: '🌶️ Dirty',
                crazy: '🔮 Crazy',
                extreme: '⚡ Extreme'
            };
            quoteCategory.textContent = categoryNames[quote.category];
            
            // Animation d'entrée
            quoteText.style.animation = 'fade-in 1s ease forwards';
        }, 300);
        
        // Mettre à jour les stats
        quotesSeen++;
        quotesViewed.textContent = quotesSeen;
        categoryCount[quote.category]++;
        
        // Mettre à jour la catégorie préférée
        const maxCategory = Object.keys(categoryCount).reduce((a, b) => 
            categoryCount[a] > categoryCount[b] ? a : b
        );
        favCategory.textContent = maxCategory.charAt(0).toUpperCase() + maxCategory.slice(1);
    }
    
    function showNextQuote() {
        currentQuoteIndex++;
        const quote = getRandomQuote();
        displayQuote(quote);
        
        // Effet spécial pour citations extrêmes
        if (quote.category === 'extreme') {
            document.body.style.animation = 'shake 0.5s';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
        }
    }
    
    function showRandomCategoryQuote() {
        const categories = Object.keys(quotes);
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        currentCategory = randomCat;
        
        // Mettre à jour les boutons de catégorie
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === randomCat) {
                btn.classList.add('active');
            }
        });
        
        showNextQuote();
    }
    
    // Écouteurs d'événements
    nextQuoteBtn.addEventListener('click', showNextQuote);
    randomCategoryBtn.addEventListener('click', showRandomCategoryQuote);
    
    backBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Gestion des catégories
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            showNextQuote();
        });
    });
    
    // Support clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ') {
            e.preventDefault();
            showNextQuote();
        } else if (e.key === 'r' || e.key === 'R') {
            showRandomCategoryQuote();
        } else if (e.key === 'Escape') {
            window.location.href = 'index.html';
        }
    });
    
    // Ajouter l'animation shake
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
    
    // Afficher la première citation
    showNextQuote();
    
    // Effet de particules en arrière-plan
    function createFloatingParticle() {
        const particle = document.createElement('div');
        const emojis = ['💦', '💕', '🍆', '🍑', '🌮', '🍌', '🍯', '🍒'];
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.position = 'fixed';
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.zIndex = '1';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        document.body.appendChild(particle);
        
        let posY = window.innerHeight;
        let posX = parseFloat(particle.style.left);
        let velocityY = -(Math.random() * 2 + 1);
        let velocityX = (Math.random() - 0.5) * 2;
        let rotation = 0;
        let rotationSpeed = (Math.random() - 0.5) * 5;
        
        const float = setInterval(() => {
            posY += velocityY;
            posX += velocityX;
            rotation += rotationSpeed;
            
            particle.style.top = posY + 'px';
            particle.style.left = posX + 'px';
            particle.style.transform = `rotate(${rotation}deg)`;
            
            if (posY < -50) {
                clearInterval(float);
                particle.remove();
            }
        }, 20);
    }
    
    // Créer des particules régulièrement
    setInterval(createFloatingParticle, 2000);
});
