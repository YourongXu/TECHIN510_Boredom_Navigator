// Sample activities data with enhanced content
const activities = [
    {
        title: "Hiking Adventure",
        description: "Explore scenic trails and enjoy nature's beauty with a guided hiking tour.",
        icon: "fa-mountain",
        color: "#1DB954"
    },
    {
        title: "Cooking Class",
        description: "Learn to cook delicious meals from professional chefs in an interactive workshop.",
        icon: "fa-utensils",
        color: "#E91429"
    },
    {
        title: "Yoga Session",
        description: "Join a relaxing yoga session to improve flexibility and mental well-being.",
        icon: "fa-spa",
        color: "#7D4698"
    },
    {
        title: "Art Workshop",
        description: "Express your creativity through various art mediums in a guided workshop.",
        icon: "fa-palette",
        color: "#FF6437"
    },
    {
        title: "Music Concert",
        description: "Experience live music performances from talented local artists.",
        icon: "fa-music",
        color: "#1E3264"
    },
    {
        title: "Wine Tasting",
        description: "Sample and learn about different wines from around the world.",
        icon: "fa-wine-glass-alt",
        color: "#8C67AC"
    }
];

// Function to get random activities
function getRandomActivities(count) {
    const shuffled = [...activities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to create activity cards
function createActivityCards() {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    
    const randomActivities = getRandomActivities(3);
    
    randomActivities.forEach(activity => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.borderLeft = `4px solid ${activity.color}`;
        
        card.innerHTML = `
            <div class="card-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <h2>${activity.title}</h2>
            <p>${activity.description}</p>
        `;
        
        card.addEventListener('click', () => showFullscreen(activity));
        container.appendChild(card);
    });
}

// Function to show fullscreen card
function showFullscreen(activity) {
    const fullscreenCard = document.getElementById('fullscreenCard');
    const fullscreenTitle = document.getElementById('fullscreenTitle');
    const fullscreenDescription = document.getElementById('fullscreenDescription');
    
    fullscreenTitle.innerHTML = `
        <i class="fas ${activity.icon}" style="color: ${activity.color}"></i>
        ${activity.title}
    `;
    fullscreenDescription.textContent = activity.description;
    fullscreenCard.classList.remove('hidden');
    
    // Add animation class
    fullscreenCard.classList.add('fade-in');
}

// Function to hide fullscreen card
function hideFullscreen() {
    const fullscreenCard = document.getElementById('fullscreenCard');
    fullscreenCard.classList.add('hidden');
    fullscreenCard.classList.remove('fade-in');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    createActivityCards();
    
    // Regenerate button click handler
    document.getElementById('regenerateBtn').addEventListener('click', () => {
        const button = document.getElementById('regenerateBtn');
        button.classList.add('rotating');
        createActivityCards();
        setTimeout(() => button.classList.remove('rotating'), 1000);
    });
    
    // Close button click handler
    document.querySelector('.close-btn').addEventListener('click', hideFullscreen);
    
    // Close fullscreen when clicking outside the content
    document.getElementById('fullscreenCard').addEventListener('click', (e) => {
        if (e.target.id === 'fullscreenCard') {
            hideFullscreen();
        }
    });
}); 