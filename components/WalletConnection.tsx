// components/WalletConnection.tsx
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface WalletProps {
  onBalanceUpdate: (balance: string) => void;
}

const WalletConnection: React.FC<WalletProps> = ({ onBalanceUpdate }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [balance, setBalance] = useState<string>('0');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await web3Provider.send('eth_requestAccounts', []);
        const signer = web3Provider.getSigner();
        const userAddress = await signer.getAddress();
        const userBalance = await signer.getBalance();
        const balanceInEther = ethers.utils.formatUnits(userBalance, 'ether');

        setProvider(web3Provider);
        setAccount(userAddress);
        setBalance(balanceInEther);
        onBalanceUpdate(balanceInEther); // Notify parent component
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed.');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      {account ? (
        <p>Connected as: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask</button>
      )}
      <p>Balance: {balance} ETH</p>
    </div>
  );
};

export default WalletConnection;
