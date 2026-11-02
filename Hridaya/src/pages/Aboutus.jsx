
// src/components/About/About.jsx
import React, { useEffect } from 'react';
import './Aboutus.css';
import { useNavigate } from 'react-router-dom';

const Aboutus = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Trigger animations when component mounts
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
      elements.forEach((el, i) => {
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
        }, 200 * i);
      });
    }, 300);
  }, []);

  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About Hri<span className='icon'>daya</span>🩺</h1>
          <p className="hero-subtitle">
          </p>
        </div>
      </div>

      <div className="about-content">
        <div className="about-intro fade-in">
          <p>
            At <strong>Hridaya</strong>, we believe healing starts from the heart. 
            Our hospital is built on the foundation of compassion, care, and community.
          </p>
        </div>
      </div>
        <div className="mission-vision-container">
          <div className="mission-card card fade-in">
            <div className="card-icon">💫</div>
            <h2>Our Mission</h2>
            <p>
              To deliver exceptional healthcare with a human touch. We aim to bridge the gap between 
              modern medicine and empathetic service.
            </p>
          </div>

          <div className="vision-card card fade-in">
            <div className="card-icon">🔭</div>
            <h2>Our Vision</h2>
            <p>
              To be a sanctuary of healing where every patient feels heard, valued, and cared for — 
              emotionally and physically.
            </p>
          </div>
         </div>





       
        <div className="values-section fade-in">
          <h2 className='section-title'>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <h3>Compassion</h3>
              <p>Treating every patient with empathy and understanding</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">🩺</div>
              <h3>Excellence</h3>
              <p>Delivering the highest standard of medical care</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>Practicing honesty and transparency in all we do</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">🌱</div>
              <h3>Growth & Innovation</h3>
              <p>Continuously improving through learning and technology</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">👨‍👩‍👧‍👦</div>
              <h3>Community</h3>
              <p>Serving as a trusted partner in community health</p>
            </div>

             <div className="value-item">
              <div className="value-icon">👨‍👩‍👧‍👦</div>
              <h3>Community</h3>
              <p>Serving as a trusted partner in community health</p>
            </div>

             <div className="value-item">
              <div className="value-icon">👨‍👩‍👧‍👦</div>
              <h3>Community</h3>
              <p>Serving as a trusted partner in community health</p>
            </div>
             <div className="value-item">
              <div className="value-icon">👨‍👩‍👧‍👦</div>
              <h3>Community</h3>
              <p>Serving as a trusted partner in community health</p>
            </div>
          </div>
        </div>



       






<div className="leaders fade-in" data-delay="700">
  <h2 className="section-title">Meet Our Leadership</h2>
  <p className="leadership-intro">
    Our hospital is proud to be led by some of the most renowned medical professionals in the country. 
    With decades of combined experience, our leadership team brings world-class expertise and compassionate 
    care to every patient.
  </p>
  
  <div className="doctors-container">
    {/* Doctor 1 */}
    <div className="doctor-card">
      <div className="doctor-image-container">
        <img 
          src='https://img.freepik.com/premium-photo/portrait-beautiful-young-female-doctor-white-medical-jacket-isolated-white-background-brunette-woman-medic-crossed-hands-smiling-camera_533057-127.jpg' 
          alt='Dr. Priya Sharma'
          className='doctor-img'
        />
      </div>
      <h3>Dr. Priya Sharma</h3>
      <p className="doctor-title">Chief Medical Officer</p>
      <p className="doctor-bio">
        Board-certified surgeon with 25+ years experience. Pioneer in minimally invasive techniques.
      </p>
    </div>

    {/* Doctor 2 */}
    <div className="doctor-card">
      <div className="doctor-image-container">
        <img 
          src='https://img.freepik.com/free-photo/portrait-hansome-young-male-doctor-man_171337-5068.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740' 
          alt='Dr. Arjun Patel'
          className='doctor-img'
        />
      </div>
      <h3>Dr. Arjun Patel</h3>
      <p className="doctor-title">Director of Cardiology</p>
      <p className="doctor-bio">
        Award-winning cardiologist specializing in interventional procedures and heart health.
      </p>
    </div>

    {/* Doctor 3 */}
    <div className="doctor-card">
      <div className="doctor-image-container">
        <img 
          src='https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827760.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740' 
          alt='Dr. Nandini Reddy'
          className='doctor-img'
        />
      </div>
      <h3>Dr. Nandini Reddy</h3>
      <p className="doctor-title">Head of Pediatrics</p>
      <p className="doctor-bio">
        Nationally recognized pediatrician with special focus on childhood immunology.
      </p>
    </div>
  </div>
</div>







        <div className="story-section fade-in">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2010, Hridaya began as a small clinic with a big vision - to transform healthcare 
              by putting compassion at the center of everything we do. Today, we've grown into a leading 
              medical institution, but our commitment to heartfelt care remains unchanged.
            </p>
            <p>
              What started with just three physicians has expanded to a team of over 200 medical professionals 
              serving our community with state-of-the-art facilities while maintaining the personal touch 
              that defines the Hridaya experience.
            </p>
          </div>
          <div className="story-image"></div>
        </div>

        <div className="additional-info">
          <h2 className="Choose-Title"> Why Choose Us?</h2>
          <p>
            At Hridaya, we prioritize patient-centered care. Our team is dedicated to ensuring that every 
            patient receives personalized treatment tailored to their unique needs. We believe in fostering 
            a supportive environment where patients can feel safe and cared for.
          </p>
          <p>
            Our advanced medical technology and highly skilled staff enable us to provide a wide range of 
            services, from routine check-ups to specialized treatments. We are committed to continuous 
            improvement and innovation in healthcare practices.
          </p>
        </div>




       <div className="cta-section fade-in" >
          <h2>Ready to Experience Compassionate Care?</h2>
          <p>Join the Hridaya family and discover healthcare that truly cares.</p>
          <div className="cta-buttons">
            <button className="cta-buttons primary" onClick={() => navigate('/appointment')}>Book an Appointment</button>
          </div>
        </div>
    </div>
  );
};

export default Aboutus;














