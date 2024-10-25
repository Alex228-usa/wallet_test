// components/Deposit.tsx
import { useState } from 'react';
import { ethers } from 'ethers';
import WalletConnection from './WalletConnection';

const Deposit = () => {
  const [walletBalance, setWalletBalance] = useState<string>('0');
  const [depositAmount, setDepositAmount] = useState<string>('0');

  const handleMaxClick = () => {
    setDepositAmount(walletBalance);
  };

  const handleDeposit = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed.');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const depositAmountInWei = ethers.utils.parseUnits(depositAmount, 'ether');

      const transaction = await signer.sendTransaction({
        to: 'YOUR_DEPOSIT_CONTRACT_ADDRESS', // Replace with Antix deposit contract address
        value: depositAmountInWei
      });

      await transaction.wait(); // Wait for transaction to be confirmed

      alert('Deposit successful!');
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  return (
    <div>
      <h3>Deposit Balance: {walletBalance} ETH</h3>
      <WalletConnection onBalanceUpdate={(balance) => setWalletBalance(balance)} />

      <div>
        <label>You send</label>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleMaxClick}>Max</button>
      </div>

      <button onClick={handleDeposit}>Deposit Now</button>
    </div>
  );
};

export default Deposit;
