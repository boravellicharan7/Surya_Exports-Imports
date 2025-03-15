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
      isLoading: true,
    };
  }

  componentDidMount() {
    // Simulate loading - in a real app, you might be checking auth state or loading preferences
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1500);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { isLogin, email, password, confirmPassword } = this.state;
    
    this.setState({ isLoading: true });

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
        this.showAlert("success", "Logged in successfully!");
        this.redirectAfterAuth();
      } else {
        if (password !== confirmPassword) {
          this.showAlert("error", "Passwords do not match!");
          this.setState({ isLoading: false });
          return;
        }
        await registerWithEmail(email, password);
        this.showAlert("success", "Account created successfully!");
        setTimeout(() => this.setState({ isLogin: true }), 2000);
      }
    } catch (error) {
      this.showAlert("error", error.message);
      this.setState({ isLoading: false });
    }
  };

  handleGoogleLogin = async () => {
    this.setState({ isLoading: true });
    try {
      await signInWithGoogle();
      this.showAlert("success", "Google login successful!");
      this.redirectAfterAuth();
    } catch (error) {
      this.showAlert("error", error.message);
      this.setState({ isLoading: false });
    }
  };

  handleGuestLogin = async () => {
    this.setState({ isLoading: true });
    try {
      await signInAsGuest();
      this.showAlert("success", "Logged in as guest!");
      this.redirectAfterAuth();
    } catch (error) {
      this.showAlert("error", error.message);
      this.setState({ isLoading: false });
    }
  };

  showAlert = (type, message) => {
    this.setState({ alert: { type, message } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  redirectAfterAuth = () => {
    setTimeout(() => window.location.href = "/", 2000);
  };

  toggleMode = () => {
    this.setState((prevState) => ({ 
      isLogin: !prevState.isLogin,
      alert: null
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
                  <p className="optionsDivider">or</p>
                  
                  <button type="button" className="googleButton" onClick={this.handleGoogleLogin}>
                    Sign in with Google
                  </button>
                  
                  <button type="button" className="guestButton" onClick={this.handleGuestLogin}>
                    Continue as Guest
                  </button>
                </div>
                
                <button type="button" className="switchModeButton" onClick={this.toggleMode}>
                  {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </button>
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
    return isLoading ? this.renderSkeleton() : this.renderForm();
  }
}

export default AuthPage;