// Authentication JavaScript for Laksham Assessment Portal

// Global variables
let currentUser = null;
let isAuthenticated = false;

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const verificationForm = document.getElementById('verificationForm');
const loadingOverlay = document.getElementById('loadingOverlay');

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    setupFormEventListeners();
    checkAuthStatus();
});

// Initialize authentication system
function initializeAuth() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('laksham_user');
    const savedToken = localStorage.getItem('laksham_token');
    
    if (savedUser && savedToken) {
        try {
            currentUser = JSON.parse(savedUser);
            isAuthenticated = true;
            // In a real app, you'd validate the token with the server
            console.log('User authenticated:', currentUser);
        } catch (error) {
            console.error('Error parsing saved user:', error);
            clearAuthData();
        }
    }
}

// Setup form event listeners
function setupFormEventListeners() {
    // Login form
    const loginFormElement = document.getElementById('loginFormElement');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', handleLogin);
    }
    
    // Signup form
    const signupFormElement = document.getElementById('signupFormElement');
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', handleSignup);
    }
    
    // Forgot password form
    const forgotPasswordFormElement = document.getElementById('forgotPasswordFormElement');
    if (forgotPasswordFormElement) {
        forgotPasswordFormElement.addEventListener('submit', handleForgotPassword);
    }
}

// Check authentication status
function checkAuthStatus() {
    if (isAuthenticated && currentUser) {
        // Redirect to dashboard if already authenticated
        window.location.href = 'dashboard.html';
    }
}

// Form switching functions
function showLogin() {
    hideAllForms();
    loginForm.classList.add('active');
}

function showSignup() {
    hideAllForms();
    signupForm.classList.add('active');
}

function showForgotPassword() {
    hideAllForms();
    forgotPasswordForm.classList.add('active');
}

function showVerification(email) {
    hideAllForms();
    verificationForm.classList.add('active');
    document.getElementById('verificationEmail').textContent = email;
}

