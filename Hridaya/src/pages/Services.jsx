

// src/components/Services/Services.jsx
import React from 'react';
import './Services.css';

// Import placeholder images (in a real app, you'd use actual image files)
const emergencyImg = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&h=400";
const obstetricsImg = "https://img.freepik.com/free-photo/gynecologist-talking-with-young-female-patient-medical-consultation-modern-clinic-patient-with-gynecologist-consultation-gynecological-office_657921-141.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740";
const orthopedicsImg = "https://img.freepik.com/free-photo/young-doctor-listen-female-patient-heart-chest-with-stethoscope-clinic-meeting-man-gp-checkup-examine-woman-client-with-phonendoscope-healthcare-concept_657921-829.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740";
const pediatricsImg = "https://img.freepik.com/free-photo/doctor-holding-cute-baby-front-view_23-2149728885.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740";


const Services = () => {
  return (
    <div className="services-page-container">
      <div className="services-page-wrapper">
        <div className="services-page-header">
          <h1>Our Services</h1>
          <h2>Our Medical Services & Specialties</h2>
        </div>
        
        {/* First Row: Content - Image - Content */}
        <div className="services-page-row">
          <div className="services-page-card services-content-card">
            <div className="services-page-content">
              <h3>EMERGENCY ROOM</h3>
              <p>Our Emergency Department is an American College of Surgeons certified level one pediatric trauma center. We provide 24/7 emergency care with the latest medicaltechnology and highly trained specialists.</p>
            </div>
          </div>
          
          <div className="services-page-card services-image-card">
            <img src={emergencyImg} alt="Emergency Room" />
          </div>
          
          <div className="services-page-card services-content-card">
            <div className="services-page-content">
              <h3>OBSTETRICS</h3>
              <p>Care for Your Pregnancy. Every birth is unique, every mother is unique, and every baby is a special new gift. Our team provides comprehensive prenatal, delivery, and postnatal care.</p>
            </div>
          </div>
        </div>
        
        {/* Second Row: Image - Content - Image */}
        <div className="services-page-row">
          <div className="services-page-card services-image-card">
            <img src={obstetricsImg} alt="Obstetrics" />
          </div>
          
          <div className="services-page-card services-content-card">
            <div className="services-page-content">
              <h3>ORTHOPEDICS</h3>
              <p>Bone and joint problems don't discriminate - they can happen to anyone, at any age. Our orthopedic specialists provide cutting-edge treatments for fractures, arthritis, sports injuries, and joint replacements.</p>
            </div>
          </div>
          
          <div className="services-page-card services-image-card">
            <img src={orthopedicsImg} alt="Orthopedics" />
          </div>
        </div>
        
        {/* Third Row: Content - Image - Content */}
        <div className="services-page-row">
          <div className="services-page-card services-content-card">
            <div className="services-page-content">
              <h3>PEDIATRICS</h3>
              <p>From newborns to adolescents, our pediatric specialists provide compassionate care tailored to each child's needs. We offer well-child visits, immunizations, and treatment for childhood illnesses.</p>
            </div>
          </div>
          
          <div className="services-page-card services-image-card">
            <img src={pediatricsImg} alt="Pediatrics" />
          </div>
          
          <div className="services-page-card services-content-card">
            <div className="services-page-content">
              <h3>CARDIOLOGY</h3>
              <p>Your heart is in good hands. Our cardiology team provides comprehensive heart care including diagnostic testing, interventional procedures, and rehabilitation services.</p>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Services;
