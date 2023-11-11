import React from "react";
import { InlineWidget } from "react-calendly";

const Calendly = () => {
    return (
        <div className="App">
            <InlineWidget url="https://calendly.com/aryamantepal" />
        </div>
    );
};

export default Calendly;