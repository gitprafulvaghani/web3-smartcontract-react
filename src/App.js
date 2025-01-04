import React, { useEffect } from 'react';
import Web3 from 'web3';

function App() {
  const providerUrl = process.env.PROVIDER_URL || 'http://localhost:8545';

  useEffect(() => {
    let web3;

    // Check if MetaMask (or other Ethereum provider) is available
    if (typeof window.ethereum !== 'undefined') {
      web3 = new Web3(window.ethereum);

      // Request accounts access
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          console.log('Connected accounts:', accounts);
        })
        .catch((err) => {
          console.error('Error requesting accounts:', err);
        });
    } else {
      // Fallback to provider URL if no browser extension is available
      web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
      console.log('Using fallback provider:', providerUrl);
    }
  }, [providerUrl]);

  return (
    <div className="App">
      <h1>Web3 React App</h1>
      <p>Check the console for account connection status.</p>
    </div>
  );
}

export default App;
