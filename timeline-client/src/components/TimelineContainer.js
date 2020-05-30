import React from "react";

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const TimelineContainer = ({
  experiencesByMonth,
  currentMonth,
  currentYear,
  clickMonth,
}) => (
  <div>
    <div className="timeline">
      {MONTHS.map((month) => {
        const date = new Date();
        date.setMonth(month % 12);
        const numExperiences = (
          experiencesByMonth[`${month}/${currentYear}`] || []
        ).length;
        return (
          <div
            className={`month current-month-${month === currentMonth}`}
            onClick={() => clickMonth(month)}
          >
            <button key={month}>{date.getMonthName()}</button>
            <span style={{ color: "orange" }}>{numExperiences}</span>
          </div>
        );
      })}
    </div>
  </div>
);
