import React, { useState, useEffect } from 'react';
import './AddMainCourse.css'; // Use the same CSS file for consistency

const AddMainCourse = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });
    const [mainCourses, setMainCourses] = useState([]);

    useEffect(() => {
        // Fetch initial list of main courses
        fetchMainCourses();
    }, []);

    const fetchMainCourses = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/main-courses');
            const data = await response.json();
            setMainCourses(data);
        } catch (error) {
            console.error('Error fetching main courses:', error);
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
            const response = await fetch('http://localhost:8080/api/main-courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Clear the form and fetch updated main courses
                setFormData({
                    name: '',
                    description: '',
                    price: ''
                });
                fetchMainCourses();
                setPopupOpen(false);
            } else {
                console.error('Failed to add main course');
            }
        } catch (error) {
            console.error('Error adding main course:', error);
        }
    };

    const togglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    return (
        <div className="add-main-course">
            <h1 className="title">Add Main Course</h1>
            <button className="round-icon" onClick={togglePopup}>
                +
            </button>
            {isPopupOpen && (
                <div className="popup-form">
                    <h2>Add Main Course</h2>
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
                            <button type="submit">Add Main Course</button>
                            <button type="button" className="cancel-button" onClick={togglePopup}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <div className="main-courses-list">
                {mainCourses.map(course => (
                    <div className="main-course-card" key={course.id}>
                    <img src={course.img} alt={course.name} />
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                        <p className='price'>MRP : {course.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddMainCourse;
