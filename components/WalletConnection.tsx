import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnection = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.error('MetaMask is not installed');
      return;
    }

    try {
      // Create a new Web3Provider instance
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Get the address of the connected wallet
      const address = await signer.getAddress();
      setWalletAddress(address);
      
      console.log("Connected wallet address:", address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && <p>Connected Address: {walletAddress}</p>}
    </div>
  );
};

export default WalletConnection;
