
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';
import './PatientLogin.css';

const PatientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePatientAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let userCredential;

      if (isRegister) {
        if (!name.trim()) {
          setError('Please enter your full name.');
          setLoading(false);
          return;
        }

        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(userCredential.user, {
          displayName: name.trim()
        });
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      const user = userCredential.user;

      const patientData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || name || 'Patient',
        photoURL: user.photoURL
      };

      localStorage.setItem('patient', JSON.stringify(patientData));
      localStorage.setItem('user', JSON.stringify(patientData));

      navigate('/patient/dashboard', { replace: true });

    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please log in.');
          break;

        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;

        case 'auth/weak-password':
          setError('Password must contain at least 6 characters.');
          break;

        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          setError('Invalid email or password.');
          break;

        default:
          setError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address first.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent to your email.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="background-image" />

      <div className="login-container">
        <h2 className="login-title">
          {isRegister ? 'Patient Registration' : 'Patient Portal'}
        </h2>

        <p className="login-subtitle">
          {isRegister
            ? 'Create your patient account'
            : 'Login to access your patient account'}
        </p>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handlePatientAuth}>

          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Patient Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? 'Processing...'
              : isRegister
                ? 'Create Patient Account'
                : 'Login as Patient'}
          </button>
        </form>

        {!isRegister && (
          <p className="forgot-password">
            <button type="button" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          </p>
        )}

        <p className="signup-link">
          {isRegister
            ? 'Already have an account? '
            : "Don't have an account? "}

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister ? 'Login' : 'Create Account'}
          </button>
        </p>

        <p className="back-link">
          <button type="button" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </p>
      </div>
    </div>
  );
};

export default PatientLogin;
