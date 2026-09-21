import React, { useState } from 'react';
import { VoiceBeam, useMicrophone } from 'voice-glow';

export default function App() {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showVariantsMenu, setShowVariantsMenu] = useState(false);
  const [currentVariant, setCurrentVariant] = useState('colorful');

  const mic = useMicrophone();
  const isLive = mic.state === 'live';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 3500);
    }
  };

  const handleToggleMic = () => {
    if (isLive) {
      mic.stop();
    } else {
      mic.start();
    }
  };

  const handleClear = () => {
    setText('');
    setIsProcessing(false);
    if (isLive) mic.stop();
  };

  const colorVariantsList = ['colorful', 'ocean', 'sunset', 'candy', 'forest', 'ice', 'gold', 'mono'];

  return (
    <div style={styles.page}>
      {showVariantsMenu && (
        <div style={styles.dropdownMenu}>
          <div style={styles.dropdownHeader}>colorVariant:</div>
          <div style={styles.variantList}>
            {colorVariantsList.map((v) => (
              <button
                key={v}
                onClick={() => {
                  setCurrentVariant(v);
                  setShowVariantsMenu(false);
                }}
                style={{
                  ...styles.variantItem,
                  backgroundColor: currentVariant === v ? '#4f46e5' : '#2d2d2d',
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      <VoiceBeam
        type="default"
        stream={mic.stream}
        processing={isProcessing}
        colorVariant={currentVariant}
        theme="dark"
        strength={isLive || isProcessing ? 1 : 0}
        sensitivity={1.2}
        reach={1.4}
        spread={1.1}
        bend={0.3}
        idle={0.08}
      >
        <div style={styles.chatBox}>
          <input
            type="text"
            style={styles.chatInput}
            placeholder={isProcessing ? "Processing..." : "Ask me anything.."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div style={styles.actionsRow}>
            <button style={styles.btnCircle} title="Add">
              <svg style={styles.icon} viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>

            <div style={styles.rightActions}>
              <button 
                style={{
                  ...styles.btnAgent,
                  border: showVariantsMenu ? '1px solid #7928ca' : 'none'
                }} 
                onClick={() => setShowVariantsMenu(!showVariantsMenu)}
                title="Change Variant"
              >
                <span>Agent: {currentVariant}</span>
                <svg style={{ width: 14, height: 14, stroke: '#9e9e9e' }} viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <button
                onClick={handleToggleMic}
                style={{
                  ...styles.btnCircle,
                  backgroundColor: isLive ? '#4a151b' : '#383838',
                  color: isLive ? '#ff4d6d' : '#d1d1d1',
                  boxShadow: isLive ? '0 0 10px rgba(255, 77, 109, 0.4)' : 'none'
                }}
                title={isLive ? 'Stop' : 'Listen'}
              >
                <svg style={styles.icon} viewBox="0 0 24 24">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
              </button>

              <button 
                style={styles.btnCircle} 
                onClick={handleClear}
                title="Clear"
              >
                <svg style={styles.icon} viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </VoiceBeam>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#171717',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
  },
  chatBox: {
    backgroundColor: '#242424',
    width: '460px',
    maxWidth: '92vw',
    borderRadius: '28px',
    padding: '20px 22px 18px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
    boxSizing: 'border-box',
  },
  chatInput: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#ececec',
    fontSize: '1.08rem',
    fontWeight: 400,
    letterSpacing: '-0.2px',
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  btnCircle: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#383838',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#d1d1d1',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  btnAgent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#383838',
    color: '#e0e0e0',
    border: 'none',
    borderRadius: '22px',
    padding: '0 16px',
    height: '42px',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'capitalize',
  },
  icon: {
    width: '19px',
    height: '19px',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  dropdownMenu: {
    position: 'absolute',
    bottom: 'calc(50% + 70px)',
    backgroundColor: '#1f1f1f',
    border: '1px solid #333',
    borderRadius: '16px',
    padding: '12px',
    zIndex: 20,
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  dropdownHeader: {
    fontSize: '0.75rem',
    color: '#999',
    marginBottom: '4px',
  },
  variantList: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    maxWidth: '320px',
  },
  variantItem: {
    border: 'none',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    textTransform: 'capitalize',
  }
};

