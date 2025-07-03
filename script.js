// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all interactive elements
    initializeCard();
    initializePhotoUpload();
    initializeConfettiPopper();
    createFloatingParticles();
    addClickEffects();
    
    // Start initial effects
    setTimeout(startGentleConfetti, 3000);
    setTimeout(playVisualNotes, 8000);
});

// Initialize the interactive card
function initializeCard() {
    const card = document.querySelector('.message-card');
    const cardFront = document.querySelector('.card-front');
    
    cardFront.addEventListener('click', function() {
        card.classList.add('opened');
        
        // Add celebration effects when card opens
        setTimeout(() => {
            createCelebrationBurst();
            playCardOpenSound();
        }, 400);
    });
    
    // Add hover effect for card
    cardFront.addEventListener('mouseenter', function() {
        const flap = document.querySelector('.envelope-flap');
        flap.style.clipPath = 'polygon(0 0, 100% 0, 50% 70%)';
    });
    
    cardFront.addEventListener('mouseleave', function() {
        const flap = document.querySelector('.envelope-flap');
        flap.style.clipPath = 'polygon(0 0, 100% 0, 50% 80%)';
    });
}

// Initialize photo upload functionality
function initializePhotoUpload() {
    const photoFrame = document.querySelector('.photo-frame');
    const photoInput = document.getElementById('photoInput');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const uploadedPhoto = document.getElementById('uploadedPhoto');
    
    photoFrame.addEventListener('click', function() {
        photoInput.click();
    });
    
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedPhoto.src = e.target.result;
                uploadedPhoto.style.display = 'block';
                photoPlaceholder.style.display = 'none';
                
                // Add photo upload celebration
                createPhotoUploadEffect();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Initialize confetti popper
function initializeConfettiPopper() {
    const confettiPopper = document.getElementById('confettiPopper');
    let hasPopped = false;
    
    confettiPopper.addEventListener('click', function() {
        if (!hasPopped) {
            hasPopped = true;
            this.classList.add('popped');
            
            // Create massive confetti explosion
            createConfettiExplosion();
            
            // Change text after popping
            setTimeout(() => {
                this.querySelector('.pull-text').textContent = 'Woohoo! 🎉';
            }, 500);
            
            // Reset after 3 seconds
            setTimeout(() => {
                hasPopped = false;
                this.classList.remove('popped');
                this.querySelector('.pull-text').textContent = 'Pull me!';
            }, 3000);
        }
    });
}

// Create celebration burst when card opens
function createCelebrationBurst() {
    const burstContainer = document.createElement('div');
    burstContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(burstContainer);
    
    const celebrationEmojis = ['🎉', '🎊', '✨', '🌟', '💫', '🎈', '🎂', '💙'];
    
    for (let i = 0; i < 16; i++) {
        const emoji = document.createElement('div');
        const randomEmoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
        emoji.innerHTML = randomEmoji;
        emoji.style.cssText = `
            position: absolute;
            font-size: 2rem;
            left: 50%;
            top: 50%;
            animation: burstOut 1.5s ease-out forwards;
            animation-delay: ${i * 0.05}s;
        `;
        burstContainer.appendChild(emoji);
    }
    
    setTimeout(() => {
        document.body.removeChild(burstContainer);
    }, 2000);
}

// Create massive confetti explosion that fills the entire screen
function createConfettiExplosion() {
    const explosionContainer = document.createElement('div');
    explosionContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 10000;
        overflow: hidden;
    `;
    document.body.appendChild(explosionContainer);
    
    // Create 500 confetti pieces for massive effect
    for (let i = 0; i < 500; i++) {
        setTimeout(() => {
            createMassiveConfettiPiece(explosionContainer);
        }, i * 15);
    }
    
    // Create additional bursts from different positions
    setTimeout(() => createConfettiBurst(explosionContainer, '10%', '20%'), 1000);
    setTimeout(() => createConfettiBurst(explosionContainer, '90%', '30%'), 1500);
    setTimeout(() => createConfettiBurst(explosionContainer, '30%', '80%'), 2000);
    setTimeout(() => createConfettiBurst(explosionContainer, '70%', '70%'), 2500);
    
    setTimeout(() => {
        if (document.body.contains(explosionContainer)) {
            document.body.removeChild(explosionContainer);
        }
    }, 15000);
}

function createMassiveConfettiPiece(container) {
    const confetti = document.createElement('div');
    const colors = [
        '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
        '#FFEAA7', '#DDA0DD', '#98FB98', '#F0E68C', '#87CEEB',
        '#FFB6C1', '#20B2AA', '#9370DB', '#32CD32', '#FF7F50'
    ];
    const shapes = ['●', '■', '▲', '♦', '★', '♥', '◆', '▼', '♠', '♣'];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 25 + 15; // Much larger pieces
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    confetti.innerHTML = shape;
    confetti.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        color: ${color};
        left: ${startX}vw;
        top: ${startY}vh;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        animation: massiveConfettiExplode ${Math.random() * 4 + 4}s ease-out forwards;
        z-index: ${Math.floor(Math.random() * 100) + 9900};
    `;
    
    container.appendChild(confetti);
    
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 8000);
}

