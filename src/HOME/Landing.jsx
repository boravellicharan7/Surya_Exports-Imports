import React, { Component } from "react";
import Navbar from "./Nav"; // Adjust the path if needed
import Footer from "./Footer"; // Adjust the path if needed
import Body from "./Body";
import { AuthProvider } from "../LOGIN&REGISTER/AuthContext";

class Landing extends Component {
    render() {
        return (
            <>
                <AuthProvider>
                    {/* Your routes and components here */}
                    <Navbar />
                    <Body />
                    {/* etc. */}
                </AuthProvider>
                {/* Footer Section */}
                <Footer />
            </>
        );
    }
}

export default Landing;
