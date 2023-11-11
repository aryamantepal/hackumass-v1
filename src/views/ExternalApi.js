import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import "./sample.css";

export const ExternalApiComponent = () => {
  return (
    <>
      <div className="mb-5">
        <h1>Bookings</h1>
        <p>
          Here's where you make a booking!
        </p>
      </div>

      <div className="result-block-container">
        {(
          <div className="result-block" data-testid="api-result">
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});

