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
            localStorage.setItem('selectedActivity', activity);
            window.location.href = 'activity-detail.html';
        });
    });

    // Regenerate Activities Button
    const regenerateBtn = document.querySelector('.regenerate-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            // In a real implementation, this would fetch new activities from a server
            alert('New activities generated!');
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
        document.getElementById('activityDate').textContent = new Date().toLocaleDateString();
        document.getElementById('activityWeather').textContent = localStorage.getItem('selectedWeather');
        document.getElementById('activityName').textContent = localStorage.getItem('selectedActivity');
    }

    // History Page
    if (window.location.pathname.includes('history.html')) {
        const historyContainer = document.getElementById('historyContainer');
        const history = JSON.parse(localStorage.getItem('activityHistory') || '[]');
        
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Weather:</strong> ${item.weather}</p>
                <p><strong>Activity:</strong> ${item.activity}</p>
            `;
            historyContainer.appendChild(historyItem);
        });
    }
}); 