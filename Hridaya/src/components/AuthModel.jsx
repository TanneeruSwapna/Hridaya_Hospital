
import React, { useState } from 'react';
import './AuthModel.css';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore'; // ⬅️ Add Firestore
import { db } from '../firebase'; // ⬅️ Import db

const AuthModel = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [formError, setFormError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    setGoogleError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // You could store user data in Firestore if needed here
      navigate('/');
    } catch (error) {
      setGoogleError(error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    if (!role) {
      setFormError('Please select your role.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔥 Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        role,
      });

      // Store in localStorage (optional)
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: `${firstName} ${lastName}`,
        role: role,
      }));

      // Redirect based on role
      if (role === 'doctor') navigate('/doctor/dashboard');
      else if (role === 'patient') navigate('/patient/dashboard');
      else navigate('/');

    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="authmodel-container">
      <div className="authmodel-left-section">
        <div className="authmodel-content-wrapper">
          <div className="authmodel-logo-row">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/hospital-2.png" alt="Logo" className="authmodel-logo" />
            <span className="authmodel-logo-title">Hridaya</span>
          </div>
          <h2 className="authmodel-main-title">Advanced Hospital Management Solution</h2>
          <p className="authmodel-desc">Join our network of healthcare professionals and institutions to deliver exceptional patient care.</p>
          <ul className="authmodel-features">
            <li><i className="fas fa-check-circle"></i> Streamlined patient management</li>
            <li><i className="fas fa-check-circle"></i> Electronic health records</li>
            <li><i className="fas fa-check-circle"></i> Appointment scheduling</li>
          </ul>
        </div>
      </div>

      <div className="authmodel-right-section">
        <div className="authmodel-signup-box">
          <h3 className="authmodel-signup-title">Create Your Account</h3>

          <button type="button" className="authmodel-google-btn" onClick={handleGoogleSignup}>
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google icon" />
            Sign up with Google
          </button>
          {googleError && <div className="error-message">{googleError}</div>}

          <form onSubmit={handleFormSubmit}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>

            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="authmodel-form-group authmodel-password-group" style={{ flex: 1 }}>
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                <span className="authmodel-eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </span>
              </div>
              <div className="authmodel-form-group authmodel-password-group" style={{ flex: 1 }}>
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
                <span className="authmodel-eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </span>
              </div>
            </div>

            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select your role</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>

            <div className="authmodel-checkbox-row">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <a href="#">Terms and Conditions</a></label>
            </div>

            {formError && <div className="error-message">{formError}</div>}
            <button type="submit" className="authmodel-submit-btn">Create Account</button>

            <div className="authmodel-login-link">
              Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModel;
