# AssetFlow — Enterprise Asset & Resource Management System

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-yellow)

AssetFlow is a full-stack Enterprise Asset & Resource Management System designed to simplify how organizations register, allocate, monitor, maintain, audit, and manage physical assets and shared resources through a centralized ERP platform.

The system replaces manual asset tracking methods such as spreadsheets and paper logs with structured workflows, role-based access, centralized asset lifecycle management, maintenance approval processes, audit cycles, resource booking, notifications, and analytical dashboards.

Developed as a Hackathon project, AssetFlow focuses on delivering a scalable, modular, and production-ready ERP architecture using a React frontend and a Node.js backend while maintaining a clean separation of concerns across all application layers.

---

## Live Demo

> Frontend: Coming Soon

> Backend API: Coming Soon
---

# Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Why AssetFlow](#why-assetflow)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Core ERP Modules](#core-erp-modules)
- [System Highlights](#system-highlights)

---

# Project Overview

AssetFlow provides organizations with a centralized platform for managing enterprise assets throughout their complete lifecycle.

Instead of relying on spreadsheets or disconnected systems, organizations can:

- Register organizational assets
- Maintain departments and employees
- Allocate assets to employees or departments
- Transfer assets between users
- Book shared resources
- Track maintenance requests
- Perform periodic asset audits
- Monitor KPIs through dashboards
- Generate operational reports
- Receive notifications about important activities

The application follows a modular ERP architecture where each business process is implemented as an independent module while remaining connected through a centralized asset lifecycle.

---

# Features

| Module | Status | Description |
|---------|--------|-------------|
| Authentication | ✅ | Login, Employee Registration, Session-ready architecture |
| Dashboard | ✅ | Real-time KPI dashboard with operational overview |
| Organization Setup | ✅ | Departments, Categories and Employee Directory |
| Asset Management | ✅ | Asset registration, search, lifecycle tracking |
| Allocation & Transfer | ✅ | Allocate assets and manage transfers |
| Resource Booking | ✅ | Book shared resources with scheduling support |
| Maintenance Management | ✅ | Raise and monitor maintenance requests |
| Asset Audit | ✅ | Audit cycles and discrepancy management |
| Reports & Analytics | ✅ | Operational reports and analytics dashboards |
| Notifications | ✅ | Activity logs and system notifications |
| Responsive UI | ✅ | Optimized for desktop and tablet devices |
| Modular Architecture | ✅ | Reusable frontend and backend components |

---

# Why AssetFlow

Managing organizational assets manually often leads to:

- Lost assets
- Duplicate allocations
- Scheduling conflicts
- Delayed maintenance
- Poor audit visibility
- Limited reporting

AssetFlow addresses these challenges by introducing structured ERP workflows that provide:

- Centralized asset visibility
- Role-based operations
- Asset lifecycle tracking
- Booking conflict prevention
- Maintenance approval workflows
- Audit management
- Analytical dashboards
- Notification system

The project was designed following modern enterprise software development practices with scalability, maintainability, and modularity as primary objectives.

---

# Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| Icons | React Icons |
| Build Tool | Vite |
| Backend | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| Authentication | JWT |
| API Architecture | REST API |
| Version Control | Git |
| Repository | GitHub |

---

# Project Structure

```text
AssetFlow/
│
├── client/
│
│   ├── public/
│
│   ├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── allocation/
│   │   ├── assets/
│   │   ├── audit/
│   │   ├── auth/
│   │   ├── booking/
│   │   ├── dashboard/
│   │   ├── maintenance/
│   │   ├── notifications/
│   │   ├── organization/
│   │   └── reports/
│   │
│   ├── context/
│   │
│   ├── hooks/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── OrganizationSetup/
│   │   ├── Assets/
│   │   ├── AllocationTransfer/
│   │   ├── ResourceBooking/
│   │   ├── Maintenance/
│   │   ├── Audit/
│   │   ├── Reports/
│   │   └── Notifications/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│
│   ├── src/
│   │
│   ├── config/
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── repositories/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── validations/
│   │
│   └── app.js
│
├── README.md
│
└── LICENSE
```

---

# Core ERP Modules

AssetFlow is divided into independent ERP modules that collectively manage the complete organizational asset lifecycle.

### Authentication

Secure login system with employee registration and role-ready authentication architecture.

---

### Dashboard

Provides operational KPIs including:

- Available Assets
- Allocated Assets
- Active Bookings
- Pending Transfers
- Maintenance Requests
- Upcoming Returns

---

### Organization Setup

Maintains:

- Departments
- Asset Categories
- Employee Directory

This module acts as the master data layer for the ERP.

---

### Asset Management

Supports:

- Asset Registration
- Asset Search
- Asset Directory
- Lifecycle Tracking
- Asset Details

---

### Allocation & Transfer

Handles:

- Asset Allocation
- Asset Transfer
- Return Workflow
- Allocation History

---

### Resource Booking

Allows organizations to manage shared resources through scheduled bookings while preventing conflicts.

---

### Maintenance Management

Tracks the complete maintenance workflow including request creation, approvals, technician assignment, and resolution.

---

### Asset Audit

Supports periodic verification of assets with discrepancy tracking and audit history.

---

### Reports & Analytics

Provides operational insights through dashboards and export-ready reports.

---

### Notifications

Maintains system alerts, activity logs, and important operational updates.

---

# System Highlights

✔ Modular ERP Architecture

✔ Responsive User Interface

✔ Role-based Workflow Ready

✔ REST API Integration Ready

✔ Scalable Backend Structure

✔ Reusable React Components

✔ Enterprise Dashboard

✔ Clean Folder Structure

✔ Production-ready Code Organization

---

# Backend Architecture

## Overview

The backend follows a layered architecture that separates business logic, database access, validation, and routing into independent modules.

Instead of placing all logic inside controllers, AssetFlow uses dedicated service and repository layers, making the application scalable and easier to maintain.

```
HTTP Request
      │
      ▼
Express Route
      │
      ▼
Validation Middleware
      │
      ▼
Controller
      │
      ▼
Service Layer
      │
      ▼
Repository Layer
      │
      ▼
MongoDB Database
      │
      ▼
JSON Response
```

---

## Backend Layers

### Routes

Routes define the application's REST API endpoints and map incoming requests to their respective controllers.

Current route modules include:

- Authentication
- Dashboard
- Departments
- Categories
- Employees
- Assets
- Asset Allocation
- Resource Booking
- Maintenance
- Asset Audit
- Reports
- Notifications & Activity Logs

---

### Controllers

Controllers receive validated requests and coordinate business operations.

Responsibilities include:

- Receiving HTTP requests
- Calling service methods
- Returning standardized JSON responses
- Handling status codes

Controllers do not contain business logic directly.

---

### Services

The service layer contains the application's core business logic.

Examples include:

- User authentication
- Asset allocation validation
- Booking conflict checks
- Maintenance workflow
- Dashboard KPI calculations
- Audit report generation

Keeping business logic inside services improves maintainability and testability.

---

### Repository Layer

Repositories provide an abstraction over MongoDB operations.

Instead of querying the database directly inside controllers, repositories handle:

- Create operations
- Read operations
- Updates
- Deletions
- Aggregation queries

This separation allows the service layer to remain database-independent.

---

### Middleware

Middleware handles cross-cutting concerns such as:

- Authentication
- Authorization
- Request validation
- Error handling
- Protected routes

---

### Validation

Incoming requests are validated before reaching controllers.

Validation ensures:

- Required fields exist
- Email format is correct
- Invalid requests are rejected early
- Consistent API behavior

---

# Frontend Architecture

## Overview

The frontend is built using React with a component-driven architecture.

Every ERP module is isolated into reusable components while pages coordinate user interaction and API communication.

```
User
   │
   ▼
React Router
   │
   ▼
Pages
   │
   ▼
Reusable Components
   │
   ▼
Services
   │
   ▼
REST APIs
```

---

## Component-Based Design

The application follows a modular component hierarchy.

Examples include:

### Authentication

- Login
- Register
- Auth Card
- Login Form
- Register Form

---

### Dashboard

- KPI Cards
- Recent Activity
- Quick Actions
- Alert Banner

---

### Organization

- Department Table
- Employee Table
- Category Management
- Status Badge

---

### Assets

- Asset Table
- Asset Filters
- Asset Statistics
- Asset Details Drawer
- Add Asset Modal

---

### Allocation

- Allocation Table
- Allocation Statistics
- Allocation Filters

---

### Booking

- Booking Table
- Booking Statistics
- Booking Filters

---

### Maintenance

- Maintenance Table
- Maintenance Statistics
- Maintenance Filters

---

### Audit

- Audit Table
- Audit Statistics
- Audit Filters

---

### Reports

- Charts
- Summary Cards
- Report Table

---

### Notifications

- Notification Cards
- Notification Table
- Notification Filters

---

## Routing

React Router is used to organize application navigation.

Current routes include:

```
/
│
├── Dashboard
├── Organization
├── Assets
├── Allocation
├── Booking
├── Maintenance
├── Audit
├── Reports
└── Notifications
```

The layout remains consistent while page content changes dynamically.

---

# Database Models & Relationships

The application manages multiple business entities.

```
Department
     │
     ├──────────────┐
     ▼              ▼
Employees       Assets
     │              │
     ▼              ▼
Bookings     Maintenance
     │              │
     └──────┬───────┘
            ▼
         Audit
            │
            ▼
      Notifications
```

---

## Main Collections

### Users

Stores authentication details.

Fields include:

- Name
- Email
- Password
- Role

---

### Departments

Stores organizational departments.

Examples:

- Engineering
- HR
- Operations
- Finance

---

### Categories

Stores asset classifications.

Examples:

- Electronics
- Furniture
- Vehicles
- Office Equipment

---

### Employees

Stores employee information.

Each employee belongs to one department.

---

### Assets

Stores:

- Asset Name
- Category
- Department
- Serial Number
- Asset Tag
- Status
- Condition
- Location

---

### Allocations

Stores:

- Asset
- Employee
- Department
- Allocation Date
- Return Date

---

### Bookings

Stores shared resource reservations.

---

### Maintenance

Stores maintenance requests and workflow status.

---

### Audits

Stores audit cycles and verification results.

---

### Notifications

Stores alerts generated by system activities.

---

# Request Lifecycle

Every request follows a consistent workflow.

```
Browser
     │
     ▼
React Component
     │
     ▼
Axios Service
     │
     ▼
REST API
     │
     ▼
Express Route
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Repository
     │
     ▼
MongoDB
     │
     ▼
JSON Response
     │
     ▼
React UI Updates
```

---

# Design Decisions

Several architectural decisions were made during development.

### Modular Components

Each ERP module is independent and reusable.

---

### Shared Layout

A common sidebar and navigation bar provide consistent navigation throughout the application.

---

### Layered Backend

Business logic remains separated from database operations.

---

### RESTful APIs

Each ERP module exposes dedicated REST endpoints.

---

### Responsive Design

Tailwind CSS ensures compatibility across desktop and tablet devices.

---

### Scalable Folder Structure

Frontend and backend follow structured directories that simplify long-term maintenance.

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register Employee |
| POST | `/auth/login` | Login User |
| GET | `/auth/me` | Get Logged-in User |

---

## Dashboard

| Method | Endpoint |
|---------|-----------|
| GET | `/dashboard` |

---

## Departments

| Method | Endpoint |
|---------|-----------|
| GET | `/departments` |
| POST | `/departments` |
| PUT | `/departments/:id` |
| DELETE | `/departments/:id` |

---

## Assets

| Method | Endpoint |
|---------|-----------|
| GET | `/assets` |
| POST | `/assets` |
| PUT | `/assets/:id` |
| DELETE | `/assets/:id` |

---

## Allocation

| Method | Endpoint |
|---------|-----------|
| GET | `/allocations` |
| POST | `/allocations` |

---

## Booking

| Method | Endpoint |
|---------|-----------|
| GET | `/bookings` |
| POST | `/bookings` |

---

## Maintenance

| Method | Endpoint |
|---------|-----------|
| GET | `/maintenance` |
| POST | `/maintenance` |

---

## Audit

| Method | Endpoint |
|---------|-----------|
| GET | `/audits` |
| POST | `/audits` |

---

## Reports

| Method | Endpoint |
|---------|-----------|
| GET | `/reports` |

---

## Notifications

| Method | Endpoint |
|---------|-----------|
| GET | `/system` |

---

---

# Local Setup Instructions

## Prerequisites

Ensure the following software is installed before running the project.

| Software | Version |
|----------|---------|
| Node.js | >= 18.x |
| npm | >= 9.x |
| MongoDB | Latest |
| Git | Latest |

---

## Clone Repository

```bash
git clone https://github.com/Shreya-1416/AssetFlow.git

cd AssetFlow
```

---

# Backend Setup

Navigate to the server directory.

```bash
cd server
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRE=7d
```

Run the backend server.

```bash
npm start
```

or

```bash
npm run dev
```

Backend will start on

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal.

```bash
cd client

npm install
```

Run the React application.

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Environment Variables

### Backend

```env
PORT=5000

MONGODB_URI=<MongoDB Connection String>

JWT_SECRET=<Secret Key>

JWT_EXPIRE=7d
```

---

### Frontend

If required:

```env
VITE_API_URL=http://localhost:5000
```

---

# Running the Complete Application

### Terminal 1

```bash
cd server

npm run dev
```

---

### Terminal 2

```bash
cd client

npm run dev
```

---

Visit

```
http://localhost:5173
```

---

# User Roles

AssetFlow follows a role-based ERP workflow.

## Admin

Responsibilities

- Manage Departments
- Manage Categories
- Manage Employees
- Assign Roles
- Monitor Dashboard
- Generate Reports
- View Notifications
- Create Audit Cycles

---

## Asset Manager

Responsibilities

- Register Assets
- Allocate Assets
- Transfer Assets
- Approve Maintenance
- Manage Asset Lifecycle
- Resolve Audit Discrepancies

---

## Department Head

Responsibilities

- View Department Assets
- Approve Department Transfers
- Book Shared Resources
- Monitor Department Activity

---

## Employee

Responsibilities

- View Assigned Assets
- Book Resources
- Raise Maintenance Requests
- Initiate Transfer Requests
- Initiate Return Requests

---

# ERP Workflow

```
                     LOGIN
                       │
                       ▼
                 Dashboard
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
 Organization      Assets       Reports
        │              │
        ▼              ▼
 Departments      Register Asset
 Categories             │
 Employees              ▼
                   Asset Directory
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
 Allocation         Booking        Maintenance
        │                │                │
        ▼                ▼                ▼
 Transfer        Shared Resources   Technician
        │                │
        └────────────┬───┘
                     ▼
                 Audit Cycle
                     │
                     ▼
             Notifications
```

---

# Business Workflow

```
Employee Login
        │
        ▼
Dashboard
        │
        ▼
Register Asset
        │
        ▼
Allocate Asset
        │
        ▼
Book Resource
        │
        ▼
Raise Maintenance
        │
        ▼
Maintenance Approval
        │
        ▼
Audit Verification
        │
        ▼
Reports & Analytics
        │
        ▼
Notifications
```

---

# Deployment

## Frontend

Recommended Platforms

- Vercel
- Netlify

Build command

```bash
npm run build
```

Output folder

```
dist
```

---

## Backend

Recommended Platforms

- Render
- Railway
- AWS EC2
- DigitalOcean

Run command

```bash
npm start
```

---

# Screenshots

Create a folder named

```
screenshots/
```

Recommended screenshots

```
Login.png

Register.png

Dashboard.png

Organization.png

Assets.png

Allocation.png

Booking.png

Maintenance.png

Audit.png

Reports.png

Notifications.png
```

Then reference them like

```md
## Login

![Login](screenshots/Login.png)

---

## Dashboard

![Dashboard](screenshots/Dashboard.png)

---

## Assets

![Assets](screenshots/Assets.png)

---

## Reports

![Reports](screenshots/Reports.png)
```

---

# Project Highlights

✔ Modern React Architecture

✔ Enterprise ERP Design

✔ Modular Backend Architecture

✔ RESTful API Design

✔ MongoDB Database

✔ JWT Authentication Ready

✔ Responsive Dashboard

✔ Reusable Components

✔ Scalable Folder Structure

✔ Clean UI/UX

✔ Full Stack Ready

✔ Production-Oriented Architecture

---

---

# Future Enhancements

Future versions of AssetFlow may include:

- QR Code & Barcode scanning
- Email notifications
- Real-time notifications
- Mobile application
- Advanced analytics dashboard

# Contributors

## Frontend Development

**Shreya Gupta**

Responsibilities:

- UI/UX Design
- React.js Development
- Tailwind CSS Implementation
- Responsive Layouts
- Component Architecture
- Dashboard Design
- Authentication Screens
- ERP Module Interfaces

---

## Backend Development

**Paras Singh**

Responsibilities:

- Express.js Backend
- MongoDB Database Design
- REST API Development
- Authentication APIs
- Business Logic
- Middleware
- Repository Layer
- Service Layer
- API Validation

---

# Acknowledgements

This project was developed as part of a Hackathon focused on building a modern Enterprise Asset & Resource Management System.

Special thanks to the organizers for providing an engaging problem statement that encouraged the implementation of real-world ERP workflows involving asset management, resource booking, maintenance, auditing, reporting, and role-based operations.

---

# License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for educational and non-commercial purposes in accordance with the terms of the license.

---

