import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '', id }) => {
  return (
    <div id={id} className={`max-w-[1700px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 ${className}`}>
      {children}
    </div>
  );
};
