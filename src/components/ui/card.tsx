import type React from "react";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className = "", children }: CardProps) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export { Card };

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

const CardTitle = ({ className = "", children }: CardTitleProps) => {
  return <h3 className={`card-title ${className}`}>{children}</h3>;
};

export { CardTitle };

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent = ({ className = "", children }: CardContentProps) => {
  return <div className={`card-content ${className}`}>{children}</div>;
};

export { CardContent };
