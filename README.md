Full-Stack Task Management System
A complete full-stack web application built with Flask backend and vanilla JavaScript frontend, demonstrating modern full-stack development skills with Python, REST APIs, and containerization.

🚀 Features
User Authentication: Secure registration and login system

Task Management: Full CRUD operations for tasks

Task Status Tracking: Todo, In Progress, Done statuses

Priority System: Low, Medium, High priority levels

RESTful API: Clean API design with proper HTTP methods

Responsive Design: Mobile-friendly UI

Session Management: Secure user sessions

Docker Containerization: Easy deployment with Docker

🛠️ Technology Stack
Backend
Python Flask - Web framework

SQLAlchemy - ORM for database operations

SQLite - Database (development)

REST API - Clean API design

Frontend
Vanilla JavaScript - No frameworks for simplicity

HTML5 & CSS3 - Modern responsive design

Fetch API - HTTP requests

Deployment
Docker - Containerization

Docker Compose - Multi-container orchestration

Nginx - Web server for frontend

📋 Prerequisites
Docker and Docker Compose

Or Python 3.9+ and a web browser for development

🚀 Quick Start
Using Docker (Recommended)
Clone and setup:

bash
git clone <repository-url>
cd taskmanager
Run with Docker:

bash
docker-compose up --build
Access the application:

Frontend: http://localhost:8080

Backend API: http://localhost:5000

Manual Development Setup
Backend
bash
cd backend
python -m venv venv

# On Windows:

venv\Scripts\activate

# On Mac/Linux:

source venv/bin/activate

pip install -r requirements.txt
python app.py
Frontend
bash
cd frontend

# Serve with any static server:

python -m http.server 8080

# or

npx serve .
🗄️ API Endpoints
Authentication
POST /api/register - User registration

POST /api/login - User login

POST /api/logout - User logout

GET /api/user - Get current user info

Tasks
GET /api/tasks - Get all tasks for user

POST /api/tasks - Create new task

GET /api/tasks/<id> - Get specific task

PUT /api/tasks/<id> - Update task

DELETE /api/tasks/<id> - Delete task

Health Check
GET /api/health - API health status

🗃️ Database Schema
Users Table
id (Integer, Primary Key)

username (String, Unique)

email (String, Unique)

password_hash (String)

created_at (DateTime)

Tasks Table
id (Integer, Primary Key)

title (String)

description (Text)

status (String) - todo, in_progress, done

priority (String) - low, medium, high

due_date (DateTime)

user_id (Integer, Foreign Key)

created_at (DateTime)

updated_at (DateTime)

🐳 Docker Configuration
Services
backend: Flask API server (port 5000)

frontend: Nginx serving static files (port 8080)

Docker Commands
bash

# Build and start containers

docker-compose up --build

# Start in detached mode

docker-compose up -d

# Stop containers

docker-compose down

# View logs

docker-compose logs

# Rebuild specific service

docker-compose build backend
🧪 Testing
Run Tests
bash
cd backend
python test_app.py
Test Coverage
User registration and validation

Duplicate username/email handling

Authentication flow

API endpoint testing

📁 Project Structure
text
taskmanager/
├── backend/
│ ├── app.py # Main Flask application
│ ├── auth.py # Authentication utilities
│ ├── models.py # Database models
│ ├── requirements.txt # Python dependencies
│ └── Dockerfile # Backend container configuration
├── frontend/
│ ├── index.html # Main HTML file
│ ├── styles.css # CSS styles
│ ├── auth.js # Authentication logic
│ ├── app.js # Main application logic
│ └── Dockerfile # Frontend container configuration
├── docker-compose.yml # Multi-container configuration
├── test_app.py # Test cases
└── README.md # Project documentation
🔧 Development
Adding New Features
Backend: Add new API endpoints in app.py

Frontend: Update JavaScript in app.js or auth.js

Database: Update models in models.py if needed

Code Patterns
RESTful API design with proper HTTP status codes

Session-based authentication

Error handling with meaningful messages

Responsive CSS with mobile-first approach

Modular JavaScript with class-based organization

🎯 Resume-Worthy Features Demonstrated
✅ Full-Stack Development: Python Flask + Vanilla JS

✅ RESTful API Design: Proper endpoints and HTTP methods

✅ Database Operations: SQLAlchemy with SQLite

✅ User Authentication: Session-based login system

✅ CRUD Operations: Complete task management

✅ Responsive Design: Mobile-friendly UI

✅ Error Handling: Comprehensive error management

✅ Docker Containerization: Multi-container deployment

✅ Code Organization: Modular, maintainable structure

✅ Security: Password hashing, input validation

🐛 Troubleshooting
Common Issues
Port already in use

Change ports in docker-compose.yml

Or stop existing services on ports 5000/8080

Database connection issues

Ensure SQLite file permissions

Check database path in configuration

CORS errors

Verify Flask-CORS configuration

Check frontend API base URL

Session not persisting

Ensure credentials: 'include' in fetch requests

Check same-origin policy

Logs and Debugging
bash

# View backend logs

docker-compose logs backend

# View frontend logs

docker-compose logs frontend

# Check container status

docker-compose ps
📈 Future Enhancements
Task categories and tags

File attachments for tasks

Real-time updates with WebSockets

Task sharing and collaboration

Advanced filtering and search

Email notifications

OAuth integration

PostgreSQL for production

👨‍💻 Author
Built as a demonstration of full-stack development skills with Python backend expertise.

📄 License
This project is open source and available under the MIT License.

Deployment Note: For production deployment, consider using:

PostgreSQL instead of SQLite

Environment variables for configuration

SSL/TLS encryption

Proper secret key management

Production WSGI server (Gunicorn)
