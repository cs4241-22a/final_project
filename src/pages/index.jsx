import React, {useEffect, useState} from 'react';


const Home = () => {

const [user, setUser] = useState({});
useEffect(() => {
  fetch("/username", {
    method: "GET",
  }).then(async (response) => {
  let res = await response.json()
  setUser(res)
})
}, [])

  return (
    <div
      style={{
        display: 'block',
        justifyContent: 'Left',
        alignItems: 'Left',
        height: '100vh',
        padding: '2%'
      }}
    >
      <h1>Welcome to GoataShop</h1>
      <h2>For when you really GoataShop</h2>
      <p>{user.name}</p>
    </div>
  );
};
  
export default Home;
