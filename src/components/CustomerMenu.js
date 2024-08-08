import React, { useEffect, useState } from 'react';
import './CustomerMenu.css';
import logo from './fork & fortune.jpg'; // Update this path to your actual logo path

const MenuLandingPage = () => {
    const [starters, setStarters] = useState([]);
    const [mainCourse, setMainCourse] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [error, setError] = useState(null); // To track errors

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const [startersRes, mainCourseRes, dessertsRes, beveragesRes] = await Promise.all([
                    fetch('http://localhost:8080/api/starters'),
                    fetch('http://localhost:8080/api/main-courses'),
                    fetch('http://localhost:8080/api/desserts'),
                    fetch('http://localhost:8080/api/beverages')
                ]);

                if (startersRes.ok && mainCourseRes.ok && dessertsRes.ok && beveragesRes.ok) {
                    const [startersData, mainCourseData, dessertsData, beveragesData] = await Promise.all([
                        startersRes.json(),
                        mainCourseRes.json(),
                        dessertsRes.json(),
                        beveragesRes.json()
                    ]);

                    setStarters(startersData);
                    setMainCourse(mainCourseData);
                    setDesserts(dessertsData);
                    setBeverages(beveragesData);
                } else {
                    throw new Error('Error fetching menu items');
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
                setError('Failed to fetch menu items. Please try again later.');
            }
        };

        fetchMenuItems();
    }, []);

    const handleLinkClick = (event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="navbar-logo">
                    <a href="/">
                        <img src={logo} alt="Forks & Fortune Logo" className="logo" />
                    </a>
                </div>
                <ul className="navbar-links">
                    <li><a href="#menu-type-1" onClick={(e) => handleLinkClick(e, 'menu-type-1')}>Starters</a></li>
                    <li><a href="#menu-type-2" onClick={(e) => handleLinkClick(e, 'menu-type-2')}>Main Course</a></li>
                    <li><a href="#dessert" onClick={(e) => handleLinkClick(e, 'dessert')}>Dessert</a></li>
                    <li><a href="#beverages" onClick={(e) => handleLinkClick(e, 'beverages')}>Beverages</a></li>
                </ul>
            </nav>
            <header className="header" id="menu">
                <h1>Our Menu</h1>
                <p>Explore our wide variety of dishes</p>
            </header>
            {error && <p className="error-message">{error}</p>}
            <section id="menu-type-1" className="section menu-section">
                <h2>Starters</h2>
                <div className="card-container">
                    {starters.map(starter => (
                        <div className="card" key={starter.id}>
                            <img src={starter.img} alt={starter.name} className="menu-item-img" />
                            <h3>{starter.name}</h3>
                            <p>{starter.description}</p>
                            <p>${starter.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section id="menu-type-2" className="section menu-section">
                <h2>Main Course</h2>
                <div className="card-container">
                    {mainCourse.map(course => (
                        <div className="card" key={course.id}>
                            <img src={course.img} alt={course.name} className="menu-item-img" />
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                            <p>${course.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section id="dessert" className="section menu-section">
                <h2>Dessert</h2>
                <div className="card-container">
                    {desserts.map(dessert => (
                        <div className="card" key={dessert.id}>
                            <img src={dessert.img} alt={dessert.name} className="menu-item-img" />
                            <h3>{dessert.name}</h3>
                            <p>{dessert.description}</p>
                            <p>${dessert.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section id="beverages" className="section menu-section">
                <h2>Beverages</h2>
                <div className="card-container">
                    {beverages.map(beverage => (
                        <div className="card" key={beverage.id}>
                            <img src={beverage.img} alt={beverage.name} className="menu-item-img" />
                            <h3>{beverage.name}</h3>
                            <p>{beverage.description}</p>
                            <p>${beverage.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MenuLandingPage;
