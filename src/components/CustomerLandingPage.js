import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './CustomerLandingPage.css';
import logo from './fork & fortune.jpg';

Modal.setAppElement('#root');

const CustomerHome = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [notification, setNotification] = useState(null);

    const userEmail = localStorage.getItem('userEmail'); // Retrieve email from local storage

    useEffect(() => {
        if (userEmail) {
            fetchReservations();
            const intervalId = setInterval(fetchReservations, 5000); // Poll every 5 seconds

            return () => clearInterval(intervalId); // Clear interval on component unmount
        }
    }, [userEmail]); // Re-run effect if userEmail changes

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const reservationData = {
            id: new Date().getTime(), // Generate a unique ID for simplicity (backend may use auto-incremented ID)
            name: formData.get('name'),
            email: formData.get('email'),
            reservationDate: formData.get('date'),
            reservationTime: formData.get('time'),
            numberOfGuests: parseInt(formData.get('guests'), 10),
        };

        try {
            const response = await fetch('http://localhost:8080/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });
            if (response.ok) {
                alert('Reservation submitted for owner review!');
                closeModal();
                fetchReservations(); // Refresh reservations
            } else {
                console.error('Failed to submit reservation:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
        }
    };

    const fetchReservations = async () => {
        if (!userEmail) return; // Exit if no email

        try {
            const response = await fetch(`http://localhost:8080/api/reservations/user/${userEmail}`);
            const data = await response.json();
            setReservations(data);

            // Check for new notifications
            const recentNotification = data.find(reservation => reservation.status === 'ACCEPTED' || reservation.status === 'REJECTED');
            if (recentNotification) {
                setNotification(`Your reservation on ${recentNotification.reservationDate} has been ${recentNotification.status.toLowerCase()}.`);
                setTimeout(() => setNotification(null), 20000); // Clear notification after 20 seconds
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Forks & Fortune Logo" className="logo" />
                </div>
                <ul className="navbar-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                    <li><a href="/menu">Menu</a></li>
                    <li><a href="#" onClick={openModal} className="reservation-link">Reservation</a></li>
                    <li><a href="/online-ordering">Online Ordering</a></li>
                </ul>
            </nav>
            <header className="header" id="home">
                <h1>Welcome to Forks & Fortune</h1>
                <p>Your favorite place for delicious food</p>
            </header>
            <section id="about" className="section about-section">
                <h2>About Us</h2>
                <div className="card-container">
                    <div className="card">
                        <h3>Our Story</h3>
                        <p>Forks & Fortune is a fine dining restaurant offering a variety of exquisite dishes made with the freshest ingredients...</p>
                    </div>
                </div>
            </section>
            <section id="contact" className="section contact-section">
                <h2>Contact Us</h2>
                <div className="card-container">
                    <div className="card">
                        <h3>Get in Touch</h3>
                        <p>Reach out us fork&fortune.com or call us at (123) 456-7890...</p>
                    </div>
                </div>
            </section>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Reservation Form"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button className="modal-close-button" onClick={closeModal}>&times;</button>
                <h2>Make a Reservation</h2>
                <form onSubmit={handleSubmit} className="reservation-form">
                    <label>
                        Name:
                        <input type="text" name="name" required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={userEmail} readOnly />
                    </label>
                    <label>
                        Date:
                        <input type="date" name="date" required />
                    </label>
                    <label>
                        Time:
                        <input type="time" name="time" required />
                    </label>
                    <label>
                        Number of Guests:
                        <input type="number" name="guests" min="1" required />
                    </label>
                    <button type="submit">Submit Reservation</button>
                </form>
            </Modal>
            <footer className="footer">
                <p>© 2024 Forks & Fortune. All rights reserved.</p>
            </footer>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
};

export default CustomerHome;
