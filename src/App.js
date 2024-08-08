import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/HomePage';
import SignUp from './components/SignUp';
import SignIn from './components/Login';
import CustomerHome from './components/CustomerLandingPage'; 
import CustomerMenu from './components/CustomerMenu';
import OwnerDashboard from './components/OwnerDashboard';
import AddStarters from './components/AddStarters'; 
import AddMainCourses from './components/AddMainCourse';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import AddDesserts from './components/AddDessert';
import AddBeverages from './components/AddBeverages';
import ReservationsPage from './components/ReservationPage';
import OnlineOrderingForm from './components/OnlineOrderingForm';
import ReservationsList from './components/ReservationsList';
import ManageOrders from './components/ManageOrder';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    
                    {/* Sign Up Routes */}
                    <Route path="/signup/owner" element={<SignUp role="OWNER" />} />
                    <Route path="/signup/customer" element={<SignUp role="CUSTOMER" />} />
                    
                    {/* Sign In Routes */}
                    <Route path="/signin/owner" element={<SignIn role="OWNER" />} />
                    <Route path="/signin/customer" element={<SignIn role="CUSTOMER" />} />
                    
                    {/* Customer Routes */}
                    <Route path="/customer-home" element={<CustomerHome />} />
                    <Route path="/menu" element={<CustomerMenu />} />
                    <Route path="/online-ordering" element={<OnlineOrderingForm/>} />
                    
                    
                    <Route path="/owner-home" element={<OwnerDashboard />} />
                    <Route path="/reservations" element={<ReservationsPage/>}/>
                    <Route path="/starters" element={<AddStarters/>}/>
                    <Route path="/main-course" element={<AddMainCourses/>}/>
                    <Route path="/desserts" element={<AddDesserts/>}/>
                    <Route path="/beverages" element={<AddBeverages/>}/>
                    <Route path="/reservations-list" element={<ReservationsList />} />
                    <Route path="/manage-orders" element={<ManageOrders />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
