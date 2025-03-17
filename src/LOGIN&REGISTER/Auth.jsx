// AuthPage.jsx - React component for authentication
import "./Auth.css";
import React, { Component } from "react";
import { signInWithEmail, registerWithEmail, signInWithGoogle, signInAsGuest } from "../FIREBASE/Auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Import logo properly - adjust the path based on your project structure
import companyLogo from "/src/assets/Company_logo.png";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      alert: null,
      isLoading: false, // Set to false initially to show the form right away
    };
    this.alertTimeout = null;
  }

  componentWillUnmount() {
    // Clear any remaining timeouts to prevent memory leaks
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isLogin, email, password, confirmPassword } = this.state;
    
    // Don't set isLoading to true here - wait until after validation
    
    try {
      if (isLogin) {
        if (!email || !password) {
          this.showAlert("error", "Please enter both email and password");
          return;
        }
        
        console.log("Attempting to sign in with email:", email);
        this.showAlert("info", "Signing in...");
        
        await signInWithEmail(email, password);
        console.log("Sign in successful");
        this.showAlert("success", "Logged in successfully!");
        setTimeout(() => window.location.href = "/", 2000);
      } else {
        if (!email || !password) {
          this.showAlert("error", "Please enter both email and password");
          return;
        }
        
        if (password !== confirmPassword) {
          this.showAlert("error", "Passwords do not match!");
          return;
        }
        
        console.log("Attempting to register with email:", email);
        this.showAlert("info", "Creating your account...");
        
        await registerWithEmail(email, password);
        console.log("Registration successful");
        this.showAlert("success", "Account created successfully!");
        setTimeout(() => this.setState({ isLogin: true }), 2000);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      this.showAlert("error", error.message || "Authentication failed");
    }
  };

  handleGoogleLogin = async () => {
    try {
      console.log("Attempting Google login");
      this.showAlert("info", "Connecting to Google...");
      
      await signInWithGoogle();
      console.log("Google login successful");
      this.showAlert("success", "Google login successful!");
      setTimeout(() => window.location.href = "/", 2000);
    } catch (error) {
      console.error("Google login error:", error);
      this.showAlert("error", error.message || "Google login failed");
    }
  };

  handleGuestLogin = async () => {
    try {
      console.log("Attempting guest login");
      this.showAlert("info", "Logging in as guest...");
      
      await signInAsGuest();
      console.log("Guest login successful");
      this.showAlert("success", "Logged in as guest!");
      setTimeout(() => window.location.href = "/", 2000);
    } catch (error) {
      console.error("Guest login error:", error);
      this.showAlert("error", error.message || "Guest login failed");
    }
  };

  showAlert = (type, message) => {
    console.log("Showing alert:", type, message);
    
    // Clear any existing timeout
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
    
    this.setState({ alert: { type, message } });
    
    // Set new timeout for non-error alerts
    if (type !== "error") {
      this.alertTimeout = setTimeout(() => {
        this.setState({ alert: null });
      }, 3000);
    }
  };

  toggleMode = () => {
    this.setState((prevState) => ({ 
      isLogin: !prevState.isLogin,
      alert: null,
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false
    }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  togglePasswordVisibility = (field) => {
    this.setState((prevState) => ({ [field]: !prevState[field] }));
  };

  renderSkeleton() {
    return (
      <div className="authPageContainer">
        {/* Left side skeleton */}
        <div className="brandSection">
          <div className="brandContent">
            <div className="skeleton-logo"></div>
            <div className="skeleton-text-large"></div>
            <div className="skeleton-text-small"></div>
          </div>
        </div>
        
        {/* Right side skeleton */}
        <div className="formSection">
          <div className="formContainer">
            <div className="authFormWrapper skeleton-form">
              <div className="skeleton-title"></div>
              <div className="formBar"></div>
              <div className="skeleton-subtitle"></div>
              
              <div className="skeleton-input"></div>
              <div className="skeleton-input"></div>
              
              <div className="skeleton-button"></div>
              
              <div className="skeleton-divider"></div>
              
              <div className="skeleton-button"></div>
              <div className="skeleton-button"></div>
              
              <div className="skeleton-text-small center"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    const { isLogin, email, password, confirmPassword, showPassword, showConfirmPassword, alert } = this.state;

    return (
      <div className="authPageContainer">
        {/* Left side with logo and company name */}
        <div className="brandSection">
          <div className="brandContent">
            <img src={companyLogo} alt="Surya Logo" className="brandLogo" />
            <h1 className="companyName">Surya</h1>
            <p className="brandTagline">Global Logistics</p>
          </div>
        </div>
        
        {/* Right side with form */}
        <div className="formSection">
          <div className="formContainer">
            <div className="authFormWrapper">
              <form className="authForm" onSubmit={this.handleSubmit}>
                <h2 className="formTitle">{isLogin ? "Welcome Back" : "Create Account"}</h2>
                <div className="formBar"></div>
                <p className="formSubtitle">{isLogin ? "Sign in to your account" : "Register for a new account"}</p>
                
                <div className="inputGroup">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={this.handleChange} 
                    required 
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="inputGroup">
                  <label>Password</label>
                  <div className="passwordWrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      required
                      placeholder="Enter your password"
                    />
                    <button 
                      type="button" 
                      className="eyeButton" 
                      onClick={() => this.togglePasswordVisibility("showPassword")}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                {!isLogin && (
                  <div className="inputGroup">
                    <label>Confirm Password</label>
                    <div className="passwordWrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        required
                        placeholder="Confirm your password"
                      />
                      <button 
                        type="button" 
                        className="eyeButton" 
                        onClick={() => this.togglePasswordVisibility("showConfirmPassword")}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )}
                
                <button type="submit" className={isLogin ? "button loginButton" : "button registerButton"}>
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
                
                <div className="alternateLoginOptions">
                  
                  {/* Only show Google login option when in login mode */}
                  {isLogin && (
                    <button type="button" className="googleButton" onClick={this.handleGoogleLogin}>
                      Sign in with Google
                    </button>
                  )}
                  
                  <button type="button" className="guestButton" onClick={this.handleGuestLogin}>
                    Continue as Guest
                  </button>
                
                <button type="button" className="switchModeButton" onClick={this.toggleMode}>
                  {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {alert && (
          <div className={`alertPopup ${alert.type}`}>
            <div className="alertContent">
              {alert.message}
              <button 
                className="closeAlert" 
                onClick={() => this.setState({ alert: null })}
                aria-label="Close alert"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;
    console.log("Current loading state:", isLoading);
    return isLoading ? this.renderSkeleton() : this.renderForm();
  }
}

export default AuthPage;