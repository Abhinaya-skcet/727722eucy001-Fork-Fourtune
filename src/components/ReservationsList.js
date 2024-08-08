import React, { useEffect, useState } from 'react';
import './ReservationsList.css';

const ReservationsList = () => {
    const [reservations, setReservations] = useState({});

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/reservations/unique');
            const data = await response.json();

            if (typeof data === 'object') {
                setReservations(data);
            } else {
                console.error('Data is not an object:', data);
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    return (
        <div className="reservations-list">
            <header className="list-header">
                <h1>Reservations List</h1>
            </header>
            <table className="reservations-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(reservations).map(email => (
                        reservations[email].map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.userEmail}</td>
                                <td>{reservation.reservationDate}</td>
                                <td>{reservation.status}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsList;
