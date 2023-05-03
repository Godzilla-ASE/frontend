import { useState } from 'react';
import './ShareCard.css';

export default function ShareCard({ url, setSharing }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  const handleReturnClick = () => {
    setSharing(false);
  }

  return (
    <div className="share-card-container">
      <div className="share-card-content">
        <div className="share-card-header">
          <h2 className="share-card-title" style={{ color: "white" }}>Please copy the following link to share</h2>
        </div>
        <div className="share-card-body">
          <div className="url-container">
            <input type="text" className="url-input" value={url} readOnly />
            <button className="share-card-btn copy-btn" onClick={handleCopyClick}>{isCopied ? 'Copied' : 'Copy'}</button>
            <button className="share-card-btn return-btn" onClick={handleReturnClick}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}