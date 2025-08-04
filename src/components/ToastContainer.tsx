// src/components/ToastContainer.tsx
import React from 'react';
import { Toast } from '../hooks/useToast';

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <>
      <style>{`
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .toast {
          min-width: 300px;
          padding: 16px;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slideIn 0.3s ease-out;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .toast.success { background-color: #4CAF50; }
        .toast.error { background-color: #f44336; }
        .toast.warning { background-color: #FF9800; }
        .toast.info { background-color: #2196F3; }
        
        .toast-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 18px;
          padding: 0;
          margin-left: 10px;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @media (max-width: 480px) {
          .toast-container {
            left: 20px;
            right: 20px;
          }
          .toast {
            min-width: auto;
          }
        }
      `}</style>
      
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <span>{toast.message}</span>
            <button 
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  );
};