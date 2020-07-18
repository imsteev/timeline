export const API_URL = "http://127.0.0.1:5000";

export const deleteTimelineEvent = (event) => {
  fetch(`${API_URL}/api/timeline_events/${event.id}`, {
    method: "DELETE",
  });
};

export const updateTimelineEvent = (timeline_event_id, data) => {
  fetch(`${API_URL}/api/timeline_events/${timeline_event_id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const createTimelineEvent = (data) => {
  fetch(`${API_URL}/api/timeline_events`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const getAllTimelineEvents = () => {
  return fetch(`${API_URL}/api/timeline_events`, {
    method: "GET",
    "Content-Type": "application/json",
  });
};
