# Event Ticket Booking Frontend

Frontend for an Event Ticket Booking application built with **React.js** and **Tailwind CSS**.
This application allows users to browse events, view seat availability, reserve seats for a limited duration, and confirm bookings.

---

## Features

* View all available events
* View detailed event information
* Interactive seat selection grid
* Seat status visualization:

  * 🟢 Available
  * 🟡 Reserved
  * 🔴 Booked
  * 🔵 Selected
* Reserve multiple seats for 10 minutes
* Countdown timer for active reservations
* Confirm booking before reservation expiry
* Authentication-based seat reservation
* Error handling for unavailable seats
* Responsive UI

---

## Tech Stack

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Hot Toast

---

## Project Structure

```bash
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── SeatGrid.jsx
│   ├── CountdownTimer.jsx
│   ├── Loading.jsx
│   └── Error.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── EventDetails.jsx
│
├── services/
│   └── api.js
│
└── App.jsx
```

---

## Installation

Clone repository:

```bash
git clone <frontend-repo-url>
```

Move into project folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## Environment Variables

Create `.env` file in root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Reservation Flow

1. User selects seats from seat grid
2. Clicks **Reserve Seats**
3. Backend validates seat availability
4. Seats are reserved for 10 minutes
5. Countdown timer starts
6. User confirms booking before timer expires
7. If timer expires, reservation becomes invalid

---

## Design Decisions

### Component-Based Architecture

UI is divided into reusable components such as:

* Navbar
* SeatGrid
* CountdownTimer
* Loading
* Error

### State Management

React Hooks (`useState`, `useEffect`) are used for:

* Event details
* Seat selection
* Reservation state
* Booking state
* Timer visibility

### Error Handling

The frontend handles:

* Failed API calls
* Seat conflicts
* Booking failures
* Expired reservations
* Unauthorized actions

### Seat Status Updates

Seat availability is refreshed after:

* Reservation
* Booking
* Reservation expiry

This ensures the UI always reflects the latest backend state.

---

## Assumptions

* User authentication is handled via JWT token
* Backend handles reservation expiry logic
* Backend prevents double booking using atomic operations / transactions

---


