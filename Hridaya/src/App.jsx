
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import HospitalAssistant from './components/HospitalAssistant';
import AuthModel from './components/AuthModel';

import PatientLogin from './pages/PatientLogin';
import Patient from './pages/Patient';
import ProtectedPatientRoute from './components/ProtectedPatientRoute';
import Reports from './pages/Reports';
import HomePage from './pages/HomePage';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Aboutus from './pages/Aboutus';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';

import DoctorDashboard from './pages/DoctorDashboard';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Patient Authentication */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/auth" element={<AuthModel />} />

          {/* Public Pages */}
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/services" element={<Services />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contact" element={<Contact />} />

          {/* Appointment */}
          <Route path="/appointment" element={<Appointment />} />

          {/* Protected Patient Pages */}
          <Route
            path="/profile"
            element={
              <ProtectedPatientRoute>
                <Patient />
              </ProtectedPatientRoute>
            }
          />
          <Route
        path="/patient/reports"
        element={
       <ProtectedPatientRoute>
        <Reports />
     </ProtectedPatientRoute>
      }
/>
          <Route
            path="/patient"
            element={
              <ProtectedPatientRoute>
                <Patient />
              </ProtectedPatientRoute>
            }
          />

          <Route
            path="/patient/dashboard"
            element={
              <ProtectedPatientRoute>
                <Patient />
              </ProtectedPatientRoute>
            }
          />

          {/* Doctor Dashboard */}
          <Route
            path="/doctor/dashboard"
            element={<DoctorDashboard />}
          />

          {/* Unknown URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <HospitalAssistant />
    </div>
  );
}

export default App;
