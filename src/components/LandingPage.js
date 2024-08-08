import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from './fork & fortune.jpg'; // Update this path to your actual logo path
import homeBackground from './fork & fortune.jpg'; // Update this path to your actual home background image path

const LandingPage = () => {
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={logo} alt="Forks & Fortune Logo" className="logo" />
                    </Link>
                </div>
                <ul className="navbar-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                    <li>
                        <Link to="/home" className="nav-link">
                            Sign In
                        </Link>
                    </li>
                </ul>
            </nav>
            <header className="header" id="home">
                <h1>Welcome to Fork & Fortune</h1>
                <p>Your favorite place for delicious food</p>
            </header>
            <section id="about" className="section about-section">
                <h2>About Us</h2>
                <div className="card-container">
                    <div className="card">
                        <h3>Our Story</h3>
                        <p>Forks & Fortune is a fine dining restaurant offering a variety of exquisite dishes made with the freshest ingredients...</p>
                    </div>
                </div>
            </section>
            <section id="contact" className="section contact-section">
                <h2>Contact Us</h2>
                <div className="card-container">
                    <div className="card">
                        <h3>Get in Touch</h3>
                        <p>Reach out us fork&fortune.com or call us at (123) 456-7890...</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
