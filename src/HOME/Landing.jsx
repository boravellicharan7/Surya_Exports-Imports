import React, {Component, useState, useEffect } from "react";
import Navbar from "./Nav";
import Footer from "./Footer";
import Body from "./Body";
import { AuthProvider } from "../LOGIN&REGISTER/AuthContext";

// Main hero skeleton that resembles the Surya logistics hero section
const HeroSkeleton = () => (
  <div className="relative w-full h-96">
    {/* Dark overlay for the hero image */}
    <div className="absolute inset-0 bg-gray-800 animate-pulse opacity-70"></div>
    
    {/* Logo area */}
    <div className="absolute top-6 left-6">
      <div className="h-12 w-36 bg-gray-300 rounded animate-pulse"></div>
    </div>
    
    {/* User icon */}
    <div className="absolute top-6 right-6">
      <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
    </div>
    
    {/* Hero text content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <div className="h-12 w-64 bg-gray-300 mb-2 animate-pulse"></div>
      <div className="h-6 w-80 bg-gray-300 mt-2 animate-pulse"></div>
      
      {/* Search box */}
      <div className="flex w-full max-w-2xl mt-16 px-4">
        <div className="flex-grow h-12 bg-gray-300 rounded-l animate-pulse"></div>
        <div className="h-12 w-32 bg-yellow-500 rounded-r animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Section title skeleton
const SectionTitleSkeleton = () => (
  <div className="w-full py-10 flex justify-center">
    <div className="h-10 w-64 bg-gray-200 animate-pulse"></div>
  </div>
);

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // Simulate loading time
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000); // 2 seconds loading time
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="flex flex-col min-h-screen">
          {/* Hero Section Skeleton */}
          <HeroSkeleton />
          
          {/* Our Solutions Section Skeleton */}
          <SectionTitleSkeleton />
          
          {/* Content Placeholders */}
          <div className="container mx-auto px-4 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded">
                  <div className="h-40 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <AuthProvider>
          <Navbar />
          <Body />
        </AuthProvider>
        <Footer />
      </>
    );
  }
}

export default Landing;