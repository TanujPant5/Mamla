// Sample data for demonstration
const sampleEvents = [
    {
        id: 1,
        title: "Business Conference 2025",
        description: "Annual business conference featuring keynote speakers and networking opportunities.",
        date: "2025-05-15",
        time: "09:00",
        price: 250.00,
        capacity: 200,
        bookings: 75,
        status: "upcoming",
        image: "/api/placeholder/300/180"
    },
    {
        id: 2,
        title: "Tech Workshop",
        description: "Hands-on workshop covering the latest technologies and industry trends.",
        date: "2025-05-22",
        time: "13:30",
        price: 120.00,
        capacity: 50,
        bookings: 32,
        status: "upcoming",
        image: "/api/placeholder/300/180"
    },
    {
        id: 3,
        title: "Networking Mixer",
        description: "Evening networking event for professionals in the industry.",
        date: "2025-04-30",
        time: "18:00",
        price: 45.00,
        capacity: 100,
        bookings: 68,
        status: "upcoming",
        image: "/api/placeholder/300/180"
    },
    {
        id: 4,
        title: "Leadership Seminar",
        description: "Full-day seminar on effective leadership strategies and practices.",
        date: "2025-06-10",
        time: "10:00",
        price: 180.00,
        capacity: 75,
        bookings: 12,
        status: "upcoming",
        image: "/api/placeholder/300/180"
    }
];

const sampleBookings = [
    {
        id: "B1001",
        customer: "Emily Johnson",
        eventId: 1,
        eventTitle: "Business Conference 2025",
        date: "2025-05-15",
        time: "09:00",
        tickets: 2,
        total: 500.00,
        status: "confirmed",
        email: "emily.j@example.com"
    },
    {
        id: "B1002",
        customer: "Michael Smith",
        eventId: 1,
        eventTitle: "Business Conference 2025",
        date: "2025-05-15",
        time: "09:00",
        tickets: 1,
        total: 250.00,
        status: "confirmed",
        email: "m.smith@example.com"
    },
    {
        id: "B1003",
        customer: "Sarah Davis",
        eventId: 2,
        eventTitle: "Tech Workshop",
        date: "2025-05-22",
        time: "13:30",
        tickets: 3,
        total: 360.00,
        status: "pending",
        email: "s.davis@example.com"
    },
    {
        id: "B1004",
        customer: "Robert Wilson",
        eventId: 3,
        eventTitle: "Networking Mixer",
        date: "2025-04-30",
        time: "18:00",
        tickets: 2,
        total: 90.00,
        status: "confirmed",
        email: "r.wilson@example.com"
    },
    {
        id: "B1005",
        customer: "Jennifer Brown",
        eventId: 2,
        eventTitle: "Tech Workshop",
        date: "2025-05-22",
        time: "13:30",
        tickets: 1,
        total: 120.00,
        status: "cancelled",
        email: "j.brown@example.com"
    }
];

// Current logged in business
let currentBusiness = {
    name: "John's Business",
    email: "john@business.com",
    id: "BUS123"
};

// App State
let appState = {
    events: [...sampleEvents],
    bookings: [...sampleBookings],
    currentSection: "dashboard",
    isAuthenticated: true, // Set to false to start with login screen
    confirmAction: null
};

// DOM Elements
const elements = {
    // Navigation
    navLinks: document.querySelectorAll('.nav-links li a'),
    sidebarLinks: document.querySelectorAll('.sidebar .nav-links li'),

    // Section containers
    sections: {
        auth: document.getElementById('auth-section'),
        dashboard: document.getElementById('dashboard-section'),
        events: document.getElementById('events-section'),
        bookings: document.getElementById('bookings-section')
    },

    // Auth forms
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    showLoginBtn: document.getElementById('show-login'),
    showRegisterBtn: document.getElementById('show-register'),
    loginFormContainer: document.querySelector('.login-form'),
    registerFormContainer: document.querySelector('.register-form'),

    // Dashboard elements
    recentBookingsTable: document.getElementById('recent-bookings'),

    // Events elements
    eventsContainer: document.getElementById('events-container'),
    addEventBtn: document.getElementById('add-event-btn'),
    eventModal: document.getElementById('event-modal'),
    eventForm: document.getElementById('event-form'),
    eventModalTitle: document.getElementById('modal-title'),
    cancelEventBtn: document.getElementById('cancel-event'),
    eventImageInput: document.getElementById('event-image'),
    imagePreview: document.getElementById('image-preview'),
    statusFilter: document.getElementById('status-filter'),
    dateFilter: document.getElementById('date-filter'),

    // Bookings elements
    bookingsTable: document.getElementById('bookings-table'),
    bookingStatusFilter: document.getElementById('booking-status'),
    bookingEventFilter: document.getElementById('booking-event'),

    // Modals
    confirmModal: document.getElementById('confirm-modal'),
    confirmMessage: document.getElementById('confirm-message'),
    confirmBtn: document.getElementById('confirm-action'),
    cancelConfirmBtn: document.getElementById('cancel-confirm'),

    // Event form fields
    eventId: document.getElementById('event-id'),
    eventTitle: document.getElementById('event-title'),
    eventDescription: document.getElementById('event-description'),
    eventDate: document.getElementById('event-date'),
    eventTime: document.getElementById('event-time'),
    eventPrice: document.getElementById('event-price'),
    eventCapacity: document.getElementById('event-capacity')
};

// Init function - runs on page load
function init() {
    // Set up event listeners
    setupEventListeners();

    // Show appropriate section based on auth state
    if (appState.isAuthenticated) {
        showAuthenticatedView();
    } else {
        showAuthView();
    }

    // Load initial data
    loadDashboardData();
    loadEventsData();
    loadBookingsData();
    populateEventDropdown();
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Auth forms
    if (elements.loginForm) {
        elements.loginForm.addEventListener('submit', handleLogin);
    }
    if (elements.registerForm) {
        elements.registerForm.addEventListener('submit', handleRegister);
    }
    if (elements.showLoginBtn) {
        elements.showLoginBtn.addEventListener('click', showLoginForm);
    }
    if (elements.showRegisterBtn) {
        elements.showRegisterBtn.addEventListener('click', showRegisterForm);
    }

    // Events
    if (elements.addEventBtn) {
        elements.addEventBtn.addEventListener('click', showAddEventModal);
    }
    if (elements.eventForm) {
        elements.eventForm.addEventListener('submit', handleEventFormSubmit);
    }
    if (elements.cancelEventBtn) {
        elements.cancelEventBtn.addEventListener('click', closeEventModal);
    }
    if (elements.eventImageInput) {
        elements.eventImageInput.addEventListener('change', handleImagePreview);
    }
    if (elements.statusFilter) {
        elements.statusFilter.addEventListener('change', filterEvents);
    }
    if (elements.dateFilter) {
        elements.dateFilter.addEventListener('change', filterEvents);
    }

    // Booking filters
    if (elements.bookingStatusFilter) {
        elements.bookingStatusFilter.addEventListener('change', filterBookings);
    }
    if (elements.bookingEventFilter) {
        elements.bookingEventFilter.addEventListener('change', filterBookings);
    }

    // Modal close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Confirm modal
    if (elements.confirmBtn) {
        elements.confirmBtn.addEventListener('click', handleConfirmAction);
    }
    if (elements.cancelConfirmBtn) {
        elements.cancelConfirmBtn.addEventListener('click', closeConfirmModal);
    }
}

// Navigation Handlers
function handleNavigation(e) {
    e.preventDefault();
    const targetSection = e.currentTarget.getAttribute('href').substring(1);
    navigateTo(targetSection);
}

function navigateTo(section) {
    // Update active class in sidebar
    elements.sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.querySelector('a').getAttribute('href') === `#${section}`) {
            link.classList.add('active');
        }
    });

    // Hide all sections
    Object.values(elements.sections).forEach(sectionElement => {
        sectionElement.classList.add('hidden');
    });

    // Show target section
    if (section === 'logout') {
        handleLogout();
    } else {
        appState.currentSection = section;
        elements.sections[section]?.classList.remove('hidden');
    }
}

// Authentication Handlers
function showAuthView() {
    appState.isAuthenticated = false;
    elements.sections.auth.classList.remove('hidden');
    elements.sections.dashboard.classList.add('hidden');
    elements.sections.events.classList.add('hidden');
    elements.sections.bookings.classList.add('hidden');
    showLoginForm();
}

function showAuthenticatedView() {
    appState.isAuthenticated = true;
    elements.sections.auth.classList.add('hidden');
    navigateTo('dashboard');
}

function showLoginForm(e) {
    if (e) e.preventDefault();
    elements.loginFormContainer.classList.remove('hidden');
    elements.registerFormContainer.classList.add('hidden');
}

function showRegisterForm(e) {
    if (e) e.preventDefault();
    elements.loginFormContainer.classList.add('hidden');
    elements.registerFormContainer.classList.remove('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // This would normally validate with a server
    if (email && password) {
        // Simulated successful login
        currentBusiness = {
            name: "John's Business",
            email: email,
            id: "BUS123"
        };
        showAuthenticatedView();
    } else {
        alert('Please enter email and password');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const businessName = document.getElementById('business-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation
    if (!businessName || !email || !password) {
        alert('Please fill out all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // This would normally send data to a server
    // Simulated successful registration
    currentBusiness = {
        name: businessName,
        email: email,
        id: "BUS" + Math.floor(1000 + Math.random() * 9000)
    };
    showAuthenticatedView();
}

function handleLogout() {
    appState.isAuthenticated = false;
    showAuthView();
}

// Dashboard Data
function loadDashboardData() {
    // Update recent bookings table (show last 5)
    const recentBookings = appState.bookings.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    }).slice(0, 5);

    if (elements.recentBookingsTable) {
        elements.recentBookingsTable.innerHTML = recentBookings.map(booking => `
            <tr>
                <td>${booking.customer}</td>
                <td>${booking.eventTitle}</td>
                <td>${formatDate(booking.date)}</td>
                <td>
                    <span class="status-badge status-${booking.status.toLowerCase()}">${capitalizeFirst(booking.status)}</span>
                </td>
                <td>$${booking.total.toFixed(2)}</td>
            </tr>
        `).join('');
    }
}

// Events Management
function loadEventsData() {
    if (!elements.eventsContainer) return;

    const events = getFilteredEvents();
    elements.eventsContainer.innerHTML = events.map(event => `
        <div class="event-card" data-id="${event.id}">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-details">
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span>${formatDate(event.date)} at ${formatTime(event.time)}</span>
                    <span>$${event.price.toFixed(2)}</span>
                </div>
                <p>${truncateText(event.description, 100)}</p>
                <div class="event-meta">
                    <span>Capacity: ${event.capacity}</span>
                    <span>Booked: ${event.bookings || 0}</span>
                </div>
                <div class="event-actions">
                    <button class="btn action-btn edit-btn" onclick="editEvent(${event.id})">Edit</button>
                    <button class="btn action-btn delete-btn" onclick="showDeleteEventConfirm(${event.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function getFilteredEvents() {
    let filteredEvents = [...appState.events];
    
    // Apply status filter
    const statusFilter = elements.statusFilter?.value;
    if (statusFilter && statusFilter !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.status === statusFilter);
    }
    
    // Apply sort order
    const sortOrder = elements.dateFilter?.value;
    if (sortOrder) {
        switch(sortOrder) {
            case 'newest':
                filteredEvents.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
                break;
            case 'oldest':
                filteredEvents.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
                break;
            case 'price-high':
                filteredEvents.sort((a, b) => b.price - a.price);
                break;
            case 'price-low':
                filteredEvents.sort((a, b) => a.price - b.price);
                break;
        }
    }
    
    return filteredEvents;
}

function filterEvents() {
    loadEventsData();
}

function showAddEventModal() {
    resetEventForm();
    elements.eventModalTitle.textContent = 'Add New Event';
    elements.eventModal.classList.remove('hidden');
}

function editEvent(eventId) {
    const event = appState.events.find(event => event.id === eventId);
    if (!event) return;
    
    elements.eventModalTitle.textContent = 'Edit Event';
    elements.eventId.value = event.id;
    elements.eventTitle.value = event.title;
    elements.eventDescription.value = event.description;
    elements.eventDate.value = event.date;
    elements.eventTime.value = event.time;
    elements.eventPrice.value = event.price;
    elements.eventCapacity.value = event.capacity;
    
    if (event.image) {
        elements.imagePreview.src = event.image;
    }
    
    elements.eventModal.classList.remove('hidden');
}

function resetEventForm() {
    elements.eventForm.reset();
    elements.eventId.value = '';
    elements.imagePreview.src = '/api/placeholder/300/200';
}

function closeEventModal() {
    elements.eventModal.classList.add('hidden');
}

function handleEventFormSubmit(e) {
    e.preventDefault();
    
    const eventData = {
        title: elements.eventTitle.value,
        description: elements.eventDescription.value,
        date: elements.eventDate.value,
        time: elements.eventTime.value,
        price: parseFloat(elements.eventPrice.value),
        capacity: parseInt(elements.eventCapacity.value),
        image: elements.imagePreview.src,
        status: 'upcoming',
        bookings: 0
    };
    
    const eventId = elements.eventId.value;
    
    if (eventId) {
        // Update existing event
        const index = appState.events.findIndex(event => event.id == eventId);
        if (index !== -1) {
            // Preserve existing booking count
            eventData.bookings = appState.events[index].bookings || 0;
            appState.events[index] = { ...appState.events[index], ...eventData, id: parseInt(eventId) };
        }
    } else {
        // Add new event
        const newId = appState.events.length > 0 ? Math.max(...appState.events.map(e => e.id)) + 1 : 1;
        appState.events.push({ ...eventData, id: newId });
    }
    
    closeEventModal();
    loadEventsData();
    populateEventDropdown();
}

function handleImagePreview(e) {
    const file = e.target.files[0];
    if (file) {
        // In a real app, this would handle file upload
        // For now, just keep the placeholder
        elements.imagePreview.src = '/api/placeholder/300/200';
    }
}

function showDeleteEventConfirm(eventId) {
    const event = appState.events.find(event => event.id === eventId);
    if (!event) return;
    
    elements.confirmMessage.textContent = `Are you sure you want to delete the event "${event.title}"?`;
    appState.confirmAction = () => deleteEvent(eventId);
    elements.confirmModal.classList.remove('hidden');
}

function deleteEvent(eventId) {
    // Check if event has bookings
    const eventBookings = appState.bookings.filter(booking => booking.eventId === eventId);
    if (eventBookings.length > 0) {
        alert('Cannot delete an event with existing bookings.');
        return;
    }
    
    appState.events = appState.events.filter(event => event.id !== eventId);
    loadEventsData();
    populateEventDropdown();
}

// Bookings Management
function loadBookingsData() {
    if (!elements.bookingsTable) return;
    
    const filteredBookings = getFilteredBookings();
    
    elements.bookingsTable.innerHTML = filteredBookings.map(booking => `
        <tr>
            <td>${booking.id}</td>
            <td>${booking.customer}</td>
            <td>${booking.eventTitle}</td>
            <td>${formatDate(booking.date)} at ${formatTime(booking.time)}</td>
            <td>${booking.tickets}</td>
            <td>$${booking.total.toFixed(2)}</td>
            <td>
                <span class="status-badge status-${booking.status.toLowerCase()}">${capitalizeFirst(booking.status)}</span>
            </td>
            <td>
                <div class="event-actions">
                    <button class="btn action-btn view-btn" onclick="viewBookingDetails(${booking.id})">View</button>
                    <button class="btn action-btn ${booking.status === 'confirmed' ? 'delete-btn' : 'edit-btn'}" 
                        onclick="${booking.status === 'confirmed' ? 'cancelBooking' : 'confirmBooking'}('${booking.id}')">
                        ${booking.status === 'confirmed' ? 'Cancel' : 'Confirm'}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getFilteredBookings() {
    let filteredBookings = [...appState.bookings];
    
    // Apply status filter
    const statusFilter = elements.bookingStatusFilter?.value;
    if (statusFilter && statusFilter !== 'all') {
        filteredBookings = filteredBookings.filter(booking => booking.status === statusFilter);
    }
    
    // Apply event filter
    const eventFilter = elements.bookingEventFilter?.value;
    if (eventFilter && eventFilter !== 'all') {
        filteredBookings = filteredBookings.filter(booking => booking.eventId === parseInt(eventFilter));
    }
    
    // Sort by date (newest first)
    filteredBookings.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return filteredBookings;
}

function filterBookings() {
    loadBookingsData();
}

function populateEventDropdown() {
    if (!elements.bookingEventFilter) return;
    
    const optionsHtml = `
        <option value="all">All Events</option>
        ${appState.events.map(event => `
            <option value="${event.id}">${event.title}</option>
        `).join('')}
    `;
    
    elements.bookingEventFilter.innerHTML = optionsHtml;
}

function viewBookingDetails(bookingId) {
    // In a real app, this would show booking details
    // For this demo, just show an alert with basic info
    const booking = appState.bookings.find(b => b.id === bookingId);
    if (booking) {
        alert(`
            Booking Details:
            ID: ${booking.id}
            Customer: ${booking.customer}
            Email: ${booking.email}
            Event: ${booking.eventTitle}
            Date: ${formatDate(booking.date)}
            Time: ${formatTime(booking.time)}
            Tickets: ${booking.tickets}
            Total: $${booking.total.toFixed(2)}
            Status: ${booking.status}
        `);
    }
}

function confirmBooking(bookingId) {
    const bookingIndex = appState.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        appState.bookings[bookingIndex].status = 'confirmed';
        loadBookingsData();
        loadDashboardData();
    }
}

function cancelBooking(bookingId) {
    const bookingIndex = appState.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        appState.bookings[bookingIndex].status = 'cancelled';
        loadBookingsData();
        loadDashboardData();
    }
}

// Modal Handlers
function closeAllModals() {
    elements.eventModal.classList.add('hidden');
    elements.confirmModal.classList.add('hidden');
}

function closeConfirmModal() {
    elements.confirmModal.classList.add('hidden');
    appState.confirmAction = null;
}

function handleConfirmAction() {
    if (typeof appState.confirmAction === 'function') {
        appState.confirmAction();
    }
    closeConfirmModal();
}

// Utility Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatTime(timeString) {
    // Format time from 24hr to 12hr
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour);
    const suffix = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${suffix}`;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);

// Make functions accessible globally for inline event handlers
window.editEvent = editEvent;
window.showDeleteEventConfirm = showDeleteEventConfirm;
window.viewBookingDetails = viewBookingDetails;
window.confirmBooking = confirmBooking;
window.cancelBooking = cancelBooking;