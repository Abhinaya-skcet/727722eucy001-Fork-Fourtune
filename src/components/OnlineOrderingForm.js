import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import Axios
import './OnlineOrderingForm.css'; // Import your CSS file for styling

const OnlineOrderingForm = () => {
    const [orderDetails, setOrderDetails] = useState({
        menuItem: '',
        quantity: 1,
        address: '',
        additionalDetails: ''
    });

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrderDetails({
            ...orderDetails,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send POST request to backend
            const response = await axios.post('http://localhost:8080/api/orders', orderDetails);
            const newOrder = response.data; // Get the response from backend

            setOrders([...orders, newOrder]);
            setOrderDetails({
                menuItem: '',
                quantity: 1,
                address: '',
                additionalDetails: ''
            });
            alert('Order placed successfully!'); // Alert after order placement
            navigate('/customer-home'); // Navigate to the Customer Home page
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="online-ordering-form">
            <h2>Online Ordering</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Menu Item:
                    <input
                        type="text"
                        name="menuItem"
                        value={orderDetails.menuItem}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={orderDetails.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </label>
                <label>
                    Address:
                    <textarea
                        name="address"
                        value={orderDetails.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Additional Details:
                    <textarea
                        name="additionalDetails"
                        value={orderDetails.additionalDetails}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Place Order</button>
            </form>

            <h3>Orders</h3>
            <ul className="order-list">
                {orders.map(order => (
                    <li key={order.id}>
                        <strong>Menu Item:</strong> {order.menuItem} <br />
                        <strong>Quantity:</strong> {order.quantity} <br />
                        <strong>Address:</strong> {order.address} <br />
                        <strong>Additional Details:</strong> {order.additionalDetails}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OnlineOrderingForm;
