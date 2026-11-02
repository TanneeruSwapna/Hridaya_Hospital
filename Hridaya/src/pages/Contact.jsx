// // src/components/Contact/Contact.jsx
// import React, { useState } from 'react';
// import './Contact.css';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when field is changed
//     if (errors[name]) {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
    
//     if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    
//     if (!formData.message.trim()) newErrors.message = 'Message is required';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       setIsSubmitting(true);
      
//       // Simulate form submission
//       setTimeout(() => {
//         setIsSubmitting(false);
//         setIsSubmitted(true);
        
//         // Reset form
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           subject: '',
//           message: ''
//         });
        
//         // Reset success message after 5 seconds
//         setTimeout(() => {
//           setIsSubmitted(false);
//         }, 5000);
//       }, 1500);
//     }
//   };

//   return (
//     <div className="contact-container">
//       {/* Hero Section */}
//       <div className="contact-hero">
//         <div className="hero-content">
//           <h1>Contact Us</h1>
//           <p>We're here to help. Reach out to us with any questions or concerns.</p>
//         </div>
//       </div>

//       {/* Contact Information */}
//       <div className="contact-info-section">
//         <div className="container">
//           <div className="contact-info-grid">
//             <div className="info-card">
//               <div className="info-icon">📍</div>
//               <h3>Our Location</h3>
//               <p>123 Healing Boulevard</p>
//               <p>Health City, HC 54321</p>
//             </div>
            
//             <div className="info-card">
//               <div className="info-icon">📞</div>
//               <h3>Phone Number</h3>
//               <p>Emergency: (123) 456-7890</p>
//               <p>Appointments: (123) 456-7891</p>
//             </div>
            
//             <div className="info-card">
//               <div className="info-icon">✉️</div>
//               <h3>Email Address</h3>
//               <p>General Inquiries: info@hridaya.com</p>
//               <p>Support: support@hridaya.com</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Map and Contact Form */}
//       <div className="contact-main-section">
//         <div className="container">
//           <div className="contact-wrapper">
//             <div className="map-section">
//               <div className="map-placeholder">
//                 <div className="map-overlay">
//                   <h3>Visit Our Hospital</h3>
//                   <p>We're conveniently located in the heart of Health City with ample parking and easy access to public transportation.</p>
//                   <button className="directions-btn">Get Directions</button>
//                 </div>
//               </div>
              
//               <div className="hours-section">
//                 <h3>Operating Hours</h3>
//                 <div className="hours-grid">
//                   <div className="day">Monday - Friday</div>
//                   <div className="time">8:00 AM - 8:00 PM</div>
                  
//                   <div className="day">Saturday</div>
//                   <div className="time">9:00 AM - 5:00 PM</div>
                  
//                   <div className="day">Sunday</div>
//                   <div className="time">9:00 AM - 1:00 PM</div>
                  
//                   <div className="day emergency">Emergency Services</div>
//                   <div className="time">24/7</div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="form-section">
//               <h2>Send Us a Message</h2>
//               <p>Fill out the form below and our team will get back to you as soon as possible.</p>
              
//               {isSubmitted ? (
//                 <div className="success-message">
//                   <div className="success-icon">✓</div>
//                   <h3>Message Sent Successfully!</h3>
//                   <p>Thank you for contacting us. Our team will get back to you within 24 hours.</p>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <label htmlFor="name">Full Name *</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       className={errors.name ? 'error' : ''}
//                     />
//                     {errors.name && <div className="error-message">{errors.name}</div>}
//                   </div>
                  
//                   <div className="form-row">
//                     <div className="form-group">
//                       <label htmlFor="email">Email Address *</label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Enter your email"
//                         className={errors.email ? 'error' : ''}
//                       />
//                       {errors.email && <div className="error-message">{errors.email}</div>}
//                     </div>
                    
//                     <div className="form-group">
//                       <label htmlFor="phone">Phone Number</label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         placeholder="Enter your phone number"
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="form-group">
//                     <label htmlFor="subject">Subject *</label>
//                     <input
//                       type="text"
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       placeholder="What is this regarding?"
//                       className={errors.subject ? 'error' : ''}
//                     />
//                     {errors.subject && <div className="error-message">{errors.subject}</div>}
//                   </div>
                  
//                   <div className="form-group">
//                     <label htmlFor="message">Message *</label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       placeholder="Type your message here..."
//                       rows="5"
//                       className={errors.message ? 'error' : ''}
//                     ></textarea>
//                     {errors.message && <div className="error-message">{errors.message}</div>}
//                   </div>
                  
//                   <button 
//                     type="submit" 
//                     className="submit-btn"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Sending...' : 'Send Message'}
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Departments Contact */}
//       <div className="departments-section">
//         <div className="container">
//           <h2>Contact Specific Departments</h2>
//           <div className="departments-grid">
//             <div className="dept-card">
//               <h3>Appointments</h3>
//               <p>Schedule or reschedule appointments</p>
//               <div className="dept-contact">appointments@hridaya.com</div>
//               <div className="dept-phone">(123) 456-7891</div>
//             </div>
            
//             <div className="dept-card">
//               <h3>Billing & Insurance</h3>
//               <p>Questions about bills or insurance</p>
//               <div className="dept-contact">billing@hridaya.com</div>
//               <div className="dept-phone">(123) 456-7892</div>
//             </div>
            
//             <div className="dept-card">
//               <h3>Medical Records</h3>
//               <p>Request medical records or reports</p>
//               <div className="dept-contact">records@hridaya.com</div>
//               <div className="dept-phone">(123) 456-7893</div>
//             </div>
            
//             <div className="dept-card">
//               <h3>Careers</h3>
//               <p>Job opportunities at Hridaya</p>
//               <div className="dept-contact">careers@hridaya.com</div>
//               <div className="dept-phone">(123) 456-7894</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Emergency Section */}
//       <div className="emergency-section">
//         <div className="container">
//           <div className="emergency-content">
//             <div className="emergency-icon">🆘</div>
//             <div className="emergency-text">
//               <h2>Emergency Contact</h2>
//               <p>For medical emergencies, please call our emergency line immediately or visit our emergency department.</p>
//             </div>
//             <div className="emergency-contact">
//               <div className="emergency-phone">(123) 456-7890</div>
//               <button className="emergency-btn">Get Emergency Directions</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;




// src/components/Contact/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="hosp-contact-wrapper">
      {/* Hero Section */}
      <div className="hosp-contact-hero-banner">
        <div className="hosp-hero-content-area">
          <h1>Contact Us</h1>
          <p>We're here to help. Reach out to us with any questions or concerns.</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="hosp-contact-info-area">
        <div className="hosp-container">
          <div className="hosp-contact-info-cards">
            <div className="hosp-info-card-item">
              <div className="hosp-info-icon">📍</div>
              <h3>Our Location</h3>
              <p>123 Healing Boulevard</p>
              <p>Health City, HC 54321</p>
            </div>
            
            <div className="hosp-info-card-item">
              <div className="hosp-info-icon">📞</div>
              <h3>Phone Number</h3>
              <p>Emergency: (123) 456-7890</p>
              <p>Appointments: (123) 456-7891</p>
            </div>
            
            <div className="hosp-info-card-item">
              <div className="hosp-info-icon">✉️</div>
              <h3>Email Address</h3>
              <p>General Inquiries: info@hridaya.com</p>
              <p>Support: support@hridaya.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map and Contact Form */}
      <div className="hosp-contact-main-area">
        <div className="hosp-container">
          <div className="hosp-contact-content-grid">
            <div className="hosp-contact-map-section">
              <div className="hosp-map-container">
                <div className="hosp-map-overlay-content">
                  <h3>Visit Our Hospital</h3>
                  <p>We're conveniently located in the heart of Health City with ample parking and easy access to public transportation.</p>
                  <button className="hosp-map-direction-btn">Get Directions</button>
                </div>
              </div>
              
              <div className="hosp-working-hours">
                <h3>Operating Hours</h3>
                <div className="hosp-hours-grid">
                  <div className="hosp-day">Monday - Friday</div>
                  <div className="hosp-time">8:00 AM - 8:00 PM</div>
                  
                  <div className="hosp-day">Saturday</div>
                  <div className="hosp-time">9:00 AM - 5:00 PM</div>
                  
                  <div className="hosp-day">Sunday</div>
                  <div className="hosp-time">9:00 AM - 1:00 PM</div>
                  
                  <div className="hosp-day hosp-emergency">Emergency Services</div>
                  <div className="hosp-time">24/7</div>
                </div>
              </div>
            </div>
            
            <div className="hosp-contact-form-section">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and our team will get back to you as soon as possible.</p>
              
              {isSubmitted ? (
                <div className="hosp-form-success-msg">
                  <div className="hosp-success-icon">✓</div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for contacting us. Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="hosp-contact-form">
                  <div className="hosp-form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.name ? 'hosp-input-error' : ''}
                    />
                    {errors.name && <div className="hosp-error-msg">{errors.name}</div>}
                  </div>
                  
                  <div className="hosp-form-row">
                    <div className="hosp-form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={errors.email ? 'hosp-input-error' : ''}
                      />
                      {errors.email && <div className="hosp-error-msg">{errors.email}</div>}
                    </div>
                    
                    <div className="hosp-form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="hosp-form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      className={errors.subject ? 'hosp-input-error' : ''}
                    />
                    {errors.subject && <div className="hosp-error-msg">{errors.subject}</div>}
                  </div>
                  
                  <div className="hosp-form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      rows="5"
                      className={errors.message ? 'hosp-input-error' : ''}
                    ></textarea>
                    {errors.message && <div className="hosp-error-msg">{errors.message}</div>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="hosp-form-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Departments Contact */}
      <div className="hosp-dept-contact-area">
        <div className="hosp-container">
          <h2>Contact Specific Departments</h2>
          <div className="hosp-dept-cards-grid">
            <div className="hosp-dept-card">
              <h3>Appointments</h3>
              <p>Schedule or reschedule appointments</p>
              <div className="hosp-dept-email">appointments@hridaya.com</div>
              <div className="hosp-dept-phone">(123) 456-7891</div>
            </div>
            
            <div className="hosp-dept-card">
              <h3>Billing & Insurance</h3>
              <p>Questions about bills or insurance</p>
              <div className="hosp-dept-email">billing@hridaya.com</div>
              <div className="hosp-dept-phone">(123) 456-7892</div>
            </div>
            
            <div className="hosp-dept-card">
              <h3>Medical Records</h3>
              <p>Request medical records or reports</p>
              <div className="hosp-dept-email">records@hridaya.com</div>
              <div className="hosp-dept-phone">(123) 456-7893</div>
            </div>
            
            <div className="hosp-dept-card">
              <h3>Careers</h3>
              <p>Job opportunities at Hridaya</p>
              <div className="hosp-dept-email">careers@hridaya.com</div>
              <div className="hosp-dept-phone">(123) 456-7894</div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Section */}
      <div className="hosp-emergency-contact-area">
        <div className="hosp-container">
          <div className="hosp-emergency-content">
            <div className="hosp-emergency-icon">🆘</div>
            <div className="hosp-emergency-text">
              <h2>Emergency Contact</h2>
              <p>For medical emergencies, please call our emergency line immediately or visit our emergency department.</p>
            </div>
            <div className="hosp-emergency-contact-info">
              <div className="hosp-emergency-phone">(123) 456-7890</div>
              <button className="hosp-emergency-btn">Get Emergency Directions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;