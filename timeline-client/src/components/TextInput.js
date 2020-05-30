import React from "react";

export const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}) => (
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
