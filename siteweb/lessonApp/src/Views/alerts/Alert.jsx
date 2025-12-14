import React, { useEffect, useState } from 'react';

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
};

const COLORS = {
  success: { bg: '#e6ffed', border: '#2ecc71', text: '#1b6b3a' },
  error: { bg: '#ffe6e6', border: '#e74c3c', text: '#6b1b1b' },
  info: { bg: '#eef6ff', border: '#3498db', text: '#083a66' },
  warning: { bg: '#fff8e6', border: '#f1c40f', text: '#5a4200' },
};

export default function Alert({
  type = 'info',
  title,
  children,
  onClose,
  closable = true,
  icon,
  className = '',
}) {

  function handleClose() {
    onClose && onClose();
  }
  const style = COLORS[type] || COLORS.info;
  const showIcon = icon !== false;
  const displayIcon = icon || ICONS[type];

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 8,
        border: `1px solid ${style.border}`,
        background: style.bg,
        color: style.text,
        boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
        maxWidth: 600,
        animation: 'slideIn .22s ease-out',
      }}
      className={className}
    >
      {showIcon && (
        <div style={{ fontSize: 18, lineHeight: '18px', marginTop: 2 }}>
          {displayIcon}
        </div>
      )}

      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: 600, marginBottom: children ? 6 : 0 }}>
            {title}
          </div>
        )}
        {children && <div style={{ fontSize: 14 }}>{children}</div>}
      </div>

      {closable && (
        <button
          onClick={handleClose}
          aria-label="Close alert"
          style={{
            background: 'transparent',
            border: 'none',
            color: style.text,
            cursor: 'pointer',
            padding: 6,
            fontSize: 16,
            opacity: 0.8,
          }}
        >
          ✕
        </button>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-6px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}