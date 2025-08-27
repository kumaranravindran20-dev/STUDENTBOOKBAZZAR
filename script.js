// BookSwap - Main JavaScript file

// Global variables
let books = [];
let currentFilter = {
    search: '',
    category: '',
    semester: ''
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load books from localStorage
    loadBooks();
    
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Update stats if on home page
    updateStats();
}

// Data management functions
function loadBooks() {
    try {
        const savedBooks = localStorage.getItem('books');
        books = savedBooks ? JSON.parse(savedBooks) : [];
    } catch (error) {
        console.error('Error loading books from localStorage:', error);
        books = [];
    }
}

function saveBooks() {
    try {
        localStorage.setItem('books', JSON.stringify(books));
    } catch (error) {
        console.error('Error saving books to localStorage:', error);
        showToast('Error saving data', 'error');
    }
}

function getBooks() {
    return books;
}

function addBook(bookData) {
    books.push(bookData);
    saveBooks();
    updateStats();
}

function removeBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    saveBooks();
    updateStats();
}

function findBook(bookId) {
    return books.find(book => book.id === bookId);
}

// Utility functions
function generateId() {
    return 'book_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(price);
}

function sanitizeString(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Validation functions
function validateRequired(value, fieldName) {
    if (!value || value.trim() === '') {
        return `${fieldName} is required`;
    }
    return null;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return null;
}

function validatePhone(phone) {
    if (!phone) return null; // Phone is optional
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
    if (!phoneRegex.test(phone)) {
        return 'Please enter a valid phone number';
    }
    return null;
}

function validatePrice(price) {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) {
        return 'Please enter a valid price';
    }
    return null;
}

function validateBookData(bookData) {
    const errors = {};
    
    // Required fields validation
    const requiredFields = ['title', 'course', 'department', 'semester', 'price', 'email'];
    requiredFields.forEach(field => {
        const error = validateRequired(bookData[field], field);
        if (error) errors[field] = error;
    });
    
    // Email validation
    if (bookData.email) {
        const emailError = validateEmail(bookData.email);
        if (emailError) errors.email = emailError;
    }
    
    // Phone validation
    if (bookData.phone) {
        const phoneError = validatePhone(bookData.phone);
        if (phoneError) errors.phone = phoneError;
    }
    
    // Price validation
    if (bookData.price) {
        const priceError = validatePrice(bookData.price);
        if (priceError) errors.price = priceError;
    }
    
    return Object.keys(errors).length === 0 ? null : errors;
}

// Search and filter functions
function searchBooks(query) {
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book => 
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.course.toLowerCase().includes(lowercaseQuery) ||
        book.department.toLowerCase().includes(lowercaseQuery)
    );
}

function filterBooksByCategory(category) {
    if (!category) return books;
    return books.filter(book => book.department === category);
}

function filterBooksBySemester(semester) {
    if (!semester) return books;
    return books.filter(book => book.semester === semester);
}

function applyFilters() {
    let filteredBooks = [...books];
    
    // Apply search filter
    if (currentFilter.search) {
        filteredBooks = searchBooks(currentFilter.search);
    }
    
    // Apply category filter
    if (currentFilter.category) {
        filteredBooks = filteredBooks.filter(book => book.department === currentFilter.category);
    }
    
    // Apply semester filter
    if (currentFilter.semester) {
        filteredBooks = filteredBooks.filter(book => book.semester === currentFilter.semester);
    }
    
    return filteredBooks;
}

// UI functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.add('hidden');
    });
}

function showLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = true;
        button.classList.add('loading');
    }
}

function hideLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = false;
        button.classList.remove('loading');
    }
}

function updateStats() {
    const totalBooksElement = document.getElementById('totalBooks');
    if (totalBooksElement) {
        totalBooksElement.textContent = books.length;
    }
}

// Event listeners setup
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // Close mobile menu when clicking on a link
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Image handling functions
function handleImageUpload(file, callback) {
    if (!file) {
        callback(null);
        return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        showToast('Image size must be less than 5MB', 'error');
        return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.onerror = function() {
        showToast('Error reading image file', 'error');
    };
    reader.readAsDataURL(file);
}

function createImagePreview(imageSrc) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Book preview';
    img.className = 'w-32 h-32 object-cover rounded-lg';
    return img;
}

// Modal functions
function createModal(content, options = {}) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-lg p-6 max-w-md w-full modal-content';
    modalContent.innerHTML = content;
    
    modal.appendChild(modalContent);
    
    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal && !options.preventClose) {
            closeModal(modal);
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !options.preventClose) {
            closeModal(modal);
        }
    });
    
    document.body.appendChild(modal);
    return modal;
}

function closeModal(modal) {
    if (modal && modal.parentNode) {
        modal.parentNode.removeChild(modal);
    }
}

// Local storage utilities
function clearLocalStorage() {
    try {
        localStorage.removeItem('books');
        books = [];
        updateStats();
        showToast('All data cleared successfully', 'success');
    } catch (error) {
        console.error('Error clearing localStorage:', error);
        showToast('Error clearing data', 'error');
    }
}

function exportData() {
    try {
        const dataStr = JSON.stringify(books, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'bookswap_data.json';
        link.click();
        
        URL.revokeObjectURL(url);
        showToast('Data exported successfully', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showToast('Error exporting data', 'error');
    }
}

function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedBooks = JSON.parse(e.target.result);
            if (Array.isArray(importedBooks)) {
                books = importedBooks;
                saveBooks();
                updateStats();
                showToast('Data imported successfully', 'success');
            } else {
                showToast('Invalid data format', 'error');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            showToast('Error importing data', 'error');
        }
    };
    reader.readAsText(file);
}

// Performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Accessibility functions
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker code would go here for offline functionality
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showToast('An error occurred. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showToast('An error occurred. Please try again.', 'error');
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    // Perform any cleanup tasks here
});

// Initialize the app when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export functions for use in other files
window.BookSwap = {
    getBooks,
    addBook,
    removeBook,
    findBook,
    searchBooks,
    filterBooksByCategory,
    filterBooksBySemester,
    validateBookData,
    showToast,
    showError,
    hideError,
    clearAllErrors,
    generateId,
    formatDate,
    formatPrice,
    sanitizeString,
    handleImageUpload,
    createModal,
    closeModal,
    announceToScreenReader
};
