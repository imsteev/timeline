import React from "react";
export const TimelineEvent = ({
  event,
  isSelected,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h3
        className={`edit-${!!isSelected}`}
        onClick={() => onClickEdit(event)}
        style={{
          color: !!isSelected ? "var(--green)" : "black",
          textDecoration: !!isSelected ? "underline" : undefined,
        }}
      >
        {event.title} ({new Date(event.start).toLocaleDateString().slice(0, 10)}
        )
      </h3>
      <div
        onClick={() => onClickDelete(event)}
        className={`delete selected-${!!isSelected}`}
      >
        Delete
      </div>
    </div>
  );
};
