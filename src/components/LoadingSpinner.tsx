import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
    size?: 'sm'; 
    fullscreen?: boolean; 
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size, fullscreen = false }) => {
  const spinner = <Spinner animation="border" role="status" size={size} >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>;

  if (fullscreen) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            {spinner}
        </div>
    );
  }

  
  return spinner;
};

export default LoadingSpinner;