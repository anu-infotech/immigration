import React from "react";
import Select from "react-select";
import { Label } from "reactstrap";
import { renderError } from "./renderError";
import CreatableSelect from "react-select/creatable";
import { PulseLoader } from "react-spinners";
export const renderInput = ({
  input,
  label,
  type,
  placeholder,
  required,
  meta: { touched, error, asyncValidating },
}) => {
  const isInvalidClass = touched && error ? error : null;
  return (
    <>
      <div className="form-group mb-2">
        <Label for="search-input1">{label}</Label>
        <div style={{ position: "relative" }}>
          <input
            {...input}
            className="form-control"
            type={type}
            step="0.01"
            required={required === false ? false : true}
            placeholder={placeholder}
          />
          {asyncValidating ? (
            <span style={{ position: "absolute", bottom: "5px", right: "5px" }}>
              <PulseLoader size={10} color="gray" />
            </span>
          ) : null}
        </div>

        <span
          style={{
            position: "relative",
            color: "red",
            left: "2px",
            top: "10px",
          }}
        >
          {touched && error ? error : null}
        </span>
      </div>
    </>
  );
};

export const renderSelect = ({
  options,
  input,
  label,
  meta: { touched, error },
}) => {
  const isInvalidClass = `${touched && error ? "is-invalid" : ""}`;

  return (
    <div className="form-group">
      <Label htmlFor="">{label}</Label>
      <Select
        {...input}
        onChange={(value) => input.onChange(value)}
        onBlur={(event) => event.preventDefault()}
        options={options}
        className={`${isInvalidClass} select`}
      />
      <span
        style={{
          position: "relative",
          color: "red",
          left: "2px",
          top: "10px",
        }}
      >
        {touched && error ? error : null}
      </span>
    </div>
  );
};

export const multiSelect = ({
  options,
  input,
  label,
  meta: { touched, error },
}) => {
  const isInvalidClass = `${touched && error ? "is-invalid" : ""}`;

  return (
    <div className="form-group">
      <Label htmlFor="">{label}</Label>
      <CreatableSelect
        isMulti
        options={options}
        {...input}
        onBlur={(event) => event.preventDefault()}
        onChange={(value) => input.onChange(value)}
      />
      <span
        style={{
          position: "relative",
          color: "red",
          left: "2px",
          top: "10px",
        }}
      >
        {touched && error ? error : null}
      </span>
    </div>
  );
};
