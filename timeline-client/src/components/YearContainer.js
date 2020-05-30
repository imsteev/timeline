import React from "react";

export const YearContainer = ({ currentYear, setCurrentYear }) => {
  return (
    <div className="year-control">
      <h2 className="prev-year" onClick={() => setCurrentYear(currentYear - 1)}>
        Previous
      </h2>
      <h2
        className="current-year"
        style={{ textAlign: "center", marginTop: "" }}
      >
        {currentYear}
      </h2>
      <h2 className="next-year" onClick={() => setCurrentYear(currentYear + 1)}>
        Next
      </h2>
    </div>
  );
};
