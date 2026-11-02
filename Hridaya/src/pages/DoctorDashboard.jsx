
import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/400.css';
import { useNavigate } from 'react-router-dom';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import {
  FiBell,
  FiSearch,
  FiCalendar,
  FiUser,
  FiMessageSquare,
  FiPieChart,
  FiFileText,
  FiDollarSign,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';
import { MdOutlineLocalHospital, MdOutlineMedication } from 'react-icons/md';

ChartJS.register(...registerables);

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Simulate notifications
    setNotifications([
      { id: 1, text: 'New appointment request from Daniel Smith', time: '2 mins ago', read: false },
      { id: 2, text: 'Lab results available for Ray Clayton', time: '1 hour ago', read: false },
      { id: 3, text: 'System update completed', time: '3 hours ago', read: true }
    ]);

    return () => clearTimeout(timer);
  }, []);

  const doctor = {
    name: 'Dr. Jackson Santos',
    specialization: 'Dermatologist - Texas Hospital',
    photo: '/doctor.jpg',
    appointments: 2543,
    patients: 3567,
    consultations: 13078,
    returns: 2736,
    missedCalls: 18,
    messages: unreadMessages,
    limit: 150,
    maxLimit: 300,
    income: '2,857.15$',
    incomeChange: '+56%'
  };

  const activityData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Appointments',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      },
      {
        label: 'Consultations',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4
      }
    ]
  };

  const patientGenderData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        data: [45, 50, 5],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleMessageClick = () => {
    setUnreadMessages(0);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard">
      {/* Sidebar */}
      <aside className="doctor-sidebar">
        <div className="sidebar-header">
          <MdOutlineLocalHospital className="hospital-icon" />
          <h2>MediCare Pro</h2>
        </div>
        <nav>
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            <FiPieChart className="nav-icon" /> Dashboard
          </button>
          <button>
            <FiCalendar className="nav-icon" /> Appointments
          </button>
          <button>
            <FiUser className="nav-icon" /> Patients
          </button>
          <button onClick={handleMessageClick}>
            <FiMessageSquare className="nav-icon" /> Messages
            {unreadMessages > 0 && <span className="badge">{unreadMessages}</span>}
          </button>
          <button>
            <MdOutlineMedication className="nav-icon" /> Medications
          </button>
          <button>
            <FiFileText className="nav-icon" /> Documents
          </button>
          <button>
            <FiDollarSign className="nav-icon" /> Finances
          </button>
          <button>
            <FiSettings className="nav-icon" /> Settings
          </button>
          <button onClick={() => navigate('/login')}>
            <FiLogOut className="nav-icon" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="doctor-main">
        {/* Header */}
        <header className="doctor-header">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search patients, appointments, medications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="header-right">
            <div className="notification-bell">
              <FiBell />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-dot"></span>
              )}
              <div className="notification-dropdown">
                <h4>Notifications</h4>
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <p>{notification.text}</p>
                    <small>{notification.time}</small>
                  </div>
                ))}
              </div>
            </div>
            <img src={doctor.photo} alt="Doctor" className="profile-pic" />
            <button className="make-appointment pulse">+ New Appointment</button>
          </div>
        </header>

        {/* Overview */}
        <section className="overview">
          <div className="welcome-card">
            <h3>Hello {doctor.name} 👋</h3>
            <p>Here's what's happening with your practice today.</p>
            <div className="quick-stats">
              <div className="stat-item">
                <span>Today's Appointments</span>
                <strong>5</strong>
              </div>
              <div className="stat-item">
                <span>Pending Requests</span>
                <strong>3</strong>
              </div>
              <div className="stat-item">
                <span>Messages</span>
                <strong>{doctor.messages}</strong>
              </div>
            </div>
          </div>
          
          <div className="activity-chart">
            <h4>Monthly Activity</h4>
            <Line data={activityData} options={{ responsive: true }} />
          </div>
          
          <div className="doctor-profile">
            <div className="profile-header">
              <img src={doctor.photo} alt="Doctor" className="profile-image" />
              <div>
                <h4>{doctor.name}</h4>
                <p>{doctor.specialization}</p>
              </div>
            </div>
            
            <div className="capacity-meter">
              <h5>Patient Capacity</h5>
              <div className="progress-bar">
                <span 
                  style={{ width: `${(doctor.limit / doctor.maxLimit) * 100}%` }}
                  className="progress-fill"
                ></span>
              </div>
              <p>{doctor.limit} / {doctor.maxLimit} Patients</p>
            </div>
            
            <div className="doctor-stats">
              <div className="stat-card">
                <strong>{doctor.appointments.toLocaleString()}</strong>
                <span>Appointments</span>
              </div>
              <div className="stat-card">
                <strong>{doctor.patients.toLocaleString()}</strong>
                <span>Total Patients</span>
              </div>
              <div className="stat-card">
                <strong>{doctor.consultations.toLocaleString()}</strong>
                <span>Consultations</span>
              </div>
              <div className="stat-card">
                <strong>{doctor.returns.toLocaleString()}</strong>
                <span>Return Patients</span>
              </div>
            </div>
          </div>
        </section>

        {/* Middle section */}
        <section className="middle-section">
          <div className="request-list">
            <div className="card-header">
              <h4>Appointment Requests</h4>
              <button className="view-all">View All</button>
            </div>
            <ul>
              <li className="request-item">
                <div className="patient-info">
                  <img src="/patient1.jpg" alt="Patient" />
                  <div>
                    <strong>Daniel Smith</strong>
                    <span>Diabetes | 04/03/2020 | 10 AM</span>
                  </div>
                </div>
                <div className="request-actions">
                  <button className="accept-btn">Accept</button>
                  <button className="decline-btn">Decline</button>
                </div>
              </li>
              <li className="request-item">
                <div className="patient-info">
                  <img src="/patient2.jpg" alt="Patient" />
                  <div>
                    <strong>Dora Herrera</strong>
                    <span>Flu | 11/03/2020 | 8 AM</span>
                  </div>
                </div>
                <div className="request-actions">
                  <button className="accept-btn">Accept</button>
                  <button className="decline-btn">Decline</button>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="appointment-today">
            <div className="card-header">
              <h4>Today's Schedule</h4>
              <button className="view-all">View Calendar</button>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-time">12:00 PM</div>
                <div className="timeline-content">
                  <strong>Ray Clayton</strong>
                  <span>Flu Consultation</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-time">02:00 PM</div>
                <div className="timeline-content">
                  <strong>Cornelia Holland</strong>
                  <span>Diabetes Follow-up</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-time">04:30 PM</div>
                <div className="timeline-content">
                  <strong>Michael Brown</strong>
                  <span>Annual Checkup</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="patient-demographics">
            <h4>Patient Demographics</h4>
            <div className="chart-container">
              <Pie data={patientGenderData} options={{ responsive: true }} />
            </div>
          </div>
        </section>

        {/* Bottom section */}
        <section className="bottom-section">
          <div className="recent-patients">
            <div className="card-header">
              <h4>Recent Patients</h4>
              <button className="view-all">View All</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Last Visit</th>
                    <th>Condition</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="patient-cell">
                        <img src="/patient1.jpg" alt="Patient" />
                        <span>Daniel Smith</span>
                      </div>
                    </td>
                    <td>02/15/2023</td>
                    <td>Diabetes</td>
                    <td><span className="status-badge outpatient">Outpatient</span></td>
                    <td><button className="view-btn">View</button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="patient-cell">
                        <img src="/patient3.jpg" alt="Patient" />
                        <span>Sarah Johnson</span>
                      </div>
                    </td>
                    <td>02/10/2023</td>
                    <td>Hypertension</td>
                    <td><span className="status-badge inpatient">Inpatient</span></td>
                    <td><button className="view-btn">View</button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="patient-cell">
                        <img src="/patient2.jpg" alt="Patient" />
                        <span>Dora Herrera</span>
                      </div>
                    </td>
                    <td>02/05/2023</td>
                    <td>Flu</td>
                    <td><span className="status-badge followup">Follow-up</span></td>
                    <td><button className="view-btn">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="income-box">
            <h4>Monthly Income</h4>
            <div className="income-display">
              <span className="income-amount">{doctor.income}</span>
              <span className={`income-change ${doctor.incomeChange.includes('+') ? 'positive' : 'negative'}`}>
                {doctor.incomeChange}
              </span>
            </div>
            <div className="income-breakdown">
              <div className="breakdown-item">
                <span>Consultations</span>
                <strong>$1,850.00</strong>
              </div>
              <div className="breakdown-item">
                <span>Procedures</span>
                <strong>$750.15</strong>
              </div>
              <div className="breakdown-item">
                <span>Other</span>
                <strong>$257.00</strong>
              </div>
            </div>
            <button className="details-btn">View Detailed Report</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