function createConfettiBurst(container, leftPos, topPos) {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        const shapes = ['●', '■', '▲', '♦', '★', '♥'];
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        confetti.innerHTML = shape;
        confetti.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 20}px;
            color: ${color};
            left: ${leftPos};
            top: ${topPos};
            animation: burstConfetti ${Math.random() * 3 + 3}s ease-out forwards;
            animation-delay: ${i * 0.05}s;
        `;
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 6000);
    }
}

// Photo upload celebration effect
function createPhotoUploadEffect() {
    const photoFrame = document.querySelector('.photo-frame');
    const rect = photoFrame.getBoundingClientRect();
    
    // Create sparkle effect around photo
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            pointer-events: none;
            z-index: 9999;
            animation: sparkleEffect 2s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2500);
    }
}

// Add new CSS animations for massive confetti
const massiveConfettiStyle = document.createElement('style');
massiveConfettiStyle.textContent = `
    @keyframes massiveConfettiExplode {
        0% {
            transform: translate(0, 0) rotate(0deg) scale(0);
            opacity: 1;
        }
        10% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 180}deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 2000 - 1000}px, ${Math.random() * 1500 + 300}px) rotate(${Math.random() * 1800}deg) scale(0.3);
            opacity: 0;
        }
    }
    
    @keyframes burstConfetti {
        0% {
            transform: translate(0, 0) rotate(0deg) scale(0);
            opacity: 1;
        }
        20% {
            transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) rotate(${Math.random() * 360}deg) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 1000 - 500}px, ${Math.random() * 800 + 200}px) rotate(${Math.random() * 1440}deg) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(massiveConfettiStyle);

// Create floating particles for extra magic
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    document.body.appendChild(particleContainer);
    
    // Create 20 particles
    for(let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const symbols = ['✨', '💙', '🌟', '💫', '⭐'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    particle.innerHTML = symbol;
    particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 15 + 10}px;
        color: rgba(255, 255, 255, 0.8);
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-100px) rotateZ(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add click effects
function addClickEffects() {
    const title = document.querySelector('.animated-title');
    const ageBadge = document.querySelector('.age-badge');
    const cake = document.querySelector('.elegant-cake');
    
    // Title click effect
    if (title) {
        title.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounce 1s ease-in-out';
            }, 10);
        });
    }
    
    // Age badge click effect
    if (ageBadge) {
        ageBadge.addEventListener('click', function() {
            this.style.transform = 'scale(1.3)';
            this.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    // Elegant cake click effect
    if (cake) {
        cake.addEventListener('click', function() {
            createCakeClickEffect(this);
        });
    }
}

// Create elegant hearts when cake is clicked
function createCakeClickEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create elegant heart burst
    for(let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💙';
        heart.style.cssText = `
            position: fixed;
            font-size: 24px;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9999;
            animation: elegantHeartFloat 3s ease-out forwards;
            animation-delay: ${i * 0.1}s;
            filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.3));
        `;
        
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if(heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 3500);
    }
    
    // Make cake candles flicker more intensely
    const flames = element.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.animation = 'flicker 0.5s ease-in-out infinite alternate';
        setTimeout(() => {
            flame.style.animation = 'flicker 2s ease-in-out infinite alternate';
        }, 2000);
    });
}

