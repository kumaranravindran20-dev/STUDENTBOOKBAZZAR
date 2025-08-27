# EDUBRIDGE - College Textbook Marketplace

## Overview

EDUBRIDGE is a comprehensive college textbook marketplace platform that enables students to buy, sell, and exchange used books with seamless user authentication and delivery options. The application features multiple payment gateways and real-time order tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Tailwind CSS for responsive design and styling
- **Icons**: Feather Icons for consistent iconography
- **Architecture Pattern**: Multi-page application (MPA) with shared components

### Data Storage
- **Primary Storage**: Browser localStorage for client-side data persistence
- **Data Structure**: JSON objects stored as strings in localStorage
- **Scope**: Per-browser session data storage (no server-side persistence)

## Key Components

### HTML Pages
1. **index.html** - Homepage with hero section and overview
2. **books.html** - Browse books page for viewing available textbooks
3. **post.html** - Post a book page for adding new listings
4. **contact.html** - Contact page for user inquiries
5. **login.html** - User login page with authentication
6. **signup.html** - User registration page with form validation
7. **dashboard.html** - User dashboard with stats and quick actions
8. **delivery.html** - Delivery options and order tracking page
9. **payment.html** - Comprehensive payment gateway with multiple options

### JavaScript Components
- **script.js** - Main application logic including:
  - Data management (localStorage operations)
  - Event handling and UI interactions
  - Book filtering and search functionality
  - Statistics and analytics
  - User authentication and session management
  - Delivery option handling
  - Order tracking functionality

### Styling
- **style.css** - Custom styles and animations
- **Tailwind CSS** - Utility-first CSS framework via CDN
- **Responsive Design** - Mobile-first approach with responsive navigation

## Data Flow

1. **Data Loading**: On page load, books are retrieved from localStorage
2. **User Interactions**: Form submissions and user actions trigger JavaScript functions
3. **Data Persistence**: All changes are immediately saved to localStorage
4. **Real-time Updates**: UI components update dynamically without page refresh

## External Dependencies

### CDN Dependencies
- **Tailwind CSS**: `https://cdn.tailwindcss.com` - Styling framework
- **Feather Icons**: `https://unpkg.com/feather-icons` - Icon library

### No Backend Dependencies
- No server-side database
- No authentication system
- No external APIs
- No build tools required

## Deployment Strategy

### Static Hosting
- **Deployment Type**: Static file hosting (suitable for GitHub Pages, Netlify, Vercel)
- **Requirements**: Any web server capable of serving static files
- **No Build Process**: Direct deployment of source files

### Development Setup
- **Local Development**: Can be run directly in browser or via simple HTTP server
- **No Dependencies**: No npm packages or build tools required
- **Cross-Platform**: Works on any system with a modern web browser

## Technical Considerations

### Data Limitations
- **Storage Scope**: Data is limited to individual browser sessions
- **Persistence**: Data will be lost if localStorage is cleared
- **Scalability**: Not suitable for production use without backend integration

### New Features (January 2025)
- **User Authentication System**: Login and signup pages with form validation
- **User Dashboard**: Personal dashboard showing user stats, recent books, and orders
- **Delivery Options**: Multiple delivery methods including campus pickup, home delivery, and express delivery
- **Order Tracking**: Real-time order status tracking system
- **Session Management**: localStorage-based user session handling
- **Payment Gateway**: Comprehensive payment system with UPI, cards, net banking, wallets, and COD
- **Brand Refresh**: Rebranded from BookSwap to EDUBRIDGE with updated UI

### Future Enhancement Opportunities
- Backend integration for persistent data storage
- Real-time messaging between buyers and sellers
- Payment processing integration
- Advanced search and filtering capabilities
- Email notifications for orders and updates

### Browser Compatibility
- **Modern Browsers**: Requires ES6+ support and localStorage API
- **Mobile Responsive**: Fully responsive design for mobile devices
- **Progressive Enhancement**: Graceful degradation for older browsers