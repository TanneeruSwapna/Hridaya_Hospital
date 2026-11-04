
import React, { useState, useEffect } from 'react';
import './Appointment.css';

const API_URL = `${import.meta.env.VITE_API_URL}/api/appointments`;

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  department: '',
  doctor: '',
  date: '',
  time: '',
  reason: '',
  medicalHistory: null,
  emergency: false,
  reminderType: 'email',
  agreeTerms: false,
  paymentMethod: 'none',
  language: 'en',
};

const departments = [
  { id: 'cardio', name: 'Cardiology', icon: '❤️' },
  { id: 'dental', name: 'Dental Care', icon: '🦷' },
  { id: 'ortho', name: 'Orthopedics', icon: '🦴' },
  { id: 'neuro', name: 'Neurology', icon: '🧠' },
  { id: 'pedia', name: 'Pediatrics', icon: '👶' },
  { id: 'derma', name: 'Dermatology', icon: '🌟' },
  { id: 'gastro', name: 'Gastroenterology', icon: '🍏' },
  { id: 'psych', name: 'Psychiatry', icon: '🧘' },
  { id: 'endo', name: 'Endocrinology', icon: '⚖️' },
  { id: 'opthal', name: 'Ophthalmology', icon: '👁️' },
  { id: 'ent', name: 'ENT', icon: '👂' },
  { id: 'uro', name: 'Urology', icon: '💧' },
];

