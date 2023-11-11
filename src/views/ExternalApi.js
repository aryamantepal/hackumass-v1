import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import "./sample.css";
import BadmintonScene from "../components/badminton/BadmintonScene";
//import Badminton from "../components/bookings/Badminton";

export const ExternalApiComponent = () => {
  return (
    <>
      <div className="result-block-container">
        {(
          <div className="result-block" data-testid="api-result">
            <BadmintonScene />
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});

