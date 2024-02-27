import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/Profile.css';

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function Profile({ onClose }) {
  const [profileData, setProfileData] = useState({});
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      fetch('http://localhost:8000/user')
        .then((response) => response.json())
        .then((data) => {
          const loggedInUser = data.find(
            (user) => user.username === sessionStorage.getItem('username')
          );
          loggedInUser.username = capitalize(loggedInUser.username);
          loggedInUser.address = capitalize(loggedInUser.address);
          setProfileData(loggedInUser);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []);

  const changePassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match.');
      return;
    }

    const updatedProfile = { ...profileData, password: newPassword };

    fetch(`http://localhost:8000/user/${profileData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Password changed successfully.');
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowChangePassword(false);
      })
      .catch((error) => {
        console.error('Error updating password:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>
          {sessionStorage.getItem('isLoggedIn') === 'true' ? (
            <>
              {showChangePassword ? (
                <>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Current Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      New Password:
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="form-label">
                      Confirm New Password:
                    </label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      className="form-control"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={changePassword}>
                    Confirm
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowChangePassword(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Username</td>
                        <td>{profileData.username}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{profileData.email}</td>
                      </tr>
                      <tr>
                        <td>Mobile Number</td>
                        <td>{profileData.mobileNumber}</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>{profileData.address}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowChangePassword(true)}
                  >
                    Change Password
                  </button>
                </>
              )}
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </>
          ) : (
            <p>Please log in to view your profile.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