const doctors = [
  {
    id: 'doc1',
    name: 'Dr. Sarah Johnson',
    department: 'cardio',
    specialty: 'Interventional Cardiologist',
    experience: '15 years',
    education: 'MD, Harvard Medical School',
    bio: 'Specializes in interventional cardiology and preventive care.',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    currentWaitTime: '2-3 days',
  },
  {
    id: 'doc2',
    name: 'Dr. Michael Chen',
    department: 'ortho',
    specialty: 'Orthopedic Surgeon',
    experience: '12 years',
    education: 'MD, Stanford University',
    bio: 'Specializes in joint replacements and sports injuries.',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    currentWaitTime: '1 week',
  },
  {
    id: 'doc3',
    name: 'Dr. Priya Sharma',
    department: 'pedia',
    specialty: 'Pediatrician',
    experience: '8 years',
    education: 'MD, Johns Hopkins University',
    bio: 'Specializes in child wellness and development.',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    currentWaitTime: '1-2 days',
  },
  {
    id: 'doc4',
    name: 'Dr. Robert Williams',
    department: 'neuro',
    specialty: 'Neurologist',
    experience: '20 years',
    education: 'MD, Yale School of Medicine',
    bio: 'Specializes in migraine treatment and neurological disorders.',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
    availableDays: ['Wednesday', 'Thursday', 'Friday'],
    currentWaitTime: '3-4 days',
  },
  {
    id: 'doc5',
    name: 'Dr. Amanda Rodriguez',
    department: 'derma',
    specialty: 'Dermatologist',
    experience: '10 years',
    education: 'MD, UCLA',
    bio: 'Specializes in medical and cosmetic dermatology.',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    currentWaitTime: '1 week',
  },
  {
    id: 'doc6',
    name: 'Dr. David Kim',
    department: 'dental',
    specialty: 'Dentist',
    experience: '7 years',
    education: 'DDS, University of Pennsylvania',
    bio: 'Specializes in cosmetic dentistry and oral surgery.',
    photo: 'https://randomuser.me/api/portraits/men/85.jpg',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    currentWaitTime: '3-5 days',
  },
  {
    id: 'doc7',
    name: 'Dr. Lisa Wong',
    department: 'gastro',
    specialty: 'Gastroenterologist',
    experience: '11 years',
    education: 'MD, Columbia University',
    bio: 'Specializes in digestive disorders and endoscopic procedures.',
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    availableDays: ['Tuesday', 'Wednesday', 'Friday'],
    currentWaitTime: '5-7 days',
  },
  {
    id: 'doc8',
    name: 'Dr. James Wilson',
    department: 'psych',
    specialty: 'Psychiatrist',
    experience: '14 years',
    education: 'MD, Duke University',
    bio: 'Specializes in mood disorders and mental health care.',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    availableDays: ['Monday', 'Thursday', 'Saturday'],
    currentWaitTime: '2-3 days',
  },
  {
    id: 'doc9',
    name: 'Dr. Maria Garcia',
    department: 'endo',
    specialty: 'Endocrinologist',
    experience: '9 years',
    education: 'MD, University of Miami',
    bio: 'Specializes in diabetes management and thyroid disorders.',
    photo: 'https://randomuser.me/api/portraits/women/52.jpg',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    currentWaitTime: '1 week',
  },
  {
    id: 'doc10',
    name: 'Dr. Ahmed Khan',
    department: 'opthal',
    specialty: 'Ophthalmologist',
    experience: '13 years',
    education: 'MD, Johns Hopkins University',
    bio: 'Specializes in eye care and vision health.',
    photo: 'https://randomuser.me/api/portraits/men/68.jpg',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    currentWaitTime: '4-6 days',
  },
  {
    id: 'doc11',
    name: 'Dr. Emily Park',
    department: 'ent',
    specialty: 'ENT Specialist',
    experience: '6 years',
    education: 'MD, Northwestern University',
    bio: 'Specializes in sinus disorders and hearing loss.',
    photo: 'https://randomuser.me/api/portraits/women/71.jpg',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    currentWaitTime: '3-5 days',
  },
  {
    id: 'doc12',
    name: 'Dr. Richard Brown',
    department: 'uro',
    specialty: 'Urologist',
    experience: '18 years',
    education: 'MD, Mayo Clinic',
    bio: 'Specializes in urinary tract disorders and kidney stones.',
    photo: 'https://randomuser.me/api/portraits/men/55.jpg',
    availableDays: ['Tuesday', 'Thursday'],
    currentWaitTime: '1-2 weeks',
  },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

const paymentMethods = [
  { id: 'none', name: 'No payment required' },
  { id: 'credit', name: 'Credit Card' },
  { id: 'insurance', name: 'Insurance' },
  { id: 'paypal', name: 'PayPal' },
];

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDoctorDetails, setSelectedDoctorDetails] = useState(null);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setAvailableDoctors(
      formData.department
        ? doctors.filter((doctor) => doctor.department === formData.department)
        : []
    );
  }, [formData.department]);

  useEffect(() => {
    const doctor = doctors.find((item) => item.id === formData.doctor);

    if (!doctor) {
      setAvailableDates([]);
      setSelectedDoctorDetails(null);
      setEstimatedWaitTime('');
      return;
    }

    setSelectedDoctorDetails(doctor);
    setEstimatedWaitTime(doctor.currentWaitTime);

    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const weekday = date.toLocaleDateString('en-US', {
        weekday: 'long',
      });

      if (doctor.availableDays.includes(weekday)) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        dates.push(`${year}-${month}-${day}`);
      }
    }

    setAvailableDates(dates);

    if (!dates.includes(formData.date)) {
      setFormData((previous) => ({
        ...previous,
        date: dates[0] || '',
        time: '',
      }));
    }
  }, [formData.doctor]);

  useEffect(() => {
    if (!formData.doctor || !formData.date) {
      setAvailableTimes([]);
      return;
    }

    const times = [];
    const bookedTimes = ['10:00 AM', '11:30 AM', '2:00 PM'];

    for (let hour = 9; hour <= 17; hour++) {
      if (hour === 12) continue;

      const slotsPerHour = hour < 12 ? 2 : 1;

      for (let minute = 0; minute < 60; minute += 60 / slotsPerHour) {
        const time = `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${
          hour >= 12 ? 'PM' : 'AM'
        }`;

        if (!bookedTimes.includes(time)) {
          times.push(time);
        }
      }
    }

    setAvailableTimes(times);

    if (!times.includes(formData.time)) {
      setFormData((previous) => ({
        ...previous,
        time: times[0] || '',
      }));
    }
  }, [formData.date, formData.doctor]);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'file'
            ? files?.[0] || null
            : value,
    }));

    setErrors((previous) => {
      const updated = { ...previous };
      delete updated[name];
      return updated;
    });
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone is required';
      }
    }

    if (step === 2) {
      if (!formData.department) {
        newErrors.department = 'Please select a department';
      }

      if (!formData.doctor) {
        newErrors.doctor = 'Please select a doctor';
      }
    }

    if (step === 3) {
      if (!formData.date) {
        newErrors.date = 'Please select a date';
      }

      if (!formData.time) {
        newErrors.time = 'Please select a time';
      }

      if (!formData.reason.trim()) {
        newErrors.reason = 'Please describe the reason for your visit';
      }

      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((previous) => Math.min(previous + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep((previous) => Math.max(previous - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save the appointment through the backend API.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateStep()) return;

    setIsLoading(true);
    setSuccessMessage('');

    try {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.id === formData.doctor
      );

      const selectedDepartment = departments.find(
        (department) => department.id === formData.department
      );

      const appointmentData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        department: selectedDepartment?.name || formData.department,
        doctor: selectedDoctor?.name || formData.doctor,
        date: formData.date,
        time: formData.time,
        reason: formData.reason.trim(),
        emergency: formData.emergency,
        reminderType: formData.reminderType,
        paymentMethod: formData.paymentMethod,
        language: formData.language,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || 'Unable to book appointment. Please try again.'
        );
      }

      setSuccessMessage(
        result.message || 'Your appointment request was submitted successfully.'
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error('Appointment booking failed:', error);
      setErrors((previous) => ({
        ...previous,
        submit:
          error.message ||
          'Could not connect to the server. Please check that your backend is running.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalendarNavigation = (direction) => {
    if (direction === 'prev') {
      if (calendarMonth === 0) {
        setCalendarMonth(11);
        setCalendarYear((year) => year - 1);
      } else {
        setCalendarMonth((month) => month - 1);
      }
    } else if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((year) => year + 1);
    } else {
      setCalendarMonth((month) => month + 1);
    }
  };

  const renderCalendarDays = () => {
    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(
      calendarYear,
      calendarMonth + 1,
      0
    ).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day empty" />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(calendarYear, calendarMonth, day);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayNumber = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${dayNumber}`;

      const isAvailable = availableDates.includes(dateString);
      const isSelected = formData.date === dateString;

      days.push(
        <div
          key={dateString}
          className={`calendar-day ${
            isAvailable ? 'available' : 'unavailable'
          } ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            if (isAvailable) {
              setFormData((previous) => ({
                ...previous,
                date: dateString,
                time: '',
              }));
            }
          }}
        >
          {day}
          {isAvailable && <div className="availability-dot" />}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="appointment-container">
      <div className="language-selector">
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="language-dropdown"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className="appointment-header">
        <h1>Book Your Appointment</h1>
        <p>
          Schedule your visit with our medical experts in just a few steps
        </p>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="section-container">
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            className={`section-box ${step === number ? 'active' : ''}`}
          >
            <div className="step-number">{number}</div>
            <div className="step-label">
              {number === 1
                ? 'Personal Info'
                : number === 2
                  ? 'Doctor & Department'
                  : 'Date & Time'}
            </div>
          </div>
        ))}
      </div>

      {isSubmitted ? (
        <div className="confirmation-message">
          <h2>Appointment Request Submitted!</h2>
          <p>{successMessage}</p>
          <p>
            Thank you, {formData.name}. Your request has been sent to the
            hospital.
          </p>
          <button
            type="button"
            className="btn next-btn"
            onClick={() => {
              setFormData(initialFormData);
              setStep(1);
              setIsSubmitted(false);
              setErrors({});
              setSuccessMessage('');
            }}
          >
            Book Another Appointment
          </button>
        </div>
      ) : (
        <form className="appointment-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <h2>Personal Information</h2>
              <p>Please provide your contact information</p>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && (
                    <div className="error-message">{errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn next-btn"
                  onClick={nextStep}
                >
                  Next: Select Doctor
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h2>Select Department & Doctor</h2>
              <p>Choose the medical department and preferred doctor</p>

              <div className="form-group">
                <label>Medical Department *</label>
                <div className="department-options">
                  {departments.map((department) => (
                    <div
                      key={department.id}
                      className={`department-card ${
                        formData.department === department.id ? 'selected' : ''
                      }`}
                      onClick={() => {
                        setFormData((previous) => ({
                          ...previous,
                          department: department.id,
                          doctor: '',
                          date: '',
                          time: '',
                        }));
                      }}
                    >
                      <div className="department-icon">
                        {department.icon}
                      </div>
                      <div className="department-name">
                        {department.name}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.department && (
                  <div className="error-message">{errors.department}</div>
                )}
              </div>

              {formData.department && (
                <div className="form-group">
                  <label>Select Doctor *</label>
                  <div className="doctor-options">
                    {availableDoctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className={`doctor-card ${
                          formData.doctor === doctor.id ? 'selected' : ''
                        }`}
                        onClick={() =>
                          setFormData((previous) => ({
                            ...previous,
                            doctor: doctor.id,
                            date: '',
                            time: '',
                          }))
                        }
                      >
                        <img
                          src={doctor.photo}
                          alt={doctor.name}
                          className="doctor-photo"
                        />
                        <div className="doctor-info">
                          <h4>{doctor.name}</h4>
                          <div className="doctor-specialty">
                            {doctor.specialty}
                          </div>
                          <div className="doctor-experience">
                            {doctor.experience} experience
                          </div>
                          <div className="doctor-wait-time">
                            Avg. wait: {doctor.currentWaitTime}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.doctor && (
                    <div className="error-message">{errors.doctor}</div>
                  )}
                </div>
              )}

              {selectedDoctorDetails && (
                <div className="doctor-details-card">
                  <h3>About {selectedDoctorDetails.name}</h3>
                  <div className="doctor-details-content">
                    <img
                      src={selectedDoctorDetails.photo}
                      alt={selectedDoctorDetails.name}
                      className="doctor-detail-photo"
                    />
                    <div className="doctor-details-text">
                      <p>
                        <strong>Specialty:</strong>{' '}
                        {selectedDoctorDetails.specialty}
                      </p>
                      <p>
                        <strong>Experience:</strong>{' '}
                        {selectedDoctorDetails.experience}
                      </p>
                      <p>
                        <strong>Education:</strong>{' '}
                        {selectedDoctorDetails.education}
                      </p>
                      <p>
                        <strong>Bio:</strong> {selectedDoctorDetails.bio}
                      </p>
                      <p>
                        <strong>Current Wait Time:</strong>{' '}
                        {selectedDoctorDetails.currentWaitTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn prev-btn"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn next-btn"
                  onClick={nextStep}
                >
                  Next: Date & Time
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h2>Select Date & Time</h2>
              <p>Choose a convenient time for your appointment</p>

              <div className="form-group">
                <label>Appointment Date *</label>
                <div className="calendar-container">
                  <div className="calendar-header">
                    <button
                      type="button"
                      className="calendar-nav-button"
                      onClick={() => handleCalendarNavigation('prev')}
                    >
                      &lt;
                    </button>
                    <h3>
                      {new Date(
                        calendarYear,
                        calendarMonth
                      ).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h3>
                    <button
                      type="button"
                      className="calendar-nav-button"
                      onClick={() => handleCalendarNavigation('next')}
                    >
                      &gt;
                    </button>
                  </div>

                  <div className="calendar-grid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                      (day) => (
                        <div key={day} className="calendar-weekday">
                          {day}
                        </div>
                      )
                    )}
                    {renderCalendarDays()}
                  </div>
                </div>
                {errors.date && (
                  <div className="error-message">{errors.date}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Available Time Slots *</label>
                  <div className="time-slot-grid">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`time-slot ${
                          formData.time === time ? 'selected' : ''
                        }`}
                        onClick={() =>
                          setFormData((previous) => ({
                            ...previous,
                            time,
                          }))
                        }
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.time && (
                    <div className="error-message">{errors.time}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Estimated Wait Time</label>
                  <div className="wait-time-display">
                    {estimatedWaitTime || 'Not available'}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Reason for Visit *</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Please describe the reason for your visit"
                  className={errors.reason ? 'error' : ''}
                  rows="4"
                />
                {errors.reason && (
                  <div className="error-message">{errors.reason}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="emergency"
                      checked={formData.emergency}
                      onChange={handleChange}
                    />
                    <span>This is an emergency appointment</span>
                  </label>
                  <p className="emergency-note">
                    If this is a medical emergency, seek immediate local
                    emergency care rather than relying on this booking form.
                  </p>
                </div>

                <div className="form-group">
                  <label>Upload Medical History (Optional)</label>
                  <input
                    type="file"
                    name="medicalHistory"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  <p className="file-note">
                    File upload is not sent to the backend by this JSON request.
                  </p>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Reminder Preference</label>
                  <select
                    name="reminderType"
                    value={formData.reminderType}
                    onChange={handleChange}
                  >
                    <option value="email">Email Reminder</option>
                    <option value="sms">SMS Reminder</option>
                    <option value="both">Both Email and SMS</option>
                    <option value="none">No Reminder</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Payment Method (if required)</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group terms-checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <span>
                    I agree to the <a href="/terms">Terms of Service</a> and
                    understand that my appointment request is subject to
                    confirmation.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <div className="error-message">{errors.agreeTerms}</div>
                )}
              </div>

              {errors.submit && (
                <div className="error-message">{errors.submit}</div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn prev-btn"
                  onClick={prevStep}
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Confirm Appointment'}
                </button>
              </div>
            </div>
          )}
        </form>
      )}

      <div className="appointment-support">
        <div className="support-card">
          <div className="support-icon">📞</div>
          <h3>Need Assistance?</h3>
          <p>Contact the hospital support team for help with booking.</p>
        </div>

        <div className="support-card">
          <div className="support-icon">⏱️</div>
          <h3>Office Hours</h3>
          <p>
            Monday - Friday: 8:00 AM - 7:00 PM
            <br />
            Saturday: 9:00 AM - 4:00 PM
          </p>
        </div>

        <div className="support-card">
          <div className="support-icon">🚑</div>
          <h3>Emergency Care</h3>
          <p>
            For emergencies, contact your local emergency service or go to
            the nearest emergency department.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;