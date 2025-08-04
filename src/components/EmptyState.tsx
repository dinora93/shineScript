// src/components/EmptyState.tsx
import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon = "🔍"
}) => {
  return (
    <>
      <style>{`
        .empty-state {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 4rem 2rem;
          text-align: center;
          grid-column: 1 / -1;
          min-height: 300px;
        }
        
        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .empty-state-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .empty-state-description {
          color: #666;
          margin-bottom: 2rem;
          max-width: 400px;
          line-height: 1.5;
        }
        
        .empty-state-action {
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .empty-state-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }
      `}</style>
      
      <div className="empty-state">
        <div className="empty-state-icon">{icon}</div>
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-description">{description}</p>
        {actionText && onAction && (
          <button className="empty-state-action" onClick={onAction}>
            {actionText}
          </button>
        )}
      </div>
    </>
  );
};