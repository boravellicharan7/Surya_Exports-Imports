import React, { Component, createRef } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../LOGIN&REGISTER/AuthContext"; // Update path as needed

// Nav component assets
import logo from "../assets/Company_logo.png";
import profileImg from "../assets/profilelogo.png";
import userImg from "../assets/profile_pic.png";

// Import styles
import "./NavStyle.css";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId: "",
            bookingData: null,
            showPopup: false,
            error: null,
            dropdownOpen: false,
            showModal: false,
            isLoading: false,
            customAlert: {
                show: false,
                message: ''
            },
        };
        this.dropdownRef = createRef();
        this.searchInputRef = createRef();
        this.errorTimeout = null;
    }

    static contextType = AuthContext;

    // API-related methods
    fetchBookingData = async (bookingId) => {
        try {
            const apiUrl = `https://api-floi.onrender.com/api/booking/bookings/${bookingId}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('❌ API Error:', error);
            return null;
        }
    };

    // Event handlers
    handleChange = (e) => {
        this.setState({ bookingId: e.target.value });
    };

    // Set error with timeout
    setErrorWithTimeout = (errorMessage, timeout = 3000) => {
        // Clear any existing timeout
        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
        }
        
        // Set the error message
        this.setState({ error: errorMessage });
        
        // Set a timeout to clear the error
        this.errorTimeout = setTimeout(() => {
            this.setState({ error: null });
        }, timeout);
    };

    handleClick = async (event) => {
        event.preventDefault();

        // Get login status from context
        const { isLoggedIn } = this.context;

        if (!isLoggedIn) {
            this.setState({
                showModal: true,
                error: null
            });
            this.setState({ bookingId: "" });
            return;
        }

        if (!this.state.bookingId.trim()) {
            this.setErrorWithTimeout('Please enter a Booking ID');
            this.setState({ bookingId: "" });
            return;
        }

        this.setState({ isLoading: true, error: null });

        try {
            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
            }

            const bookingData = await this.fetchBookingData(this.state.bookingId);

            if (bookingData) {
                this.setState({
                    bookingData,
                    showPopup: true,
                    isLoading: false
                });
            } else {
                this.setErrorWithTimeout('No booking found with this ID.');
                this.setState({ isLoading: false });
            }
        } catch (error) {
            this.setErrorWithTimeout(error.response?.data?.message || 'Error fetching booking. Please try again.');
            this.setState({ isLoading: false });
        }
    };

    closePopup = () => {
        this.setState({
            showPopup: false,
            bookingId: ""
        });
    };

    // FIXED: Properly implemented dropdown toggle
    toggleDropdown = (e) => {
        e.stopPropagation();
        this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
    };

    // FIXED: Single definition of closeDropdown
    closeDropdown = (event) => {
        // Check if the click is outside the dropdown
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ dropdownOpen: false });
        }
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleLogout = () => {
        const auth = getAuth();
        auth.signOut().then(() => {
            this.setState({
                dropdownOpen: false
            });
            this.showAlert("Logged out successfully");
        }).catch((error) => {
            console.error("Logout Error:", error);
        });
    };

    showAlert = (message) => {
        this.setState({
            customAlert: {
                show: true,
                message
            }
        });

        setTimeout(() => {
            this.setState({
                customAlert: {
                    show: false,
                    message: ''
                }
            });
        }, 3000);
    };

    // Lifecycle methods
    componentDidMount() {
        // FIXED: Add event listener for document clicks
        document.addEventListener("mousedown", this.closeDropdown);

        setTimeout(() => {
            if (this.searchInputRef.current) {
                this.searchInputRef.current.focus();
            }
        }, 1000);
    }

    componentWillUnmount() {
        // FIXED: Remove the correct event listener
        document.removeEventListener("mousedown", this.closeDropdown);

        // Clear any existing timeouts
        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
        }
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
        }
    }

    // Render methods
    renderPopupContent() {
        const { bookingData } = this.state;

        if (!bookingData) return null;

        return (
            <div className="popup-content">
                <h2>Booking Details</h2>
                <div className="booking-info">
                    <p><strong>Booking ID:</strong> {bookingData._id}</p>
                    {Object.entries(bookingData)
                        .filter(([key]) => key !== '_id' && typeof bookingData[key] !== 'function')
                        .map(([key, value]) => (
                            <p key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> {
                                    typeof value === 'object'
                                        ? JSON.stringify(value)
                                        : value
                                }
                            </p>
                        ))
                    }
                </div>
                <button className="btn btn-primary" onClick={this.closePopup}>OK</button>
            </div>
        );
    }

    render() {
        const { bookingId, showPopup, error, isLoading, dropdownOpen } = this.state;
        const { isLoggedIn, currentUser, loading } = this.context;

        return (
            <>
                {/* Custom Alert */}
                {this.state.customAlert?.show && (
                    <div className="custom-alert">
                        <div className="alert-content">
                            <p>{this.state.customAlert.message}</p>
                        </div>
                    </div>
                )}

                {/* Nav Section */}
                <header>
                    {isLoading || loading ? (
                        <div className="skeleton skeleton-navbar"></div>
                    ) : (
                        <div className="NavContainer1">
                            <div className="navbar">
                                <div className="flex">
                                    <img src={logo} alt="Logo" width={100} />
                                </div>
                                <div className="flex-2">
                                    {/* Complete replacement for your dropdown component */}
                                    <div className="dropdown" ref={this.dropdownRef}>
                                        <button
                                            type="button"
                                            onClick={this.toggleDropdown}
                                            className="profile-button"
                                        >
                                            <img
                                                alt="Profile"
                                                src={isLoggedIn ? userImg : profileImg}
                                                className="profile-img"
                                            />
                                        </button>
                                        <div
                                            className="dropdown-menu"
                                            style={{
                                                display: dropdownOpen ? 'block' : 'none',
                                                opacity: 1,
                                                visibility: 'visible',
                                                transform: 'translateY(0)'
                                            }}
                                        >
                                            <ul>
                                                {isLoggedIn ? (
                                                    <>
                                                        <li><Link to="/profilepage">Profile</Link></li>
                                                        <li><button type="button" className="logout-btn" onClick={this.handleLogout}>Logout</button></li>
                                                    </>
                                                ) : (
                                                    <li><Link className="login-btn" to="/Login&Registration">Login & Registration</Link></li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="NavContainerChild2">
                                <p>LEADER IN</p>
                                <span>GLOBAL & LOGISTICS</span>
                            </div>
                        </div>
                    )}

                    <div className="transport-search-container">
                        <div className="NavContainer2">
                            <form onSubmit={this.handleClick}>
                                <input
                                    className="input1"
                                    type="text"
                                    placeholder="Enter your Booking ID"
                                    value={bookingId}
                                    onChange={this.handleChange}
                                    ref={this.searchInputRef}
                                />
                                <button className="button1" type="submit" disabled={isLoading}>
                                    {isLoading ? 'Searching...' : 'Search...'}
                                </button>
                            </form>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        {showPopup && (
                            <div className="popup-overlay">
                                <div className="popup">
                                    {this.renderPopupContent()}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Login Modal */}
                    {this.state.showModal && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <div>
                                    <h2>Authentication Required</h2>
                                    <p>Please log in to proceed with your search.</p>
                                    <div className="modal-buttons">
                                        <button onClick={this.handleCloseModal} className="close-btn">Close</button>
                                        <Link to="/Login&Registration" className="login-link">Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </header>
            </>
        );
    }
}

export default NavBar;