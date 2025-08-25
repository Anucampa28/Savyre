// Dashboard JavaScript for Laksham Assessment Portal

// Global variables
let currentUser = null;
let isAuthenticated = false;
let dashboardData = null;

// DOM Elements
const userName = document.getElementById('userName');
const welcomeName = document.getElementById('welcomeName');
const userDropdown = document.getElementById('userDropdown');
const chatWidget = document.getElementById('chatWidget');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    initializeDashboard();
    setupEventListeners();
    loadDashboardData();
});

// Check authentication status
function checkAuthStatus() {
    const savedUser = localStorage.getItem('laksham_user') || sessionStorage.getItem('laksham_user');
    const savedToken = localStorage.getItem('laksham_token') || sessionStorage.getItem('laksham_token');
    
    if (savedUser && savedToken) {
        try {
            currentUser = JSON.parse(savedUser);
            isAuthenticated = true;
            updateUserInterface();
        } catch (error) {
            console.error('Error parsing saved user:', error);
            redirectToLogin();
        }
    } else {
        redirectToLogin();
    }
}

// Initialize dashboard
function initializeDashboard() {
    if (!isAuthenticated || !currentUser) {
        redirectToLogin();
        return;
    }
    
    // Set up mobile sidebar toggle
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
                sidebar.classList.remove('show');
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Chart period buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            updateChartPeriod(this, period);
        });
    });
    
    // Chat input
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Close user dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.user-menu')) {
            userDropdown.classList.remove('show');
        }
    });
}

// Update user interface
function updateUserInterface() {
    if (currentUser) {
        const displayName = currentUser.firstName || 'Demo';
        if (userName) userName.textContent = displayName;
        if (welcomeName) welcomeName.textContent = displayName;
    }
}

// Load dashboard data
async function loadDashboardData() {
    try {
        // Simulate API call to load dashboard data
        await simulateApiCall(1000);
        
        // Load mock data for demo purposes
        dashboardData = {
            stats: {
                passed: 24,
                rejected: 8,
                pending: 12,
                total: 44
            },
            analytics: {
                openRate: 78,
                completionRate: 65,
                avgCompletionTime: 2.3,
                avgDecisionTime: 1.8
            },
            recentActivity: [
                {
                    type: 'completion',
                    candidate: 'Sarah Johnson',
                    assessment: 'Leadership Assessment',
                    status: 'passed',
                    time: '2 hours ago'
                },
                {
                    type: 'opened',
                    candidate: 'Mike Chen',
                    assessment: 'Technical Assessment',
                    status: 'opened',
                    time: '4 hours ago'
                },
                {
                    type: 'invited',
                    candidate: 'Emily Rodriguez',
                    assessment: 'Soft Skills Assessment',
                    status: 'invited',
                    time: '1 day ago'
                }
            ]
        };
        
        updateDashboardDisplay();
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showNotification('Failed to load dashboard data. Please refresh the page.', 'error');
    }
}

// Update dashboard display
function updateDashboardDisplay() {
    if (!dashboardData) return;
    
    // Update stats
    updateStatCount('passedCount', dashboardData.stats.passed);
    updateStatCount('rejectedCount', dashboardData.stats.rejected);
    updateStatCount('pendingCount', dashboardData.stats.pending);
    updateStatCount('totalCount', dashboardData.stats.total);
    
    // Update analytics
    updateAnalyticsValue('openRate', dashboardData.analytics.openRate + '%');
    updateAnalyticsValue('completionRate', dashboardData.analytics.completionRate + '%');
    updateAnalyticsValue('avgCompletionTime', dashboardData.analytics.avgCompletionTime + ' days');
    updateAnalyticsValue('avgDecisionTime', dashboardData.analytics.avgDecisionTime + ' days');
}

// Update stat count with animation
function updateStatCount(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent) || 0;
    animateCounter(element, currentValue, targetValue, 1000);
}

// Update analytics value
function updateAnalyticsValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

// Animate counter
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const change = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (change * progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Update chart period
function updateChartPeriod(clickedBtn, period) {
    // Remove active class from all buttons
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    clickedBtn.classList.add('active');
    
    // In a real app, this would update the chart data
    console.log('Chart period changed to:', period);
    
    // Show notification for demo
    showNotification(`Chart view changed to ${period} view`, 'info');
}

// User menu functions
function toggleUserMenu() {
    userDropdown.classList.toggle('show');
}

// Logout function
function logout() {
    // Clear authentication data
    localStorage.removeItem('laksham_user');
    localStorage.removeItem('laksham_token');
    sessionStorage.removeItem('laksham_user');
    sessionStorage.removeItem('laksham_token');
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Chat functions
function toggleChat() {
    chatWidget.classList.toggle('collapsed');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate support response
    setTimeout(() => {
        const responses = [
            "Thank you for your message! Our support team will get back to you shortly.",
            "I understand your question. Let me help you with that.",
            "That's a great question! Here's what you need to know...",
            "I'm here to help! Is there anything specific about assessments you'd like to know?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(randomResponse, 'support');
    }, 1000);
}

function addChatMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
        <span class="message-time">${timeString}</span>
    `;
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Action button functions
function createAssessment() {
    showNotification('Create Assessment feature would open here. This is a demo.', 'info');
}

function inviteCandidates() {
    showNotification('Invite Candidates feature would open here. This is a demo.', 'info');
}

function viewReports() {
    showNotification('View Reports feature would open here. This is a demo.', 'info');
}

function exportData() {
    showNotification('Export Data feature would open here. This is a demo.', 'info');
}

// Utility functions
function redirectToLogin() {
    window.location.href = 'login.html';
}

function simulateApiCall(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
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

// Export functions for global access
window.toggleUserMenu = toggleUserMenu;
window.logout = logout;
window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.createAssessment = createAssessment;
window.inviteCandidates = inviteCandidates;
window.viewReports = viewReports;
window.exportData = exportData;

// Add CSS for notifications if not already present
if (!document.querySelector('#dashboardNotifications')) {
    const style = document.createElement('style');
    style.id = 'dashboardNotifications';
    style.textContent = `
        #notificationContainer {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
        }
        
        .notification {
            background: white;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            padding: 1rem 1.5rem;
            margin-bottom: 1rem;
            border-left: 4px solid var(--primary-color);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left-color: var(--secondary-color);
        }
        
        .notification.error {
            border-left-color: #ef4444;
        }
        
        .notification.warning {
            border-left-color: var(--accent-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-message {
            color: var(--text-primary);
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-light);
            font-size: 1.25rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            transition: color 0.3s ease;
        }
        
        .notification-close:hover {
            color: var(--text-primary);
        }
    `;
    
    document.head.appendChild(style);
}
