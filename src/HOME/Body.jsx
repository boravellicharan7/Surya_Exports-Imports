import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaShieldAlt, FaGlobeAmericas, FaClock, FaHeadset, FaChartLine } from "react-icons/fa";
import { AuthContext } from "../LOGIN&REGISTER/AuthContext"; // Update path as needed

// Body component assets
import agriculture from "../assets/Agriculture.png";
import fruits from "../assets/Fruits.png";
import pharma from "../assets/pharma.png";
import carParts from "../assets/car_parts.png";
import granite from "../assets/Granite_stones.png";
import plastics from "../assets/plastics.png";
import food from "../assets/tablefood.png";
import wood from "../assets/stackedwood.png";
import furniture from "../assets/tables.png";

// Import styles
import "./BodyStyle.css";

// Default static data
const DEFAULT_CARD_DATA = [
    { id: 1, date: "19/02/2025", title: "EU Price Announcement - Trade from India & Pakistan to Europe", description: "EU Price Announcements, India, Pakistan, Europe" },
    { id: 2, date: "17/02/2025", title: "Price Announcement - Trade from Asia to Mediterranean (inc. West Med, East Med, Adriatic and...)", description: "Asia, East West Network" },
    { id: 3, date: "13/02/2025", title: "EU Price Announcement - Trade from India & Pakistan to Europe", description: "India, Pakistan, Europe" },
    { id: 4, date: "10/02/2025", title: "Trade Tariff Adjustment for South America Region", description: "South America, Brazil, Argentina" },
    { id: 5, date: "05/02/2025", title: "New Freight Rates for Middle East & Africa Routes", description: "Middle East, Africa, Global Trade" },
    { id: 6, date: "01/02/2025", title: "Cargo Price Update for North America", description: "North America, Canada, USA, Mexico" },
    { id: 7, date: "28/01/2025", title: "Shipping Rate Increase on Australia Routes", description: "Australia, Oceania, Global Markets" },
    { id: 8, date: "25/01/2025", title: "New Fuel Surcharge for Asia-Pacific Shipments", description: "Asia-Pacific, Logistics, Fuel" },
    { id: 9, date: "22/01/2025", title: "Rate Adjustment for European Shipping Lanes", description: "Europe, Shipping, Freight" },
    { id: 10, date: "20/01/2025", title: "Important Update: Trade Policy Changes for African Routes", description: "Africa, Trade Regulations, Import & Export" }
];

const DEFAULT_SLIDES = [
    [
        { img: agriculture, title: "Agriculture", description: "Organic crops" },
        { img: fruits, title: "Fruits", description: "Fresh farm-sourced fruits" },
        { img: pharma, title: "Pharma", description: "Medicines & healthcare" },
    ],
    [
        { img: carParts, title: "Car Parts", description: "Automotive parts & accessories" },
        { img: granite, title: "Granite", description: "Elegant & durable stones" },
        { img: plastics, title: "Plastics", description: "Industrial-grade materials" },
    ],
    [
        { img: food, title: "Food", description: "Fresh & organic food items" },
        { img: wood, title: "Wood", description: "Timber & wooden products" },
        { img: furniture, title: "Furniture", description: "Modern & stylish designs" }
    ],
];

// Company Features data with icons
const COMPANY_FEATURES = [
    { icon: <FaGlobeAmericas size={40} />, title: "Global Coverage", description: "Extensive network spanning across 150+ countries with reliable shipping routes and local expertise." },
    { icon: <FaClock size={40} />, title: "On-Time Delivery", description: "Industry-leading punctuality with 98% on-time delivery rate across all shipping routes." },
    { icon: <FaHeadset size={40} />, title: "24/7 Support", description: "Round-the-clock customer service team available to assist with any logistics challenges." },
    { icon: <FaShieldAlt size={40} />, title: "Secure Transport", description: "Advanced tracking and security protocols ensure your cargo arrives safely." },
    { icon: <FaChartLine size={40} />, title: "Data Insights", description: "Comprehensive analytics to optimize your supply chain and reduce costs." },
    { icon: <FaLaptop size={40} />, title: "Digital Solutions", description: "Cutting-edge digital tools for booking, tracking, and managing your shipments." }
];