// Add elegant heart float animation and other new animations
const elegantAnimationStyle = document.createElement('style');
elegantAnimationStyle.textContent = `
    @keyframes elegantHeartFloat {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        20% {
            transform: translate(${Math.random() * 100 - 50}px, -30px) scale(1.2) rotate(${Math.random() * 60 - 30}deg);
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, -80px) scale(1) rotate(${Math.random() * 180 - 90}deg);
            opacity: 0.8;
        }
        100% {
            transform: translate(${Math.random() * 300 - 150}px, -150px) scale(0.3) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
    
    @keyframes burstOut {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(1) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(elegantAnimationStyle);

// Confetti effect (gentler version for background)
function startGentleConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 3;
    `;
    document.body.appendChild(confettiContainer);
    
    // Create gentle confetti pieces
    for(let i = 0; i < 30; i++) {
        setTimeout(() => {
            createGentleConfetti(confettiContainer);
        }, i * 200);
    }
    
    // Remove container after 15 seconds
    setTimeout(() => {
        if(confettiContainer.parentNode) {
            confettiContainer.parentNode.removeChild(confettiContainer);
        }
    }, 15000);
}

function createGentleConfetti(container) {
    const confetti = document.createElement('div');
    const colors = ['#FFD700', '#87CEEB', '#DDA0DD', '#F0E68C', '#FFA07A'];
    const shapes = ['●', '★', '♥', '♦'];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    confetti.innerHTML = shape;
    confetti.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 15 + 8}px;
        color: ${color};
        left: ${Math.random() * 100}vw;
        top: -20px;
        opacity: 0.7;
        animation: gentleConfettiFall ${Math.random() * 4 + 4}s linear forwards;
    `;
    
    container.appendChild(confetti);
    
    // Remove confetti piece after animation
    setTimeout(() => {
        if(confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 8000);
}

// Add gentle confetti animation
const gentleConfettiStyle = document.createElement('style');
gentleConfettiStyle.textContent = `
    @keyframes gentleConfettiFall {
        0% {
            transform: translateY(-20px) rotateZ(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(gentleConfettiStyle);

// Play card open sound effect (visual feedback)
function playCardOpenSound() {
    // Create visual sound waves
    const soundWaves = document.createElement('div');
    soundWaves.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 8888;
    `;
    document.body.appendChild(soundWaves);
    
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: soundWave 1.5s ease-out infinite;
            animation-delay: ${i * 0.3}s;
        `;
        soundWaves.appendChild(wave);
    }
    
    setTimeout(() => {
        document.body.removeChild(soundWaves);
    }, 3000);
}

// Add sound wave animation
const soundWaveStyle = document.createElement('style');
soundWaveStyle.textContent = `
    @keyframes soundWave {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(soundWaveStyle);

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    const balloons = document.querySelectorAll('.balloon');
    
    balloons.forEach(balloon => {
        balloon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        balloon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Make flowers interactive
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach(flower => {
        flower.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                this.style.animation = 'float 6s ease-in-out infinite';
                this.style.transform = '';
                this.style.transition = '';
            }, 500);
        });
    });
});

// Add a special birthday song note effect (visual only)
function playVisualNotes() {
    const notes = ['🎵', '🎶', '🎼'];
    const noteContainer = document.createElement('div');
    noteContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999;
    `;
    document.body.appendChild(noteContainer);
    
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            const note = document.createElement('div');
            const noteSymbol = notes[Math.floor(Math.random() * notes.length)];
            note.innerHTML = noteSymbol;
            note.style.cssText = `
                position: absolute;
                font-size: 24px;
                color: #FFD700;
                left: ${Math.random() * 90 + 5}%;
                top: ${Math.random() * 90 + 5}%;
                animation: noteFloat 3s ease-out forwards;
            `;
            noteContainer.appendChild(note);
            
            setTimeout(() => {
                if(note.parentNode) {
                    note.parentNode.removeChild(note);
                }
            }, 3000);
        }, i * 500);
    }
    
    setTimeout(() => {
        if(noteContainer.parentNode) {
            noteContainer.parentNode.removeChild(noteContainer);
        }
    }, 8000);
}

// Add note float animation
const noteStyle = document.createElement('style');
noteStyle.textContent = `
    @keyframes noteFloat {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(noteStyle);

// Trigger musical notes after 5 seconds
setTimeout(playVisualNotes, 5000);
