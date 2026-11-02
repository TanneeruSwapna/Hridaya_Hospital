
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const ProtectedPatientRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCheckingAuth(false);

      if (firebaseUser) {
        const patientData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || 'Patient',
          photoURL: firebaseUser.photoURL
        };

        localStorage.setItem('user', JSON.stringify(patientData));
        localStorage.setItem('patient', JSON.stringify(patientData));
      } else {
        localStorage.removeItem('patient');
      }
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      Checking login...
    </div>;
  }

  if (!user) {
    return <Navigate to="/patient/login" replace />;
  }

  return children;
};

export default ProtectedPatientRoute;
