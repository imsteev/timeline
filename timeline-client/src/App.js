import React, { useEffect, useState } from "react";
import "./App.css";

import {
  API_URL,
  createTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
} from "./apiClient";

import { EventsList } from "./components/EventsList";
import { TimelineContainer } from "./components/TimelineContainer";

const getMonthAndYear = (date) => {
  return `${date.getMonth().toString()}/${date.getFullYear().toString()}`;
};

const App = () => {
  const today = new Date();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState(today.toLocaleDateString().slice(0, 10));
  const [end, setEnd] = useState("");
  const [startDate, setStartDate] = useState(new Date(start));

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(startDate.getMonth());

  const [experiencesByMonth, setExperiencesByMonth] = useState({});

  const [error, setError] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [currentEvents, setCurrentEvents] = useState(
    experiencesByMonth[`${currentMonth}/${currentYear}`] || []
  );

  useEffect(() => {
    const date = new Date(start);
    if (date.getTime() === date.getTime()) {
      setStartDate(date);
      // NaN is not equal to itself: http://adripofjavascript.com/blog/drips/the-problem-with-testing-for-nan-in-javascript.html
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
    }
  }, [start]);

  useEffect(() => {
    fetch(`${API_URL}/api/timeline_events`)
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        }
      })
      .then((events) => {
        createExperienceMap(events);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
      setStart(selectedEvent.start);
      setEnd(selectedEvent.end);
    }
  }, [selectedEvent]);

  useEffect(() => {
    setCurrentEvents(
      experiencesByMonth[`${currentMonth}/${currentYear}`] || []
    );
  }, [currentMonth, currentYear]);

  const onClick = () => {
    if (!selectedEvent) {
      const newEvent = createTimelineEvent({ title, description, start, end });
      if (!newEvent.title) {
        setError("Please input a title");
        return;
      }
      if (!newEvent.start) {
        setError("Please enter a start month");
        return;
      }
      setError("");
      const key = `${startDate.getMonth()}/${currentYear}`;
      if (!(key in experiencesByMonth)) {
        experiencesByMonth[key] = [];
      }
      experiencesByMonth[key].push(newEvent);
      setCurrentEvents(experiencesByMonth[key]);
      setTitle("");
      setDescription("");
      setStart(today.toISOString().slice(0, 10));
      setEnd("");
    } else {
      selectedEvent.title = title;
      selectedEvent.description = description;
      selectedEvent.start = start;
      selectedEvent.end = end;
      updateTimelineEvent(selectedEvent.id, {
        ...selectedEvent,
        ...{ title, description, start, end },
      });
    }
  };

  const selectMonth = (month) => {
    if (currentMonth !== month) {
      setCurrentMonth(month);
    }
  };

  const createExperienceMap = (events) => {
    const newExperiencesByMonth = {};
    for (let event of events) {
      if (!event.start) {
        continue;
      }
      const key = getMonthAndYear(startDate);
      if (!newExperiencesByMonth[key]) {
        newExperiencesByMonth[key] = [];
      }
      newExperiencesByMonth[key].push(event);
    }
    setExperiencesByMonth(newExperiencesByMonth);
    setCurrentEvents(
      newExperiencesByMonth[`${currentMonth}/${currentYear}`] || []
    );
  };

  const editEvent = (event) => {
    if (selectedEvent !== event) {
      setSelectedEvent(event);
    } else {
      setSelectedEvent(null);
    }
  };

  const deleteEvent = (event) => {
    deleteTimelineEvent(event);
    const date = startDate;
    const events = experiencesByMonth[getMonthAndYear(date)];
    experiencesByMonth[getMonthAndYear(date)] = events.filter(
      (e) => e.id !== event.id
    );
    setCurrentEvents(currentEvents.filter((e) => e.id !== event.id));
    setSelectedEvent(null);
  };

  return (
    <>
      <Header />
      <TimelineContainer
        experiencesByMonth={experiencesByMonth}
        currentMonth={currentMonth}
        currentYear={currentYear}
        clickMonth={selectMonth}
      />
      <YearContainer
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
      />
      <div
        className="form"
        onKeyDown={(e) => (e.keyCode === 13 ? onClick() : null)}
      >
        <TextInput
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Short title that describes the experience"
        />
        <TextInput
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Any details?"
        />
        <TextInput
          label="Start Date"
          name="start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="MM/DD/YYYY"
        />
        <TextInput
          label="End Date"
          name="end"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="MM/DD/YYYY"
        />
        <button onClick={onClick}>
          {!selectedEvent ? "Create New" : "Update"}
        </button>
        {error && <div className="error">{error}</div>}
      </div>
      <EventsList
        events={currentEvents}
        header={Date.prototype.monthNames[currentMonth]}
        editEvent={editEvent}
        deleteEvent={deleteEvent}
        selectedEvent={selectedEvent}
      />
    </>
  );
};

const YearContainer = ({ currentYear, setCurrentYear }) => {
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

const Header = () => (
  <h1
    style={{
      position: "relative",
      left: "80%",
      fontSize: "3rem",
      color: "forestgreen",
    }}
  >
    Timeline
  </h1>
);
const TextInput = ({ label, name, value, onChange, placeholder = "" }) => (
  <div>
    <span>{label}:</span>
    <input
      autoComplete="off"
      placeholder={placeholder}
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange} // TODO only set if valid date
    />
  </div>
);

export default App;