const itemsPerPage = 3;

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: "../../src/assets/ship.jpg",
            currentPage: 1,
            cardData: DEFAULT_CARD_DATA,
            slides: DEFAULT_SLIDES,
            customAlert: {
                show: false,
                message: ''
            },
            showLoginModal: false
        };
        this.bookingButtonRef = createRef();
    }

    static contextType = AuthContext;

    // Body component methods
    handleMouseEnter = (image) => {
        this.setState({ backgroundImage: image });
    };

    handleMouseLeave = () => {
        this.setState({ backgroundImage: "../../src/assets/ship.jpg" });
    };

    getTotalPages = () => {
        return Math.ceil(this.state.cardData.length / itemsPerPage);
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

    handleBookingClick = () => {
        // Get login status from context
        const { isLoggedIn } = this.context;
        
        if (!isLoggedIn) {
            this.setState({ showLoginModal: true });
            this.showAlert("Please log in to proceed with booking");
        }
    };

    getCurrentCards = () => {
        const { currentPage, cardData } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return cardData.slice(indexOfFirstItem, indexOfLastItem);
    };

    nextPage = () => {
        this.setState((prevState) => ({
            currentPage: Math.min(prevState.currentPage + 1, this.getTotalPages())
        }));
    };

    prevPage = () => {
        this.setState((prevState) => ({
            currentPage: Math.max(prevState.currentPage - 1, 1)
        }));
    };

    scrollToBookings = () => {
        if (this.bookingButtonRef.current) {
            this.bookingButtonRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    handleCloseModal = () => {
        this.setState({ showLoginModal: false });
    };

    render() {
        const { currentPage, showLoginModal } = this.state;
        const { isLoggedIn, loading } = this.context;
        const totalPages = this.getTotalPages();
        const currentCards = this.getCurrentCards();

        // Don't render the main content until authentication state is determined
        if (loading) {
            return (
                <div className="auth-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            );
        }

        return (
            <main>
                {/* Custom Alert */}
                {this.state.customAlert?.show && (
                    <div className="custom-alert">
                        <div className="alert-content">
                            <p>{this.state.customAlert.message}</p>
                        </div>
                    </div>
                )}

                <div className="BodyContainer1">
                    <h1>Our Solutions</h1>
                    <div className="BodyContainer1Child1"></div>
                    <div className="BodyContainer1Child2">
                        <p>As well as being a global leader in container shipping, our worldwide teams of industry specific experts mean we can offer our customers round-the-clock personalised service. This ensures we deliver fast and reliable transit times, and that we provide the best solutions for your needs.</p>
                    </div>
                </div>

                {/* Company Features Cards */}
                <div className="features-container">
                    <div className="features-grid">
                        {COMPANY_FEATURES.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="BodyContainer3">
                    {isLoggedIn ? (
                        <Link to="/Transport">
                            <button className="links">Start Your Bookings</button>
                        </Link>
                    ) : (
                        <button
                            className="links"
                            onClick={this.handleBookingClick}
                            ref={this.bookingButtonRef}
                        >
                            Start Your Bookings
                        </button>
                    )}
                </div>

                {/* Login Modal */}
                {showLoginModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div>
                                <h2>Authentication Required</h2>
                                <p>Please log in to proceed with your booking.</p>
                                <div className="modal-buttons">
                                    <button onClick={this.handleCloseModal} className="close-btn">Close</button>
                                    <Link to="/Login&Registration" className="login-link">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="BodyContainer5">
                    <h1>Your Shipping Needs Met</h1>
                    <div className="BodyContainer5Child1"></div>
                    <div className="BodyContainer5Child2">
                        <p>At SGL we pride ourselves on being a global container shipping company that delivers tailored solutions designed to meet the specific needs of each of our customers. Regardless of your cargo type, or final destination, we offer versatile solutions that cover air, land, and sea.</p>
                    </div>
                    <div className="BodyContainer5Child3">
                        <p>Thanks to the extensive capacity of our container fleet, SGL is the trusted transportation partner and shipping company for numerous companies the world over. Combining this with our global port coverage and extensive equipment availability means, we are able to deliver a professional, efficient shipping service, tailored to the specific needs of your business.</p>
                    </div>
                </div>

                {/* Product Slides with Static Data */}
                <div className="BodyContainer6">
                    <div className="container my-5 text-center">
                        <div className="position-relative">
                            <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {this.state.slides.map((group, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                            <div className="container">
                                                <div className="row justify-content-center g-4">
                                                    {group.map((item, idx) => (
                                                        <div key={idx} className="col-md-4">
                                                            <div className="card shadow-lg border-0 rounded-lg">
                                                                <figure className="p-4">
                                                                    <img src={item.img} alt={item.title} width={300} className="rounded img-fluid" />
                                                                </figure>
                                                                <div className="card-body text-center">
                                                                    <h5 className="card-title fw-bold">{item.title}</h5>
                                                                    <p className="text-muted">{item.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center gap-3 mt-3">
                                <button className="btn px-4" data-bs-target="#carouselExample" data-bs-slide="prev"> ◄ </button>
                                <button className="btn px-4" data-bs-target="#carouselExample" data-bs-slide="next"> ► </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="BodyContainer7">
                    <h1>Moving the World</h1>
                    <div className="BodyContainer7Child2">
                        <p>With a commitment to sustainability and innovation, SGL is dedicated to moving the world forward. Our comprehensive logistics solutions are designed to meet the evolving needs of our customers, ensuring seamless and efficient transportation across the globe.</p>
                    </div>
                </div>

                <div className="BodyContainer8">
                    <h1>Customer Advisories</h1>
                    <div className="BodyContainer8Child1"></div>
                    <div className="BodyContainer8Child2">
                        <div className="flex flex-col items-center">
                            {/* Card Display - Static as requested */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {currentCards.map((card) => (
                                    <div key={card.id} className="card bg-base-100 w-70 shadow-xl">
                                        <div className="card-body">
                                            <h3 className="card-title">{card.date}</h3>
                                            <h5>{card.title}</h5>
                                            <p>{card.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            <div className="join mt-4">
                                <button
                                    className="join-item btn"
                                    onClick={this.prevPage}
                                    disabled={currentPage === 1}
                                >
                                    ◄
                                </button>
                                <span className="px-4">Page {currentPage} of {totalPages}</span>
                                <button
                                    className="join-item btn"
                                    onClick={this.nextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    ►
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Body;