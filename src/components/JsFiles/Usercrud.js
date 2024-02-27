import React, { useState, useEffect } from 'react';
import '../styling/Usercrud.css'; // Import your CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function UserCrud() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    mobileNumber: '',
    address: '',
    role: '',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const clearNewUserFields = () => {
    setNewUser({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      mobileNumber: '',
      address: '',
      role: '',
    });
  };

  const handleToggleDetails = (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null);
      setEditingUser(null); // Clear editing state on toggle
    } else {
      setExpandedUserId(userId);
      setEditingUser(null);
    }
  };

  const handleAddUser = () => {
    if (
      newUser.username &&
      newUser.password &&
      newUser.password === newUser.confirmPassword &&
      newUser.email &&
      newUser.mobileNumber &&
      newUser.address &&
      newUser.role
    ) {
      fetch('http://localhost:8000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((addedUser) => {
          setUsers([...users, addedUser]);
          clearNewUserFields();
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
  };

  const handleUpdateUser = () => {
    if (editingUser && editingUser.id) {
      fetch(`http://localhost:8000/user/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingUser),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
          setEditingUser(null);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:8000/user/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setExpandedUserId(null);
  };

  return (
    <div className="user-crud-container d-flex flex-column min-vh-100">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container d-flex justify-content-center">
          <span className="navbar-brand text-center">User CRUD Operations</span>
        </div>
      </nav>
      <div className="d-flex">
        <div className="left-panel bg-light p-4">
          <form className="border rounded p-4">
            <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
            <div className="form-group">
              <label className="form-label">Username:</label>
              <input
                className="form-control"
                type="text"
              
                value={editingUser ? editingUser.username : newUser.username}
                onChange={(e) => {
                  if (editingUser) {
                    setEditingUser({ ...editingUser, username: e.target.value });
                  } else {
                    setNewUser({ ...newUser, username: e.target.value });
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password:</label>
              <input
                className="form-control"
                type="password"
          
                value={editingUser ? editingUser.password : newUser.password}
                onChange={(e) => {
                  if (editingUser) {
                    setEditingUser({ ...editingUser, password: e.target.value });
                  } else {
                    setNewUser({ ...newUser, password: e.target.value });
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password:</label>
              <input
                className="form-control"
                type="password"
       
                value={editingUser ? editingUser.confirmPassword : newUser.confirmPassword}
                onChange={(e) => {
                  if (editingUser) {
                    setEditingUser({ ...editingUser, confirmPassword: e.target.value });
                  } else {
                    setNewUser({ ...newUser, confirmPassword: e.target.value });
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email:</label>
              <input
                className="form-control"
                type="email"
           
                value={editingUser ? editingUser.email : newUser.email}
                onChange={(e) => {
                  if (editingUser) {
                    setEditingUser({ ...editingUser, email: e.target.value });
                  } else {
                    setNewUser({ ...newUser, email: e.target.value });
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number:</label>
              <input
                className="form-control"
                type="text"
             
                value={editingUser ? editingUser.mobileNumber : newUser.mobileNumber}
                onChange={(e) => {
                  if (editingUser) {
                    setEditingUser({ ...editingUser, mobileNumber: e.target.value });
                  } else {
                    setNewUser({ ...newUser, mobileNumber: e.target.value });
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address:</label>
              <input
                className="form-control"
                type="text"
   
                value={editingUser ? editingUser.address : newUser.address}
                onChange={(e) => {
                  if (editingUser) {
                    setEditingUser({ ...editingUser, address: e.target.value });
                  } else {
                    setNewUser({ ...newUser, address: e.target.value });
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role:</label>
              <input
                className="form-control"
                type="text"
        
                value={editingUser ? editingUser.role : newUser.role}
                onChange={(e) => {
                  if (editingUser) {
                    setEditingUser({ ...editingUser, role: e.target.value });
                  } else {
                    setNewUser({ ...newUser, role: e.target.value });
                  }
                }}
              />
            </div>
            <div className="form-group">
              {editingUser ? (
                <>
                  <button className="btn btn-primary" onClick={handleUpdateUser}>Update User</button>
                  <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleAddUser}>Add User</button>
              )}
            </div>
          </form>
        </div>
        <div className="right-panel flex-grow-1 p-4">
          <h3>List Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <button className="btn btn-link" onClick={() => handleToggleDetails(user.id)}>
                <a href="#" style={{ color: 'black', textDecoration: 'none', borderBottom: 'none' }}>{user.username}</a>
                </button>
                {expandedUserId === user.id && (
                  <div>
                    <p>Email: {user.email}</p>
                    <p>Mobile Number: {user.mobileNumber}</p>
                    <p>Address: {user.address}</p>
                    <p>Role: {user.role}</p>
                    {editingUser === null && (
                      <div>
                        <button className="btn btn-primary" onClick={() => handleEditUser(user)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="footer bg-primary text-white text-center fixed-bottom py-2">
        <p>@2023_Hexaware Technologies Private Limited</p>
      </footer>
    </div>
  );
  

}

export default UserCrud;
