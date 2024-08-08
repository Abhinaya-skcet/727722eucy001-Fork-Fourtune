import React, { useState, useEffect } from 'react';
import './AddMainCourse.css'; // Use the same CSS file for consistency

const AddDesserts = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        img: '' // Include img field if necessary
    });
    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        // Fetch initial list of desserts
        fetchDesserts();
    }, []);

    const fetchDesserts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/desserts');
            const data = await response.json();
            setDesserts(data);
        } catch (error) {
            console.error('Error fetching desserts:', error);
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
            const response = await fetch('http://localhost:8080/api/desserts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Clear the form and fetch updated desserts
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    img: ''
                });
                fetchDesserts();
                setPopupOpen(false);
            } else {
                console.error('Failed to add dessert');
            }
        } catch (error) {
            console.error('Error adding dessert:', error);
        }
    };

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    return (
        <div className="add-main-course">
            <h1 className="title">Add Dessert</h1>
            <button className="round-icon" onClick={togglePopup}>
                +
            </button>
            {isPopupOpen && (
                <div className="popup-form">
                    <h2>Add Dessert</h2>
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
                                placeholder="e.g., /Desserts/img1.jpeg"
                            />
                        </label>
                        <div className="button-group">
                            <button type="submit">Add Dessert</button>
                            <button type="button" className="cancel-button" onClick={togglePopup}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <div className="main-courses-list">
                {desserts.map(dessert => (
                    <div className="main-course-card" key={dessert.id}>
                        <img src={dessert.img} alt={dessert.name} />
                        <h3>{dessert.name}</h3>
                        <p>{dessert.description}</p>
                        <p className='price'>MRP : ${dessert.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddDesserts;
