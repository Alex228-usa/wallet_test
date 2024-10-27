import React, { useState } from 'react';
import { ethers } from 'ethers';

const Deposit = () => {
  const [amount, setAmount] = useState<string>('');

  const handleDeposit = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.error('MetaMask is not installed');
      return;
    }

    try {
      // Create a new Web3Provider instance
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Replace the "..." with the actual address or transaction data needed for the deposit
      const transaction = {
        to: "...", // Address where the deposit goes
        value: ethers.parseEther(amount), // Convert amount to Wei
      };

      // Send transaction
      const txResponse = await signer.sendTransaction(transaction);
      await txResponse.wait(); // Wait for the transaction to be mined

      console.log("Deposit successful:", txResponse);
    } catch (error) {
      console.error("Error during deposit:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter deposit amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit Now</button>
    </div>
  );
};

export default Deposit;
