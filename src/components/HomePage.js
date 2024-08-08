import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure you create this CSS file

function HomePage() {
    return (
        <div className="homepage">
            <div className="overlay">
                <h1>Fork & Fortune</h1>
                <div className="button-container">
                    <Link to="/signin/customer">
                        <button className="home-button">Customer Sign In</button>
                    </Link>
                    <Link to="/signin/owner">
                        <button className="home-button">Owner Sign In</button>
                    </Link>
                </div>
                <div className="signup-container">
                    <p>If you don't have an account, sign up here:</p>
                    <div className="button-container">
                        <Link to="/signup/customer">
                            <button className="home-button">Customer Sign Up</button>
                        </Link>
                        <Link to="/signup/owner">
                            <button className="home-button">Owner Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
