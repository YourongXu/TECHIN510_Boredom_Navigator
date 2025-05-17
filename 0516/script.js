// Registration and Weather Selection
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registrationForm = document.getElementById('registrationForm');
    const weatherSelection = document.getElementById('weatherSelection');
    const profileSection = document.getElementById('profileSection');
    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    const viewHistoryBtn = document.getElementById('viewHistory');
    const logoutBtn = document.getElementById('logout');
    const backButton = document.getElementById('backButton');

    // Back Button Handler
    if (backButton) {
        backButton.addEventListener('click', () => {
            const previousPage = localStorage.getItem('previousPage') || 'index.html';
            window.location.href = previousPage;
        });
    }

    // Store previous page when navigating to history
    if (window.location.pathname.includes('history.html')) {
        const referrer = document.referrer;
        if (referrer) {
            const previousPage = referrer.split('/').pop() || 'index.html';
            localStorage.setItem('previousPage', previousPage);
        }
    }

    // Check if user is already registered
    if (registrationForm && weatherSelection) {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            registrationForm.style.display = 'none';
            weatherSelection.style.display = 'block';
            profileSection.style.display = 'block';
        }
    }

    // Profile Icon Click Handler
    if (profileIcon) {
        profileIcon.addEventListener('click', () => {
            profileDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileSection.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }

    // View History Button Handler
    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', () => {
            window.location.href = 'history.html';
        });
    }

    // Logout Button Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('selectedWeather');
            localStorage.removeItem('selectedActivity');
            window.location.href = 'index.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            localStorage.setItem('userEmail', email);
            registrationForm.style.display = 'none';
            weatherSelection.style.display = 'block';
            profileSection.style.display = 'block';
        });
    }

    // Weather Card Selection
    const weatherCards = document.querySelectorAll('.weather-card');
    weatherCards.forEach(card => {
        card.addEventListener('click', () => {
            const weather = card.getAttribute('data-weather');
            localStorage.setItem('selectedWeather', weather);
            window.location.href = 'activities.html';
        });
    });

    // Activity Card Selection
    const activityCards = document.querySelectorAll('.activity-card');
    activityCards.forEach(card => {
        card.addEventListener('click', () => {
            const activity = card.getAttribute('data-activity');
            const activityName = card.querySelector('h3').textContent;
            const activityDescription = card.querySelector('p').textContent;
            const activityImage = card.querySelector('img').src;
            
            localStorage.setItem('selectedActivity', activity);
            localStorage.setItem('selectedActivityName', activityName);
            localStorage.setItem('selectedActivityDescription', activityDescription);
            localStorage.setItem('selectedActivityImage', activityImage);
            
            window.location.href = 'activity-detail.html';
        });
    });

    // Activity Detail Page
    if (window.location.pathname.includes('activity-detail.html')) {
        const activityImage = document.getElementById('activityImage');
        const activityName = document.getElementById('activityName');
        const activityDescription = document.getElementById('activityDescription');
        const weatherIcon = document.getElementById('weatherIcon');
        const weatherCondition = document.getElementById('weatherCondition');
        const backButton = document.getElementById('backButton');

        // Get stored activity details
        const selectedActivity = localStorage.getItem('selectedActivity');
        const selectedActivityName = localStorage.getItem('selectedActivityName');
        const selectedActivityDescription = localStorage.getItem('selectedActivityDescription');
        const selectedActivityImage = localStorage.getItem('selectedActivityImage');
        const selectedWeather = localStorage.getItem('selectedWeather');

        // Update activity details
        if (activityImage && selectedActivityImage) {
            activityImage.src = selectedActivityImage;
        }
        if (activityName && selectedActivityName) {
            activityName.textContent = selectedActivityName;
        }
        if (activityDescription && selectedActivityDescription) {
            activityDescription.textContent = selectedActivityDescription;
        }

        // Update weather information
        if (weatherIcon && weatherCondition && selectedWeather) {
            const weatherIcons = {
                'sunny': 'https://cdn-icons-png.flaticon.com/512/2698/2698194.png',
                'rainy': 'https://cdn-icons-png.flaticon.com/512/1146/1146858.png',
                'cloudy': 'https://cdn-icons-png.flaticon.com/512/3222/3222801.png',
                'snowy': 'https://cdn-icons-png.flaticon.com/512/6363/6363108.png'
            };
            weatherIcon.src = weatherIcons[selectedWeather.toLowerCase()] || weatherIcons['sunny'];
            weatherCondition.textContent = selectedWeather;
        }

        // Back button functionality
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.href = 'activities.html';
            });
        }

        // Regenerate button functionality
        const regenerateBtn = document.querySelector('.regenerate-btn');
        if (regenerateBtn) {
            regenerateBtn.addEventListener('click', () => {
                window.location.href = 'activities.html';
            });
        }
    }

    // Activity database organized by weather type
    const activityDatabase = {
        'sunny': [
            { name: 'Hiking', description: 'Explore nature trails and enjoy the beautiful weather', image: 'https://cdn-icons-png.flaticon.com/512/1142/1142682.png' },
            { name: 'Beach Day', description: 'Relax at the beach and enjoy water activities', image: 'https://cdn-icons-png.flaticon.com/512/2664/2664593.png' },
            { name: 'Picnic', description: 'Enjoy a lovely outdoor meal with friends', image: 'https://cdn-icons-png.flaticon.com/512/1965/1965140.png' },
            { name: 'Outdoor Sports', description: 'Play basketball, tennis, or other outdoor sports', image: 'https://cdn-icons-png.flaticon.com/512/6266/6266049.png' },
            { name: 'Gardening', description: 'Tend to your plants and enjoy the sunshine', image: 'https://cdn-icons-png.flaticon.com/512/1518/1518965.png' }
        ],
        'rainy': [
            { name: 'Reading', description: 'Cozy up with a good book', image: 'https://cdn-icons-png.flaticon.com/512/4072/4072217.png' },
            { name: 'Movie Marathon', description: 'Watch your favorite films', image: 'https://cdn-icons-png.flaticon.com/512/4221/4221484.png' },
            { name: 'Indoor Board Games', description: 'Play classic board games with friends', image: 'https://cdn-icons-png.flaticon.com/512/5190/5190878.png' },
            { name: 'Baking', description: 'Try new recipes and bake delicious treats', image: 'https://cdn-icons-png.flaticon.com/512/2917/2917633.png' },
            { name: 'Indoor Exercise', description: 'Stay active with indoor workouts', image: 'https://cdn-icons-png.flaticon.com/512/6381/6381912.png' }
        ],
        'cloudy': [
            { name: 'Museum Visit', description: 'Explore art and history in a local museum', image: 'https://cdn-icons-png.flaticon.com/512/2667/2667200.png' },
            { name: 'Cafe Hopping', description: 'Visit different cafes and try new drinks', image: 'https://cdn-icons-png.flaticon.com/512/10784/10784329.png' },
            { name: 'Photography Walk', description: 'Take photos of urban landscapes and architecture', image: 'https://cdn-icons-png.flaticon.com/512/461/461823.png' },
            { name: 'Shopping', description: 'Browse local shops and boutiques', image: 'https://cdn-icons-png.flaticon.com/512/4578/4578246.png' },
            { name: 'Art Gallery Tour', description: 'Discover local artists and exhibitions', image: 'https://cdn-icons-png.flaticon.com/512/4201/4201213.png' }
        ],
        'snowy': [
            { name: 'Skiing', description: 'Hit the slopes for some winter fun', image: 'https://cdn-icons-png.flaticon.com/512/3163/3163769.png' },
            { name: 'Snowball Fight', description: 'Have fun with friends in the snow', image: 'https://cdn-icons-png.flaticon.com/512/9180/9180322.png' },
            { name: 'Hot Chocolate Party', description: 'Make different flavors of hot chocolate', image: 'https://cdn-icons-png.flaticon.com/512/864/864800.png' },
            { name: 'Ice Skating', description: 'Glide across the ice at a local rink', image: 'https://cdn-icons-png.flaticon.com/512/9043/9043641.png' },
            { name: 'Winter Photography', description: 'Capture beautiful winter landscapes', image: 'https://cdn-icons-png.flaticon.com/512/3701/3701278.png' }
        ]
    };

    // Regenerate Activities Button
    const regenerateBtn = document.querySelector('.regenerate-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            const weather = localStorage.getItem('selectedWeather') || 'sunny';
            const activities = activityDatabase[weather] || [];
            
            // Add loading animation
            regenerateBtn.classList.add('loading');
            regenerateBtn.disabled = true;
            
            // Shuffle activities
            const shuffledActivities = [...activities].sort(() => Math.random() - 0.5);
            
            // Get activity cards container
            const activityCards = document.querySelectorAll('.activity-card');
            
            // Animate out current cards
            activityCards.forEach((card, index) => {
                card.classList.add('loading');
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                }, index * 100);
            });
            
            // After animation, update cards with new activities
            setTimeout(() => {
                activityCards.forEach((card, index) => {
                    const activity = shuffledActivities[index];
                    if (activity) {
                        // Update card content
                        const img = card.querySelector('img');
                        const title = card.querySelector('h3');
                        const description = card.querySelector('p');
                        
                        img.src = activity.image;
                        title.textContent = activity.name;
                        description.textContent = activity.description;
                        card.setAttribute('data-activity', activity.name.toLowerCase());
                        
                        // Animate in new card
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.classList.remove('loading');
                        }, index * 100);
                    }
                });
                
                // Remove loading state
                regenerateBtn.classList.remove('loading');
                regenerateBtn.disabled = false;
            }, 300);
        });
    }

    // Choose Activity Button
    const chooseBtn = document.querySelector('.choose-btn');
    if (chooseBtn) {
        chooseBtn.addEventListener('click', () => {
            const activity = localStorage.getItem('selectedActivity');
            const weather = localStorage.getItem('selectedWeather');
            const date = new Date().toLocaleDateString();
            
            // Save to history
            const history = JSON.parse(localStorage.getItem('activityHistory') || '[]');
            history.push({
                date,
                weather,
                activity
            });
            localStorage.setItem('activityHistory', JSON.stringify(history));
            
            window.location.href = 'success.html';
        });
    }

    // Success Page
    if (window.location.pathname.includes('success.html')) {
        const activityImage = document.getElementById('activityImage');
        const activityName = document.getElementById('activityName');
        const activityDate = document.getElementById('activityDate');
        const weatherIcon = document.getElementById('weatherIcon');
        const weatherCondition = document.getElementById('weatherCondition');

        // Get stored activity details
        const selectedActivity = localStorage.getItem('selectedActivity');
        const selectedActivityName = localStorage.getItem('selectedActivityName');
        const selectedActivityImage = localStorage.getItem('selectedActivityImage');
        const selectedWeather = localStorage.getItem('selectedWeather');

        // Update activity details
        if (activityImage && selectedActivityImage) {
            activityImage.src = selectedActivityImage;
        }
        if (activityName && selectedActivityName) {
            activityName.textContent = selectedActivityName;
        }
        if (activityDate) {
            activityDate.textContent = new Date().toLocaleDateString();
        }

        // Update weather information
        if (weatherIcon && weatherCondition && selectedWeather) {
            const weatherIcons = {
                'sunny': 'https://cdn-icons-png.flaticon.com/512/2698/2698194.png',
                'rainy': 'https://cdn-icons-png.flaticon.com/512/1146/1146858.png',
                'cloudy': 'https://cdn-icons-png.flaticon.com/512/3222/3222801.png',
                'snowy': 'https://cdn-icons-png.flaticon.com/512/6363/6363108.png'
            };
            weatherIcon.src = weatherIcons[selectedWeather.toLowerCase()] || weatherIcons['sunny'];
            weatherCondition.textContent = selectedWeather;
        }
    }

    // History Page
    if (window.location.pathname.includes('history.html')) {
        const historyContainer = document.getElementById('historyContainer');
        const history = JSON.parse(localStorage.getItem('activityHistory') || '[]');
        
        // Activity illustrations mapping
        const activityIllustrations = {
            'hiking': 'https://cdn-icons-png.flaticon.com/512/1142/1142682.png',
            'beach day': 'https://cdn-icons-png.flaticon.com/512/2664/2664593.png',
            'picnic': 'https://cdn-icons-png.flaticon.com/512/1965/1965140.png',
            'outdoor sports': 'https://cdn-icons-png.flaticon.com/512/6266/6266049.png',
            'gardening': 'https://cdn-icons-png.flaticon.com/512/1518/1518965.png',
            'reading': 'https://cdn-icons-png.flaticon.com/512/4072/4072217.png',
            'movie marathon': 'https://cdn-icons-png.flaticon.com/512/4221/4221484.png',
            'indoor board games': 'https://cdn-icons-png.flaticon.com/512/5190/5190878.png',
            'baking': 'https://cdn-icons-png.flaticon.com/512/2917/2917633.png',
            'indoor exercise': 'https://cdn-icons-png.flaticon.com/512/6381/6381912.png',
            'museum visit': 'https://cdn-icons-png.flaticon.com/512/2667/2667200.png',
            'cafe hopping': 'https://cdn-icons-png.flaticon.com/512/10784/10784329.png',
            'photography walk': 'https://cdn-icons-png.flaticon.com/512/461/461823.png',
            'shopping': 'https://cdn-icons-png.flaticon.com/512/4578/4578246.png',
            'art gallery tour': 'https://cdn-icons-png.flaticon.com/512/4201/4201213.png',
            'skiing': 'https://cdn-icons-png.flaticon.com/512/3163/3163769.png',
            'snowball fight': 'https://cdn-icons-png.flaticon.com/512/9180/9180322.png',
            'hot chocolate party': 'https://cdn-icons-png.flaticon.com/512/864/864800.png',
            'ice skating': 'https://cdn-icons-png.flaticon.com/512/9043/9043641.png',
            'winter photography': 'https://cdn-icons-png.flaticon.com/512/3701/3701278.png'
        };

        // Weather icons mapping
        const weatherIcons = {
            'sunny': 'https://cdn-icons-png.flaticon.com/512/2698/2698194.png',
            'rainy': 'https://cdn-icons-png.flaticon.com/512/1146/1146858.png',
            'cloudy': 'https://cdn-icons-png.flaticon.com/512/3222/3222801.png',
            'snowy': 'https://cdn-icons-png.flaticon.com/512/6363/6363108.png'
        };
        
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            // Get the appropriate illustration
            const activityIllustration = activityIllustrations[item.activity.toLowerCase()] || activityIllustrations['reading'];
            const weatherIcon = weatherIcons[item.weather.toLowerCase()] || weatherIcons['sunny'];
            
            historyItem.innerHTML = `
                <div class="decoration decoration-1"></div>
                <div class="decoration decoration-2"></div>
                <div class="history-content">
                    <div class="history-header">
                        <img src="${activityIllustration}" alt="${item.activity}" class="history-activity-icon">
                        <div class="history-weather">
                            <img src="${weatherIcon}" alt="${item.weather}" class="history-weather-icon">
                            <span>${item.weather}</span>
                        </div>
                    </div>
                    <div class="history-details">
                        <h3>${item.activity}</h3>
                        <p class="history-date"><i class="far fa-calendar-alt"></i> ${item.date}</p>
                    </div>
                </div>
            `;
            historyContainer.appendChild(historyItem);
        });
    }
}); 