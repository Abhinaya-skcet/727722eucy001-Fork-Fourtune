import React, { useEffect, useState } from 'react';
import './ReservationPage.css';

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/reservations');
                const data = await response.json();
                setReservations(data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    const handleAccept = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/reservations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accepted: true }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedReservation = await response.json();
            setReservations(reservations.map(reservation => 
                reservation.id === id ? updatedReservation : reservation
            ));
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/reservations/${id}`, {
                method: 'DELETE',
            });
            
            setReservations(reservations.filter(reservation => reservation.id !== id));
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    return (
        <div className="reservations-page">
            <h1>Reservations</h1>
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
                            <td>{reservation.date}</td>
                            <td>{reservation.time}</td>
                            <td>{reservation.guests}</td>
                            <td>
                                {reservation.accepted ? (
                                    <span>Accepted</span>
                                ) : (
                                    <>
                                        <button onClick={() => handleAccept(reservation.id)}>Accept</button>
                                        <button onClick={() => handleReject(reservation.id)}>Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsPage;
