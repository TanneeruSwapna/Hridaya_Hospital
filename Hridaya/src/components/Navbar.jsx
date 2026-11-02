
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import './Navbar.css';

const UserProfileDropdown = ({ onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="user-profile-container">
      <button
        type="button"
        className="profile-dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa fa-user-circle profile-icon"></i>

        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="profile-img"
          />
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ME16QHw0MFWnTVqFCfMd64zjhn4qeXYZCKkrWv0p5qvWMp83yVktbGLYD0e-M7t_pfk&usqp=CAU"
            alt="Default Profile"
            className="profile-img"
          />
        )}

        <i
          className={`fa fa-chevron-${isOpen ? 'up' : 'down'} chevron-icon`}
        ></i>
      </button>

      {isOpen && (
        <div className="profile-dropdown-menu">
          <Link
            to="/profile"
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa fa-user dropdown-icon"></i>
            <div className="dropdown-text">
              <div className="dropdown-title">My Profile</div>
              <div className="dropdown-subtitle">
                View and edit your profile
              </div>
            </div>
          </Link>

          <Link
            to="/patient?tab=medical-records"
            className="dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <i className="fa fa-file-medical dropdown-icon"></i>
            <div className="dropdown-text">
              <div className="dropdown-title">Medical Records</div>
              <div className="dropdown-subtitle">
                View your medical history
              </div>
            </div>
          </Link>

          <button
            type="button"
            className="dropdown-item logout-item"
            onClick={onLogout}
          >
            <i className="fa fa-sign-out dropdown-icon"></i>
            <div className="dropdown-text">
              <div className="dropdown-title">Logout</div>
              <div className="dropdown-subtitle">Sign out of your account</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || 'Patient',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('patient');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();

      localStorage.removeItem('user');
      localStorage.removeItem('patient');

      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="main-navigation">
      <div className="nav-content">
        <div className="nav-logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGQ0zwxXX5nUllJkszNetKrnhiMkRTy3ldiw&s"
            alt="Hridaya Hospital Logo"
            className="logo"
          />
          <Link to="/">HRIDAYA</Link>
        </div>

        <div className="nav-links">
          <Link to="/">HOME</Link>
          <Link to="/doctors">DOCTORS</Link>

          <Link to={user ? '/patient/dashboard' : '/patient/login'}>
            PATIENT
          </Link>

          <Link to="/aboutus">ABOUT</Link>

          {loading ? null : user ? (
            <UserProfileDropdown
              onLogout={handleLogout}
              user={user}
            />
          ) : (
            <Link to="/auth" className="signup-button">
              Create Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
