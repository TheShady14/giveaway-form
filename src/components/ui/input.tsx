import type React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, className = "", ...props }: InputProps) => {
  const id = props.id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`input ${error ? "input-error" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-secondary">{error}</p>}
    </div>
  );
};

export default Input;
