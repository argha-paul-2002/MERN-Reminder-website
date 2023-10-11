import React, { useContext, useEffect, useState } from 'react';
import Notes from './Notes';
import { useNavigate } from "react-router-dom";
import userContext from "../context/user/userContext";
import { Link, useLocation } from "react-router-dom";


const Home = () => {

  const host = "http://localhost:5000"
  const notesInitial = []
  const [user, setUser] = useState(notesInitial)
  let navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json()
        setUser(json)
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    if (localStorage.getItem("token")) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1 className=''>Welcome to the Reminder Application User Name {user.name} </h1>
      <h3><Link to="/set-reminder">Set Reminder</Link></h3>
      <h3><Link to="/modify-reminders">Modify Reminder</Link></h3>
      <h3><Link to="/disable-reminders">Disable Reminder</Link></h3>
      <h3><Link to="/delete-reminders">Delete Reminder</Link></h3>
      <h3><Link to="/enable-reminders">Enable Reminder</Link></h3>
      <h3><Link to="/view-all-reminders">View your Reminder</Link></h3>
      <Notes/>
    </div>
  )
}

export default Home
