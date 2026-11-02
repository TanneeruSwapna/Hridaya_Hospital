import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="background-overlay">
            <div className="hospital-highlights">
              <div className="highlight-item">
                <span className="highlight-number">200+</span>
                <span className="highlight-text">Specialist Doctors</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">24/7</span>
                <span className="highlight-text">Emergency Care</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">NABH</span>
                <span className="highlight-text">Accredited</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-content">
          <h1>Exceptional Care <span className="highlight">For All</span> Your Heart Needs</h1>
          <p className="hero-description">
            At Hridaya Hospital, we combine cutting-edge technology with compassionate care to deliver 
            world-class healthcare services tailored to your needs. As a premier cardiac care center, 
            we've been serving the community with excellence for over 25 years.
          </p>
          <div className="hero-buttons">
            <Link to="/appointment" className="cta-button primary">Book Appointment</Link>
            <Link to="/services" className="cta-button secondary">Our Services</Link>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="content-section">
        <div className="divider"></div>

        {/* About Section */}
        <div className="about-section">
          <div className="about-content">
            <h2>Why Choose Hridaya Hospital?</h2>
            <p>
              As a leader in cardiac care, Hridaya Hospital has pioneered numerous breakthroughs in 
              cardiovascular treatment. Our team of internationally trained specialists provides 
              comprehensive care across all major medical specialties.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">🏆</div>
                <h3>Expert Care</h3>
                <p>Our physicians are leaders in their fields with extensive experience.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💖</div>
                <h3>Patient First</h3>
                <p>Personalized treatment plans tailored to individual needs.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏥</div>
                <h3>Advanced Facilities</h3>
                <p>State-of-the-art technology for accurate diagnosis and treatment.</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            {/* You can add a hospital image here */}
          </div>
        </div>

        {/* Healthcare Services Preview */}
        <div className="services-section">
          <h2>Our Healthcare Services</h2>
          <p className="services-subtitle">
            Comprehensive medical care across all major specialties
          </p>
          
          <div className="departments-grid">
            <div className="department-card">
              <div className="card-icon">❤️</div>
              <h3>Cardiology</h3>
              <p>Advanced heart care and treatment for cardiovascular conditions</p>
            </div>
            
            <div className="department-card">
              <div className="card-icon">🦷</div>
              <h3>Dental Care</h3>
              <p>Complete dental services for oral health and beautiful smiles</p>
            </div>
            
            <div className="department-card">
              <div className="card-icon">👁️</div>
              <h3>Ophthalmology</h3>
              <p>Vision care and treatment for eye conditions and diseases</p>
            </div>
            
            <div className="department-card">
              <div className="card-icon">🦴</div>
              <h3>Orthopedics</h3>
              <p>Specialized care for bones, joints, and musculoskeletal system</p>
            </div>
            
            <div className="department-card">
              <div className="card-icon">🔬</div>
              <h3>Dermatology</h3>
              <p>Diagnosis and treatment for skin, hair, and nail conditions</p>
            </div>
            
            <div className="department-card">
              <div className="card-icon">💪</div>
              <h3>Physiotherapy</h3>
              <p>Rehabilitation and pain management through physical therapy</p>
            </div>
          </div>
          
          <div className="view-all-services">
            <Link to="/services" className="view-all-button">View All Services →</Link>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h2>Patient Stories</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"The care I received at Hridaya Hospital was exceptional. The cardiac team saved my life and the follow-up care was outstanding."</p>
              <div className="patient-info">
                <span className="patient-name">Rajesh Kumar</span>
                <span className="patient-treatment">Cardiac Bypass Surgery</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"The pediatric department was wonderful with my child. They made what could have been a scary experience very comfortable."</p>
              <div className="patient-info">
                <span className="patient-name">Priya Sharma</span>
                <span className="patient-treatment">Pediatric Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Exceptional Healthcare?</h2>
          <p>Schedule your appointment today and take the first step toward better health</p>
          <div className="cta-button">
            <Link to="/appointment" className="cta-button primary">Book Appointment</Link>
            <Link to="/contact" className="cta-button secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;