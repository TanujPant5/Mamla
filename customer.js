// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Sample event data
    const events = [
        {
            id: 1,
            title: "Summer Music Festival",
            type: "concert",
            date: "2025-04-15",
            time: "16:00",
            location: "Downtown Park",
            address: "123 Main Street",
            price: "$45",
            description: "Join us for a day of amazing live music performances featuring local and international artists. Food vendors and refreshments will be available throughout the event.",
            image: "summer-festival.jpg",
            slots: ["16:00", "18:00", "20:00"]
        },
        {
            id: 2,
            title: "Tech Conference 2025",
            type: "workshop",
            date: "2025-04-20",
            time: "09:00",
            location: "Innovation Center",
            address: "456 Tech Boulevard, Uptown",
            price: "$120",
            description: "A premier gathering of tech professionals and enthusiasts. Learn about the latest advancements in AI, blockchain, and digital transformation from industry leaders.",
            image: "tech-conference.jpg",
            slots: ["09:00", "11:30", "14:00", "16:30"]
        },
        {
            id: 3,
            title: "Championship Basketball",
            type: "sport",
            date: "2025-04-12",
            time: "19:30",
            location: "City Arena",
            address: "789 Sports Way, West End",
            price: "$35",
            description: "Watch the final match of the season between our local champions and their longtime rivals. An exciting game that promises action and suspense!",
            image: "basketball.jpg",
            slots: ["19:30"]
        },
        {
            id: 4,
            title: "The Phantom of the Opera",
            type: "theater",
            date: "2025-04-25",
            time: "19:00",
            location: "Grand Theater",
            address: "321 Culture Street, East Side",
            price: "$75",
            description: "Experience this classic musical performed by an award-winning cast. This production brings new life to the timeless story with stunning visuals and captivating performances.",
            image: "phantom.jpg",
            slots: ["14:00", "19:00"]
        },
        {
            id: 5,
            title: "Wine Tasting Festival",
            type: "workshop",
            date: "2025-04-18",
            time: "15:00",
            location: "Vineyard Gardens",
            address: "567 Grape Lane, Uptown",
            price: "$60",
            description: "Sample the finest wines from local vineyards while enjoying artisanal cheese and live acoustic music. Learn about wine production and pairing from expert sommeliers.",
            image: "wine-tasting.jpg",
            slots: ["15:00", "17:00", "19:00"]
        },
        {
            id: 6,
            title: "Modern Art Exhibition",
            type: "workshop",
            date: "2025-04-10",
            time: "10:00",
            location: "Contemporary Gallery",
            address: "890 Vision Street, Downtown",
            price: "$20",
            description: "Explore thought-provoking works from emerging artists pushing the boundaries of contemporary art. Guided tours available throughout the day.",
            image: "art-exhibition.jpg",
            slots: ["10:00", "13:00", "16:00"]
        }
    ];

    // Sample bookings data
    let bookings = [
        {
            id: 101,
            eventId: 3,
            eventTitle: "Championship Basketball",
            date: "2025-04-12",
            time: "19:30",
            location: "City Arena",
            ticketCode: "BKTB-2025-1234",
            status: "confirmed"
        },
        {
            id: 102,
            eventId: 6,
            eventTitle: "Modern Art Exhibition",
            date: "2025-04-10",
            time: "13:00",
            location: "Contemporary Gallery",
            ticketCode: "ARTE-2025-5678",
            status: "confirmed"
        }
    ];

    // DOM elements - check if they exist before using
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const views = document.querySelectorAll('.view');
    const eventsContainer = document.getElementById('events-container');
    const eventModal = document.getElementById('event-modal');
    const closeModal = document.querySelector('.close-modal');
    const eventDetails = document.getElementById('event-details');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const dateFilter = document.getElementById('date-filter');
    const locationFilter = document.getElementById('location-filter');
    const typeFilter = document.getElementById('type-filter');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const upcomingBookings = document.getElementById('upcoming-bookings');
    const pastBookings = document.getElementById('past-bookings');

    // Validate DOM elements
    if (!eventsContainer || !eventModal || !eventDetails) {
        console.error("Critical DOM elements not found. Check your HTML structure.");
        return;
    }

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and add to clicked link
            navLinks.forEach(item => {
                item.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Get the view to show
            const viewToShow = this.getAttribute('data-view');
            
            // Hide all views and show the selected one
            views.forEach(view => {
                view.classList.remove('active-view');
            });
            
            const targetView = document.getElementById(`${viewToShow}-view`);
            if (targetView) {
                targetView.classList.add('active-view');
            }
        });
    });

    // Function to format date strings
    function formatDate(dateString) {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        } catch (error) {
            console.error("Date formatting error:", error);
            return dateString;
        }
    }

    // Function to extract month from date string
    function getMonth(dateString) {
        try {
            const options = { month: 'short' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        } catch (error) {
            console.error("Month extraction error:", error);
            return "";
        }
    }

    // Function to extract day from date string
    function getDay(dateString) {
        try {
            const options = { day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        } catch (error) {
            console.error("Day extraction error:", error);
            return "";
        }
    }

    // Populate events grid with error handling
    function populateEvents(filteredEvents = events) {
        if (!eventsContainer) return;
        
        try {
            eventsContainer.innerHTML = '';
            
            if (filteredEvents.length === 0) {
                eventsContainer.innerHTML = '<p class="no-events">No events found. Try adjusting your filters.</p>';
                return;
            }
            
            filteredEvents.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.classList.add('event-card');
                eventCard.innerHTML = `
                    <div class="event-image">
                        <span class="event-type">${event.type}</span>
                    </div>
                    <div class="event-content">
                        <h3>${event.title}</h3>
                        <div class="event-details">
                            <p><i class="fas fa-calendar"></i> ${formatDate(event.date)}</p>
                            <p><i class="fas fa-clock"></i> ${event.time}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                            <p><i class="fas fa-ticket-alt"></i> ${event.price}</p>
                        </div>
                        <div class="event-actions">
                            <button class="view-details" data-event-id="${event.id}">View Details</button>
                        </div>
                    </div>
                `;
                eventsContainer.appendChild(eventCard);
            });

            // Add event listeners to view details buttons
            document.querySelectorAll('.view-details').forEach(button => {
                button.addEventListener('click', function() {
                    const eventId = parseInt(this.getAttribute('data-event-id'));
                    showEventDetails(eventId);
                });
            });
        } catch (error) {
            console.error("Error populating events:", error);
            eventsContainer.innerHTML = '<p class="error">Error loading events. Please try again.</p>';
        }
    }

    // Show event details in modal with error handling
    function showEventDetails(eventId) {
        if (!eventModal || !eventDetails) return;
        
        try {
            const event = events.find(e => e.id === eventId);
            
            if (!event) {
                console.error("Event not found:", eventId);
                return;
            }
            
            eventDetails.innerHTML = `
                <div class="event-detail-header">
                    <div class="event-detail-image"></div>
                    <div class="event-detail-info">
                        <h3>${event.title}</h3>
                        <div class="event-meta">
                            <div class="event-meta-item">
                                <i class="fas fa-calendar"></i>
                                <span>${formatDate(event.date)}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-ticket-alt"></i>
                                <span>${event.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="event-description">
                    <p>${event.description}</p>
                </div>
                <div class="booking-section">
                    <h4>Select a Time Slot</h4>
                    <div class="slots">
                        ${event.slots.map(slot => `<div class="slot" data-time="${slot}">${slot}</div>`).join('')}
                    </div>
                    <button class="book-btn" disabled>Book Now</button>
                </div>
            `;
            
            // Add event listeners to slots
            const bookBtn = eventDetails.querySelector('.book-btn');
            if (!bookBtn) return;
            
            let selectedSlot = null;
            eventDetails.querySelectorAll('.slot').forEach(slot => {
                slot.addEventListener('click', function() {
                    // Remove selected class from all slots
                    eventDetails.querySelectorAll('.slot').forEach(s => {
                        s.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked slot
                    this.classList.add('selected');
                    selectedSlot = this.getAttribute('data-time');
                    
                    // Enable book button
                    bookBtn.removeAttribute('disabled');
                });
            });
            
            // Add event listener to book button
            bookBtn.addEventListener('click', function() {
                if (!selectedSlot) return;
                
                // Create a new booking
                const newBooking = {
                    id: 100 + bookings.length + 1,
                    eventId: event.id,
                    eventTitle: event.title,
                    date: event.date,
                    time: selectedSlot,
                    location: event.location,
                    ticketCode: `${event.type.substring(0, 4).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
                    status: "confirmed"
                };
                
                // Add to bookings array
                bookings.push(newBooking);
                
                // Update bookings view
                updateBookings();
                
                // Close modal
                eventModal.style.display = 'none';
                
                // Show success notification
                alert(`Booking confirmed! Your ticket code is ${newBooking.ticketCode}`);
                
                // Navigate to bookings view
                const bookingsLink = document.querySelector('a[data-view="bookings"]');
                if (bookingsLink) bookingsLink.click();
            });
            
            eventModal.style.display = 'block';
        } catch (error) {
            console.error("Error showing event details:", error);
        }
    }

    // Close modal when clicking on close button
    if (closeModal && eventModal) {
        closeModal.addEventListener('click', function() {
            eventModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside the modal content
    if (eventModal) {
        window.addEventListener('click', function(event) {
            if (event.target === eventModal) {
                eventModal.style.display = 'none';
            }
        });
    }

    // Search functionality
    function searchEvents() {
        if (!searchInput || !dateFilter || !locationFilter || !typeFilter) return;
        
        try {
            const searchTerm = searchInput.value.toLowerCase();
            const dateValue = dateFilter.value;
            const locationValue = locationFilter.value;
            const typeValue = typeFilter.value;
            
            let filtered = events.filter(event => {
                const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                                      event.description.toLowerCase().includes(searchTerm) ||
                                      event.location.toLowerCase().includes(searchTerm);
                
                // Apply date filter
                let matchesDate = true;
                const eventDate = new Date(event.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (dateValue === 'today') {
                    const todayStr = today.toISOString().split('T')[0];
                    matchesDate = event.date === todayStr;
                } else if (dateValue === 'tomorrow') {
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const tomorrowStr = tomorrow.toISOString().split('T')[0];
                    matchesDate = event.date === tomorrowStr;
                } else if (dateValue === 'week') {
                    const weekEnd = new Date(today);
                    weekEnd.setDate(weekEnd.getDate() + 7);
                    matchesDate = eventDate >= today && eventDate <= weekEnd;
                } else if (dateValue === 'month') {
                    const monthEnd = new Date(today);
                    monthEnd.setMonth(monthEnd.getMonth() + 1);
                    matchesDate = eventDate >= today && eventDate <= monthEnd;
                }
                
                // Apply location filter
                const matchesLocation = locationValue === 'all' || 
                                       (locationValue === 'downtown' && event.location.toLowerCase().includes('downtown')) ||
                                       (locationValue === 'uptown' && event.location.toLowerCase().includes('uptown')) ||
                                       (locationValue === 'west' && event.location.toLowerCase().includes('west')) ||
                                       (locationValue === 'east' && event.location.toLowerCase().includes('east'));
                
                // Apply type filter
                const matchesType = typeValue === 'all' || event.type === typeValue;
                
                return matchesSearch && matchesDate && matchesLocation && matchesType;
            });
            
            populateEvents(filtered);
        } catch (error) {
            console.error("Error searching events:", error);
        }
    }

    // Set up search button event listener
    if (searchBtn) {
        searchBtn.addEventListener('click', searchEvents);
    }

    // Set up search input enter key event
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchEvents();
            }
        });
    }
    
    // Filter change events
    if (dateFilter) dateFilter.addEventListener('change', searchEvents);
    if (locationFilter) locationFilter.addEventListener('change', searchEvents);
    if (typeFilter) typeFilter.addEventListener('change', searchEvents);

    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tab buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            const tabToShow = this.getAttribute('data-tab');
            const tabContent = document.getElementById(`${tabToShow}-bookings`);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });

    // Update bookings view with error handling
    function updateBookings() {
        if (!upcomingBookings || !pastBookings) return;
        
        try {
            // Clear booking containers
            upcomingBookings.innerHTML = '';
            pastBookings.innerHTML = '';
            
            if (bookings.length === 0) {
                upcomingBookings.innerHTML = '<p class="no-bookings">You have no upcoming bookings.</p>';
                pastBookings.innerHTML = '<p class="no-bookings">You have no past bookings.</p>';
                return;
            }
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Sort bookings by date (newest first)
            bookings.sort((a, b) => new Date(b.date) - new Date(a.date));

            let hasUpcoming = false;
            let hasPast = false;
            
            bookings.forEach(booking => {
                const bookingDate = new Date(booking.date);
                const isPast = bookingDate < today;
                
                const bookingCard = document.createElement('div');
                bookingCard.classList.add('booking-card');
                bookingCard.setAttribute('data-id', booking.id);
                bookingCard.innerHTML = `
                    <div class="booking-card-date">
                        <div class="month">${getMonth(booking.date)}</div>
                        <div class="day">${getDay(booking.date)}</div>
                    </div>
                    <div class="booking-info">
                        <h3>${booking.eventTitle}</h3>
                        <div class="booking-meta">
                            <div class="booking-meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${booking.time}</span>
                            </div>
                            <div class="booking-meta-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${booking.location}</span>
                            </div>
                            <div class="booking-meta-item">
                                <i class="fas fa-ticket-alt"></i>
                                <span>Ticket: ${booking.ticketCode}</span>
                            </div>
                        </div>
                    </div>
                    <div class="booking-actions">
                        ${isPast ? 
                          '<button class="rate-btn">Rate Event</button>' : 
                          '<button class="view-btn">View Ticket</button><button class="cancel">Cancel</button>'}
                    </div>
                `;
                
                if (isPast) {
                    pastBookings.appendChild(bookingCard);
                    hasPast = true;
                } else {
                    upcomingBookings.appendChild(bookingCard);
                    hasUpcoming = true;
                }
            });
            
            // Display messages if there are no bookings in a category
            if (!hasUpcoming) {
                upcomingBookings.innerHTML = '<p class="no-bookings">You have no upcoming bookings.</p>';
            }
            
            if (!hasPast) {
                pastBookings.innerHTML = '<p class="no-bookings">You have no past bookings.</p>';
            }
            
            // Add event listeners to booking buttons
            document.querySelectorAll('.view-btn').forEach(button => {
                button.addEventListener('click', function() {
                    alert('Ticket QR code would be displayed here.');
                });
            });
            
            document.querySelectorAll('.cancel').forEach(button => {
                button.addEventListener('click', function() {
                    const bookingCard = this.closest('.booking-card');
                    if (!bookingCard) return;
                    
                    if (confirm('Are you sure you want to cancel this booking?')) {
                        const bookingId = parseInt(bookingCard.getAttribute('data-id'));
                        
                        // Remove booking from array
                        bookings = bookings.filter(booking => booking.id !== bookingId);
                        
                        // Update UI
                        bookingCard.remove();
                        
                        // Check if there are any upcoming bookings left
                        if (upcomingBookings.children.length === 0) {
                            upcomingBookings.innerHTML = '<p class="no-bookings">You have no upcoming bookings.</p>';
                        }
                    }
                });
            });
            
            document.querySelectorAll('.rate-btn').forEach(button => {
                button.addEventListener('click', function() {
                    alert('Rating form would be displayed here.');
                });
            });
        } catch (error) {
            console.error("Error updating bookings:", error);
        }
    }

    // Create default placeholder images for event cards
    function createPlaceholderBackgrounds() {
        try {
            // Event cards
            document.querySelectorAll('.event-image').forEach((image, index) => {
                const hue = (index * 40) % 360; // Different color for each card
                image.style.backgroundImage = `linear-gradient(135deg, hsl(${hue}, 80%, 60%), hsl(${hue + 60}, 80%, 40%))`;
            });
            
            // Event detail image in modal
            const detailImages = document.querySelectorAll('.event-detail-image');
            detailImages.forEach((image, index) => {
                const hue = (index * 40) % 360;
                image.style.backgroundImage = `linear-gradient(135deg, hsl(${hue}, 80%, 60%), hsl(${hue + 60}, 80%, 40%))`;
            });
        } catch (error) {
            console.error("Error creating placeholder backgrounds:", error);
        }
    }

    // Helper function to periodically check and update UI components
    function refreshUI() {
        createPlaceholderBackgrounds();
        
        // Make sure all event cards have proper styling
        document.querySelectorAll('.event-card').forEach(card => {
            if (!card.querySelector('.event-image').style.backgroundImage) {
                const randomHue = Math.floor(Math.random() * 360);
                card.querySelector('.event-image').style.backgroundImage = 
                    `linear-gradient(135deg, hsl(${randomHue}, 80%, 60%), hsl(${randomHue + 60}, 80%, 40%))`;
            }
        });
    }

    // Initialize the app
    try {
        populateEvents();
        updateBookings();
        createPlaceholderBackgrounds();
        
        // Periodic UI refresh to catch any dynamically added elements
        setInterval(refreshUI, 2000);
        
        console.log("EventHub initialized successfully");
    } catch (error) {
        console.error("Error initializing application:", error);
    }
});