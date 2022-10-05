import React from 'react';
  
const Profile = () => {
  return (
    <div
      style={{
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
        padding: '2%',
        margin: 'auto'
      }}
    >
      <h1>Your Profile</h1>
      
      <button>Edit Profile</button>
    </div>
  );
};
  
export default Profile;