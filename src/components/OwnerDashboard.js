import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate
import './OwnerDashboard.css';
import logo from './fork & fortune.jpg';

const OwnerDashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [notifications, setNotifications] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/bookings');
            const data = await response.json();

            if (Array.isArray(data)) {
                setReservations(data);

                // Calculate notifications for pending reservations
                const pendingReservations = data.filter(reservation => reservation.status === 'PENDING');
                setNotifications(pendingReservations.length);
            } else {
                console.error('Data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const updateReservationStatus = async (reservation, status) => {
        try {
            // Update reservation status
            const response = await fetch('http://localhost:8080/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reservationDate: reservation.reservationDate,
                    status,
                    userEmail: reservation.email
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update reservation status');
            }

            // Proceed to delete the booking
            await deleteBooking(reservation.email);

            // Refresh the reservations list
            fetchReservations();
            setNotifications(prevNotifications => prevNotifications - 1);
            alert(`Reservation ${status.toLowerCase()}!`);
        } catch (error) {
            console.error(`Error ${status.toLowerCase()} reservation:`, error);
            alert(`An error occurred while ${status.toLowerCase()} the reservation.`);
        }
    };

    const deleteBooking = async (userEmail) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookings/${userEmail}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            alert('Failed to delete the booking.');
        }
    };

    const handleCustomerOrderDetailsClick = () => {
        navigate('/manage-orders'); // Navigate to the Manage Orders page
    };

    return (
        <div className="dashboard">
            <nav className="navbar">
                <img src={logo} alt="Restaurant Logo" className="logo" />
                <div className="navbar-right">
                    <button className="profile-button" onClick={handleCustomerOrderDetailsClick}>
                        Customer Order Details
                    </button>
                    <Link to="/reservations-list">
                        <button className="reservations-button">Reservations List</button>
                    </Link>
                    <button className="logout-button">Logout</button>
                    <div className="notifications">
                        <span className="notification-icon">🔔</span>
                        {notifications > 0 && <span className="notification-count">{notifications}</span>}
                    </div>
                </div>
            </nav>
            <header className="dashboard-header">
                <h1>Owner Dashboard</h1>
            </header>
            <section className="dashboard-options">
                <div className="option">
                    <h3>Starters</h3>
                    <Link to="/starters">
                        <button className="add-button">Add Starters</button>
                    </Link>
                </div>
                <div className="option">
                    <h3>Main Course</h3>
                    <Link to="/main-course">
                        <button className="add-button">Add Main Course</button>
                    </Link>
                </div>
                <div className="option">
                    <h3>Desserts</h3>
                    <Link to="/desserts">
                        <button className="add-button">Add Desserts</button>
                    </Link>
                </div>
                <div className="option">
                    <h3>Beverages</h3>
                    <Link to="/beverages">
                        <button className="add-button">Add Beverages</button>
                    </Link>
                </div>
            </section>
            <section className="reservations-section">
                <h2>Reservations</h2>
                <table className="reservations-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Guests</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.name}</td>
                                <td>{reservation.email}</td>
                                <td>{reservation.reservationDate}</td>
                                <td>{reservation.reservationTime}</td>
                                <td>{reservation.numberOfGuests}</td>
                                <td>
                                    {reservation.status === 'ACCEPTED' ? (
                                        <span>Accepted</span>
                                    ) : (
                                        <>
                                            <button onClick={() => updateReservationStatus(reservation, 'ACCEPTED')}>Accept</button>
                                            <button onClick={() => updateReservationStatus(reservation, 'REJECTED')}>Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default OwnerDashboard;
