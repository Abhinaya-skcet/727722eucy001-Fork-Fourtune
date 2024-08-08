import React, { useState, useEffect } from 'react';
import './AddMainCourse.css'; // Use the same CSS file for consistency

const AddBeverages = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        img: '' // Include img field if necessary
    });
    const [beverages, setBeverages] = useState([]);

    useEffect(() => {
        // Fetch initial list of beverages
        fetchBeverages();
    }, []);

    const fetchBeverages = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/beverages');
            const data = await response.json();
            setBeverages(data);
        } catch (error) {
            console.error('Error fetching beverages:', error);
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
            const response = await fetch('http://localhost:8080/api/beverages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Clear the form and fetch updated beverages
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    img: '' // Reset img field
                });
                fetchBeverages();
                setPopupOpen(false);
            } else {
                console.error('Failed to add beverage');
            }
        } catch (error) {
            console.error('Error adding beverage:', error);
        }
    };

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    return (
        <div className="add-main-course">
            <h1 className="title">Add Beverage</h1>
            <button className="round-icon" onClick={togglePopup}>
                +
            </button>
            {isPopupOpen && (
                <div className="popup-form">
                    <h2>Add Beverage</h2>
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
                                placeholder="e.g., /Beverages/img1.jpeg"
                            />
                        </label>
                        <div className="button-group">
                            <button type="submit">Add Beverage</button>
                            <button type="button" className="cancel-button" onClick={togglePopup}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <div className="main-courses-list">
                {beverages.map(beverage => (
                    <div className="main-course-card" key={beverage.id}>
                        <img src={beverage.img} alt={beverage.name} />
                        <h3>{beverage.name}</h3>
                        <p>{beverage.description}</p>
                        <p className='price'>MRP : {beverage.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddBeverages;
