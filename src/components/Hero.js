import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

// import logo from "../assets/logo.svg";
import umass from '../assets/umass.png';

const Hero = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="text-center hero my-5">
      <img className="mb-3 app-logo" src={umass} alt="UMass logo" width="120" />
      <h1 className="mb-4">UMass Badminton Portal</h1>
      <div>{isAuthenticated ? "Yes" : "No"}</div>
      {/* <div>{user.name}</div> */}
      {isAuthenticated && (
        <h1>
          {user.nickname}
        </h1>
      )}
      <p className="lead">
        Welcome to the official portal for badminton court bookings at UMass!
      </p>
    </div>
  )
}
export default Hero;
