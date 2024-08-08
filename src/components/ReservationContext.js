import React, { createContext, useState, useContext } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
    const [reservations, setReservations] = useState([]);

    const addReservation = (reservation) => {
        setReservations((prevReservations) => [...prevReservations, reservation]);
    };

    const removeReservation = (reservationId) => {
        setReservations((prevReservations) => prevReservations.filter(reservation => reservation.id !== reservationId));
    };

    return (
        <ReservationContext.Provider value={{ reservations, addReservation, removeReservation }}>
            {children}
        </ReservationContext.Provider>
    );
};

export const useReservations = () => {
    return useContext(ReservationContext);
};
