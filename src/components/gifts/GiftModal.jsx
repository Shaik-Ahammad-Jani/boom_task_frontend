import React, { useState, useEffect } from "react";
import { giftCreator } from "../../services/giftService";

const GiftModal = ({ videoId, onClose }) => {
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);

  const giftOptions = [
    { value: 10, label: "₹10", icon: "fa-coffee", color: "warning", desc: "Buy a coffee" },
    { value: 25, label: "₹25", icon: "fa-heart", color: "danger", desc: "Show some love" },
    { value: 50, label: "₹50", icon: "fa-star", color: "info", desc: "You're amazing" },
    { value: 100, label: "₹100", icon: "fa-crown", color: "warning", desc: "Premium support" },
    { value: 250, label: "₹250", icon: "fa-gem", color: "primary", desc: "Super supporter" },
    { value: 500, label: "₹500", icon: "fa-fire", color: "danger", desc: "Biggest fan" }
  ];

  useEffect(() => {
    // Trigger modal animation
    setTimeout(() => setShowModal(true), 10);
    
    // Set default selected gift
    setSelectedGift(giftOptions[0]);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const handleGift = async () => {
    try {
      setLoading(true);
      await giftCreator(videoId, amount);
      
      // Success animation
      setShowModal(false);
      setTimeout(() => {
        // This would ideally be a toast notification
        alert("🎉 Gift sent successfully! The creator will be thrilled!");
        onClose();
      }, 300);
    } catch (err) {
      alert("❌ Gift failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGiftSelect = (gift) => {
    setSelectedGift(gift);
    setAmount(gift.value);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center transition-all ${
          showModal ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 1050,
          transition: 'all 0.3s ease'
        }}
        onClick={handleClose}
      >
        {/* Modal */}
        <div 
          className={`bg-white rounded-4 shadow-lg position-relative transition-all ${
            showModal ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
          style={{
            width: '90%',
            maxWidth: '500px',
            transform: showModal ? 'scale(1)' : 'scale(0.75)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="text-center pt-4 pb-2 position-relative">
            <div className="d-inline-block p-3 rounded-circle mb-3"
                 style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <i className="fas fa-gift text-white fa-2x"></i>
            </div>
            <h3 className="fw-bold text-dark mb-2">Gift the Creator</h3>
            <p className="text-muted mb-0">Show your appreciation with a gift</p>
            
            {/* Close Button */}
            <button 
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Gift Options */}
          <div className="px-4 pb-4">
            <div className="row g-2 mb-4">
              {giftOptions.map((gift) => (
                <div className="col-4" key={gift.value}>
                  <div 
                    className={`card h-100 border-2 cursor-pointer transition-all ${
                      selectedGift?.value === gift.value 
                        ? `border-${gift.color} bg-${gift.color} bg-opacity-10` 
                        : 'border-light'
                    }`}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      transform: selectedGift?.value === gift.value ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onClick={() => handleGiftSelect(gift)}
                  >
                    <div className="card-body text-center p-3">
                      <i className={`fas ${gift.icon} fa-lg mb-2 text-${gift.color}`}></i>
                      <h6 className="card-title mb-1 fw-bold">{gift.label}</h6>
                      <small className="text-muted" style={{fontSize: '0.75rem'}}>
                        {gift.desc}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark">
                <i className="fas fa-edit me-2"></i>
                Or enter custom amount
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text">₹</span>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="10000"
                  placeholder="Enter amount"
                />
              </div>
              <div className="form-text">
                <i className="fas fa-info-circle me-1"></i>
                Minimum ₹1, Maximum ₹10,000
              </div>
            </div>

            {/* Selected Gift Summary */}
            {selectedGift && (
              <div className={`alert alert-${selectedGift.color} alert-dismissible fade show border-0`} 
                   style={{background: `var(--bs-${selectedGift.color})`, opacity: 0.1}}>
                <div className="d-flex align-items-center">
                  <i className={`fas ${selectedGift.icon} fa-lg me-3 text-${selectedGift.color}`}></i>
                  <div>
                    <h6 className={`mb-1 text-${selectedGift.color} fw-bold`}>
                      Sending {selectedGift.label}
                    </h6>
                    <small className="text-muted">{selectedGift.desc}</small>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex gap-3">
              <button 
                className="btn btn-lg flex-grow-1 text-white fw-semibold"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px'
                }}
                onClick={handleGift}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane me-2"></i>
                    Send Gift ₹{amount}
                  </>
                )}
              </button>
              
              <button 
                className="btn btn-outline-secondary btn-lg px-4"
                style={{borderRadius: '12px'}}
                onClick={handleClose}
                disabled={loading}
              >
                <i className="fas fa-times me-2"></i>
                Cancel
              </button>
            </div>

            {/* Security Notice */}
            <div className="text-center mt-3">
              <small className="text-muted">
                <i className="fas fa-shield-alt me-1"></i>
                Secure payment • Support creators directly
              </small>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
        }
        
        .transition-all {
          transition: all 0.2s ease;
        }
        
        .scale-100 {
          transform: scale(1);
        }
        
        .scale-75 {
          transform: scale(0.75);
        }
        
        .opacity-100 {
          opacity: 1;
        }
        
        .opacity-0 {
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default GiftModal;