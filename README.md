# EPITRACK - Epiconsult Inventory & Attendance System

A modern, mobile-first web application for managing inventory, procurement, stock, and attendance at Epiconsult Clinic & Diagnostics.

## Features

- **Dashboard**: Real-time overview with live widgets, stats cards, and department summaries
- **Dynamic Navigation**: Expandable department menus with smooth animations
- **Department Management**: 
  - Pharmacy (drugs & accessories)
  - Inventory (store items, stock levels, reorder list)
  - Operations (requests, reports, attendance)
  - Admin (users, settings, audit log)
- **Modern UI Features**:
  - Dark mode toggle
  - Live date/time display
  - Global search functionality
  - Notification drawer
  - Toast notifications
  - Skeleton loaders
  - Responsive design
  - Keyboard shortcuts (/ for search, n for new entry)

## Tech Stack

- **Frontend**: Pure HTML, CSS, Vanilla JavaScript
- **Backend**: Flask (template rendering only)
- **Styling**: Custom CSS with CSS variables for theming
- **Data**: Mock JSON data in `/static/data/`

## Project Structure

\`\`\`
project/
├── templates/
│   ├── base.html
│   ├── dashboard.html
│   ├── department/
│   │   ├── pharmacy.html
│   │   ├── inventory.html
│   │   └── admin.html
│   └── partials/
│       ├── header.html
│       ├── sidebar.html
│       └── modals.html
├── static/
│   ├── css/
│   │   ├── main.css
│   │   ├── dashboard.css
│   │   └── departments.css
│   ├── js/
│   │   ├── main.js
│   │   ├── dashboard.js
│   │   └── departments.js
│   ├── images/
│   │   └── logo.jpg
│   └── data/
│       └── items.js
├── app.py
└── README.md
\`\`\`

## Installation & Setup

### Option 1: Run with Flask

1. Install Python 3.8+ and Flask:
\`\`\`bash
pip install flask
\`\`\`

2. Run the application:
\`\`\`bash
python app.py
\`\`\`

3. Open your browser to `http://localhost:5000`

### Option 2: Static File Server

You can also serve the files using any static file server since the frontend is pure HTML/CSS/JS.

## Brand Colors

- **Primary**: Navy Blue (#001f3f)
- **Accent**: Red (#e60023)
- **Background**: White (#ffffff) and Soft Gray (#f5f6fa)

## Key Features

### Live Timer
Displays current date and time, updating every second in the top navbar.

### Role Switcher
Switch between different user roles (Admin, HOP, Doctor, Pharmacy, Inventory, Lab, Staff) to see role-specific views.

### Search Functionality
- Global search bar in navbar (press `/` to focus)
- Department-specific search bars with real-time filtering

### Dark Mode
Toggle between light and dark themes with persistent localStorage storage.

### Notifications
- Notification drawer with recent alerts
- Toast notifications for user actions
- Badge counter for unread notifications

### Responsive Design
Fully responsive layout that adapts to mobile, tablet, and desktop screens.

## Mock Data

All data is stored in `/static/data/items.js` and includes:
- Pharmacy items (drugs & accessories)
- Requests
- Users
- Audit logs

## Future Enhancements

This is a frontend-only prototype. To make it production-ready:

1. Connect to a real database (PostgreSQL, MySQL, etc.)
2. Implement authentication and authorization
3. Add API endpoints for CRUD operations
4. Implement real-time updates with WebSockets
5. Add data validation and error handling
6. Implement file upload for images
7. Add reporting and analytics features
8. Implement QR code generation for labels

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - Epiconsult Clinic & Diagnostics

## Contact

For support or questions, contact the development team.
