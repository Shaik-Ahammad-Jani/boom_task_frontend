import React from "react";
import { useAuth } from "../../context/AuthContext";

const WalletDisplay = () => {
  const { user } = useAuth();

  return (
    <div className="text-sm text-gray-700">Wallet: ₹{user?.walletBalance || 0}</div>
  );
};

export default WalletDisplay;
