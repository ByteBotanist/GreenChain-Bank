document.addEventListener('DOMContentLoaded', function () {
    const { ethers } = window;
  
    document.getElementById('createWallet').addEventListener('click', createWallet);
    document.getElementById('importWallet').addEventListener('click', importWallet);
    document.getElementById('sendTransaction').addEventListener('click', sendTransaction);
  
    async function createWallet() {
      try {
        const wallet = await getStoredWallet();
        if (wallet) {
          alert('Please delete the current wallet first.');
          return;
        }
  
        const newWallet = ethers.Wallet.createRandom();
        const walletInfo = `Address: ${newWallet.address}\nMnemonic: ${newWallet.mnemonic.phrase}\nPrivate Key: ${newWallet.privateKey}`;
        alert(walletInfo + "\n\nThe only way you can restore this wallet here is if you have the mnemonic for import. This is also your only opportunity to view this information and acts as proof of ownership. WRITE ON PAPER AND KEEP SECURE.");
        await saveWallet(newWallet.mnemonic.phrase);
        displayWalletInfo();
      } catch (error) {
        console.error('Error creating wallet:', error);
      }
    }
  
    async function importWallet() {
      const mnemonic = prompt('Enter your mnemonic:');
      if (mnemonic) {
        try {
          const wallet = await getStoredWallet();
          if (wallet) {
            alert('Please delete the current wallet first.');
            return;
          }
  
          const importedWallet = ethers.Wallet.fromMnemonic(mnemonic);
          await saveWallet(importedWallet.mnemonic.phrase);
          displayWalletInfo();
        } catch (error) {
          console.error('Error importing wallet:', error);
          alert('Error importing wallet: ' + error.message);
        }
      }
    }
  
    async function sendTransaction() {
      const recipientAddress = document.getElementById('recipientAddress').value;
      const amount = document.getElementById('amount').value;
      const wallet = await getStoredWallet();
  
      if (wallet) {
        try {
          const provider = new ethers.providers.InfuraProvider('homestead', '24c3827ccb6c4fdeb3e73f0f681a11b4');
          const walletWithProvider = wallet.connect(provider);
  
          const tx = {
            to: recipientAddress,
            value: ethers.utils.parseEther(amount)
          };
  
          const transaction = await walletWithProvider.sendTransaction(tx);
          alert('Transaction sent: ' + transaction.hash);
  
          // Wait for the transaction to be mined
          await transaction.wait();
  
          // Update the displayed wallet balance
          displayWalletInfo();
        } catch (error) {
          console.error('Error sending transaction:', error);
          alert('Error sending transaction: ' + error.message);
        }
      }
    }
  
    async function saveWallet(mnemonic) {
      await chrome.storage.local.set({ wallet: mnemonic });
    }
  
    async function getStoredWallet() {
      return new Promise((resolve) => {
        chrome.storage.local.get(['wallet'], function (result) {
          const mnemonic = result.wallet;
          if (mnemonic) {
            resolve(ethers.Wallet.fromMnemonic(mnemonic));
          } else {
            resolve(null);
          }
        });
      });
    }
  
    async function displayWalletInfo() {
      const wallet = await getStoredWallet();
      const walletInfoDiv = document.getElementById('walletInfo');
      walletInfoDiv.innerHTML = '';
  
      if (wallet) {
        const provider = new ethers.providers.InfuraProvider('homestead', '24c3827ccb6c4fdeb3e73f0f681a11b4');
        const balance = await provider.getBalance(wallet.address);
        walletInfoDiv.innerHTML = `
          <p>Address: ${wallet.address}</p>
          <p>Balance: ${ethers.utils.formatEther(balance)} ETH</p>
          <button id="deleteWallet">Delete Wallet</button>
        `;
        document.getElementById('deleteWallet').addEventListener('click', deleteWallet);
      } else {
        walletInfoDiv.innerHTML = '<p>No wallet stored. Create or import a new wallet.</p>';
      }
    }
  
    async function deleteWallet() {
      if (confirm("The only way you can restore this wallet is if you have the mnemonic for import.")) {
        await chrome.storage.local.remove(['wallet']);
        displayWalletInfo();
      }
    }
  
    displayWalletInfo(); // Display wallet info on load
  });
  
  
  
  
  
  
  
  
  