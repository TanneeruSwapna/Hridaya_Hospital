
import React from 'react';
import './Doctors.css';

const Doctors = () => {
  const doctorsData = [
    {
      specialty: "General Dentist",
      name: "Dr. Akash varma",
      description: "Gloria amet rimisi libero molestie ante ut fringilla purus eros quis giavrid from dolor amet t ipsum lorem bibendum.",
      image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740"
    },
    {
      specialty: "General Dentist",
      name: "Dr. Spandhana ",
      description: "Gloria amet rimisi libero molestie ante ut fringilla purus eros quis giavrid from dolor amet t ipsum lorem bibendum.",
      image: "https://img.freepik.com/premium-photo/attractive-caucasian-brunette-female-doctor-standing-office-smiling-with-crossed-arms_88135-4739.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740"
    },
    {
      specialty: "Orthodontist",
      name: "Dr. Prasanth",
      description: "Gloria amet rimisi libero molestie ante ut fringilla purus eros quis giavrid from dolor amet t ipsum lorem bibendum.",
      image: "https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740"
    },
    {
      specialty: "Endodontist",
      name: "Dr. Anu Sharma",
      description: "Gloria amet rimisi libero molestie ante ut fringilla purus eros quis giavrid from dolor amet t ipsum lorem bibendum.",
      image: "https://img.freepik.com/premium-photo/portrait-beautiful-young-female-doctor-white-medical-jacket-isolated-white-background-brunette-woman-medic-crossed-hands-smiling-camera_533057-127.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740"
    },
    {
      specialty: "Pediatric Dentist",
      name: "Dr. John Mech",
      description: "Gloria amet rimisi libero molestie ante ut fringilla purus eros quis giavrid from dolor amet t ipsum lorem bibendum.",
      image: "https://img.freepik.com/free-photo/portrait-hansome-young-male-doctor-man_171337-5068.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740"
    },
    {
      specialty: "Orthodontist",
      name: "Dr. Sneha Reddy",
      description: "Gloria amet rimisi libero molestie ante ut fringilla purus eros quis giavrid from dolor amet t ipsum lorem bibendum.",
      image: "https://img.freepik.com/premium-photo/portrait-charming-doctor-with-arms-crossed-copy-space_109710-296.jpg?ga=GA1.1.577542755.1712661406&semt=ais_items_boosted&w=740"
    }
  ];

  const processSteps = [
    { title: "Appointment", description: "Sample text. Click to select the Text Element." },
    { title: "Expert Doctor", description: "Sample text. Click to select the Text Element." },
    { title: "Consultation", description: "Sample text. Click to select the Text Element." },
    { title: "Enjoy Life", description: "Sample text. Click to select the Text Element." }
  ];

  return (
    <div className="doctors-page1">
      {/* Hero Section */}
      <div className="doctors-hero1">
        <div className="hero-content1">
          <h1>Our Doctors</h1>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="doctors-grid-container1">
        <div className="doctors-grid1">
          {doctorsData.map((doctor, index) => (
            <div key={index} className="doctor-card1">
              <div className="doctor-image-container1">
                <img src={doctor.image} alt={doctor.name} className="doctor-image1" />
                <div className="specialty-badge1">{doctor.specialty}</div>
              </div>
              <div className="doctor-info1">
                <h3 className="doctor-name1">{doctor.name}</h3>
                <p className="doctor-description1">{doctor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Credit */}
      <div className="image-credit1">
     
      </div>

      {/* Working Process */}
      <div className="working-process1">
        <h2>Working Process</h2>
        <h3>How We Work?</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>

      {/* Process Steps */}
      <div className="process-steps1">
        {processSteps.map((step, index) => (
          <div key={index} className="step1">
            <div className="step-content1">
              <h4 className="step-title1">{step.title}</h4>
              <p className="step-description1">{step.description}</p>
            </div>
            {index < processSteps.length - 1 && <div className="step-divider1"></div>}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="footer-note">
        <p>**Sample text: Click to select the Text Element.**</p>
      </div>
    </div>
  );
};

export default Doctors;