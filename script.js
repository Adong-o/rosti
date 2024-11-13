// Modal functionality
const modal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const closeBtn = document.querySelector('.close-btn');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Add console logs to check if elements are found
console.log('Login button:', loginBtn);
console.log('Signup button:', signupBtn);
console.log('Modal:', modal);

// Show modal functions
loginBtn.addEventListener('click', () => {
    console.log('Login button clicked');
    modal.style.display = 'block';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    document.body.style.overflow = 'hidden';
});

signupBtn.addEventListener('click', () => {
    console.log('Signup button clicked');
    modal.style.display = 'block';
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close modal when clicking the X
closeBtn.addEventListener('click', () => {
    console.log('Close button clicked');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Switch between login and signup forms
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Form submissions
document.getElementById('loginEmailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Login successful
            alert('Login successful!');
            modal.style.display = 'none';
            // Store user data in localStorage or handle as needed
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            // Login failed
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
});

document.getElementById('signupEmailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Registration successful
            alert('Registration successful! Please login.');
            // Switch to login form
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        } else {
            // Registration failed
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
    }
});

// Ensure this code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Free trial button functionality
    document.getElementById('freeTrialBtn').addEventListener('click', () => {
        // Show loading screen
        document.getElementById('loadingScreen').style.display = 'block';
        
        // Redirect to trial.html after a short delay
        setTimeout(() => {
            window.location.href = 'trial.html'; // Navigate to trial.html
        }, 1000); // Adjust the delay as needed
    });
}); 