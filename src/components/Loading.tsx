// src/components/Loading.tsx
import React from 'react';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = "Cargando...", 
  size = 'medium' 
}) => {
  return (
    <>
      <style>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          text-align: center;
        }
        
        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        .spinner.small { width: 20px; height: 20px; }
        .spinner.medium { width: 40px; height: 40px; }
        .spinner.large { width: 60px; height: 60px; }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-message {
          color: #666;
          font-size: 1rem;
          margin: 0;
        }
      `}</style>
      
      <div className="loading-container">
        <div className={`spinner ${size}`}></div>
        <p className="loading-message">{message}</p>
      </div>
    </>
  );
};

// Skeleton loading component
export const SkeletonCard: React.FC = () => {
  return (
    <>
      <style>{`
        .skeleton-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          height: 350px;
          background-color: #fff;
        }
        
        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }
        
        .skeleton-image {
          width: 100%;
          height: 150px;
          margin-bottom: 1rem;
        }
        
        .skeleton-title {
          height: 20px;
          width: 80%;
          margin-bottom: 0.5rem;
        }
        
        .skeleton-text {
          height: 16px;
          width: 60%;
          margin-bottom: 1rem;
        }
        
        .skeleton-button {
          height: 36px;
          width: 120px;
          margin-top: auto;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      
      <div className="skeleton-card">
        <div className="skeleton skeleton-image"></div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </>
  );
};