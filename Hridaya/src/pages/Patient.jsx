import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Patient.css";
import Reports from './Reports';


const API_URL = `${import.meta.env.VITE_API_URL}/api/appointments`;

function Patient() {
  const navigate = useNavigate();

  const [firebaseUser, setFirebaseUser] = useState(undefined);
  const [activeSidebar, setActiveSidebar] = useState("patients");
  const [activeTab, setActiveTab] = useState("future");

  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState("");
  const [appointmentMessage, setAppointmentMessage] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  // Demo profile data
  const profile = {
    name: "Patient Dashboard",
    phone: "Update your phone number",
    email: firebaseUser?.email || "No email available",
    birthday: "Not provided",
    gender: "Not provided",
    address: "Not provided",
  };

  // Demo visit data
  const visits = {
    future: [],
    past: [],
    planned: [],
  };

  // Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Fetch appointments from the backend
  const fetchAppointments = useCallback(async () => {
    setAppointmentsLoading(true);
    setAppointmentsError("");
    setAppointmentMessage("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch appointments.");
      }

      const data = await response.json();

      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch appointments error:", error);
      setAppointmentsError(
        "Could not load appointments. Make sure your backend and MongoDB are running."
      );
    } finally {
      setAppointmentsLoading(false);
    }
  }, []);

  // Load appointments when the dashboard is opened after login
  useEffect(() => {
    if (firebaseUser) {
      fetchAppointments();
    }
  }, [firebaseUser, fetchAppointments]);

  // Confirm or cancel an appointment
  const updateAppointmentStatus = async (id, status) => {
    setUpdatingId(id);
    setAppointmentsError("");
    setAppointmentMessage("");

    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update appointment status."
        );
      }

      // Update the appointment using the server response when available
      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment._id === id
            ? {
                ...appointment,
                ...(data.appointment || {}),
                status:
                  data.appointment?.status || status,
              }
            : appointment
        )
      );

      setAppointmentMessage(
        data.message || `Appointment ${status.toLowerCase()} successfully.`
      );
    } catch (error) {
      console.error("Update appointment error:", error);
      setAppointmentsError(error.message || "Unable to update appointment.");
    } finally {
      setUpdatingId("");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setAppointmentsError("Unable to log out. Please try again.");
    }
  };

  if (firebaseUser === undefined) {
    return (
      <div className="patient-loading">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!firebaseUser) {
    return (
      <div className="patient-login-message">
        <h2>Please log in</h2>
        <p>You must log in to access the dashboard.</p>
        <button type="button" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  const sidebarItems = [
    { id: "patients", label: "Patients", icon: "👤" },
    { id: "scheduled", label: "Scheduled Visits", icon: "📅" },
    { id: "reports", label: "Reports", icon: "📋" },
    { id: "price", label: "Price", icon: "💳" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not provided";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const renderAppointments = () => {
    if (appointmentsLoading) {
      return <p className="appointments-info">Loading appointments...</p>;
    }

    if (appointments.length === 0) {
      return (
        <div className="appointments-empty">
          <span>📅</span>
          <h3>No appointments found</h3>
          <p>Appointments saved through the booking form will appear here.</p>
        </div>
      );
    }

    return (
      <div className="appointments-list-ui">
        {appointments.map((appointment) => {
          const status = appointment.status || "Pending";

          return (
            <article
              className="appointment-card-ui"
              key={appointment._id}
            >
              <div className="appointment-card-header">
                <div>
                  <h3>{appointment.name || "Unnamed patient"}</h3>
                  <p className="appointment-id">
                    Appointment ID: {appointment._id}
                  </p>
                </div>

                <span
                  className={`appointment-status status-${status.toLowerCase()}`}
                >
                  {status}
                </span>
              </div>

              <div className="appointment-details-grid">
                <div>
                  <span className="detail-label">Email</span>
                  <p>{appointment.email || "N/A"}</p>
                </div>

                <div>
                  <span className="detail-label">Phone</span>
                  <p>{appointment.phone || "N/A"}</p>
                </div>

                <div>
                  <span className="detail-label">Department</span>
                  <p>{appointment.department || "N/A"}</p>
                </div>

                <div>
                  <span className="detail-label">Doctor</span>
                  <p>{appointment.doctor || "N/A"}</p>
                </div>

                <div>
                  <span className="detail-label">Date</span>
                  <p>{formatDate(appointment.date)}</p>
                </div>

                <div>
                  <span className="detail-label">Time</span>
                  <p>{appointment.time || "N/A"}</p>
                </div>

                <div>
                  <span className="detail-label">Emergency</span>
                  <p>{appointment.emergency ? "Yes" : "No"}</p>
                </div>

                <div>
                  <span className="detail-label">Payment method</span>
                  <p>{appointment.paymentMethod || "N/A"}</p>
                </div>

                <div className="appointment-reason">
                  <span className="detail-label">Reason for visit</span>
                  <p>{appointment.reason || "Not provided"}</p>
                </div>
              </div>

              {status !== "Confirmed" && status !== "Cancelled" && (
                <div className="appointment-actions-ui">
                  <button
                    type="button"
                    className="confirm-appointment-btn"
                    disabled={updatingId === appointment._id}
                    onClick={() =>
                      updateAppointmentStatus(
                        appointment._id,
                        "Confirmed"
                      )
                    }
                  >
                    {updatingId === appointment._id
                      ? "Updating..."
                      : "Confirm"}
                  </button>

                  <button
                    type="button"
                    className="cancel-appointment-btn"
                    disabled={updatingId === appointment._id}
                    onClick={() =>
                      updateAppointmentStatus(
                        appointment._id,
                        "Cancelled"
                      )
                    }
                  >
                    Cancel
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <div className="patient-dashboard-ui">
      <aside className="sidebar-patient-ui">
        <div className="sidebar-logo-patient-ui">Hridaya</div>

        <nav className="sidebar-nav-patient-ui">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSidebar === item.id ? "active" : ""}
              onClick={() => setActiveSidebar(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom-ui">
          <p>Signed in as</p>
          <span>{firebaseUser.email || "User"}</span>

          <button
            type="button"
            className="logout-button-ui"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="main-content-patient-ui">
        <header className="header-patient-ui">
          <div>
            <p className="dashboard-eyebrow">HRIDAYA HEALTHCARE</p>
            <h1>
              {activeSidebar === "patients"
                ? "Patient Dashboard"
                : sidebarItems.find((item) => item.id === activeSidebar)
                    ?.label || "Dashboard"}
            </h1>
            <p className="dashboard-subtitle">
              Welcome back, {firebaseUser.displayName || "User"}.
            </p>
          </div>

          <div className="user-avatar-ui">
            {(firebaseUser.displayName || firebaseUser.email || "U")
              .charAt(0)
              .toUpperCase()}
          </div>
        </header>

        {activeSidebar === "patients" && (
          <section className="patient-content-section">
            <div className="section-title-ui">
              <div>
                <h2>Patient Overview</h2>
                <p>Your profile and visit overview.</p>
              </div>
            </div>

            <div className="profile-row-ui">
              <article className="profile-card-ui profile-main-card-ui">
                <div className="profile-avatar-ui">
                  {(firebaseUser.displayName || firebaseUser.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h3>{firebaseUser.displayName || profile.name}</h3>
                <p>{profile.email}</p>
                <span className="profile-badge-ui">Signed in</span>
              </article>

              <article className="profile-card-ui">
                <h3>Contact Information</h3>

                <div className="profile-detail-ui">
                  <span>Email</span>
                  <strong>{profile.email}</strong>
                </div>

                <div className="profile-detail-ui">
                  <span>Phone</span>
                  <strong>{profile.phone}</strong>
                </div>

                <div className="profile-detail-ui">
                  <span>Address</span>
                  <strong>{profile.address}</strong>
                </div>
              </article>
            </div>

            <div className="section-title-ui visits-title-ui">
              <div>
                <h2>Visit Overview</h2>
                <p>Sample visit categories.</p>
              </div>
            </div>

            <div className="visit-tabs-ui">
              {["future", "past", "planned"].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Visits
                </button>
              ))}
            </div>

            <div className="visits-empty-ui">
              <span>🩺</span>
              <p>
                No {activeTab} visits to display in this demo section.
              </p>
              <button
                type="button"
                onClick={() => setActiveSidebar("scheduled")}
              >
                View Booked Appointments
              </button>
            </div>

            <div className="files-notes-row-ui">
              <article className="files-notes-card-ui">
                <h3>Patient Files</h3>
                <p>Your medical files will appear here when connected.</p>
              </article>

              <article className="files-notes-card-ui">
                <h3>Notes</h3>
                <p>Your patient notes will appear here when available.</p>
              </article>
            </div>
          </section>
        )}

        {activeSidebar === "scheduled" && (
          <section className="patient-content-section">
            <div className="appointments-heading-ui">
              <div>
                <h2>Appointments</h2>
                <p>
                  View booked appointments and update their status.
                </p>
              </div>

              <button
                type="button"
                className="refresh-appointments-ui"
                onClick={fetchAppointments}
                disabled={appointmentsLoading}
              >
                {appointmentsLoading
                  ? "Refreshing..."
                  : "↻ Refresh Appointments"}
              </button>
            </div>

            <div className="appointment-summary-ui">
              <div>
                <span>Total appointments</span>
                <strong>{appointments.length}</strong>
              </div>

              <div>
                <span>Pending</span>
                <strong>
                  {
                    appointments.filter(
                      (item) => (item.status || "Pending") === "Pending"
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span>Confirmed</span>
                <strong>
                  {
                    appointments.filter(
                      (item) => item.status === "Confirmed"
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span>Cancelled</span>
                <strong>
                  {
                    appointments.filter(
                      (item) => item.status === "Cancelled"
                    ).length
                  }
                </strong>
              </div>
            </div>

            {appointmentsError && (
              <div className="appointment-alert-ui error">
                {appointmentsError}
              </div>
            )}

            {appointmentMessage && (
              <div className="appointment-alert-ui success">
                {appointmentMessage}
              </div>
            )}

            {renderAppointments()}
          </section>
        )}

        {activeSidebar === "reports" && (
  <Reports />
)}

        {activeSidebar === "price" && (
          <section className="placeholder-section-ui">
            <h2>Price and Payments</h2>
            <p>Payment details and billing features can be added here.</p>
          </section>
        )}

        {activeSidebar === "settings" && (
          <section className="placeholder-section-ui">
            <h2>Settings</h2>
            <p>Account settings can be added here.</p>
            <p>
              <strong>Signed-in email:</strong> {firebaseUser.email || "N/A"}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Patient;