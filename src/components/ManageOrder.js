import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageOrder.css'; // Ensure the correct CSS file is imported

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await axios.post(`http://localhost:8080/api/orders/${orderId}/status`, { status });
            await axios.post(`http://localhost:8080/api/notifications`, { orderId, status }); // Notify customer
            fetchOrders(); // Refresh the list of orders
            alert(`Order ${status.toLowerCase()}!`);
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status.');
        }
    };

    return (
        <div className="manage-orders">
            <header className="manage-orders-header">
                <h1>Manage Orders</h1>
            </header>
            <section className="orders-section">
                <div className="orders-cards">
                    {orders.map(order => (
                        <div className="order-card" key={order.id}>
                            <div className="order-card-content">
                                <h3>{order.menuItem}</h3>
                                <p><strong>Quantity:</strong> {order.quantity}</p>
                                <p><strong>Address:</strong> {order.address}</p>
                                <p><strong>Additional Details:</strong> {order.additionalDetails}</p>
                                <div className="order-actions">
                                    <button className="accept-button" onClick={() => updateOrderStatus(order.id, 'ACCEPTED')}>Accept</button>
                                    <button className="reject-button" onClick={() => updateOrderStatus(order.id, 'REJECTED')}>Reject</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ManageOrders;
