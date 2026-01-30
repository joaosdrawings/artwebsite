'use client';

import { useState } from 'react';

export default function EmailContactButton() {
  const [copied, setCopied] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  
  const email = 'JOAOSDRAWINGS@GMAIL.COM';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      {showEmail ? (
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <span className="text-xl font-semibold" style={{color: '#FF7E70'}}>
            {email}
          </span>
          <button
            onClick={handleCopyEmail}
            className="px-3 py-1 text-sm font-semibold rounded transition-colors"
            style={{
              backgroundColor: '#FF7E70',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E86E5D'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7E70'}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <a
            href={`mailto:${email}`}
            className="px-3 py-1 text-sm font-semibold rounded transition-colors"
            style={{
              backgroundColor: '#2C2C2C',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Send Email
          </a>
        </div>
      ) : (
        <button
          onClick={() => setShowEmail(true)}
          className="text-xl font-semibold px-4 py-2 rounded transition-colors"
          style={{
            color: '#FFFFFF',
            backgroundColor: '#FF7E70',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E86E5D'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7E70'}
        >
          Reveal Email
        </button>
      )}
    </div>
  );
}
