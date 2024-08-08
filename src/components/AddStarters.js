import React, { useState, useEffect } from 'react';
import './AddStarters.css';

const AddStarters = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        img: ''
    });
    const [starters, setStarters] = useState([]);

    useEffect(() => {
        fetchStarters();
    }, []);

    const fetchStarters = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/starters');
            const data = await response.json();
            setStarters(data);
        } catch (error) {
            console.error('Error fetching starters:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/starters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    img: ''
                });
                fetchStarters();
                setPopupOpen(false);
            } else {
                console.error('Failed to add starter');
            }
        } catch (error) {
            console.error('Error adding starter:', error);
        }
    };

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    return (
        <div className="add-starters">
            <h1 className="title">Add Starters</h1>
            <button className="round-icon" onClick={togglePopup}>+</button>
            {isPopupOpen && (
                <div className="popup-form">
                    <h2>Add Starter</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Image Path:
                            <input
                                type="text"
                                name="img"
                                value={formData.img}
                                onChange={handleInputChange}
                                placeholder="e.g., /Starters/img1.jpeg"
                            />
                        </label>
                        <div className="button-group">
                            <button type="submit">Add Starter</button>
                            <button type="button" className="cancel-button" onClick={togglePopup}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <div className="starters-list">
                {starters.map(starter => (
                    <div className="starter-card" key={starter.id}>
                        <img src={starter.img} alt={starter.name} />
                        <h3>{starter.name}</h3>
                        <p>{starter.description}</p>
                        <p className="price">MRP : {starter.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddStarters;
