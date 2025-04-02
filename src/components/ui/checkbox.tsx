import type React from "react";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

const Checkbox = ({ label, className = "", ...props }: CheckboxProps) => {
  const id =
    props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <label htmlFor={id} className="checkbox-label">
      <input
        id={id}
        type="checkbox"
        className={`checkbox ${className}`}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