function hideAllForms() {
    [loginForm, signupForm, forgotPasswordForm, verificationForm].forEach(form => {
        form.classList.remove('active');
    });
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe');
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    showLoading();
    
    try {
        // Simulate API call
        await simulateApiCall(1500);
        
        // Check against demo credentials or registered users
        const user = await authenticateUser(email, password);
        
        if (user) {
            // Login successful
            currentUser = user;
            isAuthenticated = true;
            
            // Save user data
            if (rememberMe) {
                localStorage.setItem('laksham_user', JSON.stringify(user));
                localStorage.setItem('laksham_token', 'demo_token_' + Date.now());
            } else {
                sessionStorage.setItem('laksham_user', JSON.stringify(user));
                sessionStorage.setItem('laksham_token', 'demo_token_' + Date.now());
            }
            
            showNotification('Login successful! Redirecting to dashboard...', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } else {
            showNotification('Invalid email or password. Please try again.', 'error');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showNotification('An error occurred during login. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Handle signup form submission
async function handleSignup(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const phoneNumber = formData.get('phoneNumber');
    const agreeTerms = formData.get('agreeTerms');
    
    // Validation
    if (!firstName || !lastName || !email || !password) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters long.', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('Please agree to the Terms of Service and Privacy Policy.', 'error');
        return;
    }
    
    showLoading();
    
    try {
        // Simulate API call
        await simulateApiCall(2000);
        
        // Create user account and store locally
        const user = await createUser({
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        });
        
        if (user) {
            showNotification('Account created successfully! You can now sign in.', 'success');
            
            // Return to login form after successful signup
            setTimeout(() => {
                showLogin();
                // Pre-fill the email field
                document.getElementById('loginEmail').value = email;
            }, 2000);
            
        } else {
            showNotification('Failed to create account. Please try again.', 'error');
        }
        
    } catch (error) {
        console.error('Signup error:', error);
        showNotification('An error occurred during signup. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Handle forgot password
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    showLoading();
    
    try {
        // Simulate API call
        await simulateApiCall(1500);
        
        // In a real app, this would send a password reset email
        showNotification('Password reset link has been sent to your email.', 'success');
        
        // Return to login form
        setTimeout(() => {
            showLogin();
        }, 2000);
        
    } catch (error) {
        console.error('Forgot password error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Social authentication functions
function socialLogin(provider) {
    showNotification(`Redirecting to ${provider} for authentication...`, 'info');
    
    // In a real app, this would redirect to the OAuth provider
    setTimeout(() => {
        showNotification(`${provider} authentication is not implemented in this demo.`, 'warning');
    }, 1000);
}

function socialSignup(provider) {
    showNotification(`Redirecting to ${provider} for signup...`, 'info');
    
    // In a real app, this would redirect to the OAuth provider
    setTimeout(() => {
        showNotification(`${provider} signup is not implemented in this demo.`, 'warning');
    }, 1000);
}

// Verification functions
function resendVerification() {
    showNotification('Verification email resent!', 'success');
}

function checkVerification() {
    showLoading();
    
    // Simulate verification check
    setTimeout(() => {
        hideLoading();
        
        // In a real app, this would check if the email was verified
        showNotification('Email verification successful! You can now sign in.', 'success');
        
        // Return to login form
        setTimeout(() => {
            showLogin();
        }, 2000);
        
    }, 1500);
}

// Utility functions
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoading() {
    loadingOverlay.classList.add('show');
}

function hideLoading() {
    loadingOverlay.classList.remove('show');
}

function clearAuthData() {
    localStorage.removeItem('laksham_user');
    localStorage.removeItem('laksham_token');
    sessionStorage.removeItem('laksham_user');
    sessionStorage.removeItem('laksham_token');
    currentUser = null;
    isAuthenticated = false;
}

// Simulate API calls
function simulateApiCall(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Mock authentication function - UPDATED to check registered users
async function authenticateUser(email, password) {
    // First check demo credentials
    if (email === 'demo@laksham.com' && password === 'demo123') {
        return {
            id: 'user_001',
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@laksham.com',
            role: 'hiring_manager',
            company: 'Laksham Corp',
            avatar: null,
            createdAt: new Date().toISOString()
        };
    }
    
    // Check registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('laksham_registered_users') || '[]');
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: 'hiring_manager',
            company: 'Laksham Corp',
            avatar: null,
            createdAt: user.createdAt
        };
    }
    
    // Simulate failed login
    return null;
}

// Mock user creation function - UPDATED to store users locally
async function createUser(userData) {
    try {
        // Get existing users
        const existingUsers = JSON.parse(localStorage.getItem('laksham_registered_users') || '[]');
        
        // Check if email already exists
        if (existingUsers.find(u => u.email === userData.email)) {
            showNotification('An account with this email already exists.', 'error');
            return null;
        }
        
        // Create new user
        const newUser = {
            id: 'user_' + Date.now(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password, // In real app, this would be hashed
            phoneNumber: userData.phoneNumber,
            role: 'hiring_manager',
            status: 'active',
            createdAt: new Date().toISOString()
        };
        
        // Add to existing users
        existingUsers.push(newUser);
        
        // Store back to localStorage
        localStorage.setItem('laksham_registered_users', JSON.stringify(existingUsers));
        
        console.log('User registered successfully:', newUser);
        return newUser;
        
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    
    // Remove existing notifications
    const existingNotifications = container.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Terms and Privacy functions (placeholder)
function showTerms() {
    showNotification('Terms of Service would be displayed here.', 'info');
}

function showPrivacy() {
    showNotification('Privacy Policy would be displayed here.', 'info');
}

// Export functions for global access
window.showLogin = showLogin;
window.showSignup = showSignup;
window.showForgotPassword = showForgotPassword;
window.togglePassword = togglePassword;
window.socialLogin = socialLogin;
window.socialSignup = socialSignup;
window.resendVerification = resendVerification;
window.checkVerification = checkVerification;
window.showTerms = showTerms;
window.showPrivacy = showPrivacy;
