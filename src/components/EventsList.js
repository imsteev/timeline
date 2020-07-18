import React, { useState, useEffect } from "react";

import { TimelineEvent } from "./TimelineEvent";

export const EventsList = ({
  events,
  header,
  editEvent,
  deleteEvent,
  selectedEvent,
}) => (
  <ul className="events">
    <h2>{header}</h2>
    {events &&
      events
        .sort((a, b) => {
          // reverse chronological
          if (b.start < a.start) {
            return -1;
          } else if (a.start === b.start) {
            return 0;
          } else {
            return 1;
          }
        })
        .map((t) => (
          <li key={t.id} style={{ alignItems: "center" }}>
            <TimelineEvent
              event={t}
              isSelected={selectedEvent === t}
              onClickEdit={editEvent}
              onClickDelete={deleteEvent}
            />
          </li>
        ))}
  </ul>
);
