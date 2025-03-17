import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="skeleton skeleton-footer w-full h-32"></div>;
  }

  return (
    <footer className="bg-gray-100 py-8 px-4 text-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div className="space-y-2">
            <h3 className="font-bold uppercase mb-3">Country-Location / Local Office</h3>
            <p>IN - SGL Mumbai</p>
            <div className="space-y-2">
              <span className="mr-2">📞</span>
              <span>+91 2266378000</span>
            </div>
            <div className="space-y-2">
              <span className="mr-2">✉️</span>
              <span>ind-info@sgl.com</span>
            </div>
            <div className="space-y-2">
              <span className="mr-2">🏢</span>
              <span>Office details</span>
            </div>
          </div>

          {/* Business Section */}
          <div className="space-y-2">
            <h3 className="font-bold uppercase mb-3">Doing Business Together</h3>
            <p>Solutions / Local Information / E-Business</p>
            <p>Sustainability / mySGL</p>
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <h3 className="font-bold uppercase mb-3">Get to Know Us</h3>
            <p>SGL Group / Newsroom / Events / Blog / Careers</p>
            <p>Contact us / Preference Center</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="transition-transform hover:scale-110"
              >
                <FaFacebook className="text-blue-600 text-2xl hover:text-blue-800" />
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="transition-transform hover:scale-110"
              >
                <FaTwitter className="text-blue-400 text-2xl hover:text-blue-600" />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="transition-transform hover:scale-110"
              >
                <FaInstagram className="text-pink-500 text-2xl hover:text-pink-700" />
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="transition-transform hover:scale-110"
              >
                <FaLinkedin className="text-blue-700 text-2xl hover:text-blue-900" />
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="transition-transform hover:scale-110"
              >
                <FaYoutube className="text-red-600 text-2xl hover:text-red-800" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>Headquarters: +41 227038888 - info@sgl.com</p>
            <p>Chemin Rieu 12, 1208 Geneva - Switzerland</p>
          </div>

          {/* Legal Links */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-400 flex flex-wrap justify-center gap-2">
              <span className="hover:underline cursor-pointer">Cookie Settings</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Data Privacy</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Personal Data Request</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Terms of Use</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Carrier's Terms & Conditions</span>
              <span className="hidden sm:inline">•</span>
              <span className="hover:underline cursor-pointer hidden sm:inline">EU Commitments</span>
              <span className="hidden sm:inline">•</span>
              <span className="hover:underline cursor-pointer hidden sm:inline">Code of Conduct</span>
              <span className="hidden sm:inline">•</span>
              <span className="hover:underline cursor-pointer hidden sm:inline">Certifications</span>
              <span className="hidden sm:inline">•</span>
              <span className="hover:underline cursor-pointer hidden sm:inline">Speak Up Line</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;